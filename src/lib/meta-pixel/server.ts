/**
 * Meta (Facebook) Conversions API — server-side event delivery.
 *
 * Server-only by construction: it imports `next/headers`, which Next.js
 * refuses to bundle into client components — so this never reaches the
 * browser even without the `server-only` marker package.
 *
 * Complements the browser Pixel (MetaPixelLazy): the same conversions are
 * sent a second time directly from our server to Meta's Graph API, so the
 * events survive ad-blockers, iOS ITP, and the lazy-load window that can
 * drop the browser beacon. Meta DEDUPLICATES the two streams by matching
 * (event_name + event_id) — the browser call passes `{ eventID }` and this
 * sender passes the same value as `event_id`, so a conversion counts once.
 *
 * Safe no-op until configured: if NEXT_PUBLIC_FACEBOOK_PIXEL_ID or
 * META_CAPI_ACCESS_TOKEN is missing, the function returns silently. It
 * never throws into the calling server action — failures are logged only.
 *
 * Required env:
 *   NEXT_PUBLIC_FACEBOOK_PIXEL_ID  — the dataset/pixel id (already set)
 *   META_CAPI_ACCESS_TOKEN         — System User token from Events Manager
 *                                    → Settings → Conversions API (SECRET)
 * Optional env:
 *   META_CAPI_TEST_EVENT_CODE      — set temporarily to make events show up
 *                                    in Events Manager → Test Events
 */

import { createHash } from "crypto";
import { cookies, headers } from "next/headers";

const GRAPH_API_VERSION = "v21.0";

export interface MetaUserData {
  email?: string;
  /** Raw phone; normalised to digits + country code before hashing. */
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface MetaConversionEvent {
  /** Standard event name, e.g. "Lead" | "Subscribe". Must match the browser pixel for dedup. */
  eventName: string;
  /** Dedup key — the SAME id passed to the browser pixel via `{ eventID }`. */
  eventId: string;
  /** Full URL the event happened on (window.location.href). */
  eventSourceUrl?: string;
  userData?: MetaUserData;
  customData?: Record<string, string | number | undefined>;
}

/** SHA-256 of a normalised (trim + lowercase) string, per Meta's hashing spec. */
function hashNormalized(value?: string): string | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

/**
 * Normalise + hash a phone number. Strips non-digits, prepends India's
 * country code (91) for bare 10-digit numbers, and skips obvious stubs
 * (e.g. the "0000000000" placeholder newsletter signups send) so we don't
 * pollute Meta's match quality with junk.
 */
function hashPhone(phone?: string): string | undefined {
  let digits = phone?.replace(/\D/g, "") ?? "";
  if (digits.length === 10) digits = `91${digits}`;
  if (!digits || /^0+$/.test(digits)) return undefined;
  return createHash("sha256").update(digits).digest("hex");
}

/** Prune undefined values so the JSON payload stays clean. */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""),
  ) as Partial<T>;
}

export async function sendMetaConversionEvent(
  event: MetaConversionEvent,
): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  // Not configured yet → no-op. Lets the code ship before the token is set.
  if (!pixelId || !accessToken) return;

  try {
    const [hdrs, cookieStore] = await Promise.all([headers(), cookies()]);

    // Client IP: prefer Cloudflare's header (the site is fronted by CF),
    // then the standard forwarded chain's first hop.
    const clientIp =
      hdrs.get("cf-connecting-ip") ||
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;
    const clientUserAgent = hdrs.get("user-agent") || undefined;

    // Meta browser-id cookies (set by fbevents.js). _fbc only exists when
    // the visitor arrived via an fbclid link; both are optional.
    const fbp = cookieStore.get("_fbp")?.value;
    const fbc = cookieStore.get("_fbc")?.value;

    const userData = compact({
      em: hashNormalized(event.userData?.email),
      ph: hashPhone(event.userData?.phone),
      fn: hashNormalized(event.userData?.firstName),
      ln: hashNormalized(event.userData?.lastName),
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
      fbp,
      fbc,
    });

    const payloadEvent = compact({
      event_name: event.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: event.eventId,
      event_source_url: event.eventSourceUrl,
      action_source: "website",
      user_data: userData,
      custom_data: event.customData ? compact(event.customData) : undefined,
    });

    const body: Record<string, unknown> = { data: [payloadEvent] };
    if (process.env.META_CAPI_TEST_EVENT_CODE) {
      body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
    }

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        // Conversions should not block the user's response longer than needed.
        signal: AbortSignal.timeout(4000),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `Meta CAPI "${event.eventName}" failed (${res.status}): ${text}`,
      );
    }
  } catch (error) {
    // Never let analytics failures break the form submission.
    console.error(`Meta CAPI "${event.eventName}" error:`, error);
  }
}
