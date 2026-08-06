/**
 * P3-22 cleanup — utility for safely truncating long body copy into a
 * search-snippet-friendly meta description. Google truncates at ~150-170
 * chars on mobile and ~155-180 on desktop; AI engines often pull whatever
 * fits in their context window. Going over the band means the truncation
 * happens server-side (out of our control) instead of being a clean
 * editorial cut.
 *
 * Strategy:
 *   1. If the input is already under `maxLen`, return as-is.
 *   2. Try to cut at the last sentence-ending punctuation (`.`, `!`, `?`)
 *      before `maxLen` — but only if that cut actually uses most of the
 *      budget (see MIN_BUDGET_USE below).
 *   3. Failing that, cut at the last word boundary before `maxLen` and
 *      append a single `…` so the truncation is visible to a human
 *      reader (helps QA spot the rare case where the input is one
 *      run-on sentence).
 *
 * The budget-use floor is the important part. The original threshold was a
 * flat `> 60` chars, which meant a description opening with a short first
 * sentence got cut there and the rest discarded — e.g. the Angular course's
 * 197-char description rendered as its 71-char first sentence, throwing away
 * 100+ chars of keyword-bearing copy that fit inside the budget. That was
 * the single cause of 48 pages sitting under 110 chars in the 2026-08-06
 * crawl. Scaling the floor to the budget means an early sentence break now
 * falls through to word-boundary truncation, which fills the snippet.
 */
export function summariseToMeta(text: string, maxLen = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;

  // A sentence cut has to use at least this share of the budget to be worth
  // taking; below it, a fuller word-boundary cut carries more search signal.
  const MIN_BUDGET_USE = 0.75;

  // Try sentence boundary first
  const punct = /[.!?]\s/g;
  let lastSentenceEnd = -1;
  let m: RegExpExecArray | null;
  while ((m = punct.exec(cleaned)) !== null) {
    if (m.index + 1 <= maxLen) {
      lastSentenceEnd = m.index + 1; // include the punctuation
    } else {
      break;
    }
  }
  if (lastSentenceEnd >= Math.floor(maxLen * MIN_BUDGET_USE)) {
    return cleaned.slice(0, lastSentenceEnd).trim();
  }

  // Fall back to word-boundary truncation with ellipsis
  const sliced = cleaned.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trim() + "…";
}
