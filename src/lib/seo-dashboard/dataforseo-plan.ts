/**
 * SEO Dashboard — DataForSEO planning + parsing (pure, no I/O).
 *
 * Everything the DataForSEO job needs to decide *what* to request, *how
 * much it will cost*, and *how to read the answer* lives here so it can
 * be unit-tested without the network or the database. The I/O side is
 * dataforseo.ts (client + budget) and dfs-jobs.ts (orchestration).
 *
 * Prices are DataForSEO's published per-call rates as of 2026-10-04,
 * used only to *estimate* a batch before posting it. The ledger records
 * the cost DataForSEO actually reports.
 */

/** Our own site — how we're recognised in organic results. */
export const OUR_DOMAIN = "archerinfotech.in";

/** Our Google Business Profile CID — how we're recognised in Maps. */
export const OUR_GBP_CID = "6025358486108162616";

const OUR_NAME = /archer\s*info\s*tech/i;

/** Where the live checks are run from (baseline: Pune, mobile). */
export const SERP_LOCATION = "Pune,Maharashtra,India";
export const ADS_LOCATION_PUNE = 1007788;
export const ADS_LOCATION_INDIA = 2356;

/** Organic depth: positions 50–70 are where we are today, so look deep. */
export const SERP_DEPTH = 100;

/** Estimated USD per billed unit (2026-10-04 price list). */
export const PRICE = {
  serpPage: 0.0006, // Standard queue, per 10 organic results
  serpAsyncAio: 0.0006, // load_async_ai_overview surcharge (refunded if unused)
  mapsTask: 0.0006, // Standard queue, up to 100 listings
  llmChatgpt: 0.035, // gpt-5.4-mini with web search, measured 0.018–0.032
  llmPerplexity: 0.007, // sonar, measured ~0.006
  backlinksSummary: 0.0241, // per target
  searchVolume: 0.09, // per request (up to 1000 keywords)
} as const;

export const MODEL = {
  chatgpt: "gpt-5.4-mini",
  perplexity: "sonar",
} as const;

// ---------------------------------------------------------------------
// Schedule
// ---------------------------------------------------------------------

export type DfsJob = "serp" | "maps" | "llm" | "backlinks" | "volumes";

/** How often each job runs. SERP weekly; everything else monthly. */
export const JOB_CADENCE: Record<DfsJob, "weekly" | "monthly"> = {
  serp: "weekly",
  maps: "monthly",
  llm: "monthly",
  backlinks: "monthly",
  volumes: "monthly",
};

/** YYYY-MM-DD (UTC). */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Is a job due, given the date (YYYY-MM-DD) it last ran? Weekly = 7+ days
 * since the last run; monthly = no run yet in the current calendar month.
 */
export function isDue(job: DfsJob, lastRun: string | null, now: Date): boolean {
  if (!lastRun) return true;
  if (JOB_CADENCE[job] === "weekly") {
    const days = (Date.parse(isoDate(now)) - Date.parse(lastRun)) / 86_400_000;
    return days >= 7;
  }
  return lastRun.slice(0, 7) !== isoDate(now).slice(0, 7);
}

// ---------------------------------------------------------------------
// Cost estimates
// ---------------------------------------------------------------------

export function estimateSerp(keywords: number): number {
  return keywords * ((SERP_DEPTH / 10) * PRICE.serpPage + PRICE.serpAsyncAio);
}

export function estimateMaps(keywords: number, points: number): number {
  return keywords * points * PRICE.mapsTask;
}

export function estimateLlm(prompts: number): number {
  return prompts * (PRICE.llmChatgpt + PRICE.llmPerplexity);
}

export function estimateBacklinks(targets: number): number {
  return targets * PRICE.backlinksSummary;
}

export function estimateVolumes(): number {
  return 2 * PRICE.searchVolume; // Pune + India
}

// ---------------------------------------------------------------------
// Geo-grid
// ---------------------------------------------------------------------

export interface GridCentre {
  center: string;
  lat: number;
  lng: number;
  radiusKm: number;
}

export interface GridPoint {
  /** "<centre>#<0-8>" — index 4 is the centre itself. */
  label: string;
  center: string;
  lat: number;
  lng: number;
}

/**
 * A 3×3 lattice around a centre, spaced half the radius apart, row by
 * row from north-west to south-east (index 4 = the centre).
 */
export function gridPoints(c: GridCentre): GridPoint[] {
  const stepKm = c.radiusKm / 2;
  const dLat = stepKm / 111.32;
  const dLng = stepKm / (111.32 * Math.cos((c.lat * Math.PI) / 180));
  const pts: GridPoint[] = [];
  let i = 0;
  for (const row of [1, 0, -1]) {
    for (const col of [-1, 0, 1]) {
      pts.push({
        label: `${c.center}#${i++}`,
        center: c.center,
        lat: Number((c.lat + row * dLat).toFixed(6)),
        lng: Number((c.lng + col * dLng).toFixed(6)),
      });
    }
  }
  return pts;
}

// ---------------------------------------------------------------------
// Result parsing — DataForSEO "advanced" result shapes (subset we read)
// ---------------------------------------------------------------------

interface SerpItem {
  type: string;
  rank_group?: number;
  domain?: string | null;
  url?: string | null;
  title?: string | null;
  cid?: string | null;
  references?: { domain?: string | null }[] | null;
  items?: SerpItem[] | null;
}

function isOurDomain(domain: string | null | undefined): boolean {
  if (!domain) return false;
  const d = domain.toLowerCase().replace(/^www\./, "");
  return d === OUR_DOMAIN;
}

export interface ParsedSerp {
  ourPosition: number | null;
  ourUrl: string | null;
  resultsCount: number;
  aioPresent: boolean;
  aioCitesUs: boolean;
  aioDomains: string[];
  localPackPresent: boolean;
  localPackUs: boolean;
  top10: string[];
}

/** Read one organic SERP result (task_get/advanced → result[0]). */
export function parseSerp(result: { items?: SerpItem[] | null } | null | undefined): ParsedSerp {
  const items = result?.items ?? [];
  const organic = items.filter((x) => x.type === "organic");
  const ours = organic.find((x) => isOurDomain(x.domain));

  const aio = items.filter((x) => x.type === "ai_overview");
  const aioDomains = new Set<string>();
  const collect = (refs: SerpItem["references"]) => {
    for (const r of refs ?? []) {
      if (r.domain) aioDomains.add(r.domain.toLowerCase().replace(/^www\./, ""));
    }
  };
  for (const a of aio) {
    collect(a.references);
    for (const sub of a.items ?? []) collect(sub.references);
  }

  const packs = items.filter((x) => x.type === "local_pack");
  const localPackUs = packs.some(
    (p) => isOurDomain(p.domain) || OUR_NAME.test(p.title ?? "") || p.cid === OUR_GBP_CID,
  );

  return {
    ourPosition: ours?.rank_group ?? null,
    ourUrl: ours?.url ?? null,
    resultsCount: organic.length,
    aioPresent: aio.length > 0,
    aioCitesUs: aioDomains.has(OUR_DOMAIN),
    aioDomains: [...aioDomains].sort(),
    localPackPresent: packs.length > 0,
    localPackUs,
    top10: organic.slice(0, 10).map((x) => (x.domain ?? "").replace(/^www\./, "")),
  };
}

/** Our rank in a Google Maps result, or null if we're not listed. */
export function parseMapsRank(
  result: { items?: SerpItem[] | null } | null | undefined,
): { rank: number | null; resultsCount: number } {
  const items = (result?.items ?? []).filter((x) => x.type === "maps_search");
  const ours = items.find(
    (x) => x.cid === OUR_GBP_CID || isOurDomain(x.domain) || OUR_NAME.test(x.title ?? ""),
  );
  return { rank: ours?.rank_group ?? null, resultsCount: items.length };
}

interface LlmResult {
  items?:
    | {
        type?: string;
        sections?: { text?: string | null; annotations?: { url?: string | null }[] | null }[] | null;
      }[]
    | null;
}

/** Did an LLM answer mention us, and did it cite our site? */
export function parseLlm(result: LlmResult | null | undefined): {
  mentioned: boolean;
  cited: boolean;
  citedUrl: string | null;
  sourceDomains: string[];
} {
  let text = "";
  const urls: string[] = [];
  for (const it of result?.items ?? []) {
    if (it.type && it.type !== "message") continue;
    for (const s of it.sections ?? []) {
      text += s.text ?? "";
      for (const a of s.annotations ?? []) if (a.url) urls.push(a.url);
    }
  }
  const domainOf = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  };
  const ourUrl = urls.find((u) => domainOf(u) === OUR_DOMAIN) ?? null;
  return {
    mentioned: OUR_NAME.test(text) || ourUrl !== null,
    cited: ourUrl !== null,
    citedUrl: ourUrl ? ourUrl.replace(/[?&]utm_source=[^&]*$/, "") : null,
    sourceDomains: [...new Set(urls.map(domainOf).filter(Boolean))].sort(),
  };
}

// ---------------------------------------------------------------------
// Opportunity
// ---------------------------------------------------------------------

/**
 * Opportunity score for a tracked keyword: search volume, weighted by how
 * close we are to page 1. Positions 4–20 get full weight (one push away),
 * 21–50 a quarter, beyond that or unranked nothing — authority comes first.
 */
export function opportunityScore(volume: number | null, position: number | null): number {
  if (!volume || !position) return 0;
  if (position <= 3) return 0; // already winning
  if (position <= 20) return volume;
  if (position <= 50) return Math.round(volume / 4);
  return 0;
}
