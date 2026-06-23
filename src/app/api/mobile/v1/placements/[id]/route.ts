import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, placements, type NewPlacement } from "@/db";
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
    const row = await db.select().from(placements).where(eq(placements.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Placement not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(placements).where(eq(placements.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Placement not found");

    const patch: Partial<NewPlacement> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("studentName" in body) patch.studentName = String(body.studentName);
    if ("company" in body) patch.company = String(body.company);
    if ("designation" in body) patch.designation = String(body.designation);
    if ("package" in body) patch.package = str(body.package);
    if ("courseTaken" in body) patch.courseTaken = str(body.courseTaken);
    if ("batchYear" in body) {
      patch.batchYear = body.batchYear === null || body.batchYear === undefined ? null : Number(body.batchYear);
    }
    if ("photoUrl" in body) patch.photoUrl = str(body.photoUrl);
    if ("linkedinUrl" in body) patch.linkedinUrl = str(body.linkedinUrl);
    if ("testimonial" in body) patch.testimonial = str(body.testimonial);
    if ("isHighlighted" in body) patch.isHighlighted = Boolean(body.isHighlighted);
    if ("isPublished" in body) patch.isPublished = Boolean(body.isPublished);

    await db.update(placements).set(patch).where(eq(placements.id, id));
    const updated = await db.select().from(placements).where(eq(placements.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(placements).where(eq(placements.id, id));
    return new Response(null, { status: 204 });
  });
}
