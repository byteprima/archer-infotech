/**
 * SEO Dashboard — orchestration / data-loader. Runs all the API
 * pulls in parallel for the dashboard render. Returns a structured
 * snapshot the page components consume.
 *
 * The 28-day-vs-prior-28d window is computed by the dashboard
 * (anchor 3 days ago to account for GSC's 3-day reporting delay):
 *   prior 28d :  T-59 → T-32  (28 days)
 *   recent 28d:  T-31 → T-3   (28 days)
 *   T = today
 *
 * Failures are individually caught — the dashboard renders best-effort
 * and surfaces error states per-section rather than blowing up.
 */
import { gscQuery, gscDateRange, gscInspect, type GscQueryResult, type GscInspectResult } from "./gsc";
import { psiRun, type PsiSummary } from "./psi";
import { cruxQuery, cruxHistory, type CruxResponse, type CruxHistoryResponse } from "./crux";
import { runRules, type Suggestion } from "./rules";
import { PRIORITY_URLS, priorityUrlFull, type PriorityUrl } from "./priority-urls";
import { siteConfig } from "@/data/site-config";

export interface DashboardSnapshot {
  fetchedAt: Date;
  /** Recent 28-day window for headline impressions/clicks/CTR/position. */
  gsc28d: { result: GscQueryResult | null; error: string | null };
  /** Prior 28-day window for delta calculation. */
  gscPrior28d: { result: GscQueryResult | null; error: string | null };
  /** Top 50 pages by clicks in the last 28 days. */
  gscPages28d: { result: GscQueryResult | null; error: string | null };
  /** Top 50 queries by clicks in the last 28 days. */
  gscQueries28d: { result: GscQueryResult | null; error: string | null };
  /** Top queries in the prior 28-day window — drives the movers panel. */
  gscQueriesPrior28d: { result: GscQueryResult | null; error: string | null };
  /** PSI mobile summary for the small set of priority URLs. */
  psiByUrl: Map<string, { mobile?: PsiSummary; desktop?: PsiSummary; error?: string }>;
  /** CrUX origin-level mobile data. */
  cruxOriginMobile: { result: CruxResponse | null; error: string | null };
  /** CrUX origin-level history (25-week sparkline). */
  cruxOriginHistory: { result: CruxHistoryResponse | null; error: string | null };
  /** Per-URL URL Inspection results, keyed by absolute URL. */
  urlInspectByUrl: Map<string, { result: GscInspectResult | null; error: string | null }>;
  /** Per-URL CrUX field data (mobile), keyed by absolute URL. */
  cruxByUrl: Map<string, { result: CruxResponse | null; error: string | null }>;
  /** The priority URL list — keeps the UI in sync with the data fetched. */
  priorityUrls: PriorityUrl[];
  /** Computed suggestions from the rules engine. */
  suggestions: Suggestion[];
  /**
   * Cache hit ratio across all sources — useful for the dashboard
   * footer to show how much of the snapshot was served from cache.
   */
  cacheStats: { hits: number; misses: number };
}

/**
 * Priority URLs the dashboard pulls PSI for. Kept small (4 URLs × 2
 * strategies = 8 PSI calls) because each call is 30-60s. Picked to
 * cover the highest-traffic page types: home, top course, category
 * landing, and one long-form blog.
 */
const PSI_PRIORITY_URLS = [
  `${siteConfig.url}/`,
  `${siteConfig.url}/courses/programming/python-training-in-pune`,
  `${siteConfig.url}/courses/programming`,
  `${siteConfig.url}/bootcamps/codeleap`,
];

interface LoadOptions {
  /** When true, all caches are bypassed and every API is hit fresh. */
  force?: boolean;
  /** When true, skip the slow PSI pulls (useful for first load + refresh). */
  skipPsi?: boolean;
}

export async function loadDashboardSnapshot(
  opts: LoadOptions = {},
): Promise<DashboardSnapshot> {
  const { force = false, skipPsi = false } = opts;
  const cacheStats = { hits: 0, misses: 0 };

  function record<T>(p: { fromCache: boolean; data: T }) {
    if (p.fromCache) cacheStats.hits += 1;
    else cacheStats.misses += 1;
    return p.data;
  }

  // ----- GSC pulls -----
  const recent = gscDateRange(28);
  const prior = gscDateRange(28, 31); // 28-day window ending 31 days before anchor

  const [gsc28dRes, gscPrior28dRes, gscPagesRes, gscQueriesRes, gscQueriesPriorRes] =
    await Promise.allSettled([
      gscQuery({
        ...recent,
        dimensions: ["date"],
        rowLimit: 28,
        force,
      }),
      gscQuery({
        ...prior,
        dimensions: ["date"],
        rowLimit: 28,
        force,
      }),
      gscQuery({
        ...recent,
        dimensions: ["page"],
        rowLimit: 50,
        force,
      }),
      gscQuery({
        ...recent,
        dimensions: ["query"],
        rowLimit: 200,
        force,
      }),
      gscQuery({
        ...prior,
        dimensions: ["query"],
        rowLimit: 200,
        force,
      }),
    ]);

  const gsc28d = unwrapSettled(gsc28dRes, record);
  const gscPrior28d = unwrapSettled(gscPrior28dRes, record);
  const gscPages28d = unwrapSettled(gscPagesRes, record);
  const gscQueries28d = unwrapSettled(gscQueriesRes, record);
  const gscQueriesPrior28d = unwrapSettled(gscQueriesPriorRes, record);

  // ----- CrUX origin-level mobile + history -----
  let cruxOriginMobile: { result: CruxResponse | null; error: string | null };
  try {
    const r = await cruxQuery({ origin: siteConfig.url, formFactor: "PHONE", force });
    cruxOriginMobile = { result: record(r), error: null };
  } catch (err) {
    cruxOriginMobile = {
      result: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  let cruxOriginHistory: { result: CruxHistoryResponse | null; error: string | null };
  try {
    const r = await cruxHistory({ origin: siteConfig.url, formFactor: "PHONE", force });
    cruxOriginHistory = { result: record(r), error: null };
  } catch (err) {
    cruxOriginHistory = {
      result: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  // ----- Per-URL URL Inspection (priority URLs only, 24h cache) -----
  const urlInspectByUrl = new Map<
    string,
    { result: GscInspectResult | null; error: string | null }
  >();
  const inspectResults = await Promise.allSettled(
    PRIORITY_URLS.map(async (p) => {
      const fullUrl = priorityUrlFull(p);
      try {
        const r = await gscInspect(fullUrl, { force });
        return { fullUrl, result: record(r), error: null as string | null };
      } catch (err) {
        return {
          fullUrl,
          result: null as GscInspectResult | null,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );
  for (const r of inspectResults) {
    if (r.status === "fulfilled") {
      urlInspectByUrl.set(r.value.fullUrl, {
        result: r.value.result,
        error: r.value.error,
      });
    }
  }

  // ----- Per-URL CrUX field data (priority URLs only) -----
  const cruxByUrl = new Map<string, { result: CruxResponse | null; error: string | null }>();
  const cruxUrlResults = await Promise.allSettled(
    PRIORITY_URLS.map(async (p) => {
      const fullUrl = priorityUrlFull(p);
      try {
        const r = await cruxQuery({ url: fullUrl, formFactor: "PHONE", force });
        return { fullUrl, result: record(r), error: null as string | null };
      } catch (err) {
        return {
          fullUrl,
          result: null as CruxResponse | null,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );
  for (const r of cruxUrlResults) {
    if (r.status === "fulfilled") {
      cruxByUrl.set(r.value.fullUrl, {
        result: r.value.result,
        error: r.value.error,
      });
    }
  }

  // ----- PSI for priority URLs (parallelised, 8 total calls when not skipped) -----
  const psiByUrl = new Map<
    string,
    { mobile?: PsiSummary; desktop?: PsiSummary; error?: string }
  >();
  if (!skipPsi) {
    const psiResults = await Promise.allSettled(
      PSI_PRIORITY_URLS.flatMap((url) => [
        psiRun(url, "mobile", { force }).then((p) => ({ url, strat: "mobile" as const, p })),
        psiRun(url, "desktop", { force }).then((p) => ({ url, strat: "desktop" as const, p })),
      ]),
    );
    for (const r of psiResults) {
      if (r.status === "fulfilled") {
        const { url, strat, p } = r.value;
        const existing = psiByUrl.get(url) ?? {};
        existing[strat] = record(p);
        psiByUrl.set(url, existing);
      } else {
        // Best-effort surface — record error against the URL we know
        // (the rejection is from one of the PSI promises so we can't
        // always pin it; capture in a synthetic error bucket).
        const existing = psiByUrl.get("__psi_errors__") ?? {};
        existing.error = String(r.reason).slice(0, 200);
        psiByUrl.set("__psi_errors__", existing);
      }
    }
  }

  // ----- Run rules over what we collected -----
  const suggestions = runRules({
    gsc28d: gsc28d.result,
    gscPrior28d: gscPrior28d.result,
    psiByUrl,
    cruxOriginMobile: cruxOriginMobile.result,
  });

  return {
    fetchedAt: new Date(),
    gsc28d,
    gscPrior28d,
    gscPages28d,
    gscQueries28d,
    gscQueriesPrior28d,
    psiByUrl,
    cruxOriginMobile,
    cruxOriginHistory,
    urlInspectByUrl,
    cruxByUrl,
    priorityUrls: PRIORITY_URLS,
    suggestions,
    cacheStats,
  };
}

function unwrapSettled<T>(
  settled: PromiseSettledResult<{ data: T; fromCache: boolean }>,
  record: (p: { fromCache: boolean; data: T }) => T,
): { result: T | null; error: string | null } {
  if (settled.status === "fulfilled") {
    return { result: record(settled.value), error: null };
  }
  return {
    result: null,
    error: settled.reason instanceof Error ? settled.reason.message : String(settled.reason),
  };
}
