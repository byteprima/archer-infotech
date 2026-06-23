/**
 * Shared helpers for the mobile admin API route handlers: bearer-token auth,
 * a JSON helper, and an error wrapper that mirrors the error shape the Flutter
 * app expects ({ "detail": "..." }).
 */
import { NextRequest, NextResponse } from "next/server";

import { verifyToken, type MobileTokenPayload } from "./jwt";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Validate the Authorization: Bearer <jwt> header or throw a 401. */
export function requireMobile(req: NextRequest): MobileTokenPayload {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = token ? verifyToken(token) : null;
  if (!payload || payload.role !== "admin") {
    throw new ApiError(401, "Invalid or expired token");
  }
  return payload;
}

export function json(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

/** Wrap a handler so thrown ApiErrors become clean JSON responses. */
export async function handle(
  fn: () => Promise<Response> | Response,
): Promise<Response> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof ApiError) {
      return NextResponse.json({ detail: e.message }, { status: e.status });
    }
    console.error("[mobile-api] unhandled error:", e);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 },
    );
  }
}

/** Parse a JSON body, tolerating empty bodies. */
export async function readJson(req: NextRequest): Promise<Record<string, unknown>> {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}
