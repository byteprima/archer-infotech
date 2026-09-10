/**
 * Enquiry reference numbers: ENQ-2026-0042.
 *
 * The number the office quotes on the phone. Migration 0002 backfilled every
 * lead that existed at the time and nothing ever assigned one afterwards, so
 * every enquiry arriving after that migration had a NULL reference and showed
 * as "#42" in the follow-up queue, the reports table and the CSV export. This
 * is the missing allocator.
 *
 * Same rules as src/lib/admissions/numbering.ts, deliberately: two reference
 * schemes that behave differently are two things to remember.
 */

export const ENQUIRY_NUMBER_PREFIX = "ENQ";

export function formatEnquiryNumber(year: number, sequence: number): string {
  return `${ENQUIRY_NUMBER_PREFIX}-${year}-${String(sequence).padStart(4, "0")}`;
}

/**
 * The sequence already used by an existing reference, or null when the string
 * is not one of ours — hand-typed, imported, or from the pre-migration era.
 */
export function parseEnquiryNumber(
  value: string | null | undefined,
  year: number,
): number | null {
  if (!value) return null;
  const match = new RegExp(`^${ENQUIRY_NUMBER_PREFIX}-(\\d{4})-(\\d+)$`).exec(
    value.trim(),
  );
  if (!match) return null;
  if (Number(match[1]) !== year) return null;
  const sequence = Number(match[2]);
  return Number.isSafeInteger(sequence) && sequence > 0 ? sequence : null;
}

/**
 * The highest sequence already visible in a year's references.
 *
 * This SEEDS the counter in lib/reference-counter.ts; it is not the allocator.
 * Using it directly as "highest + 1" reissues a number the moment the highest
 * row is deleted, which hands the same reference to two different people.
 */
export function highestEnquirySequence(
  year: number,
  existing: readonly (string | null)[],
): number {
  let highest = 0;
  for (const value of existing) {
    const sequence = parseEnquiryNumber(value, year);
    if (sequence !== null && sequence > highest) highest = sequence;
  }
  return highest;
}
