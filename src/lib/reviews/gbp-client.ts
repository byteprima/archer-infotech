/**
 * Google Business Profile review client — GBP API v4.
 *
 * Reviews are the one part of the Business Profile surface that never
 * migrated off v4. Account and location metadata live on the newer
 * `mybusinessaccountmanagement` / `mybusinessbusinessinformation` APIs,
 * but review listing is still:
 *
 *   GET https://mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/reviews
 *
 * Auth reuses `getAccessToken()` from the SEO dashboard — the same OAuth
 * client and long-lived refresh token that already serve GSC and the
 * Indexing API. It needs one extra scope on the token:
 *
 *   https://www.googleapis.com/auth/business.manage
 *
 * Re-run oauth_flow.py with that scope added and replace the stored
 * refresh token. Until then every call here fails with 403 — which is
 * expected, and which the sync route reports rather than swallows.
 *
 * ACCESS: the v4 API returns 403 until Google approves the Business
 * Profile API access request for the Cloud project. Enabling the API in
 * the console is necessary but NOT sufficient; quota starts at zero.
 */
import { getAccessToken } from "@/lib/seo-dashboard/auth";

const GBP_V4_BASE = "https://mybusiness.googleapis.com/v4";

/**
 * Google returns star ratings as an enum, not a number. Anything
 * unrecognised (including STAR_RATING_UNSPECIFIED) maps to 0 so it can be
 * filtered out rather than silently counted as a 5.
 */
const STAR_RATING_VALUES: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export interface GbpApiReview {
  reviewId?: string;
  name?: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string; updateTime?: string };
}

interface GbpReviewsPage {
  reviews?: GbpApiReview[];
  nextPageToken?: string;
  averageRating?: number;
  totalReviewCount?: number;
}

export interface NormalisedReview {
  reviewId: string;
  reviewerName: string | null;
  reviewerPhotoUrl: string | null;
  starRating: number;
  comment: string | null;
  replyComment: string | null;
  replyUpdatedAt: Date | null;
  createTime: Date | null;
  updateTime: Date | null;
}

export interface FetchReviewsResult {
  reviews: NormalisedReview[];
  /**
   * Google's own totals. These — not the length of `reviews` — are what
   * the AggregateRating must publish: Google counts ratings left without
   * review text, which never appear in the `reviews` array.
   */
  totalReviewCount: number | null;
  averageRating: number | null;
}

export class GbpAccessError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GbpAccessError";
  }
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function normalise(raw: GbpApiReview): NormalisedReview | null {
  // `reviewId` is the documented field; `name` is the full resource path
  // ending in the same id. Prefer the explicit field, fall back to the
  // last path segment. Without an id there is no stable upsert key, so
  // the row is dropped rather than duplicated on every run.
  const id = raw.reviewId ?? raw.name?.split("/").pop();
  if (!id) return null;

  const stars = STAR_RATING_VALUES[raw.starRating ?? ""] ?? 0;
  if (stars === 0) return null;

  return {
    reviewId: id,
    reviewerName: raw.reviewer?.displayName ?? null,
    reviewerPhotoUrl: raw.reviewer?.profilePhotoUrl ?? null,
    starRating: stars,
    comment: raw.comment?.trim() || null,
    replyComment: raw.reviewReply?.comment?.trim() || null,
    replyUpdatedAt: parseDate(raw.reviewReply?.updateTime),
    createTime: parseDate(raw.createTime),
    updateTime: parseDate(raw.updateTime),
  };
}

/**
 * Resolve the account + location ids for the sync.
 *
 * These are stable once known, so they are configuration rather than
 * something to rediscover on every run. Retrieve them once after API
 * access is approved (accounts.list then accounts.locations.list) and
 * set them as env vars.
 */
export function getGbpConfig() {
  const accountId = process.env.GBP_ACCOUNT_ID;
  const locationId = process.env.GBP_LOCATION_ID;
  return {
    accountId,
    locationId,
    isConfigured: !!(accountId && locationId),
  };
}

/**
 * Fetch every review on the location, following pagination to the end.
 *
 * `pageLimit` is a runaway guard, not a coverage limit — at 50 reviews
 * per page it allows 1,000 reviews before stopping. If it is ever hit the
 * caller treats the run as failed rather than banking a partial mirror,
 * because a truncated pull would understate the total.
 */
export async function fetchAllReviews(
  { pageLimit = 20 }: { pageLimit?: number } = {},
): Promise<FetchReviewsResult> {
  const cfg = getGbpConfig();
  if (!cfg.isConfigured) {
    throw new GbpAccessError(
      "GBP_ACCOUNT_ID / GBP_LOCATION_ID not set — run accounts.list + accounts.locations.list once after API access is approved and store both as env vars",
      0,
    );
  }

  const accessToken = await getAccessToken();
  const reviews: NormalisedReview[] = [];
  let pageToken: string | undefined;
  let totalReviewCount: number | null = null;
  let averageRating: number | null = null;
  let pages = 0;

  do {
    const url = new URL(
      `${GBP_V4_BASE}/accounts/${cfg.accountId}/locations/${cfg.locationId}/reviews`,
    );
    url.searchParams.set("pageSize", "50");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(30_000),
    });

    if (!resp.ok) {
      const body = await resp.text();
      // 403 is overwhelmingly the "not approved yet" or "missing
      // business.manage scope" case. Say so plainly — a bare 403 in a
      // cron log is what turns a two-day fix into a two-month one.
      const hint =
        resp.status === 403
          ? " — most likely the Business Profile API access request is not approved for this Cloud project, or the refresh token lacks the business.manage scope"
          : "";
      throw new GbpAccessError(
        `GBP reviews fetch failed (${resp.status})${hint}: ${body.slice(0, 500)}`,
        resp.status,
      );
    }

    const page = (await resp.json()) as GbpReviewsPage;

    // Totals repeat on every page; keep the first non-null reading.
    if (totalReviewCount === null && typeof page.totalReviewCount === "number") {
      totalReviewCount = page.totalReviewCount;
    }
    if (averageRating === null && typeof page.averageRating === "number") {
      averageRating = page.averageRating;
    }

    for (const raw of page.reviews ?? []) {
      const row = normalise(raw);
      if (row) reviews.push(row);
    }

    pageToken = page.nextPageToken;
    pages += 1;
  } while (pageToken && pages < pageLimit);

  if (pageToken) {
    throw new GbpAccessError(
      `GBP reviews pagination exceeded ${pageLimit} pages — refusing to bank a truncated mirror that would understate the total`,
      0,
    );
  }

  return { reviews, totalReviewCount, averageRating };
}
