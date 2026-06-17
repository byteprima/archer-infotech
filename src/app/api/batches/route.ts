/**
 * GET /api/batches — public, machine-readable feed of upcoming batches.
 *
 * Built for agentic AI / LLM grounding: an assistant acting for a user
 * ("find a Java course in Pune starting soon with seats") can read this
 * instead of scraping /batch-schedule HTML. Also a precise, current
 * source for ChatGPT / Perplexity / Gemini to cite (start dates, seats).
 *
 * Returns only `upcoming` + `ongoing` batches (via filterUpcomingBatches),
 * sorted by start date. Public-safe allowlist only — never exposes the
 * private meetingLink (Zoom/Meet) or internal IDs.
 *
 * Discoverable via public/llms-full.txt and a <link rel="alternate"> on
 * /batch-schedule.
 *
 * CORS-open so browser-based agents can fetch it. Cached 30 min (batches
 * change slowly). Note: /api/* is excluded from the Cloudflare edge-cache
 * rule, so this serves fresh from origin — the s-maxage below is for any
 * future/edge consumer.
 */
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { batches as batchesTable } from "@/db/schema";
import { filterUpcomingBatches } from "@/lib/actions/public-batches";
import { getCourse } from "@/data/courses";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

/**
 * Resolve a batch's courseSlug to its canonical course detail URL.
 * Course slugs in courses.ts carry the "-training-in-pune" suffix; a
 * batch may store either form, so try the slug as-is, then the suffixed
 * variant. Returns null when no course matches (URL omitted, not broken).
 */
function courseUrl(courseSlug: string): string | null {
  const course =
    getCourse(courseSlug) ?? getCourse(`${courseSlug}-training-in-pune`);
  if (!course) return null;
  return `${baseUrl}/courses/${course.categorySlug}/${course.slug}`;
}

export async function GET() {
  const rows = await db
    .select()
    .from(batchesTable)
    .orderBy(asc(batchesTable.startDate));

  const batches = filterUpcomingBatches(rows).map((b) => {
    const url = courseUrl(b.courseSlug);
    return {
      course: b.courseName,
      courseSlug: b.courseSlug,
      url,
      startDate: new Date(b.startDate).toISOString().slice(0, 10),
      timing: b.timing,
      duration: b.duration,
      mode: b.mode,
      ...(b.mode === "offline" && b.location ? { location: b.location } : {}),
      seatsAvailable: b.seatsAvailable,
      status: b.status,
      enquiryUrl: `${baseUrl}/contact?course=${encodeURIComponent(b.courseSlug)}`,
    };
  });

  const payload = {
    institute: "Archer Infotech",
    url: baseUrl,
    phone: "+91 9850 678451",
    generatedAt: new Date().toISOString(),
    batchCount: batches.length,
    batches,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control":
        "public, s-maxage=1800, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
