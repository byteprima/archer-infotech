/**
 * POST /api/seo/snapshot — daily SEO snapshot capture.
 *
 * Hit by a Coolify scheduled task once/day. Pulls a fresh GSC-only
 * snapshot (PSI skipped — too slow / not needed for the rollup) and
 * persists the DailyRollup + tracked-keyword ranks so the dashboard
 * Trends tab has a time series.
 *
 * Auth: Bearer token in the Authorization header matching
 * SEO_SNAPSHOT_SECRET. Returns 401 otherwise.
 *
 * Example cron command (Coolify scheduled task):
 *   curl -s -X POST https://archerinfotech.in/api/seo/snapshot \
 *        -H "Authorization: Bearer $SEO_SNAPSHOT_SECRET"
 */
import { NextRequest, NextResponse } from "next/server";
import { loadDashboardSnapshot } from "@/lib/seo-dashboard/load";
import { captureDaily } from "@/lib/seo-dashboard/history";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// GSC pulls can take a while on a cold cache — give the route headroom.
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const secret = process.env.SEO_SNAPSHOT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SEO_SNAPSHOT_SECRET not configured on the server" },
      { status: 500 },
    );
  }
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await loadDashboardSnapshot({ force: true, skipPsi: true });
    const result = await captureDaily(snapshot, { force: true });
    return NextResponse.json({
      success: true,
      date: result.date,
      keywordsTracked: result.keywordsTracked,
      gscOk: !snapshot.gsc28d.error,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
