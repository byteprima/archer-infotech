/**
 * Rupee amounts for admission fees.
 *
 * Stored as an INTEGER number of paise, never as a float. A course fee of
 * ₹45,000 with a 12% discount is ₹39,600 exactly in paise and 39599.999999
 * in IEEE-754 — the kind of error that shows up months later as a receipt
 * that disagrees with itself by one rupee. Integers cannot do that.
 *
 * The admin types rupees, the database holds paise, and these two functions
 * are the only place the two representations meet.
 */

/** Largest fee we will accept: ₹10,00,000. A typo, not a course. */
export const MAX_FEE_PAISE = 1_000_000_00;

/**
 * Parse admin-typed rupees into paise.
 *
 * Accepts "45000", "45,000", "₹45,000", "45000.50", " 45000 ". Returns null
 * for anything else, including negatives and amounts with a space inside them — the caller decides whether null
 * means "leave it blank" or "reject the form", and neither should be guessed
 * here.
 */
export function parseRupeesToPaise(input: unknown): number | null {
  if (typeof input === "number") {
    if (!Number.isFinite(input) || input < 0) return null;
    return Math.round(input * 100);
  }
  if (typeof input !== "string") return null;

  // Trim the ends, then drop only the currency symbol and thousands commas.
  // Internal whitespace is NOT stripped: doing so turns the typo "4 5" into a
  // silent ₹45 instead of an error the admin can see and correct.
  const cleaned = input.trim().replace(/[₹,]/g, "");
  if (cleaned === "") return null;
  // Reject anything that is not a plain non-negative decimal. A leading "-",
  // "1e5" and "12.345" all fail here rather than becoming a surprising number.
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;

  return Math.round(Number(cleaned) * 100);
}

/** Format paise as rupees for display: 3960000 → "₹39,600". */
export function formatPaise(paise: number | null | undefined): string {
  if (paise === null || paise === undefined || !Number.isFinite(paise)) {
    return "—";
  }
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", {
    minimumFractionDigits: rupees % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Paise as a plain rupee number, for prefilling an editable input. */
export function paiseToRupeeInput(paise: number | null | undefined): string {
  if (paise === null || paise === undefined) return "";
  const rupees = paise / 100;
  return rupees % 1 === 0 ? String(rupees) : rupees.toFixed(2);
}

export type FeeResult =
  | { ok: true; courseFee: number; discount: number; finalFee: number }
  | { ok: false; message: string };

/**
 * Work out the fee actually owed.
 *
 * `finalFee` is always derived here and never taken from the client. It is
 * still stored, because an admission is a financial record and the figure
 * agreed on the day must survive somebody later editing the course fee — but
 * deriving it on write is what stops the three columns disagreeing.
 */
export function computeFees(
  courseFeeInput: unknown,
  discountInput: unknown,
): FeeResult {
  const courseFee = parseRupeesToPaise(courseFeeInput);
  if (courseFee === null) {
    return { ok: false, message: "Enter the course fee as a rupee amount." };
  }
  if (courseFee > MAX_FEE_PAISE) {
    return { ok: false, message: "That course fee looks like a typo." };
  }

  // Blank discount is zero, not an error: most admissions have none.
  const discountRaw =
    discountInput === "" || discountInput === null || discountInput === undefined
      ? 0
      : parseRupeesToPaise(discountInput);
  if (discountRaw === null) {
    return { ok: false, message: "Enter the discount as a rupee amount." };
  }
  if (discountRaw > courseFee) {
    return { ok: false, message: "The discount cannot exceed the course fee." };
  }

  return {
    ok: true,
    courseFee,
    discount: discountRaw,
    finalFee: courseFee - discountRaw,
  };
}
