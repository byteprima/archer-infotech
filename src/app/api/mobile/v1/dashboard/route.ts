import { NextRequest } from "next/server";
import { count, desc, eq, gte } from "drizzle-orm";

import {
  alumni,
  auditLogs,
  batches,
  blogPosts,
  db,
  leads,
  placements,
  testimonials,
  user,
} from "@/db";
import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

function toMap(rows: Array<{ k: string | null; c: number }>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const row of rows) out[row.k ?? "unknown"] = row.c;
  return out;
}

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);

    const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);

    const [
      leadsTotal,
      leadsNew7d,
      leadsStatus,
      batchesTotal,
      batchesStatus,
      placementsTotal,
      placementsPub,
      testimonialsTotal,
      testimonialsPub,
      blogTotal,
      blogPub,
      alumniTotal,
      alumniStatus,
      usersTotal,
      recentLeads,
      recentActivity,
    ] = await Promise.all([
      db.select({ c: count() }).from(leads),
      db.select({ c: count() }).from(leads).where(gte(leads.createdAt, weekAgo)),
      db.select({ k: leads.status, c: count() }).from(leads).groupBy(leads.status),
      db.select({ c: count() }).from(batches),
      db.select({ k: batches.status, c: count() }).from(batches).groupBy(batches.status),
      db.select({ c: count() }).from(placements),
      db.select({ c: count() }).from(placements).where(eq(placements.isPublished, true)),
      db.select({ c: count() }).from(testimonials),
      db.select({ c: count() }).from(testimonials).where(eq(testimonials.isPublished, true)),
      db.select({ c: count() }).from(blogPosts),
      db.select({ c: count() }).from(blogPosts).where(eq(blogPosts.isPublished, true)),
      db.select({ c: count() }).from(alumni),
      db.select({ k: alumni.status, c: count() }).from(alumni).groupBy(alumni.status),
      db.select({ c: count() }).from(user),
      db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
      db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(8),
    ]);

    const blogTotalNum = blogTotal[0]?.c ?? 0;
    const blogPubNum = blogPub[0]?.c ?? 0;

    return json({
      leads: {
        total: leadsTotal[0]?.c ?? 0,
        new7d: leadsNew7d[0]?.c ?? 0,
        byStatus: toMap(leadsStatus),
      },
      batches: { total: batchesTotal[0]?.c ?? 0, byStatus: toMap(batchesStatus) },
      placements: {
        total: placementsTotal[0]?.c ?? 0,
        published: placementsPub[0]?.c ?? 0,
      },
      testimonials: {
        total: testimonialsTotal[0]?.c ?? 0,
        published: testimonialsPub[0]?.c ?? 0,
      },
      blog: {
        total: blogTotalNum,
        published: blogPubNum,
        drafts: blogTotalNum - blogPubNum,
      },
      alumni: { total: alumniTotal[0]?.c ?? 0, byStatus: toMap(alumniStatus) },
      users: { total: usersTotal[0]?.c ?? 0 },
      recentLeads,
      recentActivity,
    });
  });
}
