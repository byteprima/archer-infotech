/**
 * SEO Dashboard — PageSpeed Insights v5 wrapper. Lab data, synthetic
 * Lighthouse run on every API call. Cached for 24h to avoid hammering
 * the public PSI endpoint.
 */
import { getSeoApiConfig } from "./auth";
import { withCache } from "./cache";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

export type PsiStrategy = "mobile" | "desktop";

export interface PsiSummary {
  url: string;
  strategy: PsiStrategy;
  fetchedAt: string;
  /** Score 0..1 from each Lighthouse category. */
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  /** Lab metrics in milliseconds (or unitless for CLS). */
  metrics: {
    lcp: number | null;
    fcp: number | null;
    cls: number | null;
    tbt: number | null;
    speedIndex: number | null;
    ttfb: number | null;
  };
}

interface RawPsiResponse {
  lighthouseResult?: {
    categories?: Record<string, { score?: number | null }>;
    audits?: Record<
      string,
      {
        numericValue?: number;
        displayValue?: string;
      }
    >;
  };
}

function pickScore(
  categories: Record<string, { score?: number | null }> | undefined,
  key: string,
): number | null {
  const c = categories?.[key];
  return typeof c?.score === "number" ? c.score : null;
}

function pickMetric(
  audits: Record<string, { numericValue?: number }> | undefined,
  key: string,
): number | null {
  const a = audits?.[key];
  return typeof a?.numericValue === "number" ? a.numericValue : null;
}

/**
 * Run PSI for a single URL + strategy. Cached for 24h.
 *
 * Returns a flattened summary rather than the full Lighthouse JSON
 * because the raw response is ~500 KB per URL and we only need the
 * top-line scores + Core Web Vital metrics for the dashboard.
 */
export async function psiRun(
  url: string,
  strategy: PsiStrategy,
  opts: { force?: boolean } = {},
) {
  const cfg = getSeoApiConfig();
  if (!cfg.apiKey) {
    throw new Error(
      "GOOGLE_API_KEY not configured — PSI requires the API key from ~/.config/claude-seo/google-api.json or the GOOGLE_API_KEY env var",
    );
  }

  return withCache(
    {
      source: "psi",
      scopeValue: url,
      variant: strategy,
      ttlSeconds: 24 * 60 * 60,
      force: opts.force,
    },
    async () => {
      const params = new URLSearchParams({
        url,
        strategy,
        key: cfg.apiKey!,
      });
      // PSI accepts repeated category params; we want all four.
      const qs =
        params.toString() +
        "&category=performance&category=accessibility&category=best-practices&category=seo";

      const resp = await fetch(`${PSI_ENDPOINT}?${qs}`, {
        // PSI is slow — 30-60s typical. Long timeout.
        signal: AbortSignal.timeout(90_000),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`PSI failed for ${url} (${resp.status}): ${txt.slice(0, 300)}`);
      }

      const raw = (await resp.json()) as RawPsiResponse;
      const summary: PsiSummary = {
        url,
        strategy,
        fetchedAt: new Date().toISOString(),
        scores: {
          performance: pickScore(raw.lighthouseResult?.categories, "performance"),
          accessibility: pickScore(raw.lighthouseResult?.categories, "accessibility"),
          bestPractices: pickScore(
            raw.lighthouseResult?.categories,
            "best-practices",
          ),
          seo: pickScore(raw.lighthouseResult?.categories, "seo"),
        },
        metrics: {
          lcp: pickMetric(raw.lighthouseResult?.audits, "largest-contentful-paint"),
          fcp: pickMetric(raw.lighthouseResult?.audits, "first-contentful-paint"),
          cls: pickMetric(raw.lighthouseResult?.audits, "cumulative-layout-shift"),
          tbt: pickMetric(raw.lighthouseResult?.audits, "total-blocking-time"),
          speedIndex: pickMetric(raw.lighthouseResult?.audits, "speed-index"),
          ttfb: pickMetric(raw.lighthouseResult?.audits, "server-response-time"),
        },
      };
      return summary;
    },
  );
}
