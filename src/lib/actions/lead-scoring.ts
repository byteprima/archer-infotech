"use server";

import { eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  batchInterests,
  demoRegistrations,
  followUps,
  leads,
} from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import {
  scoreLead,
  suggestNextAction,
  type LeadScore,
  type ScoreSignals,
} from "@/lib/crm/lead-score";

/**
 * Gathering the signals the score needs.
 *
 * Scores are computed on READ, never stored. A stored score is wrong the
 * moment a follow-up is logged or a demo is attended, and a score that is
 * quietly out of date is worse than no score — the counsellor works the list
 * top-down and never learns it is stale.
 *
 * The aggregates come back in one query per signal for the whole page rather
 * than per lead, so scoring fifty leads costs four queries, not two hundred.
 */

export interface ScoredLead {
  leadId: number;
  score: LeadScore;
  suggestion: string | null;
}

type LeadRow = {
  id: number;
  status: string;
  createdAt: Date | null;
  courseInterest: string | null;
  email: string | null;
  qualification: string | null;
  expectedJoining: string | null;
  modePreference: string | null;
};

async function signalsFor(rows: LeadRow[]): Promise<Map<number, ScoreSignals>> {
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) return new Map();

  const [followUpRows, demoRows, batchRows] = await Promise.all([
    db
      .select({
        leadId: followUps.leadId,
        n: sql<number>`count(*)`,
        latest: sql<number>`max(${followUps.followUpAt})`,
      })
      .from(followUps)
      .where(inArray(followUps.leadId, ids))
      .groupBy(followUps.leadId),
    db
      .select({
        leadId: demoRegistrations.leadId,
        registered: sql<number>`count(*)`,
        attended: sql<number>`sum(case when ${demoRegistrations.attendance} = 'attended' then 1 else 0 end)`,
      })
      .from(demoRegistrations)
      .where(inArray(demoRegistrations.leadId, ids))
      .groupBy(demoRegistrations.leadId),
    db
      .select({ leadId: batchInterests.leadId, n: sql<number>`count(*)` })
      .from(batchInterests)
      .where(inArray(batchInterests.leadId, ids))
      .groupBy(batchInterests.leadId),
  ]);

  const followUpBy = new Map(followUpRows.map((r) => [r.leadId, r]));
  const demoBy = new Map(demoRows.map((r) => [r.leadId, r]));
  const batchBy = new Map(batchRows.map((r) => [r.leadId, Number(r.n)]));

  return new Map(
    rows.map((row) => {
      const fu = followUpBy.get(row.id);
      const demo = demoBy.get(row.id);
      return [
        row.id,
        {
          status: row.status,
          createdAt: row.createdAt,
          followUpCount: Number(fu?.n ?? 0),
          // SQLite returns the raw epoch seconds from max() rather than a Date.
          lastFollowUpAt: fu?.latest ? new Date(Number(fu.latest) * 1000) : null,
          demoRegistered: Number(demo?.registered ?? 0) > 0,
          demoAttended: Number(demo?.attended ?? 0) > 0,
          batchInterestCount: batchBy.get(row.id) ?? 0,
          courseInterest: row.courseInterest,
          email: row.email,
          qualification: row.qualification,
          expectedJoining: row.expectedJoining,
          modePreference: row.modePreference,
        } satisfies ScoreSignals,
      ];
    }),
  );
}

const LEAD_FIELDS = {
  id: leads.id,
  status: leads.status,
  createdAt: leads.createdAt,
  courseInterest: leads.courseInterest,
  email: leads.email,
  qualification: leads.qualification,
  expectedJoining: leads.expectedJoining,
  modePreference: leads.modePreference,
};

/** Score one lead, with its suggested next action. */
export async function scoreOneLead(leadId: number): Promise<ScoredLead | null> {
  await requireAdminAction();
  const [row] = await db.select(LEAD_FIELDS).from(leads).where(eq(leads.id, leadId)).limit(1);
  if (!row) return null;

  const signals = (await signalsFor([row])).get(leadId)!;
  const score = scoreLead(signals);
  return { leadId, score, suggestion: suggestNextAction(signals, score) };
}

/** Score many leads at once, for a list. */
export async function scoreLeads(leadIds: number[]): Promise<Map<number, LeadScore>> {
  await requireAdminAction();
  if (leadIds.length === 0) return new Map();

  const rows = await db.select(LEAD_FIELDS).from(leads).where(inArray(leads.id, leadIds));
  const signals = await signalsFor(rows);

  return new Map(
    rows.map((row) => [row.id, scoreLead(signals.get(row.id)!)]),
  );
}

/**
 * The hottest open leads right now.
 *
 * Computed over open leads only and sorted in memory — the score is not a
 * column, so the database cannot order by it. Bounded to a sensible working
 * set rather than the whole table.
 */
export async function getHottestLeads(limit = 10) {
  await requireAdminAction();

  const rows = await db
    .select({
      ...LEAD_FIELDS,
      name: leads.name,
      phone: leads.phone,
      enquiryNumber: leads.enquiryNumber,
      priority: leads.priority,
    })
    .from(leads)
    .where(
      sql`${leads.status} NOT IN ('ADMISSION_CONFIRMED','NOT_INTERESTED','LOST','NO_RESPONSE','INVALID','DUPLICATE')`,
    )
    .limit(300);

  const signals = await signalsFor(rows);
  return rows
    .map((row) => ({
      leadId: row.id,
      name: row.name,
      phone: row.phone,
      enquiryNumber: row.enquiryNumber,
      courseInterest: row.courseInterest,
      status: row.status,
      priority: row.priority,
      score: scoreLead(signals.get(row.id)!),
    }))
    .filter((r) => !r.score.notApplicable)
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, limit);
}
