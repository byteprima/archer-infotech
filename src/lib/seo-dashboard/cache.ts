/**
 * SEO Dashboard — cache layer over the seoMetricsCache table.
 *
 * The pattern: every API wrapper calls `withCache(source, scope,
 * variant, ttlSeconds, fetcher)`. If a non-expired row exists, return
 * the parsed payload. Otherwise call the fetcher, persist the result,
 * return it.
 *
 * TTLs by source (set so a typical Friday weekly review uses ≤1 set
 * of fresh API calls and the rest of the week serves from cache):
 *   - GSC query    : 6h   (search analytics moves slowly; weekly cadence)
 *   - GSC inspect  : 24h  (URL state changes ~daily after deploy spike)
 *   - PSI          : 24h  (synthetic; only re-run when something changed)
 *   - CrUX origin  : 24h  (28-day rolling window; daily refresh is plenty)
 *   - CrUX url     : 24h  (same)
 *
 * The dashboard refresh button forces a re-fetch by calling the
 * fetcher directly with `force: true` — it bypasses the cache read
 * but still writes the result back so subsequent reads hit cache.
 */
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/db";
import { seoMetricsCache } from "@/db/schema";

export type CacheSource =
  | "gsc-query"
  | "gsc-inspect"
  | "psi"
  | "crux-origin"
  | "crux-url"
  | "crux-history";

interface WithCacheOptions {
  source: CacheSource;
  scopeValue: string;
  variant?: string;
  /** Cache lifetime in seconds. */
  ttlSeconds: number;
  /** When true, ignore any existing cache row and force a re-fetch. */
  force?: boolean;
}

/**
 * Generic cache-through helper.
 *   - On cache hit: returns parsed payload immediately.
 *   - On miss / stale / force: runs fetcher, persists, returns.
 *   - On fetcher error after a stale-but-existing row: returns the
 *     stale payload rather than throwing — better stale data than no
 *     data when the dashboard is being viewed.
 */
export async function withCache<T>(
  options: WithCacheOptions,
  fetcher: () => Promise<T>,
): Promise<{ data: T; fetchedAt: Date; fromCache: boolean }> {
  const { source, scopeValue, variant, ttlSeconds, force } = options;
  const now = new Date();

  if (!force) {
    const conds = [
      eq(seoMetricsCache.source, source),
      eq(seoMetricsCache.scopeValue, scopeValue),
      gt(seoMetricsCache.expiresAt, now),
    ];
    if (variant !== undefined) {
      conds.push(eq(seoMetricsCache.variant, variant));
    }
    const existing = await db
      .select()
      .from(seoMetricsCache)
      .where(and(...conds))
      .orderBy(seoMetricsCache.fetchedAt)
      .limit(1);
    if (existing.length > 0) {
      const row = existing[existing.length - 1];
      return {
        data: JSON.parse(row.payload) as T,
        fetchedAt: row.fetchedAt,
        fromCache: true,
      };
    }
  }

  let data: T;
  try {
    data = await fetcher();
  } catch (err) {
    // Stale-fallback: if a previous (now-expired) row exists, return
    // it rather than failing the whole dashboard render.
    const stale = await db
      .select()
      .from(seoMetricsCache)
      .where(
        and(
          eq(seoMetricsCache.source, source),
          eq(seoMetricsCache.scopeValue, scopeValue),
          ...(variant !== undefined
            ? [eq(seoMetricsCache.variant, variant)]
            : []),
        ),
      )
      .orderBy(seoMetricsCache.fetchedAt)
      .limit(1);
    if (stale.length > 0) {
      const row = stale[stale.length - 1];
      return {
        data: JSON.parse(row.payload) as T,
        fetchedAt: row.fetchedAt,
        fromCache: true,
      };
    }
    throw err;
  }

  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);
  await db.insert(seoMetricsCache).values({
    source,
    scopeValue,
    variant: variant ?? null,
    payload: JSON.stringify(data),
    fetchedAt: now,
    expiresAt,
  });

  return { data, fetchedAt: now, fromCache: false };
}

/**
 * Drop all cache rows for the given source — useful for the
 * dashboard's "force refresh" action. When source is omitted, drops
 * everything.
 */
export async function clearCache(source?: CacheSource): Promise<number> {
  if (source) {
    const result = await db
      .delete(seoMetricsCache)
      .where(eq(seoMetricsCache.source, source));
    return result.changes ?? 0;
  }
  const result = await db.delete(seoMetricsCache);
  return result.changes ?? 0;
}
