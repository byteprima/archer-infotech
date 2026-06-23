import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { db, leads } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

function sourceCondition(source: string): SQL | undefined {
  if (!source) return undefined;
  if (source === "newsletter") return like(leads.source, "newsletter_signup%");
  if (source === "reports") return like(leads.source, "report_download%");
  return eq(leads.source, source);
}

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const status = searchParams.get("status")?.trim();
    const source = searchParams.get("source")?.trim() || "";

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(leads.name, term),
        like(leads.email, term),
        like(leads.phone, term),
      );
      if (search) conds.push(search);
    }
    if (status) conds.push(eq(leads.status, status));
    const sc = sourceCondition(source);
    if (sc) conds.push(sc);

    const rows = await db
      .select()
      .from(leads)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(leads.createdAt));
    return json(rows);
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const body = await readJson(req);
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    if (name.length < 2) throw new ApiError(422, "Name is required");
    if (phone.length < 8) throw new ApiError(422, "A valid phone is required");

    const inserted = await db
      .insert(leads)
      .values({
        name,
        email: String(body.email || ""),
        phone,
        courseInterest: (body.courseInterest as string) || null,
        message: (body.message as string) || null,
        source: (body.source as string) || "manual",
        status: (body.status as string) || "new",
        notes: (body.notes as string) || null,
        assignedTo: (body.assignedTo as string) || null,
        followUpDate: body.followUpDate ? new Date(String(body.followUpDate)) : null,
      })
      .returning();
    return json(inserted[0], 201);
  });
}
