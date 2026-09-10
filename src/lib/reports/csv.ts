/**
 * CSV serialisation for exports.
 *
 * Two things this handles that the previous inline version did not:
 *
 * 1. Formula injection. A cell beginning =, +, -, @, tab or CR is executed as
 *    a formula when the file is opened in Excel or Sheets. Every string in
 *    these exports — names, messages, notes — arrives from a public web form,
 *    so a lead called `=HYPERLINK("http://evil","click")` becomes a live link
 *    in the office's spreadsheet. Such cells are prefixed with a single quote,
 *    which Excel strips on display.
 * 2. Zero and false. The old `if (!value) return ""` turned a count of 0 into
 *    an empty cell, which in a report is a different claim from zero.
 */

const FORMULA_START = /^[=+\-@\t\r]/;

export function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";

  let text = String(value);
  if (FORMULA_START.test(text)) {
    text = `'${text}`;
  }
  // Quote everything: it is always valid, and it removes the question of
  // whether this particular field might contain a comma today.
  return `"${text.replaceAll('"', '""')}"`;
}

export function toCsv(
  header: readonly string[],
  rows: ReadonlyArray<readonly unknown[]>,
): string {
  const lines = [
    header.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(",")),
  ];
  // CRLF, which is what the CSV spec says and what Excel on Windows expects.
  return lines.join("\r\n");
}

/** A CSV HTTP response, with a BOM so Excel reads it as UTF-8. */
export function csvResponse(filename: string, body: string): Response {
  return new Response(`﻿${body}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      // An export is a snapshot of live data; a cached one is a wrong one.
      "Cache-Control": "no-store",
    },
  });
}

/** Date for a spreadsheet cell: unambiguous, sortable, local time. */
export function csvDate(value: Date | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function csvDateTime(value: Date | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${csvDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
