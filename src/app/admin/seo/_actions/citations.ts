"use server";

/**
 * Server actions for the AI Citations tab. Manual prompt-audit log —
 * one row per (audit_date, engine, prompt) tuple. Aggregated on read.
 *
 * Note: Next.js requires "use server" files to export only async
 * functions. Constants like the engine list and sentiment list live
 * inline in the citation-form component.
 */
import { revalidatePath } from "next/cache";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { aiCitationAudits, type AiCitationAudit } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";

interface CreateInput {
  auditDate: string;
  engine: string;
  prompt: string;
  mentioned: boolean;
  cited: boolean;
  citedUrl?: string;
  sentiment?: string;
  notes?: string;
}

export async function recordAiCitationAudit(input: CreateInput) {
  await requireAdminAction();
  if (!input.prompt?.trim()) {
    return { ok: false as const, error: "Prompt is required" };
  }
  if (!input.engine?.trim()) {
    return { ok: false as const, error: "Engine is required" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.auditDate)) {
    return { ok: false as const, error: "Audit date must be YYYY-MM-DD" };
  }

  await db.insert(aiCitationAudits).values({
    auditDate: input.auditDate,
    engine: input.engine.trim().toLowerCase(),
    prompt: input.prompt.trim(),
    mentioned: input.mentioned,
    cited: input.cited,
    citedUrl: input.citedUrl?.trim() || null,
    sentiment: input.sentiment?.trim() || null,
    notes: input.notes?.trim() || null,
  });

  revalidatePath("/admin/seo");
  return { ok: true as const };
}

export async function listRecentCitationAudits(limit: number = 200): Promise<AiCitationAudit[]> {
  return db
    .select()
    .from(aiCitationAudits)
    .orderBy(desc(aiCitationAudits.auditDate), desc(aiCitationAudits.id))
    .limit(limit);
}

export interface MonthlyCitationRollup {
  month: string; // YYYY-MM
  engine: string;
  total: number;
  mentioned: number;
  cited: number;
}

/**
 * Group rows by (year-month, engine). Computes mentioned-rate +
 * cited-rate per month per engine — drives the trend table.
 */
export async function getMonthlyCitationRollup(): Promise<MonthlyCitationRollup[]> {
  // SQLite: substr(audit_date, 1, 7) gives YYYY-MM
  const rows = await db
    .select({
      month: sql<string>`substr(${aiCitationAudits.auditDate}, 1, 7)`.as("month"),
      engine: aiCitationAudits.engine,
      total: sql<number>`count(*)`.as("total"),
      mentioned: sql<number>`sum(case when ${aiCitationAudits.mentioned} = 1 then 1 else 0 end)`.as(
        "mentioned",
      ),
      cited: sql<number>`sum(case when ${aiCitationAudits.cited} = 1 then 1 else 0 end)`.as(
        "cited",
      ),
    })
    .from(aiCitationAudits)
    .groupBy(sql`substr(${aiCitationAudits.auditDate}, 1, 7)`, aiCitationAudits.engine)
    .orderBy(sql`substr(${aiCitationAudits.auditDate}, 1, 7) desc`);

  return rows;
}
