/**
 * SEO Dashboard — daily snapshot persistence (#1) + keyword tracker (#5).
 *
 * Turns the live 24h-cache dashboard into a time series. `captureDaily`
 * rolls a DashboardSnapshot down to a compact DailyRollup + per-keyword
 * ranks and upserts them keyed on the GSC anchor date (one row/day).
 * The Trends tab reads them back as sparklines.
 *
 * Called by POST /api/seo/snapshot (Coolify scheduled task, daily).
 */
import { desc, eq, gte } from "drizzle-orm";
import { db } from "@/db";
import { seoDailyMetrics, seoKeywordRanks } from "@/db/schema";
import type { DashboardSnapshot } from "./load";
import { gscQuery, gscDateRange } from "./gsc";
import { extractP75 } from "./crux";
import {
  brandedSplit,
  positionDistribution,
  segmentRollup,
  type SplitTotals,
  type PositionDistribution,
  type SegmentRow,
} from "./analytics";
import { TARGET_KEYWORDS, normaliseQuery } from "./targets";

export interface DailyRollup {
  date: string;
  totals: SplitTotals;
  branded: SplitTotals;
  nonBranded: SplitTotals;
  nonBrandedImpressionShare: number;
  positionDist: PositionDistribution;
  segments: SegmentRow[];
  cwv: { lcp: number | null; inp: number | null; cls: number | null; ttfb: number | null } | null;
}

function totalsFromRows(
  rows: { clicks: number; impressions: number; position: number }[],
): SplitTotals {
  const clicks = rows.reduce((a, r) => a + r.clicks, 0);
  const impressions = rows.reduce((a, r) => a + r.impressions, 0);
  const position =
    impressions > 0
      ? rows.reduce((a, r) => a + r.position * r.impressions, 0) / impressions
      : 0;
  return { clicks, impressions, ctr: impressions > 0 ? clicks / impressions : 0, position };
}

/** Build (but don't persist) the rollup for a snapshot. */
export function buildRollup(snapshot: DashboardSnapshot): DailyRollup {
  const queryRows = snapshot.gscQueries28d.result?.rows ?? [];
  const pageRows = snapshot.gscPages28d.result?.rows ?? [];
  const date =
    snapshot.gscQueries28d.result?.request.endDate ?? gscDateRange(28).endDate;

  const split = brandedSplit(queryRows);
  const crux = snapshot.cruxOriginMobile.result?.record;

  return {
    date,
    totals: totalsFromRows(queryRows),
    branded: split.branded,
    nonBranded: split.nonBranded,
    nonBrandedImpressionShare: split.nonBrandedImpressionShare,
    positionDist: positionDistribution(queryRows),
    segments: segmentRollup(pageRows),
    cwv: crux
      ? {
          lcp: extractP75(crux.metrics.largest_contentful_paint),
          inp: extractP75(crux.metrics.interaction_to_next_paint),
          cls: extractP75(crux.metrics.cumulative_layout_shift),
          ttfb: extractP75(crux.metrics.experimental_time_to_first_byte),
        }
      : null,
  };
}

/**
 * Persist a day's rollup + tracked-keyword ranks (idempotent per date —
 * re-running the same day overwrites). Pulls a dedicated 1000-query GSC
 * report so impression-heavy zero-click target keywords aren't missed.
 */
export async function captureDaily(
  snapshot: DashboardSnapshot,
  opts: { force?: boolean } = {},
): Promise<{ date: string; keywordsTracked: number }> {
  const rollup = buildRollup(snapshot);
  const date = rollup.date;

  // --- daily rollup (upsert by date) ---
  await db.delete(seoDailyMetrics).where(eq(seoDailyMetrics.date, date));
  await db.insert(seoDailyMetrics).values({
    date,
    payload: JSON.stringify(rollup),
  });

  // --- tracked keyword ranks ---
  const recent = gscDateRange(28);
  let queryRows = snapshot.gscQueries28d.result?.rows ?? [];
  try {
    const deep = await gscQuery({
      ...recent,
      dimensions: ["query"],
      rowLimit: 1000,
      force: opts.force,
    });
    if (deep.data.rows.length) queryRows = deep.data.rows;
  } catch {
    /* fall back to the snapshot's 200-row query set */
  }

  const byQuery = new Map(queryRows.map((r) => [normaliseQuery(r.keys[0]), r]));
  await db.delete(seoKeywordRanks).where(eq(seoKeywordRanks.date, date));
  let tracked = 0;
  for (const t of TARGET_KEYWORDS) {
    const row = byQuery.get(normaliseQuery(t.keyword));
    await db.insert(seoKeywordRanks).values({
      date,
      keyword: t.keyword,
      page: t.targetPath,
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ?? 0,
      position: row?.position ?? 0,
    });
    if (row) tracked += 1;
  }

  return { date, keywordsTracked: tracked };
}

// ---------------------------------------------------------------------
// Reads (Trends tab)
// ---------------------------------------------------------------------

/** Last N days of rollups, oldest → newest. */
export async function getDailyHistory(days = 90): Promise<DailyRollup[]> {
  const rows = await db
    .select()
    .from(seoDailyMetrics)
    .orderBy(desc(seoDailyMetrics.date))
    .limit(days);
  return rows
    .map((r) => {
      try {
        return JSON.parse(r.payload) as DailyRollup;
      } catch {
        return null;
      }
    })
    .filter((r): r is DailyRollup => r !== null)
    .reverse();
}

export interface KeywordSeries {
  keyword: string;
  page: string | null;
  latest: { date: string; position: number; impressions: number; clicks: number; ctr: number } | null;
  /** position over time, oldest → newest (0 = not ranking that day). */
  series: { date: string; position: number }[];
}

/** Per-keyword time series for the tracker table, over the last N days. */
export async function getKeywordHistory(days = 90): Promise<KeywordSeries[]> {
  // crude cutoff: lexical date compare works for YYYY-MM-DD
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const rows = await db
    .select()
    .from(seoKeywordRanks)
    .where(gte(seoKeywordRanks.date, cutoffStr))
    .orderBy(seoKeywordRanks.date);

  const byKeyword = new Map<string, typeof rows>();
  for (const r of rows) {
    const arr = byKeyword.get(r.keyword) ?? [];
    arr.push(r);
    byKeyword.set(r.keyword, arr);
  }

  return TARGET_KEYWORDS.map((t) => {
    const hist = byKeyword.get(t.keyword) ?? [];
    const last = hist[hist.length - 1];
    return {
      keyword: t.keyword,
      page: t.targetPath,
      latest: last
        ? {
            date: last.date,
            position: last.position,
            impressions: last.impressions,
            clicks: last.clicks,
            ctr: last.ctr,
          }
        : null,
      series: hist.map((r) => ({ date: r.date, position: r.position })),
    };
  });
}
