import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, ArrowUpDown, MousePointerClick, Layers } from "lucide-react";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";
import {
  strikingDistance,
  ctrGap,
  movers,
  brandedSplit,
  segmentRollup,
} from "@/lib/seo-dashboard/analytics";
import { PAGE_TYPE_LABELS, positionStatus, ctrGapStatus } from "@/lib/seo-dashboard/targets";
import { StatusDot } from "./status";

interface Props {
  snapshot: DashboardSnapshot;
}

/**
 * Rankings tab — the ranking-point-of-view view: branded split,
 * striking-distance opportunities, period movers, CTR gaps, and a
 * per-segment scorecard. All computed from the current GSC snapshot.
 */
export function RankingsTab({ snapshot }: Props) {
  const queries = snapshot.gscQueries28d.result?.rows ?? [];
  const priorQueries = snapshot.gscQueriesPrior28d.result?.rows ?? [];
  const pages = snapshot.gscPages28d.result?.rows ?? [];

  const split = brandedSplit(queries);
  const striking = strikingDistance(queries).slice(0, 25);
  const gaps = ctrGap(queries).slice(0, 25);
  const mv = movers(queries, priorQueries);
  const segments = segmentRollup(pages);

  if (snapshot.gscQueries28d.error) {
    return (
      <Card className="border-rose-200 bg-rose-50/40">
        <CardContent className="pt-6">
          <p className="text-sm font-semibold text-rose-900 mb-1">GSC data unavailable</p>
          <p className="text-xs font-mono text-rose-800">{snapshot.gscQueries28d.error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Branded vs non-branded summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryTile
          label="Non-branded clicks (28d)"
          value={split.nonBranded.clicks.toLocaleString("en-IN")}
          sub="true organic discovery"
        />
        <SummaryTile
          label="Non-branded impressions"
          value={split.nonBranded.impressions.toLocaleString("en-IN")}
          sub={`${(split.nonBrandedImpressionShare * 100).toFixed(0)}% of all impressions`}
        />
        <SummaryTile
          label="Branded clicks (28d)"
          value={split.branded.clicks.toLocaleString("en-IN")}
          sub="would arrive regardless"
        />
        <SummaryTile
          label="Non-branded avg position"
          value={split.nonBranded.position > 0 ? split.nonBranded.position.toFixed(1) : "—"}
          sub="impression-weighted"
        />
      </div>

      <Tabs defaultValue="striking">
        <TabsList className="flex-wrap">
          <TabsTrigger value="striking">
            <Target className="h-4 w-4 mr-2" />
            Striking Distance ({striking.length})
          </TabsTrigger>
          <TabsTrigger value="movers">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Movers ({mv.gainers.length + mv.losers.length})
          </TabsTrigger>
          <TabsTrigger value="ctr">
            <MousePointerClick className="h-4 w-4 mr-2" />
            CTR Gaps ({gaps.length})
          </TabsTrigger>
          <TabsTrigger value="segments">
            <Layers className="h-4 w-4 mr-2" />
            Segments
          </TabsTrigger>
        </TabsList>

        {/* Striking distance */}
        <TabsContent value="striking" className="mt-6 space-y-4">
          <Hint>
            Queries ranking <strong>positions 4–15 with ≥30 impressions</strong> — the
            highest-ROI ranking targets. Sorted by <em>opportunity</em> (impressions ×
            un-clicked share). Small content / internal-link tweaks push these onto page 1.
          </Hint>
          {striking.length === 0 ? (
            <Empty msg="No striking-distance queries right now." />
          ) : (
            <OppTable
              rows={striking.map((r) => ({
                key: r.key,
                position: r.position,
                impressions: r.impressions,
                ctr: r.ctr,
                metric: Math.round(r.opportunity).toLocaleString("en-IN"),
              }))}
              metricLabel="Opportunity"
            />
          )}
        </TabsContent>

        {/* Movers */}
        <TabsContent value="movers" className="mt-6 space-y-6">
          <Hint>
            Biggest position changes vs the prior 28-day window (queries present in both).
            Once the daily snapshot job has run for a few days, week-over-week movers become
            available in the Trends tab too.
          </Hint>
          <div>
            <h4 className="text-sm font-semibold mb-2 text-emerald-700">Gainers</h4>
            {mv.gainers.length === 0 ? (
              <Empty msg="No significant gainers this period." />
            ) : (
              <MoverTable rows={mv.gainers.slice(0, 15)} />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2 text-rose-700">Losers</h4>
            {mv.losers.length === 0 ? (
              <Empty msg="No significant losers this period." />
            ) : (
              <MoverTable rows={mv.losers.slice(0, 15)} />
            )}
          </div>
        </TabsContent>

        {/* CTR gaps */}
        <TabsContent value="ctr" className="mt-6 space-y-4">
          <Hint>
            Queries earning <strong>fewer clicks than their position predicts</strong> — i.e.
            title/meta-description rewrite candidates. <em>Missed clicks</em> ≈ recoverable
            clicks/28d by closing the gap to the expected CTR curve.
          </Hint>
          {gaps.length === 0 ? (
            <Empty msg="No material CTR gaps — titles/metas are earning their position." />
          ) : (
            <div className="overflow-x-auto rounded-lg border bg-background">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-3 font-semibold">Query</th>
                    <th className="text-right p-3 font-semibold w-20">Pos</th>
                    <th className="text-right p-3 font-semibold w-24">Impr.</th>
                    <th className="text-right p-3 font-semibold w-20">Actual</th>
                    <th className="text-right p-3 font-semibold w-20">Expected</th>
                    <th className="text-right p-3 font-semibold w-24">Missed</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((r, i) => (
                    <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <StatusDot status={ctrGapStatus(r.gap)} />
                          <span className="truncate max-w-xs" title={r.key}>{r.key}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right text-muted-foreground">{r.position.toFixed(1)}</td>
                      <td className="p-3 text-right text-muted-foreground">{r.impressions.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-right">{(r.actualCtr * 100).toFixed(1)}%</td>
                      <td className="p-3 text-right text-muted-foreground">{(r.expectedCtr * 100).toFixed(1)}%</td>
                      <td className="p-3 text-right font-medium">{Math.round(r.missedClicks).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Segments */}
        <TabsContent value="segments" className="mt-6 space-y-4">
          <Hint>
            Performance by <strong>page type</strong> — confirms whether your programmatic
            course×location pages and category hubs are actually pulling ranking weight.
          </Hint>
          {segments.length === 0 ? (
            <Empty msg="No page data yet." />
          ) : (
            <div className="overflow-x-auto rounded-lg border bg-background">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-3 font-semibold">Segment</th>
                    <th className="text-right p-3 font-semibold w-16">Pages</th>
                    <th className="text-right p-3 font-semibold w-24">Clicks</th>
                    <th className="text-right p-3 font-semibold w-28">Impressions</th>
                    <th className="text-right p-3 font-semibold w-20">CTR</th>
                    <th className="text-right p-3 font-semibold w-24">Avg Pos</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.map((s) => (
                    <tr key={s.pageType} className="border-b last:border-b-0 hover:bg-muted/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <StatusDot status={positionStatus(s.position)} />
                          {PAGE_TYPE_LABELS[s.pageType]}
                        </div>
                      </td>
                      <td className="p-3 text-right text-muted-foreground">{s.pages}</td>
                      <td className="p-3 text-right font-medium">{s.clicks.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-right text-muted-foreground">{s.impressions.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-right text-muted-foreground">{(s.ctr * 100).toFixed(1)}%</td>
                      <td className="p-3 text-right">{s.position > 0 ? s.position.toFixed(1) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------

function SummaryTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="text-xs font-medium mt-2">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
      </CardContent>
    </Card>
  );
}

function OppTable({
  rows,
  metricLabel,
}: {
  rows: { key: string; position: number; impressions: number; ctr: number; metric: string }[];
  metricLabel: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left p-3 font-semibold">Query</th>
            <th className="text-right p-3 font-semibold w-24">Position</th>
            <th className="text-right p-3 font-semibold w-28">Impressions</th>
            <th className="text-right p-3 font-semibold w-20">CTR</th>
            <th className="text-right p-3 font-semibold w-28">{metricLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <StatusDot status={positionStatus(r.position)} />
                  <span className="truncate max-w-md" title={r.key}>{r.key}</span>
                </div>
              </td>
              <td className="p-3 text-right">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                  {r.position.toFixed(1)}
                </span>
              </td>
              <td className="p-3 text-right text-muted-foreground">{r.impressions.toLocaleString("en-IN")}</td>
              <td className="p-3 text-right text-muted-foreground">{(r.ctr * 100).toFixed(1)}%</td>
              <td className="p-3 text-right font-medium">{r.metric}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MoverTable({
  rows,
}: {
  rows: { key: string; position: number; priorPosition: number; delta: number; impressions: number }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left p-3 font-semibold">Query</th>
            <th className="text-right p-3 font-semibold w-24">Was</th>
            <th className="text-right p-3 font-semibold w-24">Now</th>
            <th className="text-right p-3 font-semibold w-24">Δ</th>
            <th className="text-right p-3 font-semibold w-28">Impressions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const up = r.delta > 0;
            return (
              <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="p-3 truncate max-w-md" title={r.key}>{r.key}</td>
                <td className="p-3 text-right text-muted-foreground">{r.priorPosition.toFixed(1)}</td>
                <td className="p-3 text-right">{r.position.toFixed(1)}</td>
                <td className={`p-3 text-right font-semibold ${up ? "text-emerald-600" : "text-rose-600"}`}>
                  {up ? "▲" : "▼"} {Math.abs(r.delta).toFixed(1)}
                </td>
                <td className="p-3 text-right text-muted-foreground">{r.impressions.toLocaleString("en-IN")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-blue-50/40 border-blue-200">
      <CardContent className="pt-4 pb-4">
        <p className="text-sm leading-relaxed">{children}</p>
      </CardContent>
    </Card>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <Card>
      <CardContent className="pt-10 pb-10 text-center">
        <p className="text-sm text-muted-foreground">{msg}</p>
      </CardContent>
    </Card>
  );
}
