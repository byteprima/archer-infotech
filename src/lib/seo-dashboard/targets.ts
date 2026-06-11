/**
 * SEO Dashboard — single source of truth for ranking-monitoring config.
 *
 * Standardisation layer (#4): page-type classification, target money
 * keywords, branded-query detection, status thresholds, and a unified
 * good / watch / critical taxonomy used across every dashboard panel.
 *
 * Everything that the Rankings / Trends panels reason about resolves
 * back to constants here — so "what counts as striking distance" or
 * "which keywords matter" is defined once, not re-hardcoded per tab.
 */
import { siteConfig } from "@/data/site-config";

// ---------------------------------------------------------------------
// Page-type classification
// ---------------------------------------------------------------------

/**
 * Page-type segments. Lets the dashboard answer "are my programmatic
 * location pages (P4-16) actually ranking?" separately from blog/course
 * performance.
 */
export type PageType =
  | "core"
  | "category"
  | "course"
  | "location-combo"
  | "bootcamp"
  | "blog"
  | "other";

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  core: "Core / marketing",
  category: "Course category",
  course: "Course page",
  "location-combo": "Course × location",
  bootcamp: "Bootcamp",
  blog: "Blog",
  other: "Other",
};

/** Strip any origin and trailing slash, returning a normalised path. */
export function toPath(urlOrPath: string): string {
  let p = urlOrPath;
  try {
    if (/^https?:\/\//i.test(urlOrPath)) p = new URL(urlOrPath).pathname;
  } catch {
    /* fall through with raw string */
  }
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/**
 * Classify a page URL/path into a PageType from its route shape. Order
 * matters — the most specific patterns are checked first.
 */
export function classifyPageType(urlOrPath: string): PageType {
  const path = toPath(urlOrPath);

  if (path === "/") return "core";
  if (path.startsWith("/blog/")) return "blog";
  if (path.startsWith("/bootcamps/")) return "bootcamp";

  // Programmatic course × location combos: /courses/in/<slug>  (P4-16)
  if (/^\/courses\/in\/[^/]+$/.test(path)) return "location-combo";

  if (path.startsWith("/courses/")) {
    const segs = path.split("/").filter(Boolean); // ["courses", cat, slug?]
    if (segs.length >= 3) return "course"; // /courses/<cat>/<slug>
    if (segs.length === 2) return "category"; // /courses/<cat>
  }
  if (path === "/courses") return "core";

  // Top-level marketing surfaces
  if (
    /^\/(about|placements|contact|testimonials|reviews|faq|gallery|blog)?$/.test(
      path,
    ) ||
    path.startsWith("/about")
  ) {
    return "core";
  }

  return "other";
}

// ---------------------------------------------------------------------
// Branded vs non-branded query detection
// ---------------------------------------------------------------------

/**
 * Matches any query containing the brand. Non-branded impressions are
 * the true organic-discovery signal — branded traffic would arrive
 * regardless of ranking work.
 */
export const BRAND_REGEX = /archer\s*infotech|archerinfotech/i;

export function isBranded(query: string): boolean {
  return BRAND_REGEX.test(query);
}

// ---------------------------------------------------------------------
// Target money keywords (rank tracker — #5)
// ---------------------------------------------------------------------

export interface TargetKeyword {
  /** Lower-case GSC query string to match (exact, normalised). */
  keyword: string;
  /** The page this keyword is meant to rank. */
  targetPath: string;
  pageType: PageType;
}

/**
 * The fixed set of money keywords tracked daily. GSC reports an
 * *average* position over the property; for a local institute the
 * map-pack position (DataForSEO geo-grid, see geo-grid.ts) matters too.
 */
export const TARGET_KEYWORDS: TargetKeyword[] = [
  { keyword: "python training in pune", targetPath: "/courses/programming/python-training-in-pune", pageType: "course" },
  { keyword: "java training in pune", targetPath: "/courses/programming/java-training-in-pune", pageType: "course" },
  { keyword: "java full stack training in pune", targetPath: "/courses/full-stack-development/java-full-stack-training-in-pune", pageType: "course" },
  { keyword: "mern stack training in pune", targetPath: "/courses/full-stack-development/mern-stack-training-in-pune", pageType: "course" },
  { keyword: "full stack developer course in pune", targetPath: "/courses/full-stack-development", pageType: "category" },
  { keyword: "data science training in pune", targetPath: "/courses/data-ai/data-science-training-in-pune", pageType: "course" },
  { keyword: "software testing training in pune", targetPath: "/courses/programming", pageType: "category" },
  { keyword: "it training institute in pune", targetPath: "/", pageType: "core" },
  { keyword: "best it training institute in pune", targetPath: "/", pageType: "core" },
  { keyword: "software training institute in pune", targetPath: "/", pageType: "core" },
  { keyword: "python classes in pune", targetPath: "/courses/programming/python-training-in-pune", pageType: "course" },
  { keyword: "java classes in pune", targetPath: "/courses/programming/java-training-in-pune", pageType: "course" },
];

/** Normalise a query for matching (lower-case, collapse whitespace). */
export function normaliseQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

// ---------------------------------------------------------------------
// Thresholds
// ---------------------------------------------------------------------

export const THRESHOLDS = {
  /** Striking-distance: ranking just off where clicks begin. */
  strikingDistance: { minPosition: 4, maxPosition: 15, minImpressions: 30 },
  /** Minimum impressions before a CTR gap is worth acting on. */
  ctrGapMinImpressions: 50,
  /** CTR gap (expected − actual, fraction) that flags a title/meta fix. */
  ctrGapWatch: 0.02,
  ctrGapCritical: 0.05,
  /** Position-delta (week-over-week) magnitude that counts as a "mover". */
  moverMinDelta: 1.5,
} as const;

/** Position buckets for the distribution view, low → high. */
export const POSITION_BUCKETS = [
  { key: "1-3", label: "Top 3", min: 0, max: 3.5 },
  { key: "4-10", label: "Page 1", min: 3.5, max: 10.5 },
  { key: "11-20", label: "Page 2", min: 10.5, max: 20.5 },
  { key: "21-50", label: "21–50", min: 20.5, max: 50.5 },
  { key: "51+", label: "51+", min: 50.5, max: Infinity },
] as const;

export type PositionBucketKey = (typeof POSITION_BUCKETS)[number]["key"];

export function positionBucket(position: number): PositionBucketKey {
  for (const b of POSITION_BUCKETS) {
    if (position > b.min && position <= b.max) return b.key;
  }
  return "51+";
}

// ---------------------------------------------------------------------
// Unified status taxonomy
// ---------------------------------------------------------------------

/** One status enum, used by every panel so colours mean the same thing. */
export type SeoStatus = "good" | "watch" | "critical" | "none";

export const STATUS_STYLES: Record<SeoStatus, { dot: string; badge: string; label: string }> = {
  good: { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-800", label: "Good" },
  watch: { dot: "bg-amber-500", badge: "bg-amber-100 text-amber-800", label: "Watch" },
  critical: { dot: "bg-rose-500", badge: "bg-rose-100 text-rose-800", label: "Critical" },
  none: { dot: "bg-muted-foreground/40", badge: "bg-muted text-muted-foreground", label: "No data" },
};

/** Ranking-position health for a tracked keyword/page. */
export function positionStatus(position: number | null | undefined): SeoStatus {
  if (position === null || position === undefined || position <= 0) return "none";
  if (position <= 10) return "good"; // page 1
  if (position <= 20) return "watch"; // page 2 — striking distance
  return "critical";
}

/** CTR-gap health: a big positive gap (expected ≫ actual) is a problem. */
export function ctrGapStatus(gap: number): SeoStatus {
  if (gap >= THRESHOLDS.ctrGapCritical) return "critical";
  if (gap >= THRESHOLDS.ctrGapWatch) return "watch";
  return "good";
}

export const BRAND_NAME = siteConfig.name;
