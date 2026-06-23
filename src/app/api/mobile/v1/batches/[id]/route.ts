import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, batches, type NewBatch } from "@/db";
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
    const row = await db.select().from(batches).where(eq(batches.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Batch not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(batches).where(eq(batches.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Batch not found");

    const patch: Partial<NewBatch> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("courseSlug" in body) patch.courseSlug = String(body.courseSlug);
    if ("courseName" in body) patch.courseName = String(body.courseName);
    if ("startDate" in body) patch.startDate = new Date(String(body.startDate));
    if ("timing" in body) patch.timing = String(body.timing);
    if ("duration" in body) patch.duration = String(body.duration);
    if ("mode" in body) patch.mode = String(body.mode);
    if ("totalSeats" in body) patch.totalSeats = Number(body.totalSeats);
    if ("seatsAvailable" in body) patch.seatsAvailable = Number(body.seatsAvailable);
    if ("status" in body) patch.status = String(body.status);
    if ("instructor" in body) patch.instructor = str(body.instructor);
    if ("location" in body) patch.location = str(body.location);
    if ("meetingLink" in body) patch.meetingLink = str(body.meetingLink);

    await db.update(batches).set(patch).where(eq(batches.id, id));
    const updated = await db.select().from(batches).where(eq(batches.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(batches).where(eq(batches.id, id));
    return new Response(null, { status: 204 });
  });
}
