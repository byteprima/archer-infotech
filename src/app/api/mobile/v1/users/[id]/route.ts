import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, user, type NewUser } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const { id } = await ctx.params;
    const row = await db.select().from(user).where(eq(user.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "User not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const { id } = await ctx.params;
    const body = await readJson(req);

    const existing = await db.select().from(user).where(eq(user.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "User not found");

    const patch: Partial<NewUser> = { updatedAt: new Date() };
    if ("name" in body) patch.name = String(body.name);
    if ("role" in body) patch.role = String(body.role);

    await db.update(user).set(patch).where(eq(user.id, id));
    const updated = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const { id } = await ctx.params;
    await db.delete(user).where(eq(user.id, id));
    return new Response(null, { status: 204 });
  });
}
