import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { csvDate, csvDateTime, escapeCsvCell, toCsv } from "./csv";

describe("escapeCsvCell", () => {
  it("quotes and doubles internal quotes", () => {
    assert.equal(escapeCsvCell('He said "hi"'), '"He said ""hi"""');
  });

  it("keeps commas and newlines inside the cell", () => {
    assert.equal(escapeCsvCell("Pune, MH"), '"Pune, MH"');
    assert.equal(escapeCsvCell("line1\nline2"), '"line1\nline2"');
  });

  it("neutralises formula injection", () => {
    // These arrive from public web forms and are opened in Excel.
    for (const payload of [
      "=HYPERLINK(\"http://evil\",\"click\")",
      "+1+1",
      "-1+1",
      "@SUM(A1)",
    ]) {
      const cell = escapeCsvCell(payload);
      assert.equal(cell.startsWith("\"'"), true, `unescaped: ${payload}`);
    }
  });

  it("leaves an ordinary leading character alone", () => {
    assert.equal(escapeCsvCell("Rahul"), '"Rahul"');
  });

  it("writes zero as zero, not as blank", () => {
    assert.equal(escapeCsvCell(0), '"0"');
    assert.equal(escapeCsvCell(false), '"false"');
  });

  it("writes null and undefined as empty", () => {
    assert.equal(escapeCsvCell(null), "");
    assert.equal(escapeCsvCell(undefined), "");
  });
});

describe("toCsv", () => {
  it("uses CRLF line endings", () => {
    const csv = toCsv(["A", "B"], [[1, 2]]);
    assert.equal(csv, '"A","B"\r\n"1","2"');
  });

  it("emits just a header for no rows", () => {
    assert.equal(toCsv(["A"], []), '"A"');
  });
});

describe("csv dates", () => {
  it("formats sortably in local time", () => {
    assert.equal(csvDate(new Date(2026, 8, 11)), "2026-09-11");
    assert.equal(csvDateTime(new Date(2026, 8, 11, 9, 5)), "2026-09-11 09:05");
  });

  it("is blank for a missing date", () => {
    assert.equal(csvDate(null), "");
    assert.equal(csvDateTime(undefined), "");
  });
});
