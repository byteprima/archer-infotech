/**
 * SEO Dashboard — ranking analytics (#2 / #3).
 *
 * Pure functions over GSC rows: striking-distance opportunities, the
 * CTR-vs-expected gap, week/period movers, branded vs non-branded
 * split, and per-page-type segment rollups. No I/O — every panel and
 * the daily snapshot job consume these so the maths is defined once.
 */
import type { GscRow } from "./gsc";
import {
  classifyPageType,
  isBranded,
  normaliseQuery,
  positionBucket,
  THRESHOLDS,
  type PageType,
  type PositionBucketKey,
} from "./targets";

// ---------------------------------------------------------------------
// Expected-CTR-by-position curve
// ---------------------------------------------------------------------

/**
 * Industry-standard organic CTR curve (desktop+mobile blend, fraction).
 * Used to flag pages that rank well but under-earn clicks — i.e.
 * title/meta optimisation targets. Values are deliberately conservative.
 */
const CTR_CURVE: Record<number, number> = {
  1: 0.27, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.06,
  6: 0.05, 7: 0.04, 8: 0.032, 9: 0.028, 10: 0.025,
};

/** Expected CTR (fraction) for an average position. */
export function expectedCtrForPosition(position: number): number {
  if (position <= 1) return CTR_CURVE[1];
  if (position >= 20) return 0.005;
  const lo = Math.floor(position);
  const hi = Math.ceil(position);
  const ctrLo = CTR_CURVE[lo] ?? 0.02 / (lo - 9); // gentle decay past 10
  const ctrHi = CTR_CURVE[hi] ?? 0.02 / (hi - 9);
  if (lo === hi) return ctrLo;
  // linear interpolation between integer positions
  return ctrLo + (ctrHi - ctrLo) * (position - lo);
}

// ---------------------------------------------------------------------
// Striking distance
// ---------------------------------------------------------------------

export interface StrikingRow {
  key: string; // query or page
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  /** impressions × (1 − ctr): how much demand is going uncaptured. */
  opportunity: number;
}

/**
 * Queries/pages ranking 4–15 with enough impressions — the highest-ROI
 * ranking targets (small content / internal-link tweaks push them onto
 * page 1). Sorted by opportunity (uncaptured demand).
 */
export function strikingDistance(rows: GscRow[]): StrikingRow[] {
  const { minPosition, maxPosition, minImpressions } = THRESHOLDS.strikingDistance;
  return rows
    .filter(
      (r) =>
        r.position >= minPosition &&
        r.position <= maxPosition &&
        r.impressions >= minImpressions,
    )
    .map((r) => ({
      key: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
      opportunity: r.impressions * (1 - r.ctr),
    }))
    .sort((a, b) => b.opportunity - a.opportunity);
}

// ---------------------------------------------------------------------
// CTR gap
// ---------------------------------------------------------------------

export interface CtrGapRow {
  key: string;
  impressions: number;
  position: number;
  actualCtr: number;
  expectedCtr: number;
  /** expected − actual (fraction). Positive = under-earning clicks. */
  gap: number;
  /** Estimated clicks/28d recoverable by closing the gap. */
  missedClicks: number;
}

/**
 * Pages/queries earning materially fewer clicks than their position
 * predicts — title/meta rewrite candidates. Only rows above the
 * impression floor; sorted by missed clicks.
 */
export function ctrGap(rows: GscRow[]): CtrGapRow[] {
  return rows
    .filter((r) => r.impressions >= THRESHOLDS.ctrGapMinImpressions && r.position <= 20)
    .map((r) => {
      const expectedCtr = expectedCtrForPosition(r.position);
      const gap = expectedCtr - r.ctr;
      return {
        key: r.keys[0],
        impressions: r.impressions,
        position: r.position,
        actualCtr: r.ctr,
        expectedCtr,
        gap,
        missedClicks: Math.max(0, gap) * r.impressions,
      };
    })
    .filter((r) => r.gap > 0)
    .sort((a, b) => b.missedClicks - a.missedClicks);
}

// ---------------------------------------------------------------------
// Movers (period over period)
// ---------------------------------------------------------------------

export interface MoverRow {
  key: string;
  position: number;
  priorPosition: number;
  /** priorPosition − position: positive = improved (moved up). */
  delta: number;
  impressions: number;
  clicks: number;
}

/**
 * Biggest position gains/losses between two GSC windows, joined by the
 * dimension key. Only rows present in both windows with a delta past
 * the noise floor. Positive delta = improved ranking.
 */
export function movers(
  current: GscRow[],
  prior: GscRow[],
): { gainers: MoverRow[]; losers: MoverRow[] } {
  const priorByKey = new Map(prior.map((r) => [normaliseQuery(r.keys[0]), r]));
  const out: MoverRow[] = [];
  for (const r of current) {
    const p = priorByKey.get(normaliseQuery(r.keys[0]));
    if (!p) continue;
    const delta = p.position - r.position; // up = better
    if (Math.abs(delta) < THRESHOLDS.moverMinDelta) continue;
    out.push({
      key: r.keys[0],
      position: r.position,
      priorPosition: p.position,
      delta,
      impressions: r.impressions,
      clicks: r.clicks,
    });
  }
  const gainers = out.filter((r) => r.delta > 0).sort((a, b) => b.delta - a.delta);
  const losers = out.filter((r) => r.delta < 0).sort((a, b) => a.delta - b.delta);
  return { gainers, losers };
}

// ---------------------------------------------------------------------
// Branded vs non-branded split
// ---------------------------------------------------------------------

export interface SplitTotals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number; // impression-weighted
}

export interface BrandedSplit {
  branded: SplitTotals;
  nonBranded: SplitTotals;
  /** Share of impressions that are non-branded (true discovery). */
  nonBrandedImpressionShare: number;
}

function rollupTotals(rows: GscRow[]): SplitTotals {
  const clicks = rows.reduce((a, r) => a + r.clicks, 0);
  const impressions = rows.reduce((a, r) => a + r.impressions, 0);
  const position =
    impressions > 0
      ? rows.reduce((a, r) => a + r.position * r.impressions, 0) / impressions
      : 0;
  return { clicks, impressions, ctr: impressions > 0 ? clicks / impressions : 0, position };
}

/** Split query rows into branded / non-branded (rows must be query-dim). */
export function brandedSplit(queryRows: GscRow[]): BrandedSplit {
  const branded = queryRows.filter((r) => isBranded(r.keys[0]));
  const nonBranded = queryRows.filter((r) => !isBranded(r.keys[0]));
  const b = rollupTotals(branded);
  const nb = rollupTotals(nonBranded);
  const totalImp = b.impressions + nb.impressions;
  return {
    branded: b,
    nonBranded: nb,
    nonBrandedImpressionShare: totalImp > 0 ? nb.impressions / totalImp : 0,
  };
}

// ---------------------------------------------------------------------
// Per-segment rollup
// ---------------------------------------------------------------------

export interface SegmentRow {
  pageType: PageType;
  pages: number;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number; // impression-weighted
}

/** Group page-dimension rows by PageType with weighted-average position. */
export function segmentRollup(pageRows: GscRow[]): SegmentRow[] {
  const byType = new Map<PageType, GscRow[]>();
  for (const r of pageRows) {
    const t = classifyPageType(r.keys[0]);
    const arr = byType.get(t) ?? [];
    arr.push(r);
    byType.set(t, arr);
  }
  const rows: SegmentRow[] = [];
  for (const [pageType, rs] of byType) {
    const t = rollupTotals(rs);
    rows.push({ pageType, pages: rs.length, ...t });
  }
  return rows.sort((a, b) => b.clicks - a.clicks);
}

// ---------------------------------------------------------------------
// Position distribution (for daily snapshot + trend)
// ---------------------------------------------------------------------

export type PositionDistribution = Record<PositionBucketKey, number>;

/** Count query rows into position buckets. */
export function positionDistribution(queryRows: GscRow[]): PositionDistribution {
  const dist: PositionDistribution = { "1-3": 0, "4-10": 0, "11-20": 0, "21-50": 0, "51+": 0 };
  for (const r of queryRows) dist[positionBucket(r.position)] += 1;
  return dist;
}
