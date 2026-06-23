import { NextRequest } from "next/server";
import { count, desc, eq } from "drizzle-orm";

import { aiCitationAudits, db, seoDailyMetrics, seoKeywordRanks } from "@/db";
import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);

    // --- rollup: latest seoDailyMetrics row (by date) ---
    const rollupRows = await db
      .select({ date: seoDailyMetrics.date, payload: seoDailyMetrics.payload })
      .from(seoDailyMetrics)
      .orderBy(desc(seoDailyMetrics.date))
      .limit(1);
    let rollup: Record<string, unknown> | null = null;
    if (rollupRows[0]) {
      const row = rollupRows[0];
      try {
        const parsed = JSON.parse(row.payload) as Record<string, unknown>;
        rollup = { date: row.date, ...parsed };
      } catch {
        rollup = { date: row.date };
      }
    }

    // --- keywords: top rows for the latest date ---
    const latestKeywordDateRows = await db
      .select({ date: seoKeywordRanks.date })
      .from(seoKeywordRanks)
      .orderBy(desc(seoKeywordRanks.date))
      .limit(1);
    const latestDate = latestKeywordDateRows[0]?.date ?? null;
    let keywordItems: Array<{
      keyword: string;
      page: string | null;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }> = [];
    if (latestDate) {
      keywordItems = await db
        .select({
          keyword: seoKeywordRanks.keyword,
          page: seoKeywordRanks.page,
          clicks: seoKeywordRanks.clicks,
          impressions: seoKeywordRanks.impressions,
          ctr: seoKeywordRanks.ctr,
          position: seoKeywordRanks.position,
        })
        .from(seoKeywordRanks)
        .where(eq(seoKeywordRanks.date, latestDate))
        .orderBy(desc(seoKeywordRanks.impressions))
        .limit(50);
    }

    // --- aiCitations: aggregate counts ---
    const totalRows = await db
      .select({ c: count() })
      .from(aiCitationAudits);
    const mentionedRows = await db
      .select({ c: count() })
      .from(aiCitationAudits)
      .where(eq(aiCitationAudits.mentioned, true));
    const citedRows = await db
      .select({ c: count() })
      .from(aiCitationAudits)
      .where(eq(aiCitationAudits.cited, true));
    const total = totalRows[0]?.c ?? 0;
    const mentioned = mentionedRows[0]?.c ?? 0;
    const cited = citedRows[0]?.c ?? 0;
    const mentionRate = total ? Number((mentioned / total).toFixed(3)) : 0;

    return json({
      rollup,
      keywords: { date: latestDate, items: keywordItems },
      aiCitations: { total, mentioned, cited, mentionRate },
    });
  });
}
