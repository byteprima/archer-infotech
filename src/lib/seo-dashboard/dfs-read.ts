/**
 * SEO Dashboard — read side of the DataForSEO tables, for /admin/seo.
 * Cheap local queries; every function returns empty data (never zeros
 * pretending to be measurements) until the job has collected something.
 */
import { asc, desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { seoBacklinkSnapshots, seoKeywordMeta, seoSerpSnapshots } from "@/db/schema";
import { dfsBalanceUsd, dfsConfigured, monthlyBudgetUsd, monthSpendUsd } from "./dataforseo";
import { opportunityScore, OUR_DOMAIN } from "./dataforseo-plan";
import { withCache } from "./cache";
import { TARGET_KEYWORDS } from "./targets";

export interface SerpRow {
  keyword: string;
  targetPath: string;
  position: number | null;
  previousPosition: number | null;
  url: string | null;
  urlMatchesTarget: boolean;
  resultsCount: number;
  aioPresent: boolean;
  aioCitesUs: boolean;
  aioDomains: string[];
  localPackPresent: boolean;
  localPackUs: boolean;
  top3: string[];
  volumePune: number | null;
  opportunity: number;
}

export interface SerpView {
  date: string | null;
  previousDate: string | null;
  rows: SerpRow[];
}

function pathOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

/** Latest SERP snapshot, with the previous one for movement. */
export async function getSerpView(): Promise<SerpView> {
  const dates = await db
    .selectDistinct({ date: seoSerpSnapshots.date })
    .from(seoSerpSnapshots)
    .orderBy(desc(seoSerpSnapshots.date))
    .limit(2);
  const [latest, previous] = dates.map((d) => d.date);
  if (!latest) return { date: null, previousDate: null, rows: [] };

  const rows = await db
    .select()
    .from(seoSerpSnapshots)
    .where(inArray(seoSerpSnapshots.date, previous ? [latest, previous] : [latest]));
  const meta = new Map((await db.select().from(seoKeywordMeta)).map((m) => [m.keyword, m]));

  const out: SerpRow[] = TARGET_KEYWORDS.flatMap((k) => {
    const cur = rows.find((r) => r.date === latest && r.keyword === k.keyword);
    if (!cur) return [];
    const prev = rows.find((r) => r.date === previous && r.keyword === k.keyword);
    const path = pathOf(cur.ourUrl);
    const vol = meta.get(k.keyword)?.volumePune ?? null;
    return [
      {
        keyword: k.keyword,
        targetPath: k.targetPath,
        position: cur.ourPosition,
        previousPosition: prev?.ourPosition ?? null,
        url: path,
        urlMatchesTarget: path !== null && path === (k.targetPath.replace(/\/$/, "") || "/"),
        resultsCount: cur.resultsCount,
        aioPresent: cur.aioPresent,
        aioCitesUs: cur.aioCitesUs,
        aioDomains: JSON.parse(cur.aioDomains) as string[],
        localPackPresent: cur.localPackPresent,
        localPackUs: cur.localPackUs,
        top3: (JSON.parse(cur.top10) as string[]).slice(0, 3),
        volumePune: vol,
        opportunity: opportunityScore(vol, cur.ourPosition),
      },
    ];
  });
  return { date: latest, previousDate: previous ?? null, rows: out };
}

export interface BacklinkPoint {
  date: string;
  referringDomains: number;
  backlinks: number;
  domainRank: number;
}

export interface BacklinkView {
  /** Our history, oldest first. */
  ours: BacklinkPoint[];
  /** Latest snapshot of every tracked domain (us included). */
  latest: (BacklinkPoint & { target: string; spamScore: number | null })[];
}

export async function getBacklinkView(): Promise<BacklinkView> {
  const all = await db.select().from(seoBacklinkSnapshots).orderBy(asc(seoBacklinkSnapshots.date));
  if (all.length === 0) return { ours: [], latest: [] };
  const lastDate = all[all.length - 1].date;
  return {
    ours: all
      .filter((r) => r.target === OUR_DOMAIN)
      .map(({ date, referringDomains, backlinks, domainRank }) => ({
        date,
        referringDomains,
        backlinks,
        domainRank,
      })),
    latest: all
      .filter((r) => r.date === lastDate)
      .sort((a, b) => b.referringDomains - a.referringDomains)
      .map(({ date, target, referringDomains, backlinks, domainRank, spamScore }) => ({
        date,
        target,
        referringDomains,
        backlinks,
        domainRank,
        spamScore,
      })),
  };
}

export interface BudgetView {
  configured: boolean;
  monthSpendUsd: number;
  budgetUsd: number;
  balanceUsd: number | null;
}

/** Budget meter. The balance is a free call, cached for 6 hours. */
export async function getBudgetView(): Promise<BudgetView> {
  const configured = dfsConfigured();
  const spend = await monthSpendUsd();
  let balanceUsd: number | null = null;
  if (configured) {
    try {
      const { data } = await withCache(
        { source: "dfs-balance", scopeValue: "global", ttlSeconds: 6 * 3600 },
        async () => ({ balance: await dfsBalanceUsd() }),
      );
      balanceUsd = Number.isFinite(data.balance) ? data.balance : null;
    } catch {
      /* the meter still shows spend vs budget */
    }
  }
  return { configured, monthSpendUsd: spend, budgetUsd: monthlyBudgetUsd(), balanceUsd };
}

/** Last refresh of keyword volumes, for the UI caption. */
export async function keywordMetaUpdatedAt(): Promise<Date | null> {
  const [row] = await db
    .select({ at: seoKeywordMeta.updatedAt })
    .from(seoKeywordMeta)
    .orderBy(desc(seoKeywordMeta.updatedAt))
    .limit(1);
  return row?.at ?? null;
}

