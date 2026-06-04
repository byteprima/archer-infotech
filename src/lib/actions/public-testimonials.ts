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
