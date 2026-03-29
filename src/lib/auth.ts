import { cookies } from "next/headers";

// Simple session-based authentication for admin panel
// In production, use a proper auth solution like NextAuth.js

const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "default-secret-change-me";

// For MVP, using simple password auth
// TODO: Replace with proper auth (NextAuth.js) in production
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "archer2024";

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
  // Generate a simple session token
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

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
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
