import {
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  MousePointerClick,
  Percent,
  ArrowUpDown,
  Activity,
  AlertCircle,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";
import { extractP75 } from "@/lib/seo-dashboard/crux";
import type { Suggestion } from "@/lib/seo-dashboard/rules";

interface Props {
  snapshot: DashboardSnapshot;
}

/**
 * Overview tab — at-a-glance KPI tiles + suggestions. The single
 * highest-leverage view; shows whether the SEO needle is moving.
 */
export function OverviewTab({ snapshot }: Props) {
  const kpis = computeKpis(snapshot);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Headline metrics — last 28 days vs prior 28 days"
        subtitle="GSC search analytics rolled up; CrUX origin-level field data; cache stats below."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} kpi={k} />
        ))}
      </div>

      <SectionHeader
        title="Suggestions"
        subtitle={`${snapshot.suggestions.length} active — sorted by severity. Re-evaluated on every refresh.`}
      />
      {snapshot.suggestions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 pb-6 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No active suggestions. Either everything is healthy or the data
              has not populated yet &mdash; check again after the next scheduled
              cache refresh.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {snapshot.suggestions.map((s) => (
            <SuggestionRow key={s.id} suggestion={s} />
          ))}
        </div>
      )}

      {(snapshot.gsc28d.error || snapshot.cruxOriginMobile.error) && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Data source errors</p>
                {snapshot.gsc28d.error && (
                  <p className="text-muted-foreground">
                    GSC: <span className="font-mono text-xs">{snapshot.gsc28d.error}</span>
                  </p>
                )}
                {snapshot.cruxOriginMobile.error && (
                  <p className="text-muted-foreground">
                    CrUX: <span className="font-mono text-xs">{snapshot.cruxOriginMobile.error}</span>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// KPI computation
// ---------------------------------------------------------------------

interface Kpi {
  label: string;
  value: string;
  /** Delta sign — null when no prior data to compare. */
  trend: "up" | "down" | "flat" | null;
  /** Human-readable delta string, e.g. "+12.4%" or "+1.3pp". */
  delta: string | null;
  /** When true, "up" is good (impressions, clicks). When false, "up" is bad (position, CWV ms). */
  upIsGood: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

function computeKpis(snapshot: DashboardSnapshot): Kpi[] {
  const kpis: Kpi[] = [];

  // GSC headline rollups
  const cur = snapshot.gsc28d.result;
  const prev = snapshot.gscPrior28d.result;
  const sumImp = (rs?: { impressions: number }[] | null) =>
    rs ? rs.reduce((a, r) => a + r.impressions, 0) : 0;
  const sumClk = (rs?: { clicks: number }[] | null) =>
    rs ? rs.reduce((a, r) => a + r.clicks, 0) : 0;
  const wAvg = (
    rs: { impressions: number; ctr?: number; position?: number }[] | null | undefined,
    key: "ctr" | "position",
  ) => {
    if (!rs || rs.length === 0) return 0;
    const totalImp = rs.reduce((a, r) => a + r.impressions, 0);
    if (totalImp === 0) return 0;
    return rs.reduce((a, r) => a + (r[key] ?? 0) * r.impressions, 0) / totalImp;
  };

  kpis.push({
    label: "Impressions (28d)",
    value: cur ? formatInt(sumImp(cur.rows)) : "—",
    ...computeDelta(sumImp(cur?.rows), sumImp(prev?.rows), "count"),
    upIsGood: true,
    icon: Eye,
  });
  kpis.push({
    label: "Clicks (28d)",
    value: cur ? formatInt(sumClk(cur.rows)) : "—",
    ...computeDelta(sumClk(cur?.rows), sumClk(prev?.rows), "count"),
    upIsGood: true,
    icon: MousePointerClick,
  });
  kpis.push({
    label: "Avg CTR (28d)",
    value: cur ? `${(wAvg(cur.rows, "ctr") * 100).toFixed(2)}%` : "—",
    ...computeDelta(wAvg(cur?.rows, "ctr"), wAvg(prev?.rows, "ctr"), "pp"),
    upIsGood: true,
    icon: Percent,
  });
  kpis.push({
    label: "Avg Position (28d)",
    value: cur ? wAvg(cur.rows, "position").toFixed(1) : "—",
    // Position: lower = better, so upIsGood=false
    ...computeDelta(wAvg(cur?.rows, "position"), wAvg(prev?.rows, "position"), "abs"),
    upIsGood: false,
    icon: ArrowUpDown,
  });

  // CrUX origin-level CWV
  const crux = snapshot.cruxOriginMobile.result?.record;
  const lcp = extractP75(crux?.metrics.largest_contentful_paint);
  const inp = extractP75(crux?.metrics.interaction_to_next_paint);
  const cls = extractP75(crux?.metrics.cumulative_layout_shift);
  const ttfb = extractP75(crux?.metrics.experimental_time_to_first_byte);

  kpis.push({
    label: "LCP p75 mobile",
    value: lcp !== null ? `${(lcp / 1000).toFixed(2)}s` : "no data",
    trend: null,
    delta: null,
    upIsGood: false,
    icon: Activity,
  });
  kpis.push({
    label: "INP p75 mobile",
    value: inp !== null ? `${Math.round(inp)}ms` : "no data",
    trend: null,
    delta: null,
    upIsGood: false,
    icon: Activity,
  });
  kpis.push({
    label: "CLS p75 mobile",
    value: cls !== null ? cls.toFixed(3) : "no data",
    trend: null,
    delta: null,
    upIsGood: false,
    icon: Activity,
  });
  kpis.push({
    label: "TTFB p75 mobile",
    value: ttfb !== null ? `${Math.round(ttfb)}ms` : "no data",
    trend: null,
    delta: null,
    upIsGood: false,
    icon: Activity,
  });

  return kpis;
}

function computeDelta(
  cur: number | undefined,
  prev: number | undefined,
  format: "count" | "pp" | "abs",
): { trend: Kpi["trend"]; delta: string | null } {
  if (typeof cur !== "number" || typeof prev !== "number" || prev === 0) {
    return { trend: null, delta: null };
  }
  const diff = cur - prev;
  if (Math.abs(diff) < 0.0001) return { trend: "flat", delta: "0%" };
  const trend: "up" | "down" = diff > 0 ? "up" : "down";

  if (format === "pp") {
    return { trend, delta: `${diff >= 0 ? "+" : ""}${(diff * 100).toFixed(1)}pp` };
  }
  if (format === "abs") {
    return { trend, delta: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}` };
  }
  // count → relative %
  const pct = (diff / prev) * 100;
  return { trend, delta: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%` };
}

function formatInt(n: number): string {
  return n.toLocaleString("en-IN");
}

// ---------------------------------------------------------------------
// UI bits
// ---------------------------------------------------------------------

function KpiTile({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon;
  const trendColor =
    kpi.trend === "flat" || kpi.trend === null
      ? "text-muted-foreground"
      : (kpi.trend === "up") === kpi.upIsGood
        ? "text-emerald-600"
        : "text-rose-600";
  const TrendIcon =
    kpi.trend === "up"
      ? TrendingUp
      : kpi.trend === "down"
        ? TrendingDown
        : Minus;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {kpi.delta && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
              <TrendIcon className="h-3 w-3" />
              {kpi.delta}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold leading-none">{kpi.value}</div>
        <div className="text-xs text-muted-foreground mt-2">{kpi.label}</div>
      </CardContent>
    </Card>
  );
}

function SuggestionRow({ suggestion }: { suggestion: Suggestion }) {
  const palette =
    suggestion.severity === "critical"
      ? {
          bg: "bg-rose-50/60 border-rose-200",
          icon: AlertCircle,
          iconColor: "text-rose-600",
          label: "Critical",
          labelColor: "bg-rose-100 text-rose-800",
        }
      : suggestion.severity === "warn"
        ? {
            bg: "bg-amber-50/60 border-amber-200",
            icon: AlertTriangle,
            iconColor: "text-amber-600",
            label: "Warning",
            labelColor: "bg-amber-100 text-amber-800",
          }
        : {
            bg: "bg-blue-50/60 border-blue-200",
            icon: Info,
            iconColor: "text-blue-600",
            label: "Info",
            labelColor: "bg-blue-100 text-blue-800",
          };
  const Icon = palette.icon;

  return (
    <div className={`rounded-lg border ${palette.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${palette.iconColor} shrink-0 mt-0.5`} aria-hidden="true" />
        <div className="flex-grow space-y-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-semibold text-sm">{suggestion.title}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${palette.labelColor}`}
            >
              {palette.label}
            </span>
            {suggestion.workPlanRef && (
              <span className="text-xs text-muted-foreground">
                {suggestion.workPlanRef}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.detail}</p>
          {suggestion.affected && suggestion.affected.length > 0 && (
            <div>
              <p className="text-xs font-medium text-foreground mb-1">Affected:</p>
              <ul className="space-y-0.5 text-xs text-muted-foreground font-mono">
                {suggestion.affected.slice(0, 5).map((url) => (
                  <li key={url} className="truncate">
                    {url}
                  </li>
                ))}
                {suggestion.affected.length > 5 && (
                  <li className="italic">
                    …and {suggestion.affected.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}
          <div className="pt-2 border-t border-current/10">
            <p className="text-xs font-medium text-foreground">
              <span className="opacity-60">Action: </span>
              <span className="font-normal">{suggestion.action}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
