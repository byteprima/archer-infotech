/**
 * Phone number normalisation.
 *
 * The matching key for duplicate detection, so the rules here decide whether
 * two enquiries are the same person. Today `9876543210`, `+91 98765 43210` and
 * `098765 43210` are three different leads, which quietly inflates every count
 * in the reports and means two counsellors can call the same person.
 *
 * The canonical form is E.164: a leading `+`, country code, then the national
 * number, no spaces. Indian mobiles become `+919876543210`.
 *
 * Deliberately NOT a full libphonenumber. That library is ~500KB and knows the
 * numbering plan of every country; this needs to be right about India, sane
 * about everywhere else, and never destructive — anything it cannot classify
 * is kept as digits rather than rejected, because the site takes enquiries
 * from abroad and a "valid international number treated as invalid" is the
 * failure the specification calls out.
 */

/** Indian mobile numbers are ten digits and start 6, 7, 8 or 9. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Shortest and longest plausible E.164 subscriber number. */
const MIN_DIGITS = 7;
const MAX_DIGITS = 15;

export interface NormalisedPhone {
  /** E.164 form, e.g. "+919876543210". Null when the input is not a phone. */
  e164: string | null;
  /** True when we identified the country rather than assuming one. */
  confident: boolean;
  /** The ten-digit national number, for Indian numbers only. */
  indianNational: string | null;
}

/**
 * Normalise a phone number to E.164.
 *
 * Precedence, in order:
 *   1. explicit "+" or "00" prefix — trust the country code given
 *   2. 10 digits matching an Indian mobile — assume +91
 *   3. 11 digits starting 0, remainder an Indian mobile — trunk prefix, +91
 *   4. 12 digits starting 91, remainder an Indian mobile — +91
 *   5. anything else 7-15 digits — assume it already carries a country code
 *
 * Rule 5 is a guess, and `confident` says so. It still normalises consistently,
 * which is what matters for matching: the same input always produces the same
 * key.
 */
export function normalisePhone(input: string | null | undefined): NormalisedPhone {
  const miss: NormalisedPhone = { e164: null, confident: false, indianNational: null };
  if (!input) return miss;

  // Cut an extension off before anything else. Left in place, "9876543210 x21"
  // cleans to twelve digits and normalises to +987654321021 — a confident-
  // looking number that belongs to nobody and will never match the real person.
  const trimmed = String(input)
    .replace(/\s*(?:x|ext|extn)\.?\s*\d+\s*$/i, "")
    .trim();
  if (trimmed === "") return miss;

  // A leading "+" is the only character that survives cleaning, and only at
  // the front. Extensions ("x21") and letters are dropped with everything else.
  const hasPlus = trimmed.startsWith("+");
  const hasZeroZero = /^00\d/.test(trimmed);
  let digits = trimmed.replace(/\D/g, "");
  if (hasZeroZero) digits = digits.slice(2);

  if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) return miss;

  const india = (national: string): NormalisedPhone => ({
    e164: `+91${national}`,
    confident: true,
    indianNational: national,
  });

  if (hasPlus || hasZeroZero) {
    if (digits.startsWith("91") && INDIAN_MOBILE.test(digits.slice(2))) {
      return india(digits.slice(2));
    }
    return { e164: `+${digits}`, confident: true, indianNational: null };
  }

  if (INDIAN_MOBILE.test(digits)) return india(digits);

  if (digits.length === 11 && digits.startsWith("0") && INDIAN_MOBILE.test(digits.slice(1))) {
    return india(digits.slice(1));
  }

  if (digits.length === 12 && digits.startsWith("91") && INDIAN_MOBILE.test(digits.slice(2))) {
    return india(digits.slice(2));
  }

  // Unknown country. Consistent, but a guess.
  return { e164: `+${digits}`, confident: false, indianNational: null };
}

/** The matching key, or null when the input is not usable as one. */
export function phoneKey(input: string | null | undefined): string | null {
  return normalisePhone(input).e164;
}

/** True when two numbers reach the same person. Null keys never match. */
export function samePhone(
  a: string | null | undefined,
  b: string | null | undefined,
): boolean {
  const keyA = phoneKey(a);
  const keyB = phoneKey(b);
  return keyA !== null && keyA === keyB;
}

/**
 * Readable form for the admin: "98765 43210" for Indian numbers, the E.164
 * string otherwise. Never used for matching — display only.
 */
export function formatPhone(input: string | null | undefined): string {
  const { e164, indianNational } = normalisePhone(input);
  if (indianNational) {
    return `${indianNational.slice(0, 5)} ${indianNational.slice(5)}`;
  }
  return e164 ?? (input ? String(input).trim() : "");
}

/** A tel: href, which needs the E.164 form to dial reliably from a phone. */
export function telHref(input: string | null | undefined): string | null {
  const key = phoneKey(input);
  return key ? `tel:${key}` : null;
}
