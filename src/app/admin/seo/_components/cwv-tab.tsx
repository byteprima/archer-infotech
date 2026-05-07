import { Card, CardContent } from "@/components/ui/card";
import { priorityUrlFull } from "@/lib/seo-dashboard/priority-urls";
import { extractP75, bucketCwv, type CruxMetric } from "@/lib/seo-dashboard/crux";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";

interface Props {
  snapshot: DashboardSnapshot;
}

/**
 * Core Web Vitals tab — combines lab data (PSI) and field data (CrUX)
 * for the priority URL set. Field data is the actual ranking signal;
 * lab data is the diagnostic check.
 *
 * Origin-level CrUX history sparklines at the top show the 25-week
 * trend for the site as a whole. Per-URL table shows lab + field
 * side-by-side so you can spot the cases where lab passes but field
 * fails (mid-range mobile users in India often see worse than the
 * lab number suggests).
 */
export function CwvTab({ snapshot }: Props) {
  const originRecord = snapshot.cruxOriginMobile.result?.record;
  const historyRecord = snapshot.cruxOriginHistory.result?.record;

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50/40 border-blue-200">
        <CardContent className="pt-4 pb-4 text-sm">
          <strong>Lab vs Field:</strong> Lab data (PSI) is a synthetic
          Lighthouse run from a Google datacentre. Field data (CrUX) is
          the 75th-percentile experience of real Chrome users over the
          last 28 days. Field is what Google uses for ranking signals —
          when lab and field disagree, trust field.
        </CardContent>
      </Card>

      {/* Origin-level summary + 25-week sparkline trend */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Origin-level (mobile, all real users)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(
            [
              ["LCP", "largest_contentful_paint"],
              ["INP", "interaction_to_next_paint"],
              ["CLS", "cumulative_layout_shift"],
              ["TTFB", "experimental_time_to_first_byte"],
            ] as const
          ).map(([label, key]) => {
            const p75 = extractP75(originRecord?.metrics[key]);
            const bucket = bucketCwv(key, p75);
            const series = extractSparkline(historyRecord, key);
            return (
              <Card key={key}>
                <CardContent className="pt-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <BucketBadge bucket={bucket} />
                  </div>
                  <div className="text-2xl font-bold">
                    {formatMetric(key, p75)}
                  </div>
                  {series.length >= 3 && (
                    <div className="mt-3">
                      <Sparkline values={series} metric={key} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Per-URL table — combines field (CrUX URL-level) + lab (PSI) */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Per-URL — priority pages
        </h3>
        <div className="overflow-x-auto rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold w-72">URL</th>
                <th className="text-center p-3 font-semibold" colSpan={4}>
                  Field (CrUX, mobile p75)
                </th>
                <th className="text-center p-3 font-semibold" colSpan={3}>
                  Lab (PSI, mobile)
                </th>
              </tr>
              <tr className="border-t bg-muted/30">
                <th />
                <th className="text-center p-2 text-xs font-medium">LCP</th>
                <th className="text-center p-2 text-xs font-medium">INP</th>
                <th className="text-center p-2 text-xs font-medium">CLS</th>
                <th className="text-center p-2 text-xs font-medium">TTFB</th>
                <th className="text-center p-2 text-xs font-medium">Perf</th>
                <th className="text-center p-2 text-xs font-medium">LCP</th>
                <th className="text-center p-2 text-xs font-medium">CLS</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.priorityUrls.map((p) => {
                const fullUrl = priorityUrlFull(p);
                const fieldEntry = snapshot.cruxByUrl.get(fullUrl);
                const fieldRecord = fieldEntry?.result?.record;
                const noField = fieldEntry?.result?.noData ?? false;

                const labEntry = snapshot.psiByUrl.get(fullUrl);
                const labMobile = labEntry?.mobile;

                return (
                  <tr key={fullUrl} className="border-b last:border-b-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="font-medium leading-tight">{p.label}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate max-w-md mt-0.5" title={p.path}>
                        {p.path}
                      </div>
                    </td>
                    {(["largest_contentful_paint", "interaction_to_next_paint", "cumulative_layout_shift", "experimental_time_to_first_byte"] as const).map(
                      (k) => {
                        if (noField) {
                          return (
                            <td key={k} className="p-2 text-center text-xs text-muted-foreground">
                              no data
                            </td>
                          );
                        }
                        const p75 = extractP75(fieldRecord?.metrics[k]);
                        const bucket = bucketCwv(k, p75);
                        return (
                          <td key={k} className="p-2 text-center">
                            <FieldCell value={formatMetric(k, p75)} bucket={bucket} />
                          </td>
                        );
                      },
                    )}
                    <td className="p-2 text-center">
                      <PerfScore score={labMobile?.scores.performance} />
                    </td>
                    <td className="p-2 text-center text-xs">
                      {labMobile?.metrics.lcp != null
                        ? `${(labMobile.metrics.lcp / 1000).toFixed(1)}s`
                        : "—"}
                    </td>
                    <td className="p-2 text-center text-xs">
                      {labMobile?.metrics.cls != null
                        ? labMobile.metrics.cls.toFixed(3)
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {snapshot.cruxOriginMobile.result?.noData && (
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="pt-4 pb-4 text-sm">
            <strong>CrUX field data not yet populated.</strong> CrUX needs
            ~1,000+ real Chrome user samples in 28 days before it
            publishes data. Per memory, the field-data baseline was
            empty as of 2026-05-07 — expect populate in 4-8 weeks of
            steady traffic. Until then, lab data (PSI) is your only CWV
            signal.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Sparkline + bucket helpers
// ---------------------------------------------------------------------

function extractSparkline(
  history: { metrics?: Partial<Record<CruxMetric, { percentilesTimeseries?: { p75s?: (number | string | null)[] } }>> } | undefined,
  metric: CruxMetric,
): number[] {
  const series = history?.metrics?.[metric]?.percentilesTimeseries?.p75s;
  if (!series) return [];
  return series
    .map((v) => (typeof v === "number" ? v : v == null ? NaN : parseFloat(v)))
    .filter((v) => Number.isFinite(v));
}

function Sparkline({ values, metric }: { values: number[]; metric: CruxMetric }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 24;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  // Lower = better for LCP/INP/CLS/TTFB; but we want a flat-line
  // visual. Colour by current bucket.
  const last = values[values.length - 1];
  const bucket = bucketCwv(metric, last);
  const stroke =
    bucket === "good"
      ? "rgb(5, 150, 105)" // emerald-600
      : bucket === "ni"
        ? "rgb(217, 119, 6)" // amber-600
        : bucket === "poor"
          ? "rgb(225, 29, 72)" // rose-600
          : "rgb(100, 116, 139)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-6" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

function BucketBadge({ bucket }: { bucket: "good" | "ni" | "poor" | "no-data" }) {
  if (bucket === "no-data") {
    return (
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        no data
      </span>
    );
  }
  const palette = {
    good: "bg-emerald-100 text-emerald-800",
    ni: "bg-amber-100 text-amber-800",
    poor: "bg-rose-100 text-rose-800",
  }[bucket];
  const label = { good: "Good", ni: "Needs work", poor: "Poor" }[bucket];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${palette}`}>
      {label}
    </span>
  );
}

function FieldCell({
  value,
  bucket,
}: {
  value: string;
  bucket: "good" | "ni" | "poor" | "no-data";
}) {
  const palette = {
    good: "text-emerald-700",
    ni: "text-amber-700",
    poor: "text-rose-700 font-semibold",
    "no-data": "text-muted-foreground",
  }[bucket];
  return <span className={`text-xs ${palette}`}>{value}</span>;
}

function PerfScore({ score }: { score?: number | null }) {
  if (score == null) return <span className="text-xs text-muted-foreground">—</span>;
  const pct = Math.round(score * 100);
  const palette =
    pct >= 90 ? "text-emerald-700 font-semibold" : pct >= 50 ? "text-amber-700" : "text-rose-700 font-semibold";
  return <span className={`text-xs ${palette}`}>{pct}</span>;
}

function formatMetric(key: CruxMetric, p75: number | null): string {
  if (p75 === null) return "—";
  switch (key) {
    case "largest_contentful_paint":
    case "first_contentful_paint":
    case "experimental_time_to_first_byte":
      return p75 < 1000 ? `${Math.round(p75)}ms` : `${(p75 / 1000).toFixed(2)}s`;
    case "interaction_to_next_paint":
      return `${Math.round(p75)}ms`;
    case "cumulative_layout_shift":
      return p75.toFixed(3);
    default:
      return String(p75);
  }
}
