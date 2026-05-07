import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
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
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const fullUrl = `${siteConfig.url}${canonical}`;

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
    alternates: { canonical },
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
  };
}
