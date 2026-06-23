import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { auditLogs, db } from "@/db";
import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const entityType = searchParams.get("entityType")?.trim();
    const limit = Math.min(
      Number.parseInt(searchParams.get("limit") || "100", 10) || 100,
      500,
    );

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(auditLogs.summary, term),
        like(auditLogs.actorLabel, term),
        like(auditLogs.action, term),
      );
      if (search) conds.push(search);
    }
    if (entityType) conds.push(eq(auditLogs.entityType, entityType));

    const rows = await db
      .select()
      .from(auditLogs)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);
    return json(rows);
  });
}
