/**
 * Internal-link discovery helpers for blog posts. Drives the
 * "Continue learning at Archer Infotech" block at the bottom of every
 * blog post — guarantees the pillar 5 P5-09 minimum (≥1 course, 2-3
 * related posts, 1 trust-building page) without requiring per-post
 * editorial work.
 */
import { courses, type Course } from "@/data/courses";
import { deriveCourseKeywords } from "@/lib/seo/course-keywords";

/**
 * Tokenise a comma-separated tags string into a clean lowercase array
 * (trim, drop empties). Used as input to course / post matching.
 */
export function tokeniseTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

interface RelevantCoursePick {
  course: Course;
  score: number;
}

/**
 * Find the most relevant course for a given blog post by intersecting
 * the post's tag set against each course's derived keyword footprint.
 * Score = number of overlapping keywords; ties broken by course
 * popularity (isPopular / isFeatured) then alphabetical.
 *
 * Returns the top `limit` matches, or an empty array when no course
 * has any keyword overlap with the post — in which case the calling
 * site falls back to /courses (the index page) as the link target.
 */
export function findRelevantCoursesForPost(
  postTags: string | null | undefined,
  postCategory: string | null | undefined,
  limit: number = 1,
): RelevantCoursePick[] {
  const tagTokens = tokeniseTags(postTags);
  if (postCategory) tagTokens.push(postCategory.toLowerCase());

  if (tagTokens.length === 0) return [];

  const ranked: RelevantCoursePick[] = [];

  for (const course of courses) {
    // Skip the bootcamp pseudo-courses since they live under
    // /bootcamps/<slug>, not /courses/<cat>/<slug>; bootcamp links are
    // already a separate prominent CTA pattern.
    if (course.categorySlug === "bootcamps") continue;

    const courseKeywords = deriveCourseKeywords(course.slug, course.category);
    let score = 0;
    for (const kw of courseKeywords) {
      // Substring match in either direction so "python" hits both a
      // post tagged "python" and a tag like "python programming".
      const hit = tagTokens.some(
        (t) => t.includes(kw) || kw.includes(t),
      );
      if (hit) score += 1;
    }
    if (score > 0) ranked.push({ course, score });
  }

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aRank = (a.course.isFeatured ? 2 : 0) + (a.course.isPopular ? 1 : 0);
    const bRank = (b.course.isFeatured ? 2 : 0) + (b.course.isPopular ? 1 : 0);
    if (bRank !== aRank) return bRank - aRank;
    return a.course.title.localeCompare(b.course.title);
  });

  return ranked.slice(0, limit);
}

/**
 * Build the canonical URL path for a course page. Centralised here so
 * every internal-link block uses the same routing rule (and we can
 * change it once if the URL pattern ever shifts).
 */
export function courseHref(course: Course): string {
  return `/courses/${course.categorySlug}/${course.slug}`;
}
