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
    return db
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
  },
  ["home-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);

/** /placements — full row for all published testimonials. */
export const getAllPublishedTestimonials = unstable_cache(
  async () => {
    return db
      .select()
      .from(testimonialsTable)
      .where(eq(testimonialsTable.isPublished, true));
  },
  ["all-published-testimonials"],
  { revalidate: 600, tags: ["testimonials"] },
);
