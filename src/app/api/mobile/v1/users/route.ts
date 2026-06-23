import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { db, user } from "@/db";
import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const role = searchParams.get("role")?.trim();

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(like(user.name, term), like(user.email, term));
      if (search) conds.push(search);
    }
    if (role) conds.push(eq(user.role, role));

    const rows = await db
      .select()
      .from(user)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(user.createdAt));
    return json(rows);
  });
}
