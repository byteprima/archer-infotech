"use client";

/**
 * Client-side Meta (Facebook) Pixel helpers.
 *
 * All functions are safe no-ops when the Pixel is absent — it is
 * lazy-mounted via MetaPixelLazy (~3s after load) and only present when
 * NEXT_PUBLIC_FACEBOOK_PIXEL_ID is set. The fbq stub (defined by the base
 * snippet the instant it runs) queues calls until fbevents.js finishes
 * loading, so a `Lead` fired immediately after a form submit is not lost.
 *
 * Consent model: NOTICE + OPT-OUT. The Pixel is active by default; a
 * visitor who clicks "Decline" in the cookie banner triggers
 * fbq('consent','revoke'), after which fbevents withholds all events for
 * that browser. The stored decision is re-applied before PageView on
 * subsequent visits (see meta-pixel-lazy.tsx inline script).
 */

export const COOKIE_CONSENT_KEY = "archer-cookie-consent";
export type CookieConsent = "granted" | "declined";

function getFbq(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  return typeof fbq === "function" ? fbq : undefined;
}

/**
 * Fire a Meta Pixel event (standard, e.g. "Lead"/"Subscribe", or custom).
 * Optional `params` map to Meta's event parameters (content_name, etc.).
 */
export function trackMetaPixelEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  const fbq = getFbq();
  if (!fbq) return;
  if (params) fbq("track", event, params);
  else fbq("track", event);
}

/** Read the stored consent decision, or null if the visitor hasn't chosen. */
export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return v === "granted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/** Persist a consent decision and apply it to the live Pixel immediately. */
export function setConsent(consent: CookieConsent): void {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  } catch {
    /* localStorage unavailable (e.g. private mode) — consent stays session-only */
  }
  const fbq = getFbq();
  if (fbq) fbq("consent", consent === "granted" ? "grant" : "revoke");
}
