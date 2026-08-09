/**
 * POST /api/reviews/sync — nightly Google Business Profile review sync.
 *
 * Hit by a Coolify scheduled task. Pulls every review from the GBP
 * (CID 6025358486108162616) via GBP API v4, upserts the mirror, and
 * records Google's own totals for the AggregateRating.
 *
 * Auth: Bearer token matching REVIEWS_SYNC_SECRET. Returns 401 otherwise.
 *
 * Failure policy — the reason this route is more careful than its size
 * suggests. A failed run must leave the previous good mirror in place and
 * must NOT advance `lastSuccessAt`; the staleness guard in
 * lib/reviews/rating.ts keys off that timestamp to decide whether the
 * rating is still publishable. Marking a failed run as successful would
 * re-create the exact bug this system exists to prevent: a stale number
 * published with confidence because nothing tracked its age.
 *
 * GET returns the current sync state without touching Google — for the
 * admin surface and for checking status without burning quota.
 *
 * Example cron command (Coolify scheduled task, daily):
 *   curl -s -X POST https://archerinfotech.in/api/reviews/sync \
 *        -H "Authorization: Bearer $REVIEWS_SYNC_SECRET"
 */
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { gbpReviews, gbpSyncState } from "@/db/schema";
import { fetchAllReviews, getGbpConfig } from "@/lib/reviews/gbp-client";
import { resolveRating } from "@/lib/reviews/rating";
import { googleReviews } from "@/data/site-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 120;

function authorised(request: NextRequest): NextResponse | null {
  const secret = process.env.REVIEWS_SYNC_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVIEWS_SYNC_SECRET not configured on the server" },
      { status: 500 },
    );
  }
  const provided = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

async function readState() {
  const rows = await db
    .select()
    .from(gbpSyncState)
    .where(eq(gbpSyncState.id, 1))
    .limit(1);
  return rows[0];
}

/** Record an attempt without claiming success. */
async function recordFailure(message: string) {
  const now = new Date();
  await db
    .insert(gbpSyncState)
    .values({ id: 1, lastAttemptAt: now, lastError: message })
    .onConflictDoUpdate({
      target: gbpSyncState.id,
      // Deliberately does NOT touch lastSuccessAt, totalReviewCount or
      // averageRating — the last good values stay published until they
      // age out on their own.
      set: { lastAttemptAt: now, lastError: message },
    });
}

export async function GET(request: NextRequest) {
  const denied = authorised(request);
  if (denied) return denied;

  const [state, resolution] = await Promise.all([readState(), resolveRating()]);
  return NextResponse.json({
    state: state ?? null,
    resolution,
    gbpConfigured: getGbpConfig().isConfigured,
    configConstant: googleReviews,
  });
}

export async function POST(request: NextRequest) {
  const denied = authorised(request);
  if (denied) return denied;

  const now = new Date();

  let result;
  try {
    result = await fetchAllReviews();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await recordFailure(message);
    // 502 rather than 500: the failure is upstream at Google, and the
    // distinction matters when reading cron logs six weeks later.
    return NextResponse.json(
      { ok: false, error: message, previousStatePreserved: true },
      { status: 502 },
    );
  }

  // Google's totals are what the AggregateRating publishes. Without them
  // there is nothing worth banking, because the mirrored rows alone
  // undercount: ratings left with no text never appear in the reviews
  // array but do count toward the profile total.
  if (
    typeof result.totalReviewCount !== "number" ||
    typeof result.averageRating !== "number"
  ) {
    const message =
      "GBP response omitted totalReviewCount/averageRating — refusing to derive a total from mirrored rows, which excludes text-less ratings and would undercount";
    await recordFailure(message);
    return NextResponse.json(
      { ok: false, error: message, previousStatePreserved: true },
      { status: 502 },
    );
  }

  for (const r of result.reviews) {
    await db
      .insert(gbpReviews)
      .values({
        reviewId: r.reviewId,
        reviewerName: r.reviewerName,
        reviewerPhotoUrl: r.reviewerPhotoUrl,
        starRating: r.starRating,
        comment: r.comment,
        replyComment: r.replyComment,
        replyUpdatedAt: r.replyUpdatedAt,
        createTime: r.createTime,
        updateTime: r.updateTime,
        syncedAt: now,
      })
      .onConflictDoUpdate({
        target: gbpReviews.reviewId,
        // isHidden is intentionally absent: an admin's decision to hide a
        // review must survive every subsequent sync.
        set: {
          reviewerName: r.reviewerName,
          reviewerPhotoUrl: r.reviewerPhotoUrl,
          starRating: r.starRating,
          comment: r.comment,
          replyComment: r.replyComment,
          replyUpdatedAt: r.replyUpdatedAt,
          updateTime: r.updateTime,
          syncedAt: now,
        },
      });
  }

  await db
    .insert(gbpSyncState)
    .values({
      id: 1,
      totalReviewCount: result.totalReviewCount,
      averageRating: result.averageRating,
      lastSuccessAt: now,
      lastAttemptAt: now,
      lastError: null,
      lastSyncedCount: result.reviews.length,
    })
    .onConflictDoUpdate({
      target: gbpSyncState.id,
      set: {
        totalReviewCount: result.totalReviewCount,
        averageRating: result.averageRating,
        lastSuccessAt: now,
        lastAttemptAt: now,
        lastError: null,
        lastSyncedCount: result.reviews.length,
      },
    });

  // Surface drift against the hand-verified constant. The constant is the
  // fallback the site serves whenever the sync is down, so letting it rot
  // quietly would leave a stale number one outage away from going live.
  const drift =
    result.totalReviewCount !== googleReviews.ratingCount ||
    Math.abs(result.averageRating - googleReviews.ratingValue) >= 0.05;

  const mirrored = await db
    .select({ n: sql<number>`count(*)` })
    .from(gbpReviews);

  return NextResponse.json({
    ok: true,
    totalReviewCount: result.totalReviewCount,
    averageRating: result.averageRating,
    reviewsWithText: result.reviews.length,
    mirroredRows: mirrored[0]?.n ?? null,
    configDrift: drift
      ? {
          message:
            "site-config googleReviews no longer matches the live profile — update it so the offline fallback stays truthful",
          config: googleReviews,
          live: {
            ratingCount: result.totalReviewCount,
            ratingValue: result.averageRating,
          },
        }
      : null,
  });
}
