import { cookies, headers } from "next/headers";
import { getAuth } from "./auth-server";

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

  // Check if user has admin role
  // @ts-ignore - role is an additional field
  return session.user.role === "admin";
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

// ============================================
// Legacy Authentication (for backward compatibility)
// ============================================

const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "default-secret-change-me";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "archer2024";

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
  const token = Buffer.from(`${SESSION_SECRET}:${Date.now()}`).toString("base64");
  return token;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/admin",
  });
}

export async function getLegacySession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value || null;
}

export async function isLegacyAuthenticated(): Promise<boolean> {
  const session = await getLegacySession();
  if (!session) return false;

  try {
    const decoded = Buffer.from(session, "base64").toString();
    const [secret] = decoded.split(":");
    return secret === SESSION_SECRET;
  } catch {
    return false;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
