import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { matchesCourse } from "@/lib/courses/course-match";
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

/** Home — up to 12 published testimonials, projected to the card-display columns. */
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
          // P8-04 — feeds Review.datePublished in the home-page
          // ReviewListJsonLd. Truthful date from the DB; never invented.
          createdAt: testimonialsTable.createdAt,
        })
        .from(testimonialsTable)
        .where(eq(testimonialsTable.isPublished, true))
        // Was 6 — exactly what the home carousel displays, so every visitor
        // saw the same six. The section now shuffles client-side for variety,
        // which needs a pool bigger than the view. 12 keeps the cached payload
        // and the Review JSON-LD on the same page a sensible size.
        .limit(12);
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
 * course detail page. Matching is exact and comma-aware (see
 * lib/courses/course-match.ts), so a testimonial recorded against
 * "AWS Cloud Computing, DevOps Engineering" appears on both pages and
 * one recorded against "C" appears only on the C page. Returned
 * testimonials feed both the
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
      // Exact, comma-aware match. The previous bidirectional substring test
      // both over-matched (a record saved as "C" attached itself to every
      // course whose title contains a "c") and under-matched (four of five
      // live testimonials read "Java full-stack development " and reached no
      // page at all). See lib/courses/course-match.ts.
      return all.filter((t) => matchesCourse(t.courseTaken, courseTitle));
    } catch (error) {
      console.error("getCourseTestimonials failed (build-time prerender?)", error);
      return [];
    }
  },
  ["course-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);
