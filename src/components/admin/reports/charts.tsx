/**
 * Chart primitives for the reports.
 *
 * Hand-drawn SVG, no charting library. The spec allows adding one; the project
 * has none, already draws its SEO sparklines this way (see
 * admin/seo/_components/cwv-tab.tsx), and every chart these reports need is a
 * bar or a line. Recharts is ~100KB of JavaScript and would have to be a
 * client component; these are server-rendered and ship no JS at all.
 *
 * All three are deliberately plain. A report is read to make a decision, and
 * gradients and animations do not help anyone make one.
 */

import { conversionRate, type DistributionRow } from "@/lib/reports/metrics";

const EMPTY = (
  <p className="py-8 text-center text-sm text-muted-foreground">
    Nothing in this period.
  </p>
);

export function ChartCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {hint && <p className="mb-3 text-xs text-muted-foreground">{hint}</p>}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

/**
 * Horizontal bars with the count and share beside each label.
 *
 * Horizontal rather than vertical because the labels are course names and
 * sources — long text that a vertical axis would either truncate or rotate.
 */
export function BarList({
  rows,
  max,
}: {
  rows: ReadonlyArray<DistributionRow<string>>;
  /** Override the scale, e.g. to compare two lists side by side. */
  max?: number;
}) {
  if (rows.length === 0) return EMPTY;
  const scale = max ?? Math.max(...rows.map((r) => r.count), 1);

  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate" title={row.label}>
              {row.label}
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {row.count}
              <span className="ml-1">({row.percentage}%)</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max((row.count / scale) * 100, row.count > 0 ? 2 : 0)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * A daily line, with the axis labelled at both ends and the peak marked.
 *
 * Zero days are drawn as zero rather than skipped — a line that jumps a quiet
 * week draws a straight slope across it and makes it look like steady trade.
 */
export function DailyLine({
  series,
  label = "enquiries",
}: {
  series: ReadonlyArray<{ date: string; count: number }>;
  label?: string;
}) {
  if (series.length === 0) return EMPTY;

  const width = 600;
  const height = 140;
  const pad = { top: 8, right: 8, bottom: 18, left: 8 };
  const max = Math.max(...series.map((p) => p.count), 1);
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const step = series.length > 1 ? innerW / (series.length - 1) : 0;

  const points = series.map((point, i) => ({
    ...point,
    x: pad.left + i * step,
    y: pad.top + innerH - (point.count / max) * innerH,
  }));

  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${pad.left},${pad.top + innerH} ${line} ${(pad.left + (series.length - 1) * step).toFixed(1)},${pad.top + innerH}`;
  const total = series.reduce((sum, p) => sum + p.count, 0);
  const peak = points.reduce((best, p) => (p.count > best.count ? p : best), points[0]);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-36 w-full"
        role="img"
        aria-label={`${total} ${label} between ${series[0].date} and ${series[series.length - 1].date}, peaking at ${peak.count} on ${peak.date}`}
      >
        <polygon points={area} className="fill-primary/10" />
        <polyline
          points={line}
          fill="none"
          strokeWidth="2"
          className="stroke-primary"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {peak.count > 0 && (
          <circle cx={peak.x} cy={peak.y} r="3" className="fill-primary" />
        )}
        <text x={pad.left} y={height - 4} className="fill-muted-foreground text-[10px]">
          {series[0].date}
        </text>
        <text
          x={width - pad.right}
          y={height - 4}
          textAnchor="end"
          className="fill-muted-foreground text-[10px]"
        >
          {series[series.length - 1].date}
        </text>
      </svg>
      <figcaption className="mt-1 text-xs text-muted-foreground">
        {total} {label} · peak {peak.count} on {peak.date}
      </figcaption>
    </figure>
  );
}

/**
 * Enquiries and admissions per day, with the cohort conversion rate.
 *
 * Two bars per day rather than a rate line: a rate on a day with two enquiries
 * swings between 0% and 100% and tells you nothing, while the raw pair shows
 * how much weight is behind it.
 */
export function ConversionTrend({
  series,
}: {
  series: ReadonlyArray<{
    date: string;
    enquiries: number;
    admissions: number;
    rate: number;
  }>;
}) {
  if (series.length === 0) return EMPTY;

  const totalEnquiries = series.reduce((s, p) => s + p.enquiries, 0);
  const totalAdmissions = series.reduce((s, p) => s + p.admissions, 0);
  const max = Math.max(...series.map((p) => p.enquiries), 1);
  const width = 600;
  const height = 140;
  const pad = { top: 8, bottom: 18 };
  const innerH = height - pad.top - pad.bottom;
  const slot = width / series.length;
  const barW = Math.max(Math.min(slot * 0.7, 14), 1);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-36 w-full"
        role="img"
        aria-label={`${totalAdmissions} admissions from ${totalEnquiries} enquiries, ${conversionRate(totalAdmissions, totalEnquiries)}%`}
      >
        {series.map((point, i) => {
          const x = i * slot + (slot - barW) / 2;
          const h = (point.enquiries / max) * innerH;
          const hAdm = (point.admissions / max) * innerH;
          return (
            <g key={point.date}>
              <rect
                x={x}
                y={pad.top + innerH - h}
                width={barW}
                height={h}
                className="fill-muted-foreground/25"
              />
              <rect
                x={x}
                y={pad.top + innerH - hAdm}
                width={barW}
                height={hAdm}
                className="fill-primary"
              />
            </g>
          );
        })}
        <text x={0} y={height - 4} className="fill-muted-foreground text-[10px]">
          {series[0].date}
        </text>
        <text
          x={width}
          y={height - 4}
          textAnchor="end"
          className="fill-muted-foreground text-[10px]"
        >
          {series[series.length - 1].date}
        </text>
      </svg>
      <figcaption className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-muted-foreground/25" />
          {totalEnquiries} enquiries
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-primary inline-block h-2 w-2 rounded-sm" />
          {totalAdmissions} converted
        </span>
        <span>{conversionRate(totalAdmissions, totalEnquiries)}% overall</span>
      </figcaption>
    </figure>
  );
}
