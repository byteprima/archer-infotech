import { NextRequest } from "next/server";
import { and, desc, like, or, type SQL } from "drizzle-orm";

import { db, placements } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(placements.studentName, term),
        like(placements.company, term),
        like(placements.designation, term),
      );
      if (search) conds.push(search);
    }

    const rows = await db
      .select()
      .from(placements)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(placements.createdAt));
    return json(rows);
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const body = await readJson(req);
    const studentName = String(body.studentName || "").trim();
    const company = String(body.company || "").trim();
    const designation = String(body.designation || "").trim();
    if (!studentName) throw new ApiError(422, "studentName is required");
    if (!company) throw new ApiError(422, "company is required");
    if (!designation) throw new ApiError(422, "designation is required");

    const inserted = await db
      .insert(placements)
      .values({
        studentName,
        company,
        designation,
        package: (body.package as string) || null,
        courseTaken: (body.courseTaken as string) || null,
        batchYear: body.batchYear !== undefined && body.batchYear !== null ? Number(body.batchYear) : null,
        photoUrl: (body.photoUrl as string) || null,
        linkedinUrl: (body.linkedinUrl as string) || null,
        testimonial: (body.testimonial as string) || null,
        isHighlighted: body.isHighlighted !== undefined ? Boolean(body.isHighlighted) : false,
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      })
      .returning();
    return json(inserted[0], 201);
  });
}
