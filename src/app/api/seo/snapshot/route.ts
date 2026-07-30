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
 * Returns 502 (and persists nothing) when the GSC pull fails or comes
 * back empty — a zero rollup is worse than a missing one.
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

    // Guard against banking a worthless rollup. `captureDaily` writes a
    // row whatever it's handed, so a failed (or empty) GSC pull persists
    // all-zero totals and parks every tracked keyword at position 0 —
    // indistinguishable in the Trends tab from genuinely ranking
    // nowhere. Refuse the write and fail the request so the Coolify
    // scheduled task shows red instead of a green "success".
    const gscError =
      snapshot.gsc28d.error ??
      snapshot.gscQueries28d.error ??
      snapshot.gscPages28d.error;
    if (gscError) {
      return NextResponse.json(
        { error: `GSC pull failed — snapshot not persisted: ${gscError}` },
        { status: 502 },
      );
    }
    if (!snapshot.gscQueries28d.result?.rows.length) {
      return NextResponse.json(
        {
          error:
            "GSC returned zero query rows — snapshot not persisted (treated as a failure; the site always has impressions over 28 days)",
        },
        { status: 502 },
      );
    }

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
