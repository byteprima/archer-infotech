import { courses } from "@/data/courses";

/**
 * Match a stored `courseTaken` / `courseInterest` value to a course.
 *
 * Replaces the bidirectional-substring test that `getCourseTestimonials` used.
 * That test had two failure modes, both observed in live data:
 *
 *   - It over-matched. `needle.includes(haystack)` means a record saved as
 *     "C" attaches itself to all 41 course pages whose title contains a "c" —
 *     Core Java, JavaScript, Docker, React.
 *   - It under-matched on near-misses. Four of five published testimonials
 *     read "Java full-stack development " and matched nothing at all, because
 *     a hyphen and a trailing space defeat a substring test against
 *     "Java Full Stack Development".
 *
 * The stored value is a comma-joined list of catalogue titles (that is what
 * CoursePickerField writes, and what the contact form has always written), so
 * this splits on commas and compares each entry exactly, normalised. A record
 * for "AWS Cloud Computing, DevOps Engineering" therefore appears on both
 * pages, which a substring test could never express.
 *
 * Legacy rows that predate the pickers may still hold free text. Those get one
 * narrow fallback: an entry is accepted if it equals the course title once
 * punctuation and spacing are normalised away. Deliberately NOT a substring
 * fallback — restoring that would restore the over-matching.
 */

/** Lowercase, collapse punctuation and whitespace. "Java full-stack " -> "java full stack". */
function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/** Split a stored comma-joined value into its individual course entries. */
export function splitCourseValue(stored: string | null | undefined): string[] {
  if (!stored) return [];
  return stored
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * True when `stored` names `courseTitle`.
 *
 * Both sides are normalised, so "Java full-stack development " matches
 * "Java Full Stack Development" — the near-miss that orphaned real rows —
 * while "C" still matches only the C course.
 */
export function matchesCourse(
  stored: string | null | undefined,
  courseTitle: string,
): boolean {
  const target = normalise(courseTitle);
  if (!target) return false;
  return splitCourseValue(stored).some((entry) => normalise(entry) === target);
}

/** Every catalogue course a stored value names. Used for backfill and audits. */
export function resolveCourses(stored: string | null | undefined): string[] {
  const entries = splitCourseValue(stored).map(normalise);
  if (entries.length === 0) return [];
  return courses
    .filter((course) => entries.includes(normalise(course.title)))
    .map((course) => course.title);
}

/**
 * Every catalogue course SLUG a stored value names.
 *
 * The slug is what leads, batches, demos and admissions all key on, so the
 * admin needs the identifier rather than the display title that
 * `resolveCourses` returns.
 */
export function resolveCourseSlugs(stored: string | null | undefined): string[] {
  const entries = splitCourseValue(stored).map(normalise);
  if (entries.length === 0) return [];
  return courses
    .filter((course) => entries.includes(normalise(course.title)))
    .map((course) => course.slug);
}
