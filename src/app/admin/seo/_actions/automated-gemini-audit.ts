"use server";

/**
 * P8-26 / P5-29 — One-button automated AI citation audit (Gemini only).
 *
 * Runs the 25 canonical prompts against Gemini 2.0 Flash with Google
 * Search grounding, in parallel with bounded concurrency (5 at a time
 * to stay polite + within free-tier rate limits).
 *
 * For each result, auto-detects:
 *   - Did the response mention "Archer Infotech"? (regex on response text)
 *   - Did any grounding citation point to archerinfotech.in? (host match)
 *
 * Inserts each result as a row in the same `ai_citation_audits` table
 * used by the manual form. The Monthly × Engine matrix table reads
 * straight through.
 *
 * Cost: free — Gemini 2.0 Flash free tier covers 1,500 req/day vs our
 * 25 req/month. No paid subscription required.
 *
 * Other 5 engines (ChatGPT / Claude / Perplexity / Google AIO / Bing
 * Copilot) remain manual via the form below the button.
 */
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { aiCitationAudits } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import { callGemini, type GeminiAuditResult } from "@/lib/ai-engines/gemini";
import { CANONICAL_PROMPTS } from "@/lib/ai-engines/canonical-prompts";

const CONCURRENCY = 5;

export interface AutomatedAuditRowResult {
  promptId: string;
  prompt: string;
  mentioned: boolean;
  cited: boolean;
  citedUrl?: string;
  error?: string;
}

export interface AutomatedAuditResult {
  ok: boolean;
  /** ISO date string YYYY-MM-DD recorded as the audit date for every row. */
  auditDate: string;
  /** Per-prompt outcomes — drives the review modal. */
  rows: AutomatedAuditRowResult[];
  /** Summary stats. */
  summary: {
    total: number;
    inserted: number;
    mentioned: number;
    cited: number;
    failed: number;
  };
  /** Top-level error if the action couldn't start at all. */
  error?: string;
}

/**
 * Run all 25 canonical prompts through Gemini with grounding. Inserts
 * every successful response into the DB (engine = "gemini"). Returns the
 * per-row breakdown for review.
 */
export async function runAutomatedGeminiAudit(): Promise<AutomatedAuditResult> {
  await requireAdminAction();

  if (!process.env.GOOGLE_API_KEY) {
    return {
      ok: false,
      auditDate: new Date().toISOString().slice(0, 10),
      rows: [],
      summary: { total: 0, inserted: 0, mentioned: 0, cited: 0, failed: 0 },
      error:
        "GOOGLE_API_KEY env var not set. Add it to Coolify env vars + redeploy, " +
        "OR set process.env.GOOGLE_API_KEY locally.",
    };
  }

  const auditDate = new Date().toISOString().slice(0, 10);

  // Run prompts in bounded-concurrency batches so we don't open 25
  // simultaneous fetches (Gemini's rate limit on the free tier is
  // 15 req/min; 5-at-a-time keeps us comfortably under).
  const results: Array<GeminiAuditResult & { promptId: string }> = [];
  for (let i = 0; i < CANONICAL_PROMPTS.length; i += CONCURRENCY) {
    const batch = CANONICAL_PROMPTS.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (p) => {
        const r = await callGemini(p.text);
        return { ...r, promptId: p.id };
      }),
    );
    results.push(...batchResults);
  }

  // Insert successful rows. Failed rows are NOT inserted — they get
  // surfaced in the UI so the user can either retry or accept the gap.
  const successfulRows = results.filter((r) => !r.error);

  if (successfulRows.length > 0) {
    await db.insert(aiCitationAudits).values(
      successfulRows.map((r) => ({
        auditDate,
        engine: "gemini",
        prompt: r.prompt,
        mentioned: r.mentioned,
        cited: r.cited,
        citedUrl: r.citedUrl ?? null,
        sentiment: null, // Sentiment stays manual — too unreliable to auto-detect.
        notes:
          "Auto-generated via Gemini 2.0 Flash + Google Search grounding. " +
          `${r.groundingChunks.length} grounding citations returned.`,
      })),
    );
  }

  revalidatePath("/admin/seo");

  return {
    ok: true,
    auditDate,
    rows: results.map((r) => ({
      promptId: r.promptId,
      prompt: r.prompt,
      mentioned: r.mentioned,
      cited: r.cited,
      citedUrl: r.citedUrl,
      error: r.error || undefined,
    })),
    summary: {
      total: results.length,
      inserted: successfulRows.length,
      mentioned: successfulRows.filter((r) => r.mentioned).length,
      cited: successfulRows.filter((r) => r.cited).length,
      failed: results.length - successfulRows.length,
    },
  };
}
