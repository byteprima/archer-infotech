import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseDayInput, resolveRange } from "./date-range";

// A fixed "now": Friday 11 September 2026, 14:30 local.
const NOW = new Date(2026, 8, 11, 14, 30);

function day(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

describe("resolveRange", () => {
  it("defaults to 30 days for anything unrecognised", () => {
    for (const preset of [undefined, null, "", "nonsense"]) {
      const range = resolveRange({ preset }, NOW);
      assert.equal(range.preset, "30d");
    }
  });

  it("includes today in the last-7-days window", () => {
    const range = resolveRange({ preset: "7d" }, NOW);
    assert.equal(day(range.from), "2026-09-05");
    assert.equal(day(range.to), "2026-09-11");
  });

  it("ends the range at the last millisecond of the day", () => {
    // The bug this guards: a `to` of midnight excludes everything that
    // happened on the range's final day.
    const range = resolveRange({ preset: "today" }, NOW);
    assert.equal(range.from.getHours(), 0);
    assert.equal(range.to.getHours(), 23);
    assert.equal(range.to.getMinutes(), 59);
    assert.equal(range.to.getMilliseconds(), 999);
  });

  it("resolves this month from the first", () => {
    const range = resolveRange({ preset: "this_month" }, NOW);
    assert.equal(day(range.from), "2026-09-01");
  });

  it("resolves last month to its own final day", () => {
    const range = resolveRange({ preset: "last_month" }, NOW);
    assert.equal(day(range.from), "2026-08-01");
    assert.equal(day(range.to), "2026-08-31");
  });

  it("handles last month across a year boundary", () => {
    const january = new Date(2026, 0, 15, 9, 0);
    const range = resolveRange({ preset: "last_month" }, january);
    assert.equal(day(range.from), "2025-12-01");
    assert.equal(day(range.to), "2025-12-31");
  });

  it("handles a short last month", () => {
    const march = new Date(2026, 2, 15, 9, 0);
    const range = resolveRange({ preset: "last_month" }, march);
    assert.equal(day(range.to), "2026-02-28");
  });

  it("accepts a custom range", () => {
    const range = resolveRange(
      { preset: "custom", from: "2026-01-01", to: "2026-01-31" },
      NOW,
    );
    assert.equal(day(range.from), "2026-01-01");
    assert.equal(day(range.to), "2026-01-31");
  });

  it("swaps a backwards custom range rather than returning nothing", () => {
    const range = resolveRange(
      { preset: "custom", from: "2026-01-31", to: "2026-01-01" },
      NOW,
    );
    assert.equal(day(range.from), "2026-01-01");
    assert.equal(day(range.to), "2026-01-31");
  });

  it("falls back when a custom range is incomplete", () => {
    const range = resolveRange({ preset: "custom", from: "2026-01-01" }, NOW);
    assert.equal(range.preset, "30d");
  });
});

describe("parseDayInput", () => {
  it("parses in local time, not UTC", () => {
    const parsed = parseDayInput("2026-09-11");
    assert.equal(parsed?.getFullYear(), 2026);
    assert.equal(parsed?.getMonth(), 8);
    assert.equal(parsed?.getDate(), 11);
  });

  it("rejects a date that does not exist", () => {
    // JS would silently roll this to 3 March.
    assert.equal(parseDayInput("2026-02-31"), null);
  });

  it("rejects malformed input", () => {
    for (const bad of ["", "11-09-2026", "2026/09/11", "yesterday", null]) {
      assert.equal(parseDayInput(bad), null, `accepted ${bad}`);
    }
  });
});

