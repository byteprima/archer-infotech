/**
 * SEO Dashboard — suggestion rule engine. P5-29 / P8-26 baseline
 * tooling done in code form.
 *
 * Each rule reads from the cached metric snapshots and emits zero or
 * one Suggestion. The dashboard renders all suggestions sorted by
 * severity. Rules are intentionally additive — adding a new rule
 * doesn't risk breaking the others.
 *
 * Severity levels
 *   - "critical" : the page is bleeding signal; act this week
 *   - "warn"     : trending wrong direction; investigate
 *   - "info"     : noteworthy fact; reference for context
 *
 * Adding a new rule
 *   1. Define a Rule object with id, severity, and an evaluate(ctx) fn
 *   2. Push it into RULES below
 *   3. Done — dashboard picks it up automatically
 */
import type { GscRow, GscQueryResult } from "./gsc";
import type { PsiSummary } from "./psi";
import type { CruxResponse } from "./crux";
import { bucketCwv, extractP75 } from "./crux";

export interface Suggestion {
  id: string;
  severity: "critical" | "warn" | "info";
  title: string;
  detail: string;
  /** Pages / queries the suggestion applies to, if any. */
  affected?: string[];
  /** Recommended next action in plain English. */
  action: string;
  /** Cross-reference to a master-plan P-item, if applicable. */
  workPlanRef?: string;
}

export interface RulesContext {
  gsc28d?: GscQueryResult | null;
  gscPrior28d?: GscQueryResult | null;
  psiByUrl?: Map<string, { mobile?: PsiSummary; desktop?: PsiSummary }>;
  cruxOriginMobile?: CruxResponse | null;
}

interface Rule {
  id: string;
  severity: Suggestion["severity"];
  evaluate: (ctx: RulesContext) => Suggestion | null;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

/** Sum a numeric column across GSC rows. */
function sumColumn(rows: GscRow[], key: keyof Pick<GscRow, "clicks" | "impressions">): number {
  return rows.reduce((acc, r) => acc + (r[key] ?? 0), 0);
}

/** Average a column weighted by impressions (the right way to roll up CTR / position). */
function weightedAvg(rows: GscRow[], key: "ctr" | "position"): number {
  const totalImp = sumColumn(rows, "impressions");
  if (totalImp === 0) return 0;
  return rows.reduce((acc, r) => acc + r[key] * r.impressions, 0) / totalImp;
}

// ---------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------

const RULES: Rule[] = [
  // ----- GSC delta rules -----
  {
    id: "ctr-drop-28d",
    severity: "warn",
    evaluate: ({ gsc28d, gscPrior28d }) => {
      if (!gsc28d?.rows.length || !gscPrior28d?.rows.length) return null;
      const cur = weightedAvg(gsc28d.rows, "ctr");
      const prev = weightedAvg(gscPrior28d.rows, "ctr");
      const delta = cur - prev;
      if (delta >= -0.005) return null; // < 0.5pp drop = noise
      return {
        id: "ctr-drop-28d",
        severity: "warn",
        title: `Click-through rate dropped ${(Math.abs(delta) * 100).toFixed(1)}pp over 28d`,
        detail: `Site CTR went from ${(prev * 100).toFixed(1)}% to ${(cur * 100).toFixed(1)}% comparing the last 28 days vs the prior 28 days. Top causes are usually meta description rewrites by Google (snippet drift) or new competitor SERP entries pulling clicks.`,
        action: "Open the Search Performance tab → sort top pages by impressions. The pages with rising impressions but flat or falling clicks are the ones to inspect — rewrite their meta descriptions.",
      };
    },
  },
  {
    id: "ctr-rising",
    severity: "info",
    evaluate: ({ gsc28d, gscPrior28d }) => {
      if (!gsc28d?.rows.length || !gscPrior28d?.rows.length) return null;
      const cur = weightedAvg(gsc28d.rows, "ctr");
      const prev = weightedAvg(gscPrior28d.rows, "ctr");
      const delta = cur - prev;
      if (delta < 0.005) return null;
      return {
        id: "ctr-rising",
        severity: "info",
        title: `Click-through rate up ${(delta * 100).toFixed(1)}pp over 28d`,
        detail: `Site CTR went from ${(prev * 100).toFixed(1)}% to ${(cur * 100).toFixed(1)}%. Likely driver: improved snippets (FAQ rich results / HowTo cards) or rising position on high-CTR queries.`,
        action: "Note for context. Keep doing what's working — schema work and DAPs (P8-07/P8-08) typically drive this kind of CTR lift.",
      };
    },
  },
  {
    id: "position-drop-major",
    severity: "critical",
    evaluate: ({ gsc28d, gscPrior28d }) => {
      if (!gsc28d?.rows.length || !gscPrior28d?.rows.length) return null;
      const cur = weightedAvg(gsc28d.rows, "position");
      const prev = weightedAvg(gscPrior28d.rows, "position");
      const delta = cur - prev; // positive delta = position got worse
      if (delta < 3) return null;
      return {
        id: "position-drop-major",
        severity: "critical",
        title: `Average position worsened by ${delta.toFixed(1)} ranks`,
        detail: `Average ranking position went from ${prev.toFixed(1)} to ${cur.toFixed(1)} comparing the last 28 days vs the prior 28 days. A site-wide drop of 3+ ranks usually signals an algorithm update, a technical regression (canonical / robots / sitemap drift), or a new competitor surge.`,
        action: "Check GSC → Indexing → Pages for any new 'crawled but not indexed' spike. Run PSI on top-traffic URLs to rule out CWV regression. Compare against Google algorithm tracker for recent updates.",
      };
    },
  },
  {
    id: "almost-there-pages",
    severity: "info",
    evaluate: ({ gsc28d }) => {
      if (!gsc28d?.rows.length) return null;
      const almost = gsc28d.rows
        .filter((r) => r.position >= 8 && r.position <= 15 && r.impressions >= 100)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5);
      if (almost.length === 0) return null;
      return {
        id: "almost-there-pages",
        severity: "info",
        title: `${almost.length} pages within striking distance of page 1`,
        detail: `These pages rank between positions 8 and 15 with 100+ impressions/month — the highest-leverage targets to push onto page 1.`,
        affected: almost.map((r) => r.keys[0]),
        action: "Pick the top 1-2 by impressions and add 3-5 contextual internal links from related course / blog pages. P5-09 + P5-28 + P4-13 patterns are the right pattern.",
      };
    },
  },
  // ----- Lab data (PSI) rules -----
  {
    id: "psi-perf-poor-mobile",
    severity: "critical",
    evaluate: ({ psiByUrl }) => {
      if (!psiByUrl || psiByUrl.size === 0) return null;
      const poor: string[] = [];
      for (const [url, byStrat] of psiByUrl.entries()) {
        const score = byStrat.mobile?.scores.performance;
        if (typeof score === "number" && score < 0.5) poor.push(url);
      }
      if (poor.length === 0) return null;
      return {
        id: "psi-perf-poor-mobile",
        severity: "critical",
        title: `${poor.length} URLs scoring below 50/100 on mobile PSI`,
        detail: `These URLs have a Lighthouse Performance score below 50 on mobile — the "poor" bucket. Mobile-first indexing means this is what Google actually scores.`,
        affected: poor,
        action: "Open the URL in PageSpeed Insights manually for the full audit. Common causes: render-blocking JS / CSS (often a third-party script), unoptimised LCP image, large client-side bundles. Check the Opportunities + Diagnostics sections in the PSI UI.",
      };
    },
  },
  {
    id: "psi-tbt-poor-mobile",
    severity: "warn",
    evaluate: ({ psiByUrl }) => {
      if (!psiByUrl || psiByUrl.size === 0) return null;
      const poor: string[] = [];
      for (const [url, byStrat] of psiByUrl.entries()) {
        const tbt = byStrat.mobile?.metrics.tbt;
        if (typeof tbt === "number" && tbt > 600) poor.push(url);
      }
      if (poor.length === 0) return null;
      return {
        id: "psi-tbt-poor-mobile",
        severity: "warn",
        title: `${poor.length} URLs with mobile Total Blocking Time over 600ms`,
        detail: `TBT > 600ms on mobile means the main thread is locked while users try to interact. Maps to the new INP Core Web Vital — directly impacts ranking signal.`,
        affected: poor,
        action: "Look for heavy client components — usually accordions, tabs, or maps loaded synchronously. Convert to React Server Components where possible, or lazy-load with dynamic import + Suspense.",
      };
    },
  },
  // ----- Field data (CrUX) rules -----
  {
    id: "crux-no-data",
    severity: "info",
    evaluate: ({ cruxOriginMobile }) => {
      if (!cruxOriginMobile) return null;
      if (!cruxOriginMobile.noData) return null;
      return {
        id: "crux-no-data",
        severity: "info",
        title: "CrUX field data not yet populated for this origin",
        detail: "CrUX requires a minimum threshold of real Chrome user samples (~1,000+ in 28 days) before publishing data. Origin-level data should appear within 4-8 weeks of meaningful traffic; URL-level data takes longer.",
        action: "No action — this is the expected state for lower-traffic sites. Re-check monthly. Until field data populates, PSI lab data is your only CWV signal.",
      };
    },
  },
  {
    id: "crux-lcp-poor",
    severity: "critical",
    evaluate: ({ cruxOriginMobile }) => {
      if (!cruxOriginMobile?.record) return null;
      const lcp = cruxOriginMobile.record.metrics.largest_contentful_paint;
      const p75 = extractP75(lcp);
      if (bucketCwv("largest_contentful_paint", p75) !== "poor") return null;
      return {
        id: "crux-lcp-poor",
        severity: "critical",
        title: `LCP p75 = ${(p75! / 1000).toFixed(2)}s on mobile (real users)`,
        detail: "75% of real Chrome users on mobile see LCP slower than 2.5s — this is the failing 'poor' bucket. Field-data LCP is what Google uses for ranking.",
        action: "Confirm the LCP element via WebPageTest filmstrip or PSI's 'Largest Contentful Paint element' audit. Common fixes: priority image preload, font-display: swap, server-side render the LCP region.",
      };
    },
  },
  {
    id: "crux-cls-poor",
    severity: "warn",
    evaluate: ({ cruxOriginMobile }) => {
      if (!cruxOriginMobile?.record) return null;
      const cls = cruxOriginMobile.record.metrics.cumulative_layout_shift;
      const p75 = extractP75(cls);
      if (bucketCwv("cumulative_layout_shift", p75) !== "poor") return null;
      return {
        id: "crux-cls-poor",
        severity: "warn",
        title: `CLS p75 = ${p75!.toFixed(3)} on mobile (real users)`,
        detail: "75% of real users see Cumulative Layout Shift above 0.25 — failing 'poor' bucket. Usually caused by images / iframes without explicit width × height, or fonts swapping in late.",
        action: "Run PSI's 'Avoid large layout shifts' audit on top-traffic URLs to identify the shifting elements. Add explicit dimensions, reserve space with CSS aspect-ratio, set font-display: optional or swap with size-adjust.",
      };
    },
  },
];

/** Run all rules, return suggestions sorted by severity. */
export function runRules(ctx: RulesContext): Suggestion[] {
  const out: Suggestion[] = [];
  for (const rule of RULES) {
    try {
      const s = rule.evaluate(ctx);
      if (s) out.push(s);
    } catch (err) {
      console.error(`SEO rule ${rule.id} threw:`, err);
    }
  }
  const order = { critical: 0, warn: 1, info: 2 };
  return out.sort((a, b) => order[a.severity] - order[b.severity]);
}
