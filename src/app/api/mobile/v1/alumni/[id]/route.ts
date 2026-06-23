import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, alumni, type NewAlumni } from "@/db";
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
    const row = await db.select().from(alumni).where(eq(alumni.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Alumni not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(alumni).where(eq(alumni.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Alumni not found");

    const patch: Partial<NewAlumni> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("status" in body) patch.status = String(body.status);
    if ("adminNotes" in body) patch.adminNotes = str(body.adminNotes);
    if ("currentCompany" in body) patch.currentCompany = str(body.currentCompany);
    if ("currentRole" in body) patch.currentRole = str(body.currentRole);
    if ("packageBand" in body) patch.packageBand = str(body.packageBand);

    await db.update(alumni).set(patch).where(eq(alumni.id, id));
    const updated = await db.select().from(alumni).where(eq(alumni.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(alumni).where(eq(alumni.id, id));
    return new Response(null, { status: 204 });
  });
}
