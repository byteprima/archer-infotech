/**
 * The arithmetic behind the reports.
 *
 * Kept pure and separate from the queries so it can be tested. Every one of
 * these has a degenerate case that is easy to get wrong and impossible to spot
 * on a dashboard — a conversion rate of Infinity, a distribution that sums to
 * 99.9%, a "top course" chosen from an empty list.
 */

/**
 * Conversion rate as a percentage, rounded to one decimal.
 *
 * Zero enquiries gives 0, not NaN and not Infinity. There is no meaningful
 * rate without a denominator, and 0 is the only answer that will not poison
 * a sum, a sort or a chart axis downstream.
 */
export function conversionRate(admissions: number, enquiries: number): number {
  if (!Number.isFinite(admissions) || !Number.isFinite(enquiries)) return 0;
  if (enquiries <= 0) return 0;
  if (admissions <= 0) return 0;
  return Math.round((admissions / enquiries) * 1000) / 10;
}

/** A share of a total, as a percentage rounded to one decimal. */
export function percentageOf(part: number, total: number): number {
  return conversionRate(part, total);
}

export interface DistributionRow<T> {
  key: T;
  label: string;
  count: number;
  percentage: number;
}

/**
 * Turn counts into a distribution, largest first.
 *
 * Percentages are computed against the true total and each rounded
 * independently, so they can sum to 99.9 or 100.1. That is left alone
 * deliberately: forcing them to 100 means silently altering one row's number,
 * and a reader comparing a row against its count would find the altered one
 * wrong.
 */
export function toDistribution<T extends string>(
  counts: ReadonlyArray<{ key: T; label: string; count: number }>,
): DistributionRow<T>[] {
  const total = counts.reduce((sum, row) => sum + row.count, 0);
  return counts
    .map((row) => ({
      key: row.key,
      label: row.label,
      count: row.count,
      percentage: percentageOf(row.count, total),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** Sum of a numeric field, tolerating nulls from a LEFT JOIN. */
export function sumBy<T>(rows: readonly T[], pick: (row: T) => number | null): number {
  return rows.reduce((sum, row) => sum + (pick(row) ?? 0), 0);
}

/**
 * Group rows into a dense series of daily counts.
 *
 * Days with no rows are emitted as zero rather than skipped. A line chart that
 * omits empty days draws a straight line across a quiet week and makes it look
 * like steady business.
 */
export function dailySeries(
  rows: ReadonlyArray<{ date: Date | null }>,
  from: Date,
  to: Date,
): Array<{ date: string; count: number }> {
  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.date) continue;
    const key = isoDay(row.date);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const series: Array<{ date: string; count: number }> = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const last = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  // A guard rather than a while(true): a bad range should produce a short
  // chart, not hang the request.
  for (let i = 0; i <= 366 && cursor <= last; i++) {
    const key = isoDay(cursor);
    series.push({ date: key, count: counts.get(key) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return series;
}

/** Local-time YYYY-MM-DD. Not toISOString(), which converts to UTC and moves
 *  an evening enquiry in IST onto the previous day. */
export function isoDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
