import { and, asc, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { batches, type Batch } from "@/db/schema";

/**
 * Returns the next upcoming batch for a course, or null if none scheduled.
 *
 * Compatibility note: existing batch rows may carry the legacy short slug
 * ("java") while course pages now use the SEO slug ("java-training-in-pune").
 * We try both — full new slug first, then the slug with "-training-in-pune"
 * stripped — so this works during and after a slug migration.
 *
 * Server-only: uses the Drizzle DB connection. Safe to call from Server Components.
 */
export async function getNextBatchForCourse(courseSlug: string): Promise<Batch | null> {
  const now = new Date();
  const fallbackSlug = courseSlug.replace(/-training-in-pune$/, "");
  const slugCandidates = courseSlug === fallbackSlug ? [courseSlug] : [courseSlug, fallbackSlug];

  try {
    const rows = await db
      .select()
      .from(batches)
      .where(
        and(
          inArray(batches.courseSlug, slugCandidates),
          eq(batches.status, "upcoming"),
          gte(batches.startDate, now),
          sql`${batches.seatsAvailable} > 0`,
        ),
      )
      .orderBy(asc(batches.startDate))
      .limit(1);

    return rows[0] ?? null;
  } catch (error) {
    // DB might not be reachable during build — caller treats null as
    // "no batch info available" and renders a graceful fallback.
    console.error("getNextBatchForCourse failed", error);
    return null;
  }
}
