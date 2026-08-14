/**
 * The active campaign popup, or null.
 *
 * This exists as an API route rather than being rendered into the page
 * because the site's HTML is edge-cached at Cloudflare for up to 6 hours
 * (see next.config.ts). Anything baked into a page would keep showing a
 * switched-off popup, or keep hiding a switched-on one, for that long.
 * Reading it from an uncached endpoint makes the admin toggle take effect
 * on the next page load instead.
 *
 * The response is deliberately tiny and carries nothing about the visitor,
 * so it costs one request after first interaction and nothing before.
 */
import { NextResponse } from "next/server";

import { getActivePopup } from "@/lib/actions/popup-campaigns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const popup = await getActivePopup();

  return NextResponse.json(
    { popup },
    {
      headers: {
        // Belt and braces: force-dynamic keeps Next from prerendering it,
        // this keeps Cloudflare and the browser from holding onto it. An
        // admin switching the popup off expects that to be immediate.
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    },
  );
}
