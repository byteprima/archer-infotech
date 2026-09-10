import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  conversionRate,
  dailySeries,
  isoDay,
  percentageOf,
  sumBy,
  toDistribution,
} from "./metrics";

describe("conversionRate", () => {
  it("is a percentage to one decimal", () => {
    assert.equal(conversionRate(25, 100), 25);
    assert.equal(conversionRate(1, 3), 33.3);
    assert.equal(conversionRate(2, 3), 66.7);
  });

  it("returns 0 rather than dividing by zero", () => {
    assert.equal(conversionRate(0, 0), 0);
    assert.equal(conversionRate(5, 0), 0);
  });

  it("never returns NaN or Infinity", () => {
    for (const [a, b] of [[NaN, 10], [10, NaN], [Infinity, 10], [10, Infinity]]) {
      const result = conversionRate(a, b);
      assert.equal(Number.isFinite(result), true, `${a}/${b} gave ${result}`);
    }
  });

  it("handles more admissions than enquiries without breaking", () => {
    // Possible when a lead is created before the range and converts inside it.
    assert.equal(conversionRate(12, 10), 120);
  });
});

describe("toDistribution", () => {
  it("orders by count, largest first", () => {
    const rows = toDistribution([
      { key: "a", label: "A", count: 1 },
      { key: "b", label: "B", count: 5 },
      { key: "c", label: "C", count: 3 },
    ]);
    assert.deepEqual(rows.map((r) => r.key), ["b", "c", "a"]);
  });

  it("breaks ties by label so the order is stable", () => {
    const rows = toDistribution([
      { key: "z", label: "Zebra", count: 2 },
      { key: "a", label: "Ant", count: 2 },
    ]);
    assert.deepEqual(rows.map((r) => r.key), ["a", "z"]);
  });

  it("computes percentages against the true total", () => {
    const rows = toDistribution([
      { key: "a", label: "A", count: 25 },
      { key: "b", label: "B", count: 75 },
    ]);
    assert.equal(rows[0].percentage, 75);
    assert.equal(rows[1].percentage, 25);
  });

  it("survives an all-zero set", () => {
    const rows = toDistribution([{ key: "a", label: "A", count: 0 }]);
    assert.equal(rows[0].percentage, 0);
  });

  it("returns nothing for no input", () => {
    assert.deepEqual(toDistribution([]), []);
  });
});

describe("percentageOf", () => {
  it("matches conversionRate", () => {
    assert.equal(percentageOf(3, 4), 75);
    assert.equal(percentageOf(1, 0), 0);
  });
});

describe("sumBy", () => {
  it("tolerates nulls from a left join", () => {
    const rows = [{ v: 10 }, { v: null }, { v: 5 }];
    assert.equal(sumBy(rows, (r) => r.v), 15);
  });

  it("is zero for no rows", () => {
    assert.equal(sumBy([], () => 1), 0);
  });
});

describe("dailySeries", () => {
  const from = new Date(2026, 8, 1);
  const to = new Date(2026, 8, 5);

  it("emits every day in the range", () => {
    const series = dailySeries([], from, to);
    assert.equal(series.length, 5);
    assert.deepEqual(series.map((p) => p.date), [
      "2026-09-01",
      "2026-09-02",
      "2026-09-03",
      "2026-09-04",
      "2026-09-05",
    ]);
  });

  it("emits zero for quiet days rather than skipping them", () => {
    const series = dailySeries(
      [{ date: new Date(2026, 8, 3, 10) }, { date: new Date(2026, 8, 3, 18) }],
      from,
      to,
    );
    assert.deepEqual(series.map((p) => p.count), [0, 0, 2, 0, 0]);
  });

  it("ignores rows with no date", () => {
    const series = dailySeries([{ date: null }], from, to);
    assert.equal(series.reduce((s, p) => s + p.count, 0), 0);
  });

  it("buckets a late evening row on its local day", () => {
    // 23:30 IST on the 4th is 18:00 UTC on the 4th; a UTC-based key would be
    // right here but wrong for a browser west of Greenwich. The local key is
    // the one that matches what the counsellor saw on the clock.
    const series = dailySeries([{ date: new Date(2026, 8, 4, 23, 30) }], from, to);
    const day = series.find((p) => p.date === "2026-09-04");
    assert.equal(day?.count, 1);
  });

  it("does not run away on an inverted range", () => {
    assert.deepEqual(dailySeries([], to, from), []);
  });
});

describe("isoDay", () => {
  it("pads and uses local time", () => {
    assert.equal(isoDay(new Date(2026, 0, 5)), "2026-01-05");
  });
});
