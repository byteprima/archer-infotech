"use server";

import { z } from "zod";
import { desc, eq, and, gte, lt, isNotNull, notInArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { followUps, leads } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import {
  FOLLOW_UP_TYPES,
  FOLLOW_UP_OUTCOMES,
  LEAD_STATUSES,
  CLOSED_LEAD_STATUSES,
} from "@/lib/leads/lifecycle";

/**
 * Follow-up log for a lead.
 *
 * Append-only: there is deliberately no update or delete action. The value of
 * this table is the history — what was tried, when, and what came back — and
 * an editable history is one nobody can rely on when a lead is disputed or
 * reassigned. A mistake is corrected by logging another entry.
 */

const followUpSchema = z.object({
  leadId: z.number().int().positive(),
  followUpType: z.enum(FOLLOW_UP_TYPES),
  outcome: z.enum(FOLLOW_UP_OUTCOMES),
  notes: z.string().trim().max(2000).optional(),
  /** ISO datetime-local strings from the form. */
  followUpAt: z.string().min(1, "When did this happen?"),
  nextFollowUpAt: z.string().optional(),
  /** Optional lifecycle move recorded with the same action. */
  newStatus: z.enum(LEAD_STATUSES).optional(),
});

export type FollowUpInput = z.infer<typeof followUpSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function createFollowUp(input: FollowUpInput): Promise<ActionResult> {
  // Returns { actorId, actorLabel }. actorId is null for the legacy shared
  // env login, which has no user row — the follow-up is still recorded,
  // just without an author, rather than being refused.
  const actor = await requireAdminAction();

  const parsed = followUpSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const data = parsed.data;

  const when = parseDate(data.followUpAt);
  if (!when) return { success: false, message: "That follow-up date is not valid." };
  const next = parseDate(data.nextFollowUpAt);

  const [lead] = await db
    .select({ id: leads.id, name: leads.name, status: leads.status })
    .from(leads)
    .where(eq(leads.id, data.leadId))
    .limit(1);
  if (!lead) return { success: false, message: "Lead not found." };

  try {
    await db.insert(followUps).values({
      leadId: data.leadId,
      createdByUserId: actor.actorId,
      followUpType: data.followUpType,
      outcome: data.outcome,
      notes: data.notes || null,
      followUpAt: when,
      nextFollowUpAt: next,
    });

    // `leads.followUpDate` stays the NEXT due contact so the existing list
    // view and the queues below keep working off one indexed column, rather
    // than every read having to aggregate the log.
    await db
      .update(leads)
      .set({
        followUpDate: next,
        ...(data.newStatus ? { status: data.newStatus } : {}),
        updatedAt: new Date(),
      })
      .where(eq(leads.id, data.leadId));

    await logAdminAction({
      action: "create",
      entityType: "follow_up",
      entityId: String(data.leadId),
      summary: `Logged ${data.followUpType} (${data.outcome}) on lead #${data.leadId} — ${lead.name}`,
    });

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${data.leadId}`);
    return { success: true, message: "Follow-up recorded." };
  } catch (error) {
    console.error("createFollowUp failed", error);
    return { success: false, message: "Could not save that follow-up." };
  }
}

/** Full history for one lead, newest first. */
export async function getFollowUpsForLead(leadId: number) {
  await requireAdminAction();
  return db
    .select()
    .from(followUps)
    .where(eq(followUps.leadId, leadId))
    .orderBy(desc(followUps.followUpAt));
}

/**
 * The three follow-up queues.
 *
 * Closed leads are excluded from all of them. An overdue reminder against a
 * lead that already enrolled is noise, and a queue that cries wolf is one
 * nobody opens.
 */
export async function getFollowUpQueues() {
  await requireAdminAction();

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const open = and(
    isNotNull(leads.followUpDate),
    notInArray(leads.status, [...CLOSED_LEAD_STATUSES]),
  );

  const columns = {
    id: leads.id,
    enquiryNumber: leads.enquiryNumber,
    name: leads.name,
    phone: leads.phone,
    courseInterest: leads.courseInterest,
    status: leads.status,
    priority: leads.priority,
    followUpDate: leads.followUpDate,
    assignedTo: leads.assignedTo,
    assignedToUserId: leads.assignedToUserId,
  };

  const [overdue, today, upcoming] = await Promise.all([
    db.select(columns).from(leads)
      .where(and(open, lt(leads.followUpDate, startOfToday)))
      .orderBy(leads.followUpDate),
    db.select(columns).from(leads)
      .where(and(open, gte(leads.followUpDate, startOfToday), lt(leads.followUpDate, startOfTomorrow)))
      .orderBy(leads.followUpDate),
    db.select(columns).from(leads)
      .where(and(open, gte(leads.followUpDate, startOfTomorrow)))
      .orderBy(leads.followUpDate),
  ]);

  return { overdue, today, upcoming };
}
