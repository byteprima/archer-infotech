import { NextRequest } from "next/server";

import { verifyCredentials } from "@/lib/auth";
import { ApiError, handle, json, readJson } from "@/lib/mobile-api/guard";
import { signToken } from "@/lib/mobile-api/jwt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handle(async () => {
    const body = await readJson(req);
    const username = String(body.username || "");
    const password = String(body.password || "");
    if (!username || !password) {
      throw new ApiError(400, "Username and password are required");
    }
    if (!(await verifyCredentials(username, password))) {
      throw new ApiError(401, "Invalid username or password");
    }
    const { token, expiresAt } = signToken({ sub: username, role: "admin" });
    return json({
      access_token: token,
      token_type: "bearer",
      expires_at: expiresAt.toISOString(),
      user: { username, role: "admin" },
    });
  });
}
