/**
 * SEO Dashboard — Chrome UX Report (CrUX) API wrapper. Real-user
 * field data, rolling 28-day window. Cached for 24h.
 *
 * Unlike PSI lab data, CrUX is what Google uses for ranking signals
 * — the p75 of real users. Per memory the URL-level data was empty
 * as of 2026-05-07 due to insufficient real-user traffic; origin-level
 * may also still be sparse. The wrappers handle 404 gracefully —
 * "no data yet" is a valid normal state for CrUX on lower-traffic sites.
 */
import { getSeoApiConfig } from "./auth";
import { withCache } from "./cache";

const CRUX_ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord";

export type FormFactor = "PHONE" | "DESKTOP" | "TABLET";

export type CruxMetric =
  | "largest_contentful_paint"
  | "interaction_to_next_paint"
  | "cumulative_layout_shift"
  | "first_contentful_paint"
  | "experimental_time_to_first_byte";

export interface CruxMetricRecord {
  histogram: { start?: number | string; end?: number | string; density: number }[];
  percentiles: { p75?: number | string };
}

export interface CruxResponse {
  /** present when CrUX has data; absent / null when not enough samples. */
  record?: {
    key: { origin?: string; url?: string; formFactor?: FormFactor };
    metrics: Partial<Record<CruxMetric, CruxMetricRecord>>;
    collectionPeriod?: {
      firstDate: { year: number; month: number; day: number };
      lastDate: { year: number; month: number; day: number };
    };
  };
  /** True when the API returned 404 — "no data" is a valid state. */
  noData?: boolean;
}

interface CruxQueryArgs {
  origin?: string;
  url?: string;
  formFactor?: FormFactor;
  force?: boolean;
}

/**
 * Origin or URL-level CrUX query. Pass exactly one of `origin` or
 * `url`; passing both is a CrUX API error.
 */
export async function cruxQuery({
  origin,
  url,
  formFactor = "PHONE",
  force = false,
}: CruxQueryArgs): Promise<{ data: CruxResponse; fetchedAt: Date; fromCache: boolean }> {
  const cfg = getSeoApiConfig();
  if (!cfg.apiKey) {
    throw new Error(
      "GOOGLE_API_KEY not configured — CrUX requires the API key (same key as PSI)",
    );
  }
  if (!origin && !url) throw new Error("cruxQuery: pass either origin or url");
  if (origin && url) throw new Error("cruxQuery: pass exactly one of origin / url");

  const scopeValue = url ?? origin!;
  const source = url ? "crux-url" : "crux-origin";

  return withCache(
    {
      source,
      scopeValue,
      variant: formFactor,
      ttlSeconds: 24 * 60 * 60,
      force,
    },
    async () => {
      const body = JSON.stringify({
        ...(origin && { origin }),
        ...(url && { url }),
        formFactor,
      });
      const resp = await fetch(`${CRUX_ENDPOINT}?key=${cfg.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (resp.status === 404) {
        // Not enough real-user data for this origin/URL/formFactor.
        // Cache the negative response so we don't re-query for 24h.
        return { noData: true } as CruxResponse;
      }
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`CrUX failed (${resp.status}): ${txt.slice(0, 300)}`);
      }
      const raw = (await resp.json()) as CruxResponse;
      return raw;
    },
  );
}

/**
 * Pull the p75 number out of a metric record. CrUX returns p75 as
 * either a number (CLS, FCP, LCP, INP) or a string (TTFB sometimes);
 * both are normalised to number-or-null.
 */
export function extractP75(metric: CruxMetricRecord | undefined): number | null {
  if (!metric) return null;
  const raw = metric.percentiles?.p75;
  if (raw === undefined || raw === null) return null;
  const n = typeof raw === "number" ? raw : parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}

const CRUX_HISTORY_ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord";

export interface CruxHistoryResponse {
  record?: {
    key: { origin?: string; url?: string; formFactor?: FormFactor };
    metrics: Partial<
      Record<
        CruxMetric,
        {
          histogramTimeseries?: { densities: number[] }[];
          percentilesTimeseries?: { p75s: (number | string | null)[] };
        }
      >
    >;
    collectionPeriods?: {
      firstDate: { year: number; month: number; day: number };
      lastDate: { year: number; month: number; day: number };
    }[];
  };
  noData?: boolean;
}

/**
 * 25-week rolling history of CrUX field data — drives the sparklines
 * on the CWV tab. Cached for 24h; the API itself rolls every Tuesday.
 */
export async function cruxHistory({
  origin,
  url,
  formFactor = "PHONE",
  force = false,
}: CruxQueryArgs): Promise<{ data: CruxHistoryResponse; fetchedAt: Date; fromCache: boolean }> {
  const cfg = getSeoApiConfig();
  if (!cfg.apiKey) {
    throw new Error("GOOGLE_API_KEY not configured");
  }
  if (!origin && !url) throw new Error("cruxHistory: pass either origin or url");
  if (origin && url) throw new Error("cruxHistory: pass exactly one of origin / url");

  const scopeValue = url ?? origin!;

  return withCache(
    {
      source: "crux-history",
      scopeValue,
      variant: formFactor,
      ttlSeconds: 24 * 60 * 60,
      force,
    },
    async () => {
      const body = JSON.stringify({
        ...(origin && { origin }),
        ...(url && { url }),
        formFactor,
      });
      const resp = await fetch(`${CRUX_HISTORY_ENDPOINT}?key=${cfg.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (resp.status === 404) {
        return { noData: true } as CruxHistoryResponse;
      }
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`CrUX history failed (${resp.status}): ${txt.slice(0, 300)}`);
      }
      return (await resp.json()) as CruxHistoryResponse;
    },
  );
}

/**
 * Bucket a CrUX p75 value against the official Core Web Vital
 * thresholds. Returns "good" | "ni" | "poor" | "no-data".
 */
export function bucketCwv(
  metric: CruxMetric,
  p75: number | null,
): "good" | "ni" | "poor" | "no-data" {
  if (p75 === null) return "no-data";
  switch (metric) {
    case "largest_contentful_paint":
      return p75 <= 2500 ? "good" : p75 <= 4000 ? "ni" : "poor";
    case "interaction_to_next_paint":
      return p75 <= 200 ? "good" : p75 <= 500 ? "ni" : "poor";
    case "cumulative_layout_shift":
      return p75 <= 0.1 ? "good" : p75 <= 0.25 ? "ni" : "poor";
    case "first_contentful_paint":
      return p75 <= 1800 ? "good" : p75 <= 3000 ? "ni" : "poor";
    case "experimental_time_to_first_byte":
      return p75 <= 800 ? "good" : p75 <= 1800 ? "ni" : "poor";
    default:
      return "no-data";
  }
}
