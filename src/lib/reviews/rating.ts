/**
 * Verified-rating resolver — the single place anything on the site learns
 * what the Google rating is.
 *
 * Resolution order:
 *   1. The GBP mirror in `gbp_sync_state`, if the last successful sync is
 *      recent enough.
 *   2. The human-verified constant in site-config, if IT is recent enough.
 *   3. Nothing — and "nothing" means no AggregateRating is emitted at all.
 *
 * Step 3 is the whole point. The site published `ratingCount: 126` for two
 * months after that figure stopped being true (it was never verified in
 * the first place — someone typed it), and nothing in the system could
 * notice. Every mechanism here fails closed: when the freshness of a
 * number cannot be established, the number is withheld rather than
 * published with confidence. An absent rating costs a decoration. A wrong
 * one is a structured-data policy violation against the whole domain.
 *
 * Worth knowing when reading callers: `LocalBusiness`/`Organization`
 * AggregateRating about the business itself is self-serving and is NOT
 * eligible for Google star rich results, whatever the numbers say. It is
 * emitted for AI engines, which read JSON-LD without applying Google's
 * rich-result eligibility rules. `Course` is not an Organization subtype,
 * so per-course ratings ARE eligible — which is why those have a real
 * minimum-sample threshold rather than being emitted off a single review.
 */
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { gbpReviews, gbpSyncState, type GbpReview } from "@/db/schema";
import { googleReviews } from "@/data/site-config";

/**
 * How long a synced mirror stays publishable. The sync runs nightly, so
 * 30 days means roughly 30 consecutive failures pass unnoticed before the
 * rating is withheld — generous, but far short of the two months the
 * hardcoded figure survived.
 */
export const SYNC_STALE_AFTER_DAYS = 30;

/**
 * How long a hand-verified constant stays publishable. Deliberately
 * longer than the sync window: a human reading the live profile is a
 * stronger signal than an automated pull, but it still expires. Re-verify
 * by opening the profile and updating `googleReviews.verifiedOn`.
 */
export const MANUAL_STALE_AFTER_DAYS = 120;

const DAY_MS = 86_400_000;

export type RatingSource = "gbp-sync" | "config-fallback" | "none";

export interface VerifiedRating {
  ratingValue: number;
  ratingCount: number;
  /** ISO date the figure was last established, from either source. */
  verifiedOn: string;
  source: Exclude<RatingSource, "none">;
}

export interface RatingResolution {
  /** Null when no source is fresh enough to publish. Callers MUST handle. */
  rating: VerifiedRating | null;
  source: RatingSource;
  /** Human-readable reason, for the admin surface and sync response. */
  reason: string;
}

function daysSince(date: Date | number | string): number {
  const t = typeof date === "object" ? date.getTime() : new Date(date).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return (Date.now() - t) / DAY_MS;
}

/**
 * Resolve the rating to publish. Never throws — a DB failure degrades to
 * the config constant rather than taking a page down.
 */
export async function resolveRating(): Promise<RatingResolution> {
  let state: typeof gbpSyncState.$inferSelect | undefined;
  try {
    const rows = await db
      .select()
      .from(gbpSyncState)
      .where(eq(gbpSyncState.id, 1))
      .limit(1);
    state = rows[0];
  } catch {
    // Fall through to the config constant. A DB outage must not blank the
    // rating on every page.
    state = undefined;
  }

  if (
    state?.lastSuccessAt &&
    typeof state.totalReviewCount === "number" &&
    typeof state.averageRating === "number" &&
    state.totalReviewCount > 0
  ) {
    const age = daysSince(state.lastSuccessAt);
    if (age <= SYNC_STALE_AFTER_DAYS) {
      return {
        rating: {
          // Round to one decimal — Google reports the average at that
          // precision and publishing more implies accuracy we don't have.
          ratingValue: Math.round(state.averageRating * 10) / 10,
          ratingCount: state.totalReviewCount,
          verifiedOn: new Date(state.lastSuccessAt).toISOString().slice(0, 10),
          source: "gbp-sync",
        },
        source: "gbp-sync",
        reason: `GBP sync succeeded ${Math.floor(age)} day(s) ago`,
      };
    }
  }

  const manualAge = daysSince(googleReviews.verifiedOn);
  if (manualAge <= MANUAL_STALE_AFTER_DAYS) {
    return {
      rating: {
        ratingValue: googleReviews.ratingValue,
        ratingCount: googleReviews.ratingCount,
        verifiedOn: googleReviews.verifiedOn,
        source: "config-fallback",
      },
      source: "config-fallback",
      reason: state?.lastSuccessAt
        ? `GBP sync stale (>${SYNC_STALE_AFTER_DAYS}d); using constant verified ${googleReviews.verifiedOn}`
        : `GBP sync not yet running; using constant verified ${googleReviews.verifiedOn}`,
    };
  }

  return {
    rating: null,
    source: "none",
    reason: `No fresh source — sync stale or absent and the constant was last verified ${googleReviews.verifiedOn}, over ${MANUAL_STALE_AFTER_DAYS} days ago. AggregateRating withheld deliberately.`,
  };
}

/** Convenience for callers that only need the numbers or nothing. */
export async function getPublishableRating(): Promise<VerifiedRating | null> {
  return (await resolveRating()).rating;
}

/**
 * Rating for VISIBLE PROSE, which always returns something.
 *
 * Deliberately different from `getPublishableRating()`. Structured data
 * must be correct or absent, because a wrong AggregateRating is a policy
 * violation — so schema callers get null and emit nothing. Body copy has
 * no such rule: a sentence citing the last hand-verified figure is
 * ordinary marketing copy, and blanking mid-paragraph would mangle the
 * page for no benefit.
 *
 * The constant it falls back to is itself dated, and `resolveRating()`
 * will refuse it once it ages past MANUAL_STALE_AFTER_DAYS — at which
 * point prose shows a stale number while schema shows none. That is the
 * intended asymmetry, not an oversight.
 */
export async function getDisplayRating(): Promise<VerifiedRating> {
  const { rating } = await resolveRating();
  return (
    rating ?? {
      ratingValue: googleReviews.ratingValue,
      ratingCount: googleReviews.ratingCount,
      verifiedOn: googleReviews.verifiedOn,
      source: "config-fallback",
    }
  );
}

/**
 * Reviews for the public wall — newest first, excluding admin-hidden rows.
 *
 * Hiding affects display only; the published total still comes from
 * Google's own count via the resolver above, so the page can never show
 * a curated subset while implying it is the whole.
 */
export async function getPublicReviews(limit = 50): Promise<GbpReview[]> {
  try {
    return await db
      .select()
      .from(gbpReviews)
      .where(eq(gbpReviews.isHidden, false))
      .orderBy(desc(gbpReviews.createTime))
      .limit(limit);
  } catch {
    return [];
  }
}
