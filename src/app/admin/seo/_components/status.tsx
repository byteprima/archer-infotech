/**
 * Shared status primitives — the one good/watch/critical visual
 * vocabulary used across every ranking panel (standardisation #4).
 */
import { STATUS_STYLES, type SeoStatus } from "@/lib/seo-dashboard/targets";

export function StatusDot({ status }: { status: SeoStatus }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_STYLES[status].dot}`}
      aria-label={STATUS_STYLES[status].label}
    />
  );
}

export function StatusBadge({ status }: { status: SeoStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${s.badge}`}>
      {s.label}
    </span>
  );
}

/** Tiny inline SVG sparkline. values low→high; lowerIsBetter inverts. */
export function Sparkline({
  values,
  width = 96,
  height = 24,
  lowerIsBetter = false,
}: {
  values: number[];
  width?: number;
  height?: number;
  lowerIsBetter?: boolean;
}) {
  const pts = values.filter((v) => Number.isFinite(v) && v > 0);
  if (pts.length < 2) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = max - min || 1;
  const stepX = width / (pts.length - 1);
  const norm = (v: number) => {
    const t = (v - min) / span; // 0..1
    const y = lowerIsBetter ? t : 1 - t; // lowerIsBetter: small value = top
    return y * (height - 4) + 2;
  };
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${norm(v).toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const first = pts[0];
  const improved = lowerIsBetter ? last < first : last > first;
  const stroke = improved ? "#059669" : last === first ? "#64748b" : "#e11d48";
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={d} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
