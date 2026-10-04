/**
 * SEO Dashboard — DataForSEO client with a hard monthly budget.
 *
 * Every billed call goes through `dfsPaid`, which refuses to send a
 * request whose estimated cost would take this month's spend past
 * SEO_DFS_MONTHLY_BUDGET_USD, then records the cost DataForSEO reports
 * in seo_provider_spend. Free calls (task_get, user_data) use `dfsFree`.
 *
 * Env (runtime-only in Coolify — never build-time, those land in deploy
 * logs in plaintext): DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD,
 * SEO_DFS_MONTHLY_BUDGET_USD (default 5).
 */
import { and, eq, like, sum } from "drizzle-orm";
import { db } from "@/db";
import { seoDfsTasks, seoProviderSpend } from "@/db/schema";
import { isoDate, PRICE } from "./dataforseo-plan";

const API = "https://api.dataforseo.com";

export function dfsConfigured(): boolean {
  return Boolean(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD);
}

export function monthlyBudgetUsd(): number {
  const v = Number(process.env.SEO_DFS_MONTHLY_BUDGET_USD);
  return Number.isFinite(v) && v > 0 ? v : 5;
}

export class BudgetExceededError extends Error {
  constructor(
    readonly estimate: number,
    readonly remaining: number,
  ) {
    super(
      `DataForSEO budget: this batch is estimated at $${estimate.toFixed(3)} but only ` +
        `$${remaining.toFixed(3)} of the $${monthlyBudgetUsd()} monthly budget is left`,
    );
    this.name = "BudgetExceededError";
  }
}

/** Recorded spend for a calendar month (YYYY-MM), in USD. */
export async function monthSpendUsd(month = isoDate(new Date()).slice(0, 7)): Promise<number> {
  const [row] = await db
    .select({ total: sum(seoProviderSpend.costUsd) })
    .from(seoProviderSpend)
    .where(like(seoProviderSpend.date, `${month}%`));
  return Number(row?.total ?? 0);
}

/**
 * LLM tasks are billed when they finish (the token cost is settled on
 * completion), so pending ones are counted as reserved budget.
 */
async function reservedUsd(): Promise<number> {
  const pending = await db
    .select({ kind: seoDfsTasks.kind })
    .from(seoDfsTasks)
    .where(and(eq(seoDfsTasks.status, "pending"), like(seoDfsTasks.kind, "llm-%")));
  return pending.reduce(
    (a, t) => a + (t.kind === "llm-chatgpt" ? PRICE.llmChatgpt : PRICE.llmPerplexity),
    0,
  );
}

/** Throws BudgetExceededError if `estimate` doesn't fit this month. */
export async function assertBudget(estimate: number): Promise<void> {
  const remaining = monthlyBudgetUsd() - (await monthSpendUsd()) - (await reservedUsd());
  if (estimate > remaining) throw new BudgetExceededError(estimate, Math.max(0, remaining));
}

export async function recordSpend(endpoint: string, costUsd: number, tasks = 1): Promise<void> {
  if (!(costUsd > 0)) return;
  await db.insert(seoProviderSpend).values({
    date: isoDate(new Date()),
    provider: "dataforseo",
    endpoint,
    costUsd,
    tasks,
  });
}

export interface DfsTask<R = unknown> {
  id: string;
  status_code: number;
  status_message: string;
  cost?: number;
  data?: Record<string, unknown>;
  result?: R[] | null;
}

export interface DfsResponse<R = unknown> {
  status_code: number;
  status_message: string;
  cost?: number;
  tasks?: DfsTask<R>[];
}

async function request<R>(method: "GET" | "POST", path: string, body?: unknown): Promise<DfsResponse<R>> {
  if (!dfsConfigured()) throw new Error("DataForSEO is not configured (DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD)");
  const auth = Buffer.from(
    `${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`,
  ).toString("base64");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) throw new Error(`DataForSEO ${path}: HTTP ${res.status}`);
  const json = (await res.json()) as DfsResponse<R>;
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO ${path}: ${json.status_code} ${json.status_message}`);
  }
  return json;
}

/** A free call (task_get, tasks_ready, user_data). */
export function dfsFree<R>(path: string): Promise<DfsResponse<R>> {
  return request<R>("GET", path);
}

/**
 * A billed POST. Checks the budget against `estimate` first, then records
 * the cost DataForSEO reports (unless `recordCost` is false — LLM tasks
 * are recorded when they're collected, with their settled token cost).
 */
export async function dfsPaid<R>(
  path: string,
  body: unknown[],
  estimate: number,
  opts: { recordCost?: boolean } = {},
): Promise<DfsResponse<R>> {
  await assertBudget(estimate);
  const json = await request<R>("POST", path, body);
  if (opts.recordCost !== false) await recordSpend(path, json.cost ?? 0, body.length);
  return json;
}

/** Account balance in USD (free). */
export async function dfsBalanceUsd(): Promise<number> {
  const json = await dfsFree<{ money?: { balance?: number } }>("/v3/appendix/user_data");
  return Number(json.tasks?.[0]?.result?.[0]?.money?.balance ?? NaN);
}
