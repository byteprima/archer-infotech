import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { buildHreflangAlternates } from "@/lib/seo/hreflang";
import { summariseToMeta } from "@/lib/seo/meta-trim";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  /**
   * ISO date (e.g. "2026-05-06") or Date of the content's last meaningful
   * update. Emits a `last-modified` meta tag (UTC string) so real-time AI
   * crawlers get an explicit freshness signal. P8-23. Only pass this where
   * a truthful modified date exists — never fake freshness.
   */
  lastModified?: string | Date;
}

/**
 * Build a Metadata object that produces a self-referencing canonical tag
 * plus matching OpenGraph and Twitter blocks. Use this in every page's
 * `export const metadata` (or `generateMetadata`) so the canonical, og:title,
 * og:description and visible <title> all stay in sync.
 *
 * `path` should be an absolute path on this site, e.g. "/about" or
 * "/courses/programming/python-training-in-pune". A trailing-slash-free,
 * leading-slash form is expected.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = siteConfig.ogImage,
  noindex = false,
  lastModified,
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const fullUrl = `${siteConfig.url}${canonical}`;

  // hreflang scaffolding (P3-23): dormant while English-only — returns
  // undefined today, emits a full reciprocal set once mr/hi are added to
  // LOCALES in lib/seo/hreflang.ts. No-op for current output.
  const languages = buildHreflangAlternates(canonical);

  // P8-23: a `last-modified` meta tag (UTC string) for real-time AI crawlers.
  const lastModifiedUtc = lastModified
    ? new Date(typeof lastModified === "string" && lastModified.length === 10
        ? `${lastModified}T00:00:00Z`
        : lastModified
      ).toUTCString()
    : undefined;

  // Strip any pre-existing " | Archer Info[space]Tech ..." suffix from the
  // input title — the root layout's title template (`%s | Archer Infotech`)
  // appends the brand exactly once. Without this strip, callers that already
  // include the brand in their title (e.g. bootcamp.seo.title) end up with
  // duplicate-brand <title> tags like:
  //   "CodeLeap... | Archer Infotech, Kothrud | Archer Infotech"
  // The regex tolerates the legacy "Archer Info Tech" misspelling for safety.
  const cleanTitle = title.replace(/\s*\|\s*Archer\s*Info\s*Tech\b.*$/i, "").trim();

  // P3-22 — auto-skip the brand suffix when (a) adding it would push the
  // title past Google's ~60-char mobile snippet truncation point, or
  // (b) the title already contains "Archer Infotech" naturally (so the
  // suffix would just be redundant). The site-wide audit flagged 196
  // title-long pages largely because the 18-char " | Archer Infotech"
  // suffix pushes long-but-acceptable inputs over budget. `title:
  // { absolute }` bypasses the root layout's title template.
  const TITLE_SNIPPET_BUDGET = 60;
  const BRAND_SUFFIX_LEN = ` | ${siteConfig.name}`.length; // 18
  const titleAlreadyHasBrand = /archer\s*infotech/i.test(cleanTitle);
  const suffixBlowsBudget =
    cleanTitle.length + BRAND_SUFFIX_LEN > TITLE_SNIPPET_BUDGET;
  const skipBrandSuffix = titleAlreadyHasBrand || suffixBlowsBudget;

  const fullTitle = skipBrandSuffix
    ? cleanTitle
    : `${cleanTitle} | ${siteConfig.name}`;

  // P3-22 — universal safety net for long descriptions, clipped at the last
  // full sentence boundary (or word boundary) inside the budget so the SERP
  // shows a clean editorial cut rather than Google's mid-sentence one.
  //
  // Budget lowered 175 -> 160 on 2026-08-06. The stated goal was always to
  // pre-empt Google's truncation, but Google cuts desktop snippets at roughly
  // 155-160 characters, so a 175-char description was still being truncated
  // by Google — the clamp was not achieving what its comment claimed. 160
  // makes the editorial cut the one that actually ships. The 2026-08-06 crawl
  // found 142 pages sitting in the 166-175 band because of this.
  const META_DESCRIPTION_BUDGET = 160;
  const safeDescription = summariseToMeta(description, META_DESCRIPTION_BUDGET);

  return {
    // root template adds " | Archer Infotech" UNLESS we bypass via absolute.
    title: skipBrandSuffix ? { absolute: cleanTitle } : cleanTitle,
    description: safeDescription,
    alternates: { canonical, ...(languages && { languages }) },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: fullUrl,
      title: fullTitle,
      description: safeDescription,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: safeDescription,
      images: [ogImage],
    },
    ...(noindex && {
      robots: { index: false, follow: false },
    }),
    ...(lastModifiedUtc && {
      other: { "last-modified": lastModifiedUtc },
    }),
  };
}
