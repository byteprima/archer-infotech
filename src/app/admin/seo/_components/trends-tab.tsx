import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CalendarClock } from "lucide-react";
import type { DailyRollup, KeywordSeries } from "@/lib/seo-dashboard/history";
import type { GeoGridResult, GeoGridStatus } from "@/lib/seo-dashboard/geo-grid";
import { POSITION_BUCKETS, positionStatus } from "@/lib/seo-dashboard/targets";
import { StatusDot, Sparkline } from "./status";

interface Props {
  history: DailyRollup[];
  keywords: KeywordSeries[];
  geo: GeoGridStatus;
  /** Latest collected grid, or null before the first monthly run. */
  grid: GeoGridResult[] | null;
}

/**
 * Trends tab — the time-series view, fed by the daily snapshot job
 * (POST /api/seo/snapshot). Shows ranking/traffic trajectory rather
 * than a single snapshot. Empty until the cron has run a few days.
 */
export function TrendsTab({ history, keywords, geo, grid }: Props) {
  const hasHistory = history.length >= 2;
  const nbClicks = history.map((d) => d.nonBranded.clicks);
  const nbImpr = history.map((d) => d.nonBranded.impressions);
  const avgPos = history.map((d) => d.totals.position);
  const latest = history[history.length - 1];

  return (
    <div className="space-y-8">
      {!hasHistory && (
        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="pt-5 pb-5 flex items-start gap-3">
            <CalendarClock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold">Trend history is still collecting.</p>
              <p className="text-muted-foreground">
                Trends need the daily snapshot job to run. It captures one data point per day via{" "}
                <code className="text-xs">POST /api/seo/snapshot</code> (Coolify scheduled task).
                {history.length === 1
                  ? " 1 day captured so far — sparklines appear once there are 2+."
                  : " No days captured yet."}{" "}
                The keyword tracker and geo-grid plan below are ready now.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasHistory && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Trajectory</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {history.length} days captured · latest {latest.date}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TrendCard
              label="Non-branded clicks"
              value={latest.nonBranded.clicks.toLocaleString("en-IN")}
              values={nbClicks}
            />
            <TrendCard
              label="Non-branded impressions"
              value={latest.nonBranded.impressions.toLocaleString("en-IN")}
              values={nbImpr}
            />
            <TrendCard
              label="Avg position"
              value={latest.totals.position > 0 ? latest.totals.position.toFixed(1) : "—"}
              values={avgPos}
              lowerIsBetter
            />
          </div>

          {/* Position distribution (latest) */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Position distribution (latest day)</h3>
            <div className="grid grid-cols-5 gap-2">
              {POSITION_BUCKETS.map((b) => (
                <Card key={b.key}>
                  <CardContent className="pt-4 pb-4 text-center">
                    <div className="text-xl font-bold">{latest.positionDist[b.key] ?? 0}</div>
                    <div className="text-xs text-muted-foreground mt-1">{b.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyword tracker */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Target keyword tracker</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The fixed money-keyword set, position via GSC (property average). Sparkline = position
          over time (up = improving). Position 0 / “—” = not ranking / below GSC’s reporting floor.
        </p>
        <div className="overflow-x-auto rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold">Keyword</th>
                <th className="text-right p-3 font-semibold w-24">Position</th>
                <th className="text-right p-3 font-semibold w-24">Impr.</th>
                <th className="text-right p-3 font-semibold w-20">Clicks</th>
                <th className="text-center p-3 font-semibold w-28">Trend</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k) => {
                const pos = k.latest?.position ?? 0;
                return (
                  <tr key={k.keyword} className="border-b last:border-b-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <StatusDot status={positionStatus(pos > 0 ? pos : null)} />
                        <div>
                          <div>{k.keyword}</div>
                          {k.page && (
                            <div className="font-mono text-xs text-muted-foreground truncate max-w-xs">
                              {k.page}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right font-medium">{pos > 0 ? pos.toFixed(1) : "—"}</td>
                    <td className="p-3 text-right text-muted-foreground">
                      {(k.latest?.impressions ?? 0).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 text-right text-muted-foreground">{k.latest?.clicks ?? 0}</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <Sparkline values={k.series.map((s) => s.position)} lowerIsBetter />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geo-grid (map pack) */}
      <div>
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Local map-pack geo-grid
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          For a Pune institute, map-pack rank often outweighs the blue-link average GSC reports.
        </p>
        {grid && grid.length > 0 ? (
          <GeoGridView grid={grid} geo={geo} />
        ) : (
          <Card className={geo.enabled ? "" : "border-amber-200 bg-amber-50/40"}>
            <CardContent className="pt-5 pb-5">
              <div className="space-y-3 text-sm">
                <p className="font-medium">
                  {geo.enabled
                    ? "Connected — no grid collected yet. The monthly check is posted on the next run of POST /api/seo/dataforseo and lands on the run after."
                    : "Not enabled yet."}
                </p>
                {geo.reason && <p className="text-muted-foreground">{geo.reason}</p>}
                <div>
                  <p className="text-xs font-semibold mb-1">Grid (Pune area):</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {geo.plannedGrid.map((g) => (
                      <li key={g.center}>
                        {g.center} — {g.points} points, {g.radiusKm} km radius
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Keywords:</p>
                  <p className="text-xs text-muted-foreground">{geo.plannedKeywords.join(" · ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function TrendCard({
  label,
  value,
  values,
  lowerIsBetter = false,
}: {
  label: string;
  value: string;
  values: number[];
  lowerIsBetter?: boolean;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold leading-none">{value}</div>
            <div className="text-xs text-muted-foreground mt-2">{label}</div>
          </div>
          <Sparkline values={values} width={110} height={32} lowerIsBetter={lowerIsBetter} />
        </div>
      </CardContent>
    </Card>
  );
}

/** Colour for a Maps rank: top 3 = in the pack. */
function rankClass(rank: number | null): string {
  if (rank === null) return "bg-muted text-muted-foreground";
  if (rank <= 3) return "bg-emerald-500 text-white";
  if (rank <= 10) return "bg-amber-400 text-amber-950";
  return "bg-rose-200 text-rose-900";
}

/**
 * One 3×3 heat grid per centre for each keyword (north at the top),
 * with share of local voice = grid points where we're in the top 3.
 */
function GeoGridView({ grid, geo }: { grid: GeoGridResult[]; geo: GeoGridStatus }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Checked {grid[0].capturedAt}. Number = our Google Maps rank at that point; “–” = not in the
        listings. Green = in the map pack (top 3), amber = 4–10, red = 11+.
      </p>
      {grid.map((g) => (
        <Card key={g.keyword}>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-baseline justify-between mb-3">
              <p className="font-medium">{g.keyword}</p>
              <p className="text-sm">
                Share of local voice:{" "}
                <span className="font-semibold">{(g.shareOfLocalVoice * 100).toFixed(0)}%</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {geo.plannedGrid.map((c) => {
                const pts = Array.from({ length: 9 }, (_, i) =>
                  g.points.find((p) => p.location === `${c.center}#${i}`),
                );
                return (
                  <div key={c.center}>
                    <p className="text-xs text-muted-foreground mb-1">{c.center}</p>
                    <div className="grid grid-cols-3 gap-1 w-fit">
                      {pts.map((p, i) => (
                        <div
                          key={i}
                          className={`h-9 w-9 rounded text-xs font-semibold flex items-center justify-center ${rankClass(p?.rank ?? null)} ${i === 4 ? "ring-2 ring-foreground/40" : ""}`}
                          title={p ? `${p.location} (${p.lat}, ${p.lng})` : "not checked"}
                        >
                          {p?.rank ?? "–"}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
