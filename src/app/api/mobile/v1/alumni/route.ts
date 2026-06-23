import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { db, alumni } from "@/db";
import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const status = searchParams.get("status")?.trim();

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(alumni.name, term),
        like(alumni.email, term),
        like(alumni.currentCompany, term),
      );
      if (search) conds.push(search);
    }
    if (status) conds.push(eq(alumni.status, status));

    const rows = await db
      .select()
      .from(alumni)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(alumni.createdAt));
    return json(rows);
  });
}
