import { cookies, headers } from "next/headers";
import { getAuth } from "./auth-server";
import { canAccessAdmin } from "@/lib/leads/roles";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  isLegacyLoginEnabled,
  signSessionToken,
  verifySessionToken,
} from "./legacy-admin-auth";

/**
 * Next's prerender bailout, thrown from headers()/cookies() during static
 * generation. It must reach Next, not a catch block — see getSession().
 */
function isNextDynamicUsage(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { digest?: unknown; message?: unknown };
  if (typeof e.digest === "string" && e.digest.startsWith("DYNAMIC_SERVER_USAGE")) {
    return true;
  }
  return (
    typeof e.message === "string" && e.message.includes("Dynamic server usage")
  );
}

/**
 * Get the current session from better-auth
 */
export async function getSession() {
  const auth = getAuth();
  if (!auth) {
    return null;
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    // Next signals "this route cannot be prerendered" by THROWING from
    // headers(). Swallowing that told Next the page had rendered fine — as a
    // logged-out redirect — so it prerendered all 32 admin routes as static
    // redirects to /admin/login, served with a year-long s-maxage. No cookie
    // was ever consulted and nobody could sign in. Rethrow it so Next marks
    // the route dynamic, which is what it is asking for.
    if (isNextDynamicUsage(error)) throw error;
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Check if the current user is authenticated
 * Supports both better-auth and legacy auth for backward compatibility
 */
export async function isAuthenticated(): Promise<boolean> {
  // First check better-auth session
  const session = await getSession();
  if (session?.user) {
    return true;
  }

  // Fall back to legacy auth
  return isLegacyAuthenticated();
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session?.user) {
    // Fall back to legacy auth for admin check
    return isLegacyAuthenticated();
  }

  // `role` is an additional field better-auth carries on the user record but
  // does not surface on its inferred session type, so the access needs a
  // narrow cast. This replaces a blanket `@ts-ignore`, which would have
  // silenced any future error on this line, not just the known one.
  // Was `role === "admin"` exactly. Managers and counsellors are staff too
  // and must be able to open the panel at all; WHICH parts they may reach is
  // decided per-area by lib/leads/roles.ts, not here.
  return canAccessAdmin((session.user as { role?: string }).role);
}

/**
 * The current user's role, or null when nobody is signed in.
 *
 * Returns "admin" for the legacy shared env login, which has no user row.
 * That login predates roles and is still how the mobile admin app signs in, so
 * treating it as anything less would break it. It is also the reason role
 * restrictions are not yet a security boundary; see docs/lead-crm.md. It is
 * disabled entirely when its environment variables are unset or
 * ADMIN_LEGACY_LOGIN=off.
 */
export async function getCurrentRole(): Promise<string | null> {
  const session = await getSession();
  if (session?.user) {
    return (session.user as { role?: string }).role ?? null;
  }
  return (await isLegacyAuthenticated()) ? "admin" : null;
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

// ============================================
// Legacy Authentication (deprecated — see docs/lead-crm.md)
// ============================================
//
// Credential and token logic lives in ./legacy-admin-auth so it can be unit
// tested without a request context. This half is the cookie plumbing.

export {
  isLegacyLoginEnabled,
  verifyCredentials,
  verifySessionToken,
} from "./legacy-admin-auth";

export async function createSession(): Promise<string> {
  return signSessionToken();
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/admin",
  });
}

export async function getLegacySession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value || null;
}

export async function isLegacyAuthenticated(): Promise<boolean> {
  if (!isLegacyLoginEnabled()) return false;
  const session = await getLegacySession();
  if (!session) return false;
  return verifySessionToken(session);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
