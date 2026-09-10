/**
 * The legacy shared admin login — deprecated, see docs/lead-crm.md.
 *
 * A single username/password pair from the environment, predating real user
 * accounts. The website's own /admin/login form no longer uses it (that is
 * better-auth), but the Flutter admin app still authenticates against
 * /api/mobile/v1/auth/login, which does. So it cannot simply be deleted.
 *
 * Three things were wrong with it and are fixed here:
 *
 *  1. It fell back to the literals "admin" / "archer2024" when the environment
 *     was unset, so an unconfigured deploy accepted a password published in
 *     this repository. It now fails closed: no credentials configured means no
 *     legacy login at all.
 *  2. The session cookie was base64("<ADMIN_SESSION_SECRET>:<timestamp>") — it
 *     carried the signing secret itself in recoverable plaintext, and that
 *     secret doubles as the mobile JWT key when MOBILE_JWT_SECRET is unset.
 *     The cookie is now an HMAC over the issue time; the secret never leaves
 *     the server.
 *  3. The timestamp was never checked, so a captured cookie stayed valid
 *     forever. Sessions now expire server-side, matching the cookie maxAge.
 *
 * ADMIN_LEGACY_LOGIN=off disables it outright without unsetting the variables.
 * Flip that once the mobile app authenticates as a real user; then this file
 * and the two routes calling verifyCredentials can go.
 *
 * Kept free of next/headers and database imports so it is unit testable.
 */
import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

function env(name: string): string | null {
  const value = process.env[name];
  return value && value.trim() !== "" ? value : null;
}

/**
 * Whether the shared env login is available at all.
 *
 * Requires all three variables to be set AND the kill switch not to be off.
 * Missing configuration disables the login rather than falling back to a
 * default, so a half-configured deploy is closed, not guessable.
 */
export function isLegacyLoginEnabled(): boolean {
  if (env("ADMIN_LEGACY_LOGIN")?.toLowerCase() === "off") {
    return false;
  }
  return Boolean(
    env("ADMIN_USERNAME") && env("ADMIN_PASSWORD") && env("ADMIN_SESSION_SECRET")
  );
}

/** Constant-time compare that tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  if (!isLegacyLoginEnabled()) return false;
  // Both compares always run: `&&` would short-circuit on a wrong username and
  // leak, through timing, whether the username alone was right.
  const userOk = safeEqual(username, env("ADMIN_USERNAME")!);
  const passOk = safeEqual(password, env("ADMIN_PASSWORD")!);
  return userOk && passOk;
}

function sign(issuedAt: number): string {
  return crypto
    .createHmac("sha256", env("ADMIN_SESSION_SECRET")!)
    .update(`admin:${issuedAt}`)
    .digest("base64url");
}

export function signSessionToken(now: number = Date.now()): string {
  if (!isLegacyLoginEnabled()) {
    throw new Error("Legacy admin login is disabled");
  }
  return `${now}.${sign(now)}`;
}

/**
 * Validate a legacy session cookie.
 *
 * Old-format cookies (base64 of "<secret>:<timestamp>") are NOT accepted —
 * they are exactly the leak being closed. Anyone holding one is signed out and
 * logs in again; the cookie only lasted 24 hours anyway.
 */
export function verifySessionToken(
  token: string,
  now: number = Date.now()
): boolean {
  if (!isLegacyLoginEnabled()) return false;

  const [issuedAtRaw, signature] = token.split(".");
  const issuedAt = Number(issuedAtRaw);
  if (!signature || !issuedAtRaw || !Number.isSafeInteger(issuedAt)) {
    return false;
  }

  const age = now - issuedAt;
  if (age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000) return false;

  return safeEqual(signature, sign(issuedAt));
}
