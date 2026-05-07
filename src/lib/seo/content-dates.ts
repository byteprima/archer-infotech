/**
 * Canonical "last reviewed" dates for long-form content surfaces. P3-18.
 *
 * Each constant is the ISO date of the last meaningful editorial pass on
 * a content type — feeds both the visible "Last updated" stamp shown to
 * humans AND the `dateModified` field in Course / BlogPosting / Article
 * JSON-LD that AI engines and Google use as a freshness signal.
 *
 * Refresh discipline: every 6 months audit each content type and bump
 * the constant when a real refresh has happened. Don't bump dates without
 * an actual content review — Google's helpful-content system specifically
 * penalises "fake freshness" (date changes with no body changes).
 */

/**
 * Course detail pages (`/courses/[category]/[slug]`).
 * Last meaningful refresh: Pillar 1 #6 — Tier 1 + Tier 2/3/4 long-form
 * content shipped 2026-05-06 in commits dbdeea0 + a9a4d58 (rich
 * curriculum, FAQs, outcomes, prereqs, projects across 41 tech courses).
 */
export const COURSE_LAST_REVIEWED = "2026-05-06";

/**
 * Bootcamp detail pages (`/bootcamps/[slug]`).
 * Last meaningful refresh: P4-13 Related Courses internal-link block
 * shipped 2026-05-08 (commit e329af4) on top of the existing rich
 * bootcamp curriculum data.
 */
export const BOOTCAMP_LAST_REVIEWED = "2026-05-08";

/**
 * Evergreen marketing surfaces (Home, About, Placements, Courses index,
 * Bootcamps index, Trainers, Contact, Internships, Corporate Training,
 * Batch Schedule). Last meaningful refresh: 2026-05-08 — definitive
 * answer paragraphs and FAQ blocks shipped (P8-07 + P8-08, commit
 * 87ca989).
 */
export const EVERGREEN_LAST_REVIEWED = "2026-05-08";

/**
 * Format an ISO date as a short, human-readable label for the visible
 * `<time>` stamp shown on long-form pages.
 *
 * Example: "2026-05-06" → "6 May 2026".
 */
export function formatLastReviewed(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
