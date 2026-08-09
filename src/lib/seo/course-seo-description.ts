/**
 * SERP meta descriptions for course pages, composed from real course data.
 *
 * WHY THIS EXISTS: an audit of 53 days of Search Console + Bing data on
 * 2026-08-09 found that 48 of 61 course descriptions mentioned none of
 * Pune, fee, duration or placement — and none mentioned fee at all. The
 * live Bing queries are literally "archer infotech flutter course fee
 * pune", "flutter course duration and fee", "flutter course placement
 * support". The descriptions answered none of what was being asked.
 *
 * Kept honest about what it can claim: `duration`, `level` and `mode` are
 * real per-course fields, and EMI is only mentioned where `emiAvailable`
 * is set. THERE IS NO PER-COURSE FEE DATA IN THE CODEBASE, so no rupee
 * figure is generated here — the copy says fees are available on request,
 * which matches the query token without inventing a number. If per-course
 * fees ever land in `courses.ts`, this is the single place to add them.
 *
 * Note this is only the META description. `course.description` also
 * renders as the visible hero paragraph, so it is deliberately left alone
 * — SERP copy and hero copy have different jobs, which is the same reason
 * `seoTitle`/`heroHeading` already exist as separate fields.
 */
import type { Course } from "@/data/courses";

/**
 * Google truncates around 155-160 characters on desktop. Composition
 * targets the low end of that so the whole line survives, then trims at a
 * sentence boundary rather than mid-word if a long course title pushes it
 * over.
 */
const MAX_LEN = 158;

function modeLabel(mode: Course["mode"]): string {
  const online = mode.includes("Online");
  const offline = mode.includes("Offline");
  if (online && offline) return "classroom & online batches";
  if (online) return "live online batches";
  if (offline) return "classroom batches";
  return "weekday & weekend batches";
}

/**
 * Build the SERP description for a course.
 *
 * Assembled by priority rather than composed-then-truncated. The first
 * version of this function built the full sentence and trimmed the
 * overflow, which silently ate the closing clause on every course with a
 * long title — "fee" survived in 0 of 49 descriptions and "placement" in
 * 36, i.e. it cut exactly the tokens the audit said were missing.
 *
 * So the tail is reserved first: it is short, fixed, and carries the two
 * query tokens that matter most (fee, placement). The head then spends
 * whatever budget is left, adding optional detail only while it fits, in
 * descending order of search value — duration is a query token, batch
 * format is useful, "at our Kothrud centre" is nice-to-have and drops
 * first.
 */
export function buildCourseSeoDescription(course: Course): string {
  const tail = course.emiAvailable
    ? "Live projects, certification, placement assistance. Fees & EMI on request."
    : "Live projects, certification, placement assistance. Fee details on request.";

  // Required — this is what the query matches on.
  let head = `${course.title} training in Pune`;

  // Optional, most valuable first.
  const optional = [
    course.duration ? ` — ${course.duration.toLowerCase()}` : "",
    `, ${modeLabel(course.mode)}`,
    " at our Kothrud centre",
  ].filter(Boolean);

  for (const seg of optional) {
    if (`${head}${seg}. ${tail}`.length <= MAX_LEN) head += seg;
  }

  return `${head}. ${tail}`;
}

/**
 * Resolve the description a course page should publish to search engines.
 *
 * Precedence: an explicit hand-written `seoDescription` on the course wins
 * (same escape hatch `seoTitle` provides for a page worth targeting by
 * hand), otherwise the composed version above. `course.description` is no
 * longer used for meta — it is marketing copy for the hero, and it is what
 * produced the generic vendor-blurb snippets the audit found.
 */
export function resolveCourseMetaDescription(course: Course): string {
  return course.seoDescription?.trim() || buildCourseSeoDescription(course);
}
