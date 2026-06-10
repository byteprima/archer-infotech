import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";

/**
 * Cached, read-only testimonial fetchers for public pages. Home and
 * /placements previously forced dynamic rendering JUST to read this one
 * table — meaning every request hit the DB and Cloudflare couldn't cache
 * the HTML. Wrapping the lookup with unstable_cache lets the pages become
 * ISR (`revalidate = 600`) without losing freshness — edits show up
 * within ~10 minutes (or immediately via revalidateTag("testimonials")
 * from the admin write path).
 */

/** Home — 6 published testimonials, projected to the card-display columns. */
export const getHomeTestimonials = unstable_cache(
  async () => {
    try {
      return await db
        .select({
          id: testimonialsTable.id,
          name: testimonialsTable.name,
          role: testimonialsTable.role,
          company: testimonialsTable.company,
          courseTaken: testimonialsTable.courseTaken,
          content: testimonialsTable.content,
          rating: testimonialsTable.rating,
          photoUrl: testimonialsTable.photoUrl,
          linkedinUrl: testimonialsTable.linkedinUrl,
          githubUrl: testimonialsTable.githubUrl,
          placedAt: testimonialsTable.placedAt,
        })
        .from(testimonialsTable)
        .where(eq(testimonialsTable.isPublished, true))
        .limit(6);
    } catch (error) {
      // The production image is built without a populated SQLite file
      // (bind-mounted only at runtime), so the build-time prerender of `/`
      // would otherwise crash on `no such table`. Return [] → page builds
      // with an empty testimonials section; ISR regen on first real request
      // fills it from the live DB. Same shape as other DB-backed helpers.
      console.error("getHomeTestimonials failed (build-time prerender?)", error);
      return [];
    }
  },
  ["home-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);

/** /placements — full row for all published testimonials. */
export const getAllPublishedTestimonials = unstable_cache(
  async () => {
    try {
      return await db
        .select()
        .from(testimonialsTable)
        .where(eq(testimonialsTable.isPublished, true));
    } catch (error) {
      console.error("getAllPublishedTestimonials failed (build-time prerender?)", error);
      return [];
    }
  },
  ["all-published-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);

/**
 * P7-33 — testimonials matched to a specific course title for the
 * course detail page. Substring match on `courseTaken` in both
 * directions so "Java" testimonials match "Java Full Stack" course
 * pages (and vice-versa). Returned testimonials feed both the
 * visible "Student feedback" panel and the per-course aggregateRating
 * + review[] block inside `CourseJsonLd` so each course page becomes
 * SERP star-snippet eligible against its own Course schema.
 */
export const getCourseTestimonials = unstable_cache(
  async (courseTitle: string) => {
    try {
      const all = await db
        .select()
        .from(testimonialsTable)
        .where(eq(testimonialsTable.isPublished, true));
      const needle = courseTitle.toLowerCase();
      return all.filter((t) => {
        if (!t.courseTaken) return false;
        const haystack = t.courseTaken.toLowerCase();
        // Bidirectional substring — e.g., "Java" testimonial matches
        // "Java Full Stack" course, and "Java Full Stack" testimonial
        // matches "Java" course.
        return needle.includes(haystack) || haystack.includes(needle);
      });
    } catch (error) {
      console.error("getCourseTestimonials failed (build-time prerender?)", error);
      return [];
    }
  },
  ["course-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);
