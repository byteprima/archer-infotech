/**
 * Minimal in-memory rate limiter for public write paths.
 *
 * The site had none. Every public form — contact, alumni, and now placement
 * submissions — wrote to the database on any POST, with nothing between an
 * automated client and a row. That is tolerable for an enquiry form whose
 * worst case is junk in a leads list; it is not tolerable for a form that
 * feeds the placement review queue, because every fake submission is manual
 * work for whoever clears it.
 *
 * Deliberately in-process and dependency-free. This app runs as a single
 * container behind Coolify, so one process sees every request and a shared
 * store would add a dependency for no gain. If it is ever scaled to more
 * than one instance, this becomes per-instance and the limits below should
 * move to Redis — that is the tradeoff being made, not an oversight.
 *
 * Counters live in a Map that is swept on write. Memory is bounded by the
 * number of distinct keys seen inside the window, which for a form on one
 * site is small.
 */

interface Bucket {
  count: number;
  /** Epoch ms when this bucket resets. */
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the Map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may retry. Only meaningful when ok is false. */
  retryAfter: number;
}

/**
 * Consume one unit against `key`. Returns ok:false once `limit` is exceeded
 * inside `windowMs`.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  if (buckets.size > 500) sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client identifier from proxy headers.
 *
 * Traefik and Cloudflare both sit in front of this app, so the socket
 * address is always the proxy. `cf-connecting-ip` is set by Cloudflare and
 * cannot be spoofed by the client on a Cloudflare-fronted host;
 * x-forwarded-for is the fallback and its FIRST entry is the original
 * client. Falls back to a constant so a missing header degrades to a shared
 * bucket rather than to no limit at all.
 */
export function clientKey(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}
