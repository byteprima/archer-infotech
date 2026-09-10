"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, asc, count, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  batches,
  demoRegistrations,
  demoSessions,
  DEMO_SESSION_STATUS,
} from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { getCourse } from "@/data/courses";
import {
  demoSessionFormSchema,
  type DemoSessionFormData,
} from "@/lib/validations/demo-sessions";

/**
 * Creating and maintaining demo sessions.
 *
 * Phase 2 built everything that hangs off a demo — registering a lead onto
 * one, recording whether they turned up, moving the lead's status — but
 * nothing that creates one. The table had readers and no writer, so the
 * dropdown on the lead page was permanently empty and the whole feature was
 * unreachable. This is that missing half.
 */

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/** Zod's fieldErrors is Partial<Record<K, string[]>>; drop the empty keys so
 *  the result matches the ActionResult shape the forms expect. */
function fieldErrors(error: z.ZodError): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).filter(
      (entry): entry is [string, string[]] => Array.isArray(entry[1]),
    ),
  );
}

function optionalText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** datetime-local has no zone; parse it as the local time the admin typed. */
function parseScheduledAt(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

type BuildResult =
  | { error: string; values?: undefined }
  | { error?: undefined; values: typeof demoSessions.$inferInsert };

async function buildValues(data: DemoSessionFormData): Promise<BuildResult> {
  const course = getCourse(data.courseSlug);
  if (!course) return { error: "Pick a course from the list." };

  const scheduledAt = parseScheduledAt(data.scheduledAt);
  if (!scheduledAt) return { error: "Enter a valid date and time." };

  let batchId: number | null = null;
  if (data.batchId) {
    const parsed = Number(data.batchId);
    if (!Number.isSafeInteger(parsed) || parsed <= 0) {
      return { error: "That batch is not valid." };
    }
    const [batch] = await db
      .select({ id: batches.id })
      .from(batches)
      .where(eq(batches.id, parsed))
      .limit(1);
    if (!batch) return { error: "That batch no longer exists." };
    batchId = batch.id;
  }

  return {
    values: {
      courseSlug: course.slug,
      courseName: course.title,
      batchId,
      scheduledAt,
      mode: data.mode,
      status: data.status,
      trainer: optionalText(data.trainer),
      capacity:
        data.capacity === "" || data.capacity === undefined
          ? null
          : Number(data.capacity),
      location: optionalText(data.location),
      meetingLink: optionalText(data.meetingLink),
      notes: optionalText(data.notes),
      updatedAt: new Date(),
    },
  };
}

export async function createDemoSession(
  data: DemoSessionFormData,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = demoSessionFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const built = await buildValues(parsed.data);
  if (!built.values) return { success: false, message: built.error };

  const [created] = await db
    .insert(demoSessions)
    .values(built.values)
    .returning({ id: demoSessions.id });

  await logAdminAction({
    action: "create",
    entityType: "demo_session",
    entityId: String(created.id),
    summary: `Scheduled a ${built.values.courseName} demo for ${built.values.scheduledAt.toISOString()}`,
  });

  revalidatePath("/admin/demos");
  revalidatePath("/admin/leads");
  return { success: true, message: "Demo scheduled." };
}

export async function updateDemoSession(
  id: number,
  data: DemoSessionFormData,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = demoSessionFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const [existing] = await db
    .select({ id: demoSessions.id, capacity: demoSessions.capacity })
    .from(demoSessions)
    .where(eq(demoSessions.id, id))
    .limit(1);
  if (!existing) return { success: false, message: "That demo no longer exists." };

  const built = await buildValues(parsed.data);
  if (!built.values) return { success: false, message: built.error };

  // Refuse a capacity below the number already registered. Silently accepting
  // it would leave the session over its own limit with no way to tell.
  const capacity = built.values.capacity;
  if (typeof capacity === "number") {
    const [{ registered }] = await db
      .select({ registered: count() })
      .from(demoRegistrations)
      .where(eq(demoRegistrations.demoSessionId, id));
    if (registered > capacity) {
      return {
        success: false,
        message: `${registered} people are already registered — capacity cannot be lower than that.`,
      };
    }
  }

  await db.update(demoSessions).set(built.values).where(eq(demoSessions.id, id));

  await logAdminAction({
    action: "update",
    entityType: "demo_session",
    entityId: String(id),
    summary: `Updated demo #${id} (${built.values.courseName}, ${built.values.status})`,
  });

  revalidatePath("/admin/demos");
  revalidatePath(`/admin/demos/${id}/edit`);
  revalidatePath("/admin/leads");
  return { success: true, message: "Demo updated." };
}

/**
 * Cancel rather than delete.
 *
 * Registrations reference the session, and leads have been moved to
 * DEMO_SCHEDULED on the strength of it. Deleting would cascade those away and
 * leave a lead whose status refers to a demo that no longer exists. Cancelling
 * keeps the record and takes it out of the offerable list.
 */
export async function cancelDemoSession(id: number): Promise<ActionResult> {
  await requireAdminAction();

  const [existing] = await db
    .select({ id: demoSessions.id, courseName: demoSessions.courseName })
    .from(demoSessions)
    .where(eq(demoSessions.id, id))
    .limit(1);
  if (!existing) return { success: false, message: "That demo no longer exists." };

  await db
    .update(demoSessions)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(demoSessions.id, id));

  await logAdminAction({
    action: "update",
    entityType: "demo_session",
    entityId: String(id),
    summary: `Cancelled the ${existing.courseName} demo #${id}`,
  });

  revalidatePath("/admin/demos");
  revalidatePath("/admin/leads");
  return { success: true, message: "Demo cancelled. Registrations are kept." };
}

export async function getDemoSessionById(id: number) {
  await requireAdminAction();
  const [row] = await db
    .select()
    .from(demoSessions)
    .where(eq(demoSessions.id, id))
    .limit(1);
  return row ?? null;
}

export interface DemoListFilters {
  status?: string;
  when?: "upcoming" | "past" | "all";
}

/** Sessions with how many are registered and how many turned up. */
export async function getAdminDemoSessions(filters: DemoListFilters = {}) {
  await requireAdminAction();

  const clauses = [];
  if (filters.status && (DEMO_SESSION_STATUS as readonly string[]).includes(filters.status)) {
    clauses.push(eq(demoSessions.status, filters.status));
  }
  if (filters.when === "upcoming") {
    clauses.push(gte(demoSessions.scheduledAt, new Date()));
  }

  const rows = await db
    .select({
      id: demoSessions.id,
      courseName: demoSessions.courseName,
      courseSlug: demoSessions.courseSlug,
      scheduledAt: demoSessions.scheduledAt,
      mode: demoSessions.mode,
      status: demoSessions.status,
      trainer: demoSessions.trainer,
      capacity: demoSessions.capacity,
      location: demoSessions.location,
      meetingLink: demoSessions.meetingLink,
      batchName: batches.batchName,
      registered: sql<number>`(
        select count(*) from ${demoRegistrations}
        where ${demoRegistrations.demoSessionId} = ${demoSessions.id}
      )`,
      attended: sql<number>`(
        select count(*) from ${demoRegistrations}
        where ${demoRegistrations.demoSessionId} = ${demoSessions.id}
          and ${demoRegistrations.attendance} = 'attended'
      )`,
    })
    .from(demoSessions)
    .leftJoin(batches, eq(demoSessions.batchId, batches.id))
    .where(clauses.length ? and(...clauses) : undefined)
    .orderBy(
      filters.when === "past"
        ? desc(demoSessions.scheduledAt)
        : asc(demoSessions.scheduledAt),
    );

  if (filters.when === "past") {
    const now = new Date();
    return rows.filter((r) => r.scheduledAt !== null && r.scheduledAt < now);
  }
  return rows;
}

/** Batches a demo can be attached to, for the form's dropdown. */
export async function getBatchOptionsForDemo() {
  await requireAdminAction();
  return db
    .select({
      id: batches.id,
      batchName: batches.batchName,
      courseName: batches.courseName,
      startDate: batches.startDate,
    })
    .from(batches)
    .where(sql`${batches.status} in ('planned', 'upcoming', 'ongoing')`)
    .orderBy(asc(batches.startDate));
}
