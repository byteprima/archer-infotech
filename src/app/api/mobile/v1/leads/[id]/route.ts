import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, leads, type NewLead } from "@/db";
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
    const row = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Lead not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Lead not found");

    const patch: Partial<NewLead> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("name" in body) patch.name = String(body.name);
    if ("email" in body) patch.email = String(body.email);
    if ("phone" in body) patch.phone = String(body.phone);
    if ("courseInterest" in body) patch.courseInterest = str(body.courseInterest);
    if ("message" in body) patch.message = str(body.message);
    if ("source" in body) patch.source = str(body.source);
    if ("status" in body) patch.status = String(body.status);
    if ("notes" in body) patch.notes = str(body.notes);
    if ("assignedTo" in body) patch.assignedTo = str(body.assignedTo);
    if ("followUpDate" in body) {
      patch.followUpDate = body.followUpDate ? new Date(String(body.followUpDate)) : null;
    }

    await db.update(leads).set(patch).where(eq(leads.id, id));
    const updated = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(leads).where(eq(leads.id, id));
    return new Response(null, { status: 204 });
  });
}
