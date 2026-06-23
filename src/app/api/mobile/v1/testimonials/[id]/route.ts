import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, testimonials, type NewTestimonial } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function getId(ctx: Ctx): Promise<number> {
  const { id } = await ctx.params;
  const num = Number.parseInt(id, 10);
  if (Number.isNaN(num)) throw new ApiError(400, "Invalid id");
  return num;
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const row = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Testimonial not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Testimonial not found");

    const patch: Partial<NewTestimonial> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("name" in body) patch.name = String(body.name);
    if ("role" in body) patch.role = str(body.role);
    if ("company" in body) patch.company = str(body.company);
    if ("courseTaken" in body) patch.courseTaken = str(body.courseTaken);
    if ("content" in body) patch.content = String(body.content);
    if ("rating" in body) patch.rating = Number(body.rating);
    if ("photoUrl" in body) patch.photoUrl = str(body.photoUrl);
    if ("linkedinUrl" in body) patch.linkedinUrl = str(body.linkedinUrl);
    if ("githubUrl" in body) patch.githubUrl = str(body.githubUrl);
    if ("placedAt" in body) patch.placedAt = str(body.placedAt);
    if ("isHighlighted" in body) patch.isHighlighted = Boolean(body.isHighlighted);
    if ("isPublished" in body) patch.isPublished = Boolean(body.isPublished);

    await db.update(testimonials).set(patch).where(eq(testimonials.id, id));
    const updated = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(testimonials).where(eq(testimonials.id, id));
    return new Response(null, { status: 204 });
  });
}
