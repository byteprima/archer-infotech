/**
 * SEO Dashboard — GSC Search Analytics + URL Inspection wrappers.
 * Cache-through via the seoMetricsCache table; OAuth handled in
 * ./auth.ts.
 */
import { getAccessToken, getSeoApiConfig } from "./auth";
import { withCache } from "./cache";

/** Per-request timeout for GSC calls — without it a slow Google
 *  response can hang the whole server-rendered dashboard indefinitely. */
const GSC_TIMEOUT_MS = 30_000;

const SEARCH_ANALYTICS = "https://searchconsole.googleapis.com/webmasters/v3/sites";
const URL_INSPECT =
  "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

export interface GscRow {
  /** Dimension values in the order requested (e.g. ["/about", "java course pune"]). */
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscQueryResult {
  rows: GscRow[];
  /** Echo of the request so the dashboard can show what window was queried. */
  request: {
    startDate: string;
    endDate: string;
    dimensions: string[];
    rowLimit: number;
  };
}

export type GscDimension = "page" | "query" | "country" | "device" | "date" | "searchAppearance";

interface GscQueryOptions {
  startDate: string; // YYYY-MM-DD
  endDate: string;
  dimensions: GscDimension[];
  rowLimit?: number;
  force?: boolean;
}

/**
 * Search Analytics query — the core GSC report. Cached for 6h keyed
 * on (startDate, endDate, dimensions). Override with `force: true`.
 */
export async function gscQuery({
  startDate,
  endDate,
  dimensions,
  rowLimit = 200,
  force = false,
}: GscQueryOptions) {
  const cfg = getSeoApiConfig();
  const property = cfg.defaultProperty;
  const cacheKey = `${startDate}|${endDate}|${dimensions.join(",")}|${rowLimit}`;

  return withCache(
    {
      source: "gsc-query",
      scopeValue: cacheKey,
      ttlSeconds: 6 * 60 * 60,
      force,
    },
    async () => {
      const token = await getAccessToken();
      const url = `${SEARCH_ANALYTICS}/${encodeURIComponent(property)}/searchAnalytics/query`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions,
          rowLimit,
        }),
        signal: AbortSignal.timeout(GSC_TIMEOUT_MS),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`GSC query failed (${resp.status}): ${txt.slice(0, 300)}`);
      }
      const json = (await resp.json()) as { rows?: GscRow[] };
      const result: GscQueryResult = {
        rows: json.rows ?? [],
        request: { startDate, endDate, dimensions, rowLimit },
      };
      return result;
    },
  );
}

export interface GscInspectResult {
  inspectionResult?: {
    inspectionResultLink?: string;
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      lastCrawlTime?: string;
      pageFetchState?: string;
      googleCanonical?: string;
      userCanonical?: string;
      sitemap?: string[];
      referringUrls?: string[];
      crawledAs?: string;
    };
    mobileUsabilityResult?: {
      verdict?: string;
      issues?: { issueType?: string; severity?: string; message?: string }[];
    };
    richResultsResult?: {
      verdict?: string;
      detectedItems?: {
        richResultType?: string;
        items?: { name?: string; issues?: unknown[] }[];
      }[];
    };
  };
}

/**
 * URL Inspection — per-URL diagnostic. Cached for 24h.
 */
export async function gscInspect(targetUrl: string, opts: { force?: boolean } = {}) {
  const cfg = getSeoApiConfig();
  return withCache(
    {
      source: "gsc-inspect",
      scopeValue: targetUrl,
      ttlSeconds: 24 * 60 * 60,
      force: opts.force,
    },
    async () => {
      const token = await getAccessToken();
      const resp = await fetch(URL_INSPECT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inspectionUrl: targetUrl,
          siteUrl: cfg.defaultProperty,
        }),
        signal: AbortSignal.timeout(GSC_TIMEOUT_MS),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`GSC inspect failed (${resp.status}): ${txt.slice(0, 300)}`);
      }
      return (await resp.json()) as GscInspectResult;
    },
  );
}

/**
 * Date helpers — GSC date format is YYYY-MM-DD, UTC. Search Analytics
 * data is delayed ~3 days, so the right "today" anchor is 3 days ago.
 */
export function gscDateRange(daysBack: number, anchorDaysAgo: number = 3) {
  const anchor = new Date();
  anchor.setUTCDate(anchor.getUTCDate() - anchorDaysAgo);
  const end = anchor.toISOString().slice(0, 10);
  const start = new Date(anchor);
  start.setUTCDate(start.getUTCDate() - daysBack + 1);
  return { startDate: start.toISOString().slice(0, 10), endDate: end };
}
