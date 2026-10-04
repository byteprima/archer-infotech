/**
 * POST /api/seo/dataforseo — daily DataForSEO collection + scheduling.
 *
 * Hit by a Coolify scheduled task once a day. Collects finished
 * Standard-queue tasks (free), then posts whatever is due — SERP + AI
 * Overview weekly; map-pack grid, ChatGPT/Perplexity prompts, backlinks
 * and keyword volumes monthly — each only if it fits the monthly budget
 * (SEO_DFS_MONTHLY_BUDGET_USD, default $5). See dfs-jobs.ts.
 *
 * Auth: Bearer token matching SEO_DFS_SECRET. Returns 401 otherwise.
 * Returns 502 when every job that was attempted failed, so the scheduled
 * task shows red; budget skips and "not due" are not failures.
 *
 * Optional: ?only=serp,maps runs just those jobs (manual re-runs).
 *
 * Example cron command (Coolify scheduled task):
 *   curl -s -X POST https://archerinfotech.in/api/seo/dataforseo -H "Authorization: Bearer $SEO_DFS_SECRET"
 */
import { NextRequest, NextResponse } from "next/server";
import { dfsConfigured } from "@/lib/seo-dashboard/dataforseo";
import { runDataForSeo } from "@/lib/seo-dashboard/dfs-jobs";
import { JOB_CADENCE, type DfsJob } from "@/lib/seo-dashboard/dataforseo-plan";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const secret = process.env.SEO_DFS_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SEO_DFS_SECRET not configured on the server" }, { status: 500 });
  }
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!dfsConfigured()) {
    return NextResponse.json(
      { error: "DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not configured on the server" },
      { status: 500 },
    );
  }

  const onlyParam = request.nextUrl.searchParams.get("only");
  const only = onlyParam
    ? (onlyParam.split(",").filter((j) => j in JOB_CADENCE) as DfsJob[])
    : undefined;

  try {
    const summary = await runDataForSeo({ only });
    const attempted = summary.outcomes.filter((o) => o.job !== "collect" && o.status !== "not-due");
    const allFailed = attempted.length > 0 && attempted.every((o) => o.status === "error");
    return NextResponse.json({ success: !allFailed, ...summary }, { status: allFailed ? 502 : 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 502 });
  }
}
