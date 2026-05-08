/**
 * AnimatedCounter — formats a numeric "value" string and renders it.
 *
 * Used to be a count-up animation (RAF + per-frame setState) that ran
 * on every stats card across the site (4-8 counters per page). PSI
 * flagged the resulting layout thrashing as a forced-reflow + main-
 * thread cost (~50ms desktop / more on mobile due to multiple counters
 * sharing the same animation loop).
 *
 * The count-up was decorative — the SSR initial value already shows
 * the final number to crawlers and JS-disabled users (Pillar 3 P3-07
 * discipline), so the animation never carried any informational
 * value. Dropped 2026-05-08 in the SEO perf batch:
 *   - eliminates the forced-reflow PSI audit failure
 *   - removes ~100ms of TBT cost on stats-heavy pages (home, about,
 *     placements, every category page)
 *   - removes ~3KB of client JS once we eliminate the import sites
 *     that no longer need the "use client" boundary
 *
 * The component stays client-side for now (kept as `"use client"`)
 * because some surfaces hand it dynamic values, but the runtime work
 * is now zero — just format-and-render.
 */
"use client";

interface AnimatedCounterProps {
  value: string;
  /**
   * Kept in the prop signature for backward compatibility with
   * existing call sites — unused now that the animation is dropped.
   */
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isDecimal = targetNumber % 1 !== 0;
  const display = isDecimal ? targetNumber.toFixed(1) : targetNumber.toString();

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}
