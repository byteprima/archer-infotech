/**
 * Tiny, dependency-free HS256 JWT for the mobile admin API.
 *
 * We sign with Node's crypto (these routes run in the nodejs runtime because
 * better-sqlite3 isn't edge-compatible), so there's no extra package to add to
 * the website. The secret comes from MOBILE_JWT_SECRET (falls back to the
 * existing ADMIN_SESSION_SECRET so dev works out of the box).
 */
import crypto from "crypto";

const SECRET =
  process.env.MOBILE_JWT_SECRET ||
  process.env.ADMIN_SESSION_SECRET ||
  "dev-insecure-mobile-secret-change-me";

const EXPIRES_SECONDS = 60 * 60 * 72; // 72h

function b64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

export interface MobileTokenPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export function signToken(claims: { sub: string; role: string }): {
  token: string;
  expiresAt: Date;
} {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + EXPIRES_SECONDS;
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify({ ...claims, iat, exp }));
  const data = `${header}.${payload}`;
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return { token: `${data}.${sig}`, expiresAt: new Date(exp * 1000) };
}

export function verifyToken(token: string): MobileTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    ) as MobileTokenPayload;
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}
