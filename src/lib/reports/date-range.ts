/**
 * The date range every report shares.
 *
 * One module because six reports and a dashboard all need the same answer to
 * "what does 'this month' mean", and because the boundaries are where these
 * things go wrong: a range whose end is midnight silently excludes everything
 * that happened on its last day.
 */

export const RANGE_PRESETS = [
  "today",
  "7d",
  "30d",
  "this_month",
  "last_month",
  "this_year",
  "all",
  "custom",
] as const;

export type RangePreset = (typeof RANGE_PRESETS)[number];

export const RANGE_PRESET_LABELS: Record<RangePreset, string> = {
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  this_month: "This month",
  last_month: "Last month",
  this_year: "This year",
  all: "All time",
  custom: "Custom",
};

export interface DateRange {
  from: Date;
  to: Date;
  preset: RangePreset;
  label: string;
}

export function isRangePreset(value: unknown): value is RangePreset {
  return (
    typeof value === "string" && (RANGE_PRESETS as readonly string[]).includes(value)
  );
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** End of day is 23:59:59.999, not the next midnight — an inclusive `to`
 *  compared with `<=` must not drag in the following day's first record. */
function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/** Parse YYYY-MM-DD in LOCAL time. `new Date("2026-09-11")` is UTC midnight,
 *  which is the previous day west of Greenwich. */
export function parseDayInput(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  if (Number.isNaN(date.getTime())) return null;
  // Reject 2026-02-31, which JS would roll forward to March.
  if (date.getMonth() !== Number(m) - 1 || date.getDate() !== Number(d)) {
    return null;
  }
  return date;
}

/**
 * Resolve a preset (and optional custom bounds) into concrete instants.
 *
 * `now` is a parameter so the tests do not depend on the day they run.
 * Anything unrecognised falls back to 30 days rather than erroring: a report
 * with a sensible default range is more useful than a 400.
 */
export function resolveRange(
  input: { preset?: string | null; from?: string | null; to?: string | null },
  now: Date = new Date(),
): DateRange {
  const preset: RangePreset = isRangePreset(input.preset) ? input.preset : "30d";

  if (preset === "custom") {
    const from = parseDayInput(input.from);
    const to = parseDayInput(input.to);
    if (from && to) {
      // Swap rather than reject: someone picking the dates in the wrong order
      // means the range they described, not an error.
      const [lo, hi] = from <= to ? [from, to] : [to, from];
      return {
        from: startOfDay(lo),
        to: endOfDay(hi),
        preset,
        label: `${isoDay(lo)} to ${isoDay(hi)}`,
      };
    }
    return resolveRange({ preset: "30d" }, now);
  }

  const today = startOfDay(now);

  switch (preset) {
    case "today":
      return { from: today, to: endOfDay(now), preset, label: "Today" };
    case "7d": {
      const from = new Date(today);
      from.setDate(from.getDate() - 6); // inclusive of today = 7 days
      return { from, to: endOfDay(now), preset, label: "Last 7 days" };
    }
    case "this_month": {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from, to: endOfDay(now), preset, label: "This month" };
    }
    case "last_month": {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const to = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from, to: endOfDay(to), preset, label: "Last month" };
    }
    case "this_year": {
      const from = new Date(today.getFullYear(), 0, 1);
      return { from, to: endOfDay(now), preset, label: "This year" };
    }
    case "all":
      return {
        from: new Date(2000, 0, 1),
        to: endOfDay(now),
        preset,
        label: "All time",
      };
    case "30d":
    default: {
      const from = new Date(today);
      from.setDate(from.getDate() - 29);
      return { from, to: endOfDay(now), preset: "30d", label: "Last 30 days" };
    }
  }
}


function isoDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
