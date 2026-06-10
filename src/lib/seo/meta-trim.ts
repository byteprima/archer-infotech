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
 *      before `maxLen`.
 *   3. Failing that, cut at the last word boundary before `maxLen` and
 *      append a single `…` so the truncation is visible to a human
 *      reader (helps QA spot the rare case where the input is one
 *      run-on sentence).
 */
export function summariseToMeta(text: string, maxLen = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;

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
  if (lastSentenceEnd > 60) {
    // Only accept a sentence cut if it leaves at least a meaningful chunk —
    // a too-short cut (e.g., "Yes.") loses too much signal for search.
    return cleaned.slice(0, lastSentenceEnd).trim();
  }

  // Fall back to word-boundary truncation with ellipsis
  const sliced = cleaned.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trim() + "…";
}
