import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, user } from "@/db";
import { ApiError, handle, json, readJson } from "@/lib/mobile-api/guard";
import { signToken } from "@/lib/mobile-api/jwt";

export const runtime = "nodejs";

/**
 * Google sign-in for the mobile app.
 *
 * The app obtains a Google ID token (via google_sign_in with serverClientId =
 * GOOGLE_CLIENT_ID, the Web OAuth client) and POSTs it here. We validate the
 * token with Google, then authorize the account as an admin if its email is in
 * MOBILE_ADMIN_EMAILS (comma-separated) OR it already maps to an admin-role row
 * in the better-auth `user` table. On success we mint the same JWT the
 * username/password login issues.
 */
function adminAllowlist(): string[] {
  return (process.env.MOBILE_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

interface GoogleTokenInfo {
  aud?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    const body = await readJson(req);
    const idToken = String(body.idToken || "");
    if (!idToken) throw new ApiError(400, "Missing idToken");

    // Validate the ID token with Google's tokeninfo endpoint.
    const res = await fetch(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" +
        encodeURIComponent(idToken),
    );
    if (!res.ok) throw new ApiError(401, "Invalid Google token");
    const info = (await res.json()) as GoogleTokenInfo;

    const expectedAud = process.env.GOOGLE_CLIENT_ID;
    if (!expectedAud || info.aud !== expectedAud) {
      throw new ApiError(401, "Google token audience mismatch");
    }

    const email = (info.email || "").toLowerCase();
    const emailVerified =
      info.email_verified === true || info.email_verified === "true";
    if (!email || !emailVerified) {
      throw new ApiError(401, "Unverified Google account");
    }

    // Authorize: allowlist, or an existing admin-role user with this email.
    let isAdmin = adminAllowlist().includes(email);
    if (!isAdmin) {
      const rows = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);
      isAdmin = rows[0]?.role === "admin";
    }
    if (!isAdmin) {
      throw new ApiError(403, "This Google account is not authorized as an admin");
    }

    const { token, expiresAt } = signToken({ sub: email, role: "admin" });
    return json({
      access_token: token,
      token_type: "bearer",
      expires_at: expiresAt.toISOString(),
      user: { username: email, role: "admin", name: info.name || email },
    });
  });
}
