/**
 * SEO Dashboard — the DataForSEO job (phase 4 pieces A–E).
 *
 * Run once a day by POST /api/seo/dataforseo. Each run:
 *   1. collects finished Standard-queue tasks (free) and stores them;
 *   2. posts or runs whatever is due — SERP + AI Overview weekly; map
 *      grid, ChatGPT/Perplexity prompts, backlinks and volumes monthly —
 *      each only if its estimated cost fits the monthly budget.
 *
 * Collecting on the *next* run is what keeps this cheap: the Standard
 * queue costs a third of Live but takes 5–20 minutes to finish.
 */
import { and, count, eq, inArray, like, lt, max } from "drizzle-orm";
import { db } from "@/db";
import {
  aiCitationAudits,
  seoBacklinkSnapshots,
  seoDfsTasks,
  seoGeoGrid,
  seoKeywordMeta,
  seoSerpSnapshots,
} from "@/db/schema";
import { CANONICAL_PROMPTS } from "@/lib/ai-engines/canonical-prompts";
import {
  assertBudget,
  BudgetExceededError,
  dfsBalanceUsd,
  dfsConfigured,
  dfsFree,
  dfsPaid,
  monthlyBudgetUsd,
  monthSpendUsd,
  recordSpend,
} from "./dataforseo";
import {
  ADS_LOCATION_INDIA,
  ADS_LOCATION_PUNE,
  estimateBacklinks,
  estimateLlm,
  estimateMaps,
  estimateSerp,
  estimateVolumes,
  isDue,
  isoDate,
  MODEL,
  OUR_DOMAIN,
  parseLlm,
  parseMapsRank,
  parseSerp,
  SERP_DEPTH,
  settledLlmCost,
  SERP_LOCATION,
  type DfsJob,
} from "./dataforseo-plan";
import { PLANNED_KEYWORDS, plannedPoints } from "./geo-grid";
import { TARGET_KEYWORDS, TRACKED_COMPETITORS } from "./targets";

type TaskKind = "serp" | "maps" | "llm-chatgpt";

const GET_PATH: Record<TaskKind, string> = {
  serp: "/v3/serp/google/organic/task_get/advanced/",
  maps: "/v3/serp/google/maps/task_get/advanced/",
  "llm-chatgpt": "/v3/ai_optimization/chat_gpt/llm_responses/task_get/",
};

/** DataForSEO task statuses that mean "not finished yet". */
const IN_PROGRESS = new Set([40601, 40602]);
/** A task still pending after this long is given up on. */
const GIVE_UP_MS = 4 * 86_400_000;

export interface JobOutcome {
  job: DfsJob | "collect";
  status: "done" | "skipped" | "not-due" | "budget" | "error" | "out-of-time";
  detail?: string;
}

export interface DfsRunSummary {
  date: string;
  outcomes: JobOutcome[];
  collected: number;
  stillPending: number;
  monthSpendUsd: number;
  budgetUsd: number;
  balanceUsd: number | null;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

async function pool<T>(items: T[], size: number, fn: (t: T) => Promise<void>): Promise<void> {
  let i = 0;
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) await fn(items[i++]);
  });
  await Promise.all(workers);
}

function chunk<T>(xs: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += n) out.push(xs.slice(i, i + n));
  return out;
}

async function lastRun(job: DfsJob): Promise<string | null> {
  if (job === "backlinks") {
    const [r] = await db.select({ d: max(seoBacklinkSnapshots.date) }).from(seoBacklinkSnapshots);
    return r?.d ?? null;
  }
  if (job === "volumes") {
    const [r] = await db.select({ d: max(seoKeywordMeta.updatedAt) }).from(seoKeywordMeta);
    return r?.d ? isoDate(new Date(r.d)) : null;
  }
  const kind = job === "llm" ? like(seoDfsTasks.kind, "llm-%") : eq(seoDfsTasks.kind, job);
  const [r] = await db.select({ d: max(seoDfsTasks.runDate) }).from(seoDfsTasks).where(kind);
  return r?.d ?? null;
}

/** Store the task ids DataForSEO accepted. */
async function saveTasks(
  kind: TaskKind,
  runDate: string,
  tasks: { id: string; status_code: number; status_message: string; data?: Record<string, unknown> }[],
  meta: (data: Record<string, unknown>) => { subject: string; location?: string; lat?: number; lng?: number },
): Promise<number> {
  let accepted = 0;
  for (const t of tasks) {
    const m = meta(t.data ?? {});
    const ok = t.status_code === 20100;
    if (ok) accepted++;
    await db
      .insert(seoDfsTasks)
      .values({
        taskId: t.id,
        kind,
        runDate,
        subject: m.subject,
        location: m.location ?? null,
        lat: m.lat ?? null,
        lng: m.lng ?? null,
        status: ok ? "pending" : "failed",
        error: ok ? null : `${t.status_code} ${t.status_message}`,
      })
      .onConflictDoNothing();
  }
  return accepted;
}

// ---------------------------------------------------------------------
// Posting (billed)
// ---------------------------------------------------------------------

async function postSerp(runDate: string): Promise<string> {
  const body = TARGET_KEYWORDS.map((k) => ({
    keyword: k.keyword,
    location_name: SERP_LOCATION,
    language_code: "en",
    device: "mobile",
    os: "android",
    depth: SERP_DEPTH,
    load_async_ai_overview: true,
    tag: k.keyword,
  }));
  const res = await dfsPaid("/v3/serp/google/organic/task_post", body, estimateSerp(body.length));
  const n = await saveTasks("serp", runDate, res.tasks ?? [], (d) => ({ subject: String(d.keyword) }));
  return `${n}/${body.length} keywords queued ($${(res.cost ?? 0).toFixed(3)})`;
}

async function postMaps(runDate: string): Promise<string> {
  const points = plannedPoints();
  const body = PLANNED_KEYWORDS.flatMap((keyword) =>
    points.map((p) => ({
      keyword,
      location_coordinate: `${p.lat},${p.lng},14z`,
      language_code: "en",
      device: "desktop",
      depth: 100,
      tag: p.label,
    })),
  );
  // Reserve the whole batch up front, then post in ≤100-task chunks.
  await assertBudget(estimateMaps(PLANNED_KEYWORDS.length, points.length));
  let queued = 0;
  let cost = 0;
  for (const part of chunk(body, 100)) {
    const res = await dfsPaid("/v3/serp/google/maps/task_post", part, 0);
    cost += res.cost ?? 0;
    queued += await saveTasks("maps", runDate, res.tasks ?? [], (d) => {
      const p = points.find((x) => x.label === d.tag);
      return { subject: String(d.keyword), location: String(d.tag), lat: p?.lat, lng: p?.lng };
    });
  }
  return `${queued}/${body.length} grid checks queued ($${cost.toFixed(3)})`;
}

async function postLlm(runDate: string): Promise<string> {
  await assertBudget(estimateLlm(CANONICAL_PROMPTS.length));

  // ChatGPT: Standard queue; the token cost settles when each task
  // finishes, so it's recorded at collection.
  const chatgpt = CANONICAL_PROMPTS.map((p) => ({
    user_prompt: p.text,
    model_name: MODEL.chatgpt,
    web_search: true,
    web_search_country_iso_code: "IN",
    web_search_city: "Pune",
    max_output_tokens: 1500,
    tag: p.id,
  }));
  const a = await dfsPaid("/v3/ai_optimization/chat_gpt/llm_responses/task_post", chatgpt, 0, {
    recordCost: false,
  });
  const queued = await saveTasks("llm-chatgpt", runDate, a.tasks ?? [], (d) => ({
    subject: String(d.tag),
  }));

  // Perplexity: Live only (DataForSEO has no Standard queue for it).
  // About 0.006 USD and 5–15 s per prompt; 8 at a time.
  let answered = 0;
  await pool(CANONICAL_PROMPTS, 8, async (p) => {
    try {
      const res = await dfsPaid<LlmResultShape>(
        "/v3/ai_optimization/perplexity/llm_responses/live",
        [
          {
            user_prompt: p.text,
            model_name: MODEL.perplexity,
            web_search_country_iso_code: "IN",
            max_output_tokens: 1500,
            tag: p.id,
          },
        ],
        0,
      );
      const t = res.tasks?.[0];
      if (t?.status_code !== 20000) return;
      await storeLlmAnswer("perplexity", runDate, p.id, t.result?.[0] ?? null);
      answered++;
    } catch (err) {
      console.warn(`[dataforseo] perplexity ${p.id} failed:`, err);
    }
  });
  return `${queued} ChatGPT prompts queued, ${answered}/${CANONICAL_PROMPTS.length} Perplexity answered`;
}

interface BacklinksSummary {
  target: string;
  rank?: number;
  backlinks?: number;
  referring_domains?: number;
  referring_main_domains?: number;
  backlinks_spam_score?: number;
}

async function runBacklinks(runDate: string): Promise<string> {
  const targets = [OUR_DOMAIN, ...TRACKED_COMPETITORS];
  await assertBudget(estimateBacklinks(targets.length));
  const lines: string[] = [];
  for (const target of targets) {
    const res = await dfsPaid<BacklinksSummary>(
      "/v3/backlinks/summary/live",
      [{ target, include_subdomains: true, backlinks_status_type: "live", internal_list_limit: 1 }],
      0,
    );
    const r = res.tasks?.[0]?.result?.[0];
    if (!r) continue;
    const values = {
      referringDomains: r.referring_domains ?? 0,
      referringMainDomains: r.referring_main_domains ?? 0,
      backlinks: r.backlinks ?? 0,
      domainRank: r.rank ?? 0,
      spamScore: r.backlinks_spam_score ?? null,
    };
    await db
      .insert(seoBacklinkSnapshots)
      .values({ date: runDate, target, ...values })
      .onConflictDoUpdate({
        target: [seoBacklinkSnapshots.date, seoBacklinkSnapshots.target],
        set: values,
      });
    lines.push(`${target} ${values.referringDomains} RD`);
  }
  return lines.join(", ");
}

interface VolumeRow {
  keyword: string;
  search_volume?: number | null;
  cpc?: number | null;
  competition?: string | null;
}

async function runVolumes(): Promise<string> {
  await assertBudget(estimateVolumes());
  const keywords = TARGET_KEYWORDS.map((k) => k.keyword);
  const fetchFor = async (location_code: number) => {
    const res = await dfsPaid<VolumeRow>(
      "/v3/keywords_data/google_ads/search_volume/live",
      [{ keywords, location_code, language_code: "en" }],
      0,
    );
    return new Map((res.tasks?.[0]?.result ?? []).map((r) => [r.keyword, r]));
  };
  const pune = await fetchFor(ADS_LOCATION_PUNE);
  const india = await fetchFor(ADS_LOCATION_INDIA);
  for (const keyword of keywords) {
    const p = pune.get(keyword);
    const values = {
      volumePune: p?.search_volume ?? null,
      volumeIndia: india.get(keyword)?.search_volume ?? null,
      cpc: p?.cpc ?? null,
      competition: p?.competition ?? null,
      updatedAt: new Date(),
    };
    await db
      .insert(seoKeywordMeta)
      .values({ keyword, ...values })
      .onConflictDoUpdate({ target: seoKeywordMeta.keyword, set: values });
  }
  return `${keywords.length} keywords refreshed`;
}

const RUNNERS: Record<DfsJob, (runDate: string) => Promise<string>> = {
  serp: postSerp,
  maps: postMaps,
  backlinks: runBacklinks,
  volumes: runVolumes,
  llm: postLlm,
};

// ---------------------------------------------------------------------
// Collecting (free)
// ---------------------------------------------------------------------

async function replaceAudit(row: typeof aiCitationAudits.$inferInsert): Promise<void> {
  await db
    .delete(aiCitationAudits)
    .where(
      and(
        eq(aiCitationAudits.auditDate, row.auditDate),
        eq(aiCitationAudits.engine, row.engine),
        eq(aiCitationAudits.prompt, row.prompt),
      ),
    );
  await db.insert(aiCitationAudits).values(row);
}

type PendingTask = typeof seoDfsTasks.$inferSelect;

async function store(task: PendingTask, result: unknown): Promise<void> {
  const kind = task.kind as TaskKind;
  if (kind === "serp") {
    const s = parseSerp(result as Parameters<typeof parseSerp>[0]);
    const values = {
      ourPosition: s.ourPosition,
      ourUrl: s.ourUrl,
      resultsCount: s.resultsCount,
      aioPresent: s.aioPresent,
      aioCitesUs: s.aioCitesUs,
      aioDomains: JSON.stringify(s.aioDomains),
      localPackPresent: s.localPackPresent,
      localPackUs: s.localPackUs,
      top10: JSON.stringify(s.top10),
    };
    await db
      .insert(seoSerpSnapshots)
      .values({ date: task.runDate, keyword: task.subject, ...values })
      .onConflictDoUpdate({
        target: [seoSerpSnapshots.date, seoSerpSnapshots.keyword],
        set: values,
      });
    if (s.aioPresent) {
      await replaceAudit({
        auditDate: task.runDate,
        engine: "google-aio",
        prompt: task.subject,
        mentioned: s.aioCitesUs,
        cited: s.aioCitesUs,
        citedUrl: null,
        notes: `auto · DataForSEO SERP (Pune, mobile) · AI Overview cited: ${s.aioDomains.join(", ") || "—"}`,
      });
    }
    return;
  }
  if (kind === "maps") {
    const m = parseMapsRank(result as Parameters<typeof parseMapsRank>[0]);
    const values = { rank: m.rank, resultsCount: m.resultsCount };
    await db
      .insert(seoGeoGrid)
      .values({
        date: task.runDate,
        keyword: task.subject,
        location: task.location ?? "?",
        lat: task.lat ?? 0,
        lng: task.lng ?? 0,
        ...values,
      })
      .onConflictDoUpdate({
        target: [seoGeoGrid.date, seoGeoGrid.keyword, seoGeoGrid.location],
        set: values,
      });
    return;
  }
  // ChatGPT answer → one ai_citation_audits row, plus its settled cost.
  await storeLlmAnswer("chatgpt", task.runDate, task.subject, result as LlmResultShape | null);
  await recordSpend(
    "llm chatgpt (settled)",
    settledLlmCost(result as Parameters<typeof settledLlmCost>[0]),
  );
}

type LlmResultShape = Parameters<typeof parseLlm>[0];

async function storeLlmAnswer(
  engine: "chatgpt" | "perplexity",
  runDate: string,
  promptId: string,
  result: LlmResultShape | null,
): Promise<void> {
  const prompt = CANONICAL_PROMPTS.find((p) => p.id === promptId);
  const l = parseLlm(result);
  await replaceAudit({
    auditDate: runDate,
    engine,
    prompt: prompt?.text ?? promptId,
    mentioned: l.mentioned,
    cited: l.cited,
    citedUrl: l.citedUrl,
    notes: `auto · DataForSEO ${engine === "chatgpt" ? MODEL.chatgpt : MODEL.perplexity} · sources: ${l.sourceDomains.slice(0, 8).join(", ") || "—"}`,
  });
}

/** A claim older than this is from a run that died mid-store; release it. */
const STALE_CLAIM_MS = 30 * 60_000;

/**
 * Take a finished task for this run. Only one run can move a row from
 * 'pending' to 'collecting', so when the daily task and a manual run
 * overlap, each result is stored — and its cost logged — exactly once.
 * collectedAt doubles as the claim time until the row is marked done.
 */
async function claim(taskId: number): Promise<boolean> {
  const res = await db
    .update(seoDfsTasks)
    .set({ status: "collecting", collectedAt: new Date() })
    .where(and(eq(seoDfsTasks.id, taskId), eq(seoDfsTasks.status, "pending")));
  return res.changes === 1;
}

async function collect(deadline: number): Promise<{ collected: number; stillPending: number }> {
  await db
    .update(seoDfsTasks)
    .set({ status: "pending", collectedAt: null })
    .where(
      and(
        eq(seoDfsTasks.status, "collecting"),
        lt(seoDfsTasks.collectedAt, new Date(Date.now() - STALE_CLAIM_MS)),
      ),
    );

  const pending = await db
    .select()
    .from(seoDfsTasks)
    .where(eq(seoDfsTasks.status, "pending"))
    .orderBy(seoDfsTasks.postedAt);
  let collected = 0;

  await pool(pending, 8, async (task) => {
    if (Date.now() > deadline) return;
    let claimed = false;
    try {
      const res = await dfsFree(GET_PATH[task.kind as TaskKind] + task.taskId);
      const t = res.tasks?.[0];
      if (!t) return;
      const stillPending = and(eq(seoDfsTasks.id, task.id), eq(seoDfsTasks.status, "pending"));
      if (IN_PROGRESS.has(t.status_code)) {
        if (Date.now() - task.postedAt.getTime() > GIVE_UP_MS) {
          await db
            .update(seoDfsTasks)
            .set({ status: "failed", error: "not finished after 4 days" })
            .where(stillPending);
        }
        return;
      }
      if (t.status_code !== 20000) {
        await db
          .update(seoDfsTasks)
          .set({ status: "failed", error: `${t.status_code} ${t.status_message}`, collectedAt: new Date() })
          .where(stillPending);
        return;
      }
      claimed = await claim(task.id);
      if (!claimed) return; // another run is storing it
      await store(task, t.result?.[0] ?? null);
      await db
        .update(seoDfsTasks)
        .set({ status: "done", collectedAt: new Date() })
        .where(eq(seoDfsTasks.id, task.id));
      collected++;
    } catch (err) {
      // Network blip or a failed write: hand it back for the next run.
      console.warn(`[dataforseo] collect ${task.taskId} failed:`, err);
      if (claimed) {
        await db
          .update(seoDfsTasks)
          .set({ status: "pending", collectedAt: null })
          .where(eq(seoDfsTasks.id, task.id))
          .catch(() => {});
      }
    }
  });

  const [left] = await db
    .select({ n: count() })
    .from(seoDfsTasks)
    .where(inArray(seoDfsTasks.status, ["pending", "collecting"]));
  const stillPending = left?.n ?? 0;
  return { collected, stillPending };
}

// ---------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------

/** Order matters: the cheap, most-watched data first. */
const JOB_ORDER: DfsJob[] = ["serp", "maps", "backlinks", "volumes", "llm"];

export async function runDataForSeo(opts: {
  now?: Date;
  /** Wall-clock budget for this run; stays under Cloudflare's 100 s. */
  timeLimitMs?: number;
  /** Restrict to these jobs (default: all that are due). */
  only?: DfsJob[];
} = {}): Promise<DfsRunSummary> {
  if (!dfsConfigured()) throw new Error("DataForSEO is not configured");
  const now = opts.now ?? new Date();
  const deadline = Date.now() + (opts.timeLimitMs ?? 80_000);
  const runDate = isoDate(now);
  const outcomes: JobOutcome[] = [];

  const { collected, stillPending } = await collect(deadline);
  outcomes.push({ job: "collect", status: "done", detail: `${collected} collected, ${stillPending} pending` });

  for (const job of JOB_ORDER) {
    if (opts.only && !opts.only.includes(job)) continue;
    if (Date.now() > deadline) {
      outcomes.push({ job, status: "out-of-time" });
      continue;
    }
    const last = await lastRun(job);
    if (!isDue(job, last, now)) {
      outcomes.push({ job, status: "not-due", detail: `last run ${last}` });
      continue;
    }
    try {
      outcomes.push({ job, status: "done", detail: await RUNNERS[job](runDate) });
    } catch (err) {
      if (err instanceof BudgetExceededError) {
        outcomes.push({ job, status: "budget", detail: err.message });
      } else {
        outcomes.push({ job, status: "error", detail: err instanceof Error ? err.message : String(err) });
      }
    }
  }

  let balanceUsd: number | null = null;
  try {
    balanceUsd = await dfsBalanceUsd();
  } catch {
    /* balance is informational */
  }

  return {
    date: runDate,
    outcomes,
    collected,
    stillPending,
    monthSpendUsd: await monthSpendUsd(),
    budgetUsd: monthlyBudgetUsd(),
    balanceUsd,
  };
}
