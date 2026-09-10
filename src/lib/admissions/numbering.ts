/**
 * Admission reference numbers: ADM-2026-0007.
 *
 * Kept pure and separate from the action so the numbering rule can be tested
 * without a database — the equivalent rule for enquiry numbers shipped with a
 * bug that gave every row ENQ-2026-0001, and it was only caught by running it.
 */

export const ADMISSION_NUMBER_PREFIX = "ADM";

export function formatAdmissionNumber(year: number, sequence: number): string {
  return `${ADMISSION_NUMBER_PREFIX}-${year}-${String(sequence).padStart(4, "0")}`;
}

/**
 * The sequence number already used by an existing reference, or null if the
 * string is not one of ours (hand-typed, imported, from another scheme).
 */
export function parseAdmissionNumber(
  value: string | null | undefined,
  year: number,
): number | null {
  if (!value) return null;
  const match = new RegExp(
    `^${ADMISSION_NUMBER_PREFIX}-(\\d{4})-(\\d+)$`,
  ).exec(value.trim());
  if (!match) return null;
  if (Number(match[1]) !== year) return null;
  const sequence = Number(match[2]);
  return Number.isSafeInteger(sequence) && sequence > 0 ? sequence : null;
}

/**
 * The highest sequence already visible in a year's references.
 *
 * This SEEDS the counter in lib/reference-counter.ts; it is not the allocator.
 * "highest + 1" was the original implementation and it reissues a number the
 * moment the highest row is deleted — printing the same reference on two
 * people's receipts.
 */
export function highestAdmissionSequence(
  year: number,
  existing: readonly (string | null)[],
): number {
  let highest = 0;
  for (const value of existing) {
    const sequence = parseAdmissionNumber(value, year);
    if (sequence !== null && sequence > highest) highest = sequence;
  }
  return highest;
}
