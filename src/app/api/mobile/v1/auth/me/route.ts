import { NextRequest } from "next/server";

import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(async () => {
    const payload = requireMobile(req);
    return json({ username: payload.sub, role: payload.role });
  });
}
