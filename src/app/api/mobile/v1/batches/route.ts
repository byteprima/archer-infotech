import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { db, batches } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const status = searchParams.get("status")?.trim();

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(batches.courseName, term),
        like(batches.instructor, term),
        like(batches.location, term),
      );
      if (search) conds.push(search);
    }
    if (status) conds.push(eq(batches.status, status));

    const rows = await db
      .select()
      .from(batches)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(batches.startDate));
    return json(rows);
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const body = await readJson(req);
    const courseSlug = String(body.courseSlug || "").trim();
    const courseName = String(body.courseName || "").trim();
    const timing = String(body.timing || "").trim();
    const duration = String(body.duration || "").trim();
    if (!courseSlug) throw new ApiError(422, "courseSlug is required");
    if (!courseName) throw new ApiError(422, "courseName is required");
    if (!body.startDate) throw new ApiError(422, "startDate is required");
    if (!timing) throw new ApiError(422, "timing is required");
    if (!duration) throw new ApiError(422, "duration is required");

    const inserted = await db
      .insert(batches)
      .values({
        courseSlug,
        courseName,
        startDate: new Date(String(body.startDate)),
        timing,
        duration,
        mode: (body.mode as string) || "offline",
        totalSeats: body.totalSeats !== undefined ? Number(body.totalSeats) : 15,
        seatsAvailable: body.seatsAvailable !== undefined ? Number(body.seatsAvailable) : 15,
        status: (body.status as string) || "upcoming",
        instructor: (body.instructor as string) || null,
        location: (body.location as string) || null,
        meetingLink: (body.meetingLink as string) || null,
      })
      .returning();
    return json(inserted[0], 201);
  });
}
