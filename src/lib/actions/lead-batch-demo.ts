"use server";

import { z } from "zod";
import { and, asc, desc, eq, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  batchInterests,
  batches,
  demoRegistrations,
  demoSessions,
  leads,
  DEMO_ATTENDANCE,
} from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";

/**
 * Linking a lead to a batch and to a demo.
 *
 * Both are "this lead, that thing" records rather than fields on the lead,
 * because both are many: someone can be interested in two batches and attend
 * two demos, and the previous choice matters when the next conversation
 * happens. A column would keep only the latest.
 */

export type ActionResult = { success: boolean; message: string };

/** Batches worth offering: not finished, not cancelled, soonest first. */
export async function getOfferableBatches() {
  await requireAdminAction();
  return db
    .select({
      id: batches.id,
      batchName: batches.batchName,
      courseName: batches.courseName,
      courseSlug: batches.courseSlug,
      startDate: batches.startDate,
      timing: batches.timing,
      mode: batches.mode,
      status: batches.status,
      seatsAvailable: batches.seatsAvailable,
    })
    .from(batches)
    .where(eq(batches.status, "upcoming"))
    .orderBy(asc(batches.startDate));
}

const interestSchema = z.object({
  leadId: z.number().int().positive(),
  batchId: z.number().int().positive(),
  notes: z.string().trim().max(500).optional(),
});

export async function addBatchInterest(
  input: z.infer<typeof interestSchema>,
): Promise<ActionResult> {
  const actor = await requireAdminAction();
  const parsed = interestSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid request." };

  const [batch] = await db
    .select({ id: batches.id, courseName: batches.courseName })
    .from(batches)
    .where(eq(batches.id, parsed.data.batchId))
    .limit(1);
  if (!batch) return { success: false, message: "That batch no longer exists." };

  try {
    await db.insert(batchInterests).values({
      leadId: parsed.data.leadId,
      batchId: parsed.data.batchId,
      notes: parsed.data.notes || null,
      createdByUserId: actor.actorId,
    });
  } catch {
    // The unique index is what makes this reachable — two screens, same
    // counsellor, same lead. Saying so is friendlier than a 500.
    return { success: false, message: "That interest is already recorded." };
  }

  await logAdminAction({
    action: "create",
    entityType: "batch_interest",
    entityId: String(parsed.data.leadId),
    summary: `Recorded interest in ${batch.courseName} batch #${batch.id} for lead #${parsed.data.leadId}`,
  });
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Batch interest recorded." };
}

export async function removeBatchInterest(
  interestId: number,
  leadId: number,
): Promise<ActionResult> {
  await requireAdminAction();
  await db.delete(batchInterests).where(eq(batchInterests.id, interestId));
  await logAdminAction({
    action: "delete",
    entityType: "batch_interest",
    entityId: String(leadId),
    summary: `Removed a batch interest from lead #${leadId}`,
  });
  revalidatePath(`/admin/leads/${leadId}`);
  return { success: true, message: "Removed." };
}

export async function getLeadBatchInterests(leadId: number) {
  await requireAdminAction();
  return db
    .select({
      id: batchInterests.id,
      notes: batchInterests.notes,
      createdAt: batchInterests.createdAt,
      batchId: batches.id,
      batchName: batches.batchName,
      courseName: batches.courseName,
      startDate: batches.startDate,
      timing: batches.timing,
      mode: batches.mode,
      status: batches.status,
    })
    .from(batchInterests)
    .innerJoin(batches, eq(batchInterests.batchId, batches.id))
    .where(eq(batchInterests.leadId, leadId))
    .orderBy(asc(batches.startDate));
}

/** Demos still ahead, for the registration dropdown. */
export async function getUpcomingDemoSessions() {
  await requireAdminAction();
  return db
    .select({
      id: demoSessions.id,
      courseName: demoSessions.courseName,
      scheduledAt: demoSessions.scheduledAt,
      mode: demoSessions.mode,
      trainer: demoSessions.trainer,
      status: demoSessions.status,
    })
    .from(demoSessions)
    .where(
      and(eq(demoSessions.status, "scheduled"), gte(demoSessions.scheduledAt, new Date())),
    )
    .orderBy(asc(demoSessions.scheduledAt));
}

const registerSchema = z.object({
  leadId: z.number().int().positive(),
  demoSessionId: z.number().int().positive(),
});

export async function registerLeadForDemo(
  input: z.infer<typeof registerSchema>,
): Promise<ActionResult> {
  const actor = await requireAdminAction();
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid request." };

  const [session] = await db
    .select({ id: demoSessions.id, courseName: demoSessions.courseName })
    .from(demoSessions)
    .where(eq(demoSessions.id, parsed.data.demoSessionId))
    .limit(1);
  if (!session) return { success: false, message: "That demo no longer exists." };

  try {
    await db.insert(demoRegistrations).values({
      demoSessionId: parsed.data.demoSessionId,
      leadId: parsed.data.leadId,
      createdByUserId: actor.actorId,
    });
  } catch {
    return { success: false, message: "Already registered for that demo." };
  }

  // Registering someone IS scheduling their demo — leaving the lifecycle
  // behind would mean the pipeline disagreeing with the record on the same
  // screen.
  await db
    .update(leads)
    .set({ status: "DEMO_SCHEDULED", updatedAt: new Date() })
    .where(eq(leads.id, parsed.data.leadId));

  await logAdminAction({
    action: "create",
    entityType: "demo_registration",
    entityId: String(parsed.data.leadId),
    summary: `Registered lead #${parsed.data.leadId} for ${session.courseName} demo #${session.id}`,
  });
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Registered, and status moved to Demo Scheduled." };
}

const attendanceSchema = z.object({
  registrationId: z.number().int().positive(),
  leadId: z.number().int().positive(),
  attendance: z.enum(DEMO_ATTENDANCE),
});

export async function setDemoAttendance(
  input: z.infer<typeof attendanceSchema>,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = attendanceSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid attendance." };

  await db
    .update(demoRegistrations)
    .set({ attendance: parsed.data.attendance, updatedAt: new Date() })
    .where(eq(demoRegistrations.id, parsed.data.registrationId));

  // Attending a demo is the strongest signal short of enrolling, so it moves
  // the lead on. A no-show does NOT move it backwards: why they missed it is
  // the next conversation, not a status change made on their behalf.
  if (parsed.data.attendance === "attended") {
    await db
      .update(leads)
      .set({ status: "DEMO_ATTENDED", updatedAt: new Date() })
      .where(eq(leads.id, parsed.data.leadId));
  }

  await logAdminAction({
    action: "update",
    entityType: "demo_registration",
    entityId: String(parsed.data.leadId),
    summary: `Marked demo ${parsed.data.attendance} for lead #${parsed.data.leadId}`,
  });
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Attendance updated." };
}

export async function getLeadDemoRegistrations(leadId: number) {
  await requireAdminAction();
  return db
    .select({
      id: demoRegistrations.id,
      attendance: demoRegistrations.attendance,
      notes: demoRegistrations.notes,
      sessionId: demoSessions.id,
      courseName: demoSessions.courseName,
      scheduledAt: demoSessions.scheduledAt,
      mode: demoSessions.mode,
      trainer: demoSessions.trainer,
      meetingLink: demoSessions.meetingLink,
      location: demoSessions.location,
    })
    .from(demoRegistrations)
    .innerJoin(demoSessions, eq(demoRegistrations.demoSessionId, demoSessions.id))
    .where(eq(demoRegistrations.leadId, leadId))
    .orderBy(desc(demoSessions.scheduledAt));
}
