import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  AlertCircle,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";
import type { DailyRollup } from "@/lib/seo-dashboard/history";
import type { Suggestion } from "@/lib/seo-dashboard/rules";
import { buildOverview, type OverviewKpi, type OverviewModel } from "@/lib/seo-dashboard/overview";
import { STATUS_STYLES } from "@/lib/seo-dashboard/targets";
import { StatusDot, StatusBadge, Sparkline } from "./status";

interface Props {
  snapshot: DashboardSnapshot;
  history: DailyRollup[];
}

/**
 * Overview tab — executive scorecard. Answers "is SEO healthy and
 * trending right?" at a glance: health score, non-branded-first KPIs
 * with trend sparklines, ranking-bucket health, a Core Web Vitals
 * rollup (field → lab fallback), indexation coverage, and a status
 * strip into the detail tabs.
 */
export function OverviewTab({ snapshot, history }: Props) {
  const m = buildOverview(snapshot, history);

  return (
    <div className="space-y-8">
      {/* Health score + status strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <HealthCard health={m.health} />
        <StatusStrip strip={m.statusStrip} />
      </div>

      {/* KPI tiles — non-branded first, with sparklines */}
      <div>
        <SectionHeader
          title="Headline — last 28 days vs prior 28 days"
          subtitle="Non-branded = true organic discovery. Sparkline shows daily trajectory once the snapshot job has 2+ days."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {m.kpis.map((k) => (
            <KpiTile key={k.label} kpi={k} />
          ))}
        </div>
      </div>

      {/* Ranking health + CWV rollup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RankingCard ranking={m.ranking} />
        <CwvCard cwv={m.cwv} />
      </div>

      {/* Suggestions (top 5) */}
      <div>
        <SectionHeader
          title="Suggestions"
          subtitle={`${snapshot.suggestions.length} active — sorted by severity.`}
        />
        <div className="mt-4">
          {snapshot.suggestions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-6 flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No active suggestions — everything healthy, or data has not populated yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {snapshot.suggestions.slice(0, 5).map((s) => (
                <SuggestionRow key={s.id} suggestion={s} />
              ))}
              {snapshot.suggestions.length > 5 && (
                <p className="text-xs text-muted-foreground">
                  …and {snapshot.suggestions.length - 5} more.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

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
// Health score
// ---------------------------------------------------------------------

function HealthCard({ health }: { health: OverviewModel["health"] }) {
  const s = STATUS_STYLES[health.status];
  return (
    <Card className="lg:col-span-1">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">SEO health score</span>
          <StatusBadge status={health.status} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold leading-none">{health.score}</span>
          <span className="text-lg text-muted-foreground">/100</span>
        </div>
        <div className="mt-4 space-y-2">
          {health.components.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-44 shrink-0">{c.label}</span>
              <div className="h-1.5 flex-grow rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${c.score === null ? "bg-muted-foreground/20" : s.dot}`}
                  style={{ width: `${c.score ?? 0}%` }}
                />
              </div>
              <span className="text-xs tabular-nums w-8 text-right text-muted-foreground">
                {c.score === null ? "—" : Math.round(c.score)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusStrip({ strip }: { strip: OverviewModel["statusStrip"] }) {
  return (
    <Card className="lg:col-span-2">
      <CardContent className="pt-6 h-full">
        <span className="text-xs font-medium text-muted-foreground">At a glance</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          {strip.map((s) => (
            <div key={s.label} className="flex items-start gap-2">
              <StatusDot status={s.status} />
              <div>
                <div className="text-sm font-medium leading-tight">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------
// KPI tile
// ---------------------------------------------------------------------

function KpiTile({ kpi }: { kpi: OverviewKpi }) {
  const trendColor =
    kpi.trend === "flat" || kpi.trend === null
      ? "text-muted-foreground"
      : (kpi.trend === "up") === kpi.upIsGood
        ? "text-emerald-600"
        : "text-rose-600";
  const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          {kpi.delta ? (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
              <TrendIcon className="h-3 w-3" />
              {kpi.delta}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">vs prior 28d</span>
          )}
          <Sparkline values={kpi.series} width={64} height={20} lowerIsBetter={!kpi.upIsGood} />
        </div>
        <div className="text-2xl font-bold leading-none">{kpi.value}</div>
        <div className="text-xs font-medium mt-2">{kpi.label}</div>
        {kpi.sub && <div className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</div>}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------
// Ranking buckets
// ---------------------------------------------------------------------

function RankingCard({ ranking }: { ranking: OverviewModel["ranking"] }) {
  const max = Math.max(1, ...ranking.buckets.map((b) => b.count));
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-sm font-semibold">Ranking health</span>
          <span className="text-xs text-muted-foreground">
            {ranking.strikingCount} striking-distance · {(ranking.page1Share * 100).toFixed(0)}% page 1
          </span>
        </div>
        {ranking.total === 0 ? (
          <p className="text-sm text-muted-foreground">No query data yet.</p>
        ) : (
          <div className="space-y-2">
            {ranking.buckets.map((b) => (
              <div key={b.key} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-16 shrink-0">{b.label}</span>
                <div className="h-4 flex-grow rounded bg-muted overflow-hidden">
                  <div
                    className="h-full bg-emerald-500/70"
                    style={{ width: `${(b.count / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs tabular-nums w-8 text-right">{b.count}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Query position distribution (last 28d). Striking-distance = positions 4–15 with impressions.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------
// CWV rollup
// ---------------------------------------------------------------------

function CwvCard({ cwv }: { cwv: OverviewModel["cwv"] }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Core Web Vitals</span>
          <span className="text-xs text-muted-foreground ml-auto uppercase tracking-wide">
            {cwv.source === "field" ? "field" : cwv.source === "lab" ? "lab estimate" : "no data"}
          </span>
        </div>
        {cwv.metrics.length === 0 ? (
          <p className="text-sm text-muted-foreground">{cwv.note}</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {cwv.metrics.map((mt) => (
                <div key={mt.key} className="rounded-lg border p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <StatusDot status={mt.status} />
                    <span className="text-xs text-muted-foreground">{mt.label}</span>
                  </div>
                  <div className="text-lg font-bold">{mt.value}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">{cwv.note}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------
// Suggestions + headers
// ---------------------------------------------------------------------

function SuggestionRow({ suggestion }: { suggestion: Suggestion }) {
  const palette =
    suggestion.severity === "critical"
      ? { bg: "bg-rose-50/60 border-rose-200", icon: AlertCircle, iconColor: "text-rose-600", label: "Critical", labelColor: "bg-rose-100 text-rose-800" }
      : suggestion.severity === "warn"
        ? { bg: "bg-amber-50/60 border-amber-200", icon: AlertTriangle, iconColor: "text-amber-600", label: "Warning", labelColor: "bg-amber-100 text-amber-800" }
        : { bg: "bg-blue-50/60 border-blue-200", icon: Info, iconColor: "text-blue-600", label: "Info", labelColor: "bg-blue-100 text-blue-800" };
  const Icon = palette.icon;
  return (
    <div className={`rounded-lg border ${palette.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${palette.iconColor} shrink-0 mt-0.5`} aria-hidden="true" />
        <div className="flex-grow space-y-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-semibold text-sm">{suggestion.title}</h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${palette.labelColor}`}>
              {palette.label}
            </span>
            {suggestion.workPlanRef && (
              <span className="text-xs text-muted-foreground">{suggestion.workPlanRef}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.detail}</p>
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
