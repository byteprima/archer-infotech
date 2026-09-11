"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  batchInterests,
  batches,
  demoRegistrations,
  followUps,
  leads,
} from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import { getSettings } from "@/lib/crm/automation";
import { asBoolean } from "@/lib/crm/settings";
import {
  generateText,
  hasAiProvider,
  type AiUnavailableReason,
} from "@/lib/crm/ai/provider";
import { buildSummaryPrompt } from "@/lib/crm/ai/lead-summary";
import { scoreOneLead } from "@/lib/actions/lead-scoring";

/**
 * The AI lead summary.
 *
 * Two gates, both of which must be open: a provider key must exist, and the
 * office must have switched AI insights on. When either is shut this returns
 * the REASON — it never returns a plausible-looking summary assembled from
 * templates, which is precisely what the specification forbids.
 */

export interface InsightResult {
  summary: string | null;
  unavailable: AiUnavailableReason | null;
  detail?: string;
}

export async function isAiEnabled(): Promise<{
  enabled: boolean;
  reason: AiUnavailableReason | null;
}> {
  await requireAdminAction();
  if (!hasAiProvider()) return { enabled: false, reason: "no_provider" };
  const settings = await getSettings();
  if (!asBoolean(settings.ai_insights_enabled)) {
    return { enabled: false, reason: "disabled" };
  }
  return { enabled: true, reason: null };
}

export async function generateLeadSummary(leadId: number): Promise<InsightResult> {
  await requireAdminAction();

  const gate = await isAiEnabled();
  if (!gate.enabled) {
    return { summary: null, unavailable: gate.reason };
  }

  const [lead] = await db
    .select({
      courseInterest: leads.courseInterest,
      status: leads.status,
      priority: leads.priority,
      createdAt: leads.createdAt,
      qualification: leads.qualification,
      currentStatus: leads.currentStatus,
      expectedJoining: leads.expectedJoining,
      modePreference: leads.modePreference,
      source: leads.source,
    })
    .from(leads)
    .where(eq(leads.id, leadId))
    .limit(1);
  if (!lead) return { summary: null, unavailable: "error", detail: "Lead not found" };

  const [history, demo, interest, scored] = await Promise.all([
    db
      .select({
        type: followUps.followUpType,
        outcome: followUps.outcome,
        notes: followUps.notes,
        at: followUps.followUpAt,
      })
      .from(followUps)
      .where(eq(followUps.leadId, leadId))
      .orderBy(desc(followUps.followUpAt))
      .limit(12),
    db
      .select({ attendance: demoRegistrations.attendance })
      .from(demoRegistrations)
      .where(
        and(
          eq(demoRegistrations.leadId, leadId),
          eq(demoRegistrations.attendance, "attended"),
        ),
      )
      .limit(1),
    db
      .select({ batchName: batches.batchName })
      .from(batchInterests)
      .leftJoin(batches, eq(batchInterests.batchId, batches.id))
      .where(eq(batchInterests.leadId, leadId))
      .limit(1),
    scoreOneLead(leadId),
  ]);

  const prompt = buildSummaryPrompt({
    ...lead,
    demoAttended: demo.length > 0,
    batchInterest: interest[0]?.batchName ?? null,
    followUps: history,
    scoreBand: scored?.score.band ?? "COLD",
    scoreReasons: scored?.score.reasons.map((r) => r.label) ?? [],
  });

  const result = await generateText(prompt, { maxOutputTokens: 300 });
  return {
    summary: result.text,
    unavailable: result.unavailable,
    detail: result.detail,
  };
}
