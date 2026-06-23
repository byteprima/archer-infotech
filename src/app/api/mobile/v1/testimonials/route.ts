import { NextRequest } from "next/server";
import { desc, like, or } from "drizzle-orm";

import { db, testimonials } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

const str = (v: unknown) => (v === null || v === undefined ? null : String(v));

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    const search = q
      ? or(
          like(testimonials.name, `%${q}%`),
          like(testimonials.company, `%${q}%`),
          like(testimonials.courseTaken, `%${q}%`),
        )
      : undefined;

    const rows = await db
      .select()
      .from(testimonials)
      .where(search)
      .orderBy(desc(testimonials.createdAt));
    return json(rows);
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const body = await readJson(req);
    const name = String(body.name || "").trim();
    const content = String(body.content || "").trim();
    if (!name) throw new ApiError(422, "Name is required");
    if (!content) throw new ApiError(422, "Content is required");

    const inserted = await db
      .insert(testimonials)
      .values({
        name,
        role: str(body.role),
        company: str(body.company),
        courseTaken: str(body.courseTaken),
        content,
        rating: body.rating !== undefined ? Number(body.rating) : 5,
        photoUrl: str(body.photoUrl),
        linkedinUrl: str(body.linkedinUrl),
        githubUrl: str(body.githubUrl),
        placedAt: str(body.placedAt),
        isHighlighted: body.isHighlighted !== undefined ? Boolean(body.isHighlighted) : false,
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      })
      .returning();
    return json(inserted[0], 201);
  });
}
