/**
 * SEO Dashboard — Overview scorecard model.
 *
 * Turns a DashboardSnapshot (+ daily history) into an executive
 * scorecard: one health score, non-branded-first KPIs with trend
 * sparklines, a Core Web Vitals rollup (field → lab fallback), ranking
 * bucket health, indexation coverage, and a status strip into the
 * detail tabs. Pure — the component just renders this.
 */
import { siteConfig } from "@/data/site-config";
import type { DashboardSnapshot } from "./load";
import type { DailyRollup } from "./history";
import {
  brandedSplit,
  strikingDistance,
  positionDistribution,
  type PositionDistribution,
} from "./analytics";
import { bucketCwv, extractP75 } from "./crux";
import { POSITION_BUCKETS, type SeoStatus, type PositionBucketKey } from "./targets";

export interface OverviewKpi {
  label: string;
  value: string;
  delta: string | null;
  trend: "up" | "down" | "flat" | null;
  upIsGood: boolean;
  series: number[];
  sub?: string;
}

export interface CwvMetric {
  key: string;
  label: string;
  value: string;
  status: SeoStatus;
}

export interface OverviewModel {
  health: {
    score: number;
    status: SeoStatus;
    components: { label: string; score: number | null; weight: number }[];
  };
  kpis: OverviewKpi[];
  ranking: {
    buckets: { key: PositionBucketKey; label: string; count: number }[];
    total: number;
    page1Share: number;
    strikingCount: number;
  };
  cwv: {
    source: "field" | "lab" | "none";
    metrics: CwvMetric[];
    note: string;
  };
  indexation: { indexed: number; total: number; share: number | null; status: SeoStatus };
  statusStrip: { label: string; status: SeoStatus; hint: string }[];
}

function pct(cur: number, prev: number): { delta: string | null; trend: OverviewKpi["trend"] } {
  if (prev === 0) return { delta: null, trend: null };
  const d = ((cur - prev) / prev) * 100;
  if (Math.abs(d) < 0.05) return { delta: "0%", trend: "flat" };
  return { delta: `${d >= 0 ? "+" : ""}${d.toFixed(1)}%`, trend: d > 0 ? "up" : "down" };
}

function scoreFromStatus(score: number): SeoStatus {
  if (score >= 75) return "good";
  if (score >= 50) return "watch";
  return "critical";
}

function clamp(n: number, lo = 0, hi = 100): number {
  return Math.max(lo, Math.min(hi, n));
}

export function buildOverview(
  snapshot: DashboardSnapshot,
  history: DailyRollup[],
): OverviewModel {
  const queries = snapshot.gscQueries28d.result?.rows ?? [];
  const priorQueries = snapshot.gscQueriesPrior28d.result?.rows ?? [];

  const split = brandedSplit(queries);
  const priorSplit = brandedSplit(priorQueries);
  const dist: PositionDistribution = positionDistribution(queries);
  const striking = strikingDistance(queries);

  // ----- KPIs (non-branded first) -----
  const nbClicksSeries = history.map((d) => d.nonBranded.clicks);
  const nbImprSeries = history.map((d) => d.nonBranded.impressions);
  const clicksDelta = pct(split.nonBranded.clicks, priorSplit.nonBranded.clicks);
  const imprDelta = pct(split.nonBranded.impressions, priorSplit.nonBranded.impressions);
  const ctrDeltaVal = (split.nonBranded.ctr - priorSplit.nonBranded.ctr) * 100;
  const ctrDelta: { delta: string | null; trend: OverviewKpi["trend"] } =
    priorSplit.nonBranded.ctr === 0
      ? { delta: null, trend: null }
      : Math.abs(ctrDeltaVal) < 0.01
        ? { delta: "0pp", trend: "flat" }
        : { delta: `${ctrDeltaVal >= 0 ? "+" : ""}${ctrDeltaVal.toFixed(1)}pp`, trend: ctrDeltaVal > 0 ? "up" : "down" };

  const kpis: OverviewKpi[] = [
    {
      label: "Non-branded clicks (28d)",
      value: split.nonBranded.clicks.toLocaleString("en-IN"),
      ...clicksDelta,
      upIsGood: true,
      series: nbClicksSeries,
      sub: "true organic discovery",
    },
    {
      label: "Non-branded impressions (28d)",
      value: split.nonBranded.impressions.toLocaleString("en-IN"),
      ...imprDelta,
      upIsGood: true,
      series: nbImprSeries,
      sub: `${(split.nonBrandedImpressionShare * 100).toFixed(0)}% of all impressions`,
    },
    {
      label: "Non-branded CTR (28d)",
      value: `${(split.nonBranded.ctr * 100).toFixed(2)}%`,
      ...ctrDelta,
      upIsGood: true,
      series: history.map((h) => h.nonBranded.ctr * 100),
    },
    {
      label: "Branded clicks (28d)",
      value: split.branded.clicks.toLocaleString("en-IN"),
      delta: null,
      trend: null,
      upIsGood: true,
      series: history.map((h) => h.branded.clicks),
      sub: "context only — arrives regardless",
    },
  ];

  // ----- Ranking buckets -----
  const total = queries.length;
  const buckets = POSITION_BUCKETS.map((b) => ({ key: b.key, label: b.label, count: dist[b.key] }));
  const page1Share = total > 0 ? (dist["1-3"] + dist["4-10"]) / total : 0;

  // ----- CWV rollup (field → lab fallback) -----
  const crux = snapshot.cruxOriginMobile.result?.record;
  const fieldHas = !!crux && !snapshot.cruxOriginMobile.result?.noData;
  let cwv: OverviewModel["cwv"];
  if (fieldHas && crux) {
    const lcp = extractP75(crux.metrics.largest_contentful_paint);
    const inp = extractP75(crux.metrics.interaction_to_next_paint);
    const cls = extractP75(crux.metrics.cumulative_layout_shift);
    cwv = {
      source: "field",
      note: "CrUX field data — real-user p75, mobile (the ranking signal).",
      metrics: [
        cwvMetric("LCP", lcp !== null ? `${(lcp / 1000).toFixed(2)}s` : "—", statusOf("largest_contentful_paint", lcp)),
        cwvMetric("INP", inp !== null ? `${Math.round(inp)}ms` : "—", statusOf("interaction_to_next_paint", inp)),
        cwvMetric("CLS", cls !== null ? cls.toFixed(3) : "—", statusOf("cumulative_layout_shift", cls)),
      ],
    };
  } else {
    const lab = snapshot.psiByUrl.get(`${siteConfig.url}/`)?.mobile?.metrics;
    if (lab) {
      cwv = {
        source: "lab",
        note: "PSI lab estimate (synthetic) — no field data yet. Not the ranking signal; a proxy.",
        metrics: [
          cwvMetric("LCP", lab.lcp !== null ? `${(lab.lcp / 1000).toFixed(2)}s` : "—", statusOf("largest_contentful_paint", lab.lcp)),
          cwvMetric("CLS", lab.cls !== null ? lab.cls.toFixed(3) : "—", statusOf("cumulative_layout_shift", lab.cls)),
          cwvMetric("TBT", lab.tbt !== null ? `${Math.round(lab.tbt)}ms` : "—", lab.tbt === null ? "none" : lab.tbt <= 200 ? "good" : lab.tbt <= 600 ? "watch" : "critical"),
        ],
      };
    } else {
      cwv = {
        source: "none",
        note: "No CrUX field data (site under ~1,000 Chrome samples/28d). Click Refresh for a PSI lab estimate.",
        metrics: [],
      };
    }
  }
  const cwvScored = cwv.metrics.filter((m) => m.status !== "none");
  const cwvGoodShare =
    cwvScored.length > 0 ? cwvScored.filter((m) => m.status === "good").length / cwvScored.length : null;

  // ----- Indexation coverage -----
  let inspected = 0;
  let indexed = 0;
  for (const { result } of snapshot.urlInspectByUrl.values()) {
    if (!result) continue;
    inspected += 1;
    if (result.inspectionResult?.indexStatusResult?.verdict === "PASS") indexed += 1;
  }
  const indexShare = inspected > 0 ? indexed / inspected : null;
  const indexStatus: SeoStatus =
    indexShare === null ? "none" : indexShare >= 0.9 ? "good" : indexShare >= 0.7 ? "watch" : "critical";

  // ----- Health score -----
  const trendScore = clicksDelta.delta === null ? null : clamp(50 + (split.nonBranded.clicks - priorSplit.nonBranded.clicks) / Math.max(1, priorSplit.nonBranded.clicks) * 250);
  const positionScore = total > 0 ? page1Share * 100 : null;
  const indexScore = indexShare === null ? null : indexShare * 100;
  const cwvScore = cwvGoodShare === null ? null : cwvGoodShare * 100;
  const components = [
    { label: "Non-branded clicks trend", score: trendScore, weight: 0.4 },
    { label: "Ranking (page-1 share)", score: positionScore, weight: 0.25 },
    { label: "Indexation coverage", score: indexScore, weight: 0.2 },
    { label: "Core Web Vitals", score: cwvScore, weight: 0.15 },
  ];
  const avail = components.filter((c) => c.score !== null);
  const weightSum = avail.reduce((a, c) => a + c.weight, 0) || 1;
  const score = Math.round(avail.reduce((a, c) => a + (c.score as number) * (c.weight / weightSum), 0));

  // ----- Status strip -----
  const searchStatus: SeoStatus = clicksDelta.trend === "down" ? "watch" : split.nonBranded.clicks > 0 ? "good" : "none";
  const rankStatus: SeoStatus = total === 0 ? "none" : page1Share >= 0.4 ? "good" : page1Share >= 0.15 ? "watch" : "critical";
  const statusStrip = [
    { label: "Search", status: searchStatus, hint: "non-branded clicks 28d" },
    { label: "Rankings", status: rankStatus, hint: `${striking.length} striking-distance` },
    { label: "Indexation", status: indexStatus, hint: inspected ? `${indexed}/${inspected} indexed` : "no data" },
    { label: "Core Web Vitals", status: cwvGoodShare === null ? "none" : scoreFromStatus((cwvGoodShare) * 100), hint: cwv.source },
  ];

  return {
    health: { score, status: scoreFromStatus(score), components },
    kpis,
    ranking: { buckets, total, page1Share, strikingCount: striking.length },
    cwv,
    indexation: { indexed, total: inspected, share: indexShare, status: indexStatus },
    statusStrip,
  };
}

function cwvMetric(label: string, value: string, status: SeoStatus): CwvMetric {
  return { key: label, label, value, status };
}

function statusOf(
  metric: "largest_contentful_paint" | "interaction_to_next_paint" | "cumulative_layout_shift",
  p75: number | null,
): SeoStatus {
  if (p75 === null) return "none";
  const b = bucketCwv(metric, p75);
  return b === "good" ? "good" : b === "ni" ? "watch" : b === "poor" ? "critical" : "none";
}
