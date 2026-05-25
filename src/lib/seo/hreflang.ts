/**
 * hreflang scaffolding for future Marathi / Hindi localisation (P3-23).
 *
 * The site is English-only today, so this is intentionally DORMANT: with a
 * single locale, `buildHreflangAlternates` returns `undefined` and no hreflang
 * tags are emitted (correct — you must never emit hreflang for locale URLs
 * that don't exist yet). When Marathi/Hindi launch, this becomes a one-line
 * activation: add the locales to `LOCALES` below.
 *
 * ── The per-page-language pattern (decided, for whoever implements i18n) ──
 *  - URL scheme: locale prefix on the path. English stays unprefixed (it's
 *    `x-default` and the canonical default), Marathi at `/mr/...`, Hindi at
 *    `/hi/...`. Example for /courses/programming/java-training-in-pune:
 *        en (default): https://archerinfotech.in/courses/programming/java-training-in-pune
 *        mr:           https://archerinfotech.in/mr/courses/programming/java-training-in-pune
 *        hi:           https://archerinfotech.in/hi/courses/programming/java-training-in-pune
 *  - Each localised page must carry the FULL reciprocal hreflang set (all
 *    locales + x-default) — partial/one-way hreflang is the most common bug.
 *  - `x-default` points at the English (unprefixed) URL.
 *  - Region codes: use language-only (`mr`, `hi`, `en`) unless we ever target
 *    a specific region; `en-IN` is reasonable if we want to signal India.
 *  - Pair hreflang with translated <html lang>, translated content (not
 *    machine-dumped), and locale-aware canonicals (each locale self-canonicals
 *    to its own URL, NOT to the English one).
 *
 * Next.js note (App Router): when localised routes exist, prefer emitting these
 * via `generateMetadata`'s `alternates.languages` (what `buildPageMetadata`
 * already wires up), or the i18n routing in next.config. Do NOT also hand-roll
 * <link rel="alternate"> tags — pick one source to avoid duplicates.
 */

import { siteConfig } from "@/data/site-config";

/** Active locales. English only today — add "mr","hi" to activate hreflang. */
export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];

/** The default, unprefixed locale (also the x-default target). */
export const DEFAULT_LOCALE: Locale = "en";

/** Full localised URL for a path + locale (English stays unprefixed). */
export function localeUrl(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === DEFAULT_LOCALE) return `${siteConfig.url}${clean || "/"}`;
  return `${siteConfig.url}/${locale}${clean}`;
}

/**
 * Build the `alternates.languages` map for Next Metadata, plus x-default.
 * Returns `undefined` while only one locale exists (dormant — no hreflang
 * emitted). Once LOCALES has 2+ entries this returns a complete reciprocal set.
 */
export function buildHreflangAlternates(
  path: string,
): Record<string, string> | undefined {
  if (LOCALES.length < 2) return undefined;
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = localeUrl(path, locale);
  }
  languages["x-default"] = localeUrl(path, DEFAULT_LOCALE);
  return languages;
}
