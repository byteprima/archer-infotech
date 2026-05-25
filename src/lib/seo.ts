import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { buildHreflangAlternates } from "@/lib/seo/hreflang";

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
  const fullTitle = `${cleanTitle} | ${siteConfig.name}`;

  return {
    title: cleanTitle, // root template adds " | Archer Infotech"
    description,
    alternates: { canonical, ...(languages && { languages }) },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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
