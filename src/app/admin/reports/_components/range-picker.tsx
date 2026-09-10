"use client";

/**
 * The date range every report on the page shares.
 *
 * A plain GET form, so the range lives in the URL: a counsellor can bookmark
 * "last month" and send the link to the office. Choosing a preset submits
 * immediately; the custom dates need Apply, because a half-typed date should
 * not fire a query on every keystroke.
 */

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  RANGE_PRESETS,
  RANGE_PRESET_LABELS,
  type RangePreset,
} from "@/lib/reports/date-range";

const CONTROL = "h-9 rounded-md border border-input bg-background px-3 text-sm";

export function RangePicker({
  preset,
  from,
  to,
}: {
  preset: RangePreset;
  from: string;
  to: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      method="get"
      className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-3"
    >
      <div>
        <label htmlFor="range-preset" className="mb-1 block text-xs text-muted-foreground">
          Period
        </label>
        <select
          id="range-preset"
          name="preset"
          defaultValue={preset}
          className={CONTROL}
          onChange={(event) => {
            if (event.target.value !== "custom") formRef.current?.requestSubmit();
          }}
        >
          {RANGE_PRESETS.map((value) => (
            <option key={value} value={value}>
              {RANGE_PRESET_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="range-from" className="mb-1 block text-xs text-muted-foreground">
          From
        </label>
        <input id="range-from" type="date" name="from" defaultValue={from} className={CONTROL} />
      </div>
      <div>
        <label htmlFor="range-to" className="mb-1 block text-xs text-muted-foreground">
          To
        </label>
        <input id="range-to" type="date" name="to" defaultValue={to} className={CONTROL} />
      </div>
      <Button type="submit" size="sm">
        Apply
      </Button>
      <p className="text-xs text-muted-foreground">
        Custom dates apply with the Custom period.
      </p>
    </form>
  );
}
