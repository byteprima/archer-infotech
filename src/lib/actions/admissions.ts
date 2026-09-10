"use server";

import { z } from "zod";
import { and, desc, eq, gte, like, lte, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { admissions, batches, leads, user } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { getCourse } from "@/data/courses";
import { computeFees, MAX_FEE_PAISE } from "@/lib/admissions/money";
import { nextAdmissionNumber } from "@/lib/admissions/numbering";
import {
  ADMISSION_STATUSES,
  PAYMENT_STATUSES,
} from "@/lib/admissions/lifecycle";

/**
 * Converting an enquiry into an admission, and maintaining it afterwards.
 *
 * The lead is never deleted and never edited beyond its status — the enquiry,
 * its follow-ups and the admission together are the record of how a student
 * arrived, and that is the thing the reports will eventually be asked for.
 */

export type ActionResult = { success: boolean; message: string };

const feeFields = {
  courseFee: z.union([z.string(), z.number()]),
  discount: z.union([z.string(), z.number()]).optional(),
};

const convertSchema = z.object({
  leadId: z.number().int().positive(),
  studentName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(200).or(z.literal("")).optional(),
  courseSlug: z.string().trim().min(1).max(120),
  batchId: z.number().int().positive().nullable().optional(),
  admissionDate: z.string().trim().min(1),
  notes: z.string().trim().max(1000).optional(),
  paymentStatus: z.enum(PAYMENT_STATUSES).optional(),
  ...feeFields,
});

export type ConvertLeadInput = z.input<typeof convertSchema>;

/**
 * Parse a date typed as YYYY-MM-DD as local noon.
 *
 * Midnight is what a naive `new Date("2026-09-11")` gives, in UTC, which in
 * IST is 5:30am on the same day — fine — but the same value a few timezones
 * west lands on the day before. Noon survives that, and an admission date has
 * no meaningful time of day anyway.
 */
function parseAdmissionDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function getAdmissionForLead(leadId: number) {
  await requireAdminAction();
  const [row] = await db
    .select({
      id: admissions.id,
      admissionNumber: admissions.admissionNumber,
      studentName: admissions.studentName,
      phone: admissions.phone,
      email: admissions.email,
      courseSlug: admissions.courseSlug,
      courseName: admissions.courseName,
      batchId: admissions.batchId,
      batchName: batches.batchName,
      batchStartDate: batches.startDate,
      admissionDate: admissions.admissionDate,
      courseFee: admissions.courseFee,
      discount: admissions.discount,
      finalFee: admissions.finalFee,
      status: admissions.status,
      paymentStatus: admissions.paymentStatus,
      notes: admissions.notes,
      createdAt: admissions.createdAt,
    })
    .from(admissions)
    .leftJoin(batches, eq(admissions.batchId, batches.id))
    .where(eq(admissions.leadId, leadId))
    .limit(1);
  return row ?? null;
}

export async function convertLeadToAdmission(
  input: ConvertLeadInput,
): Promise<ActionResult> {
  const actor = await requireAdminAction();
  const parsed = convertSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid admission details.",
    };
  }
  const data = parsed.data;

  const [lead] = await db
    .select({ id: leads.id, name: leads.name })
    .from(leads)
    .where(eq(leads.id, data.leadId))
    .limit(1);
  if (!lead) return { success: false, message: "That lead no longer exists." };

  const course = getCourse(data.courseSlug);
  if (!course) {
    return { success: false, message: "Pick a course from the list." };
  }

  const admissionDate = parseAdmissionDate(data.admissionDate);
  if (!admissionDate) {
    return { success: false, message: "Enter a valid admission date." };
  }

  const fees = computeFees(data.courseFee, data.discount);
  if (!fees.ok) return { success: false, message: fees.message };

  if (data.batchId) {
    const [batch] = await db
      .select({ id: batches.id })
      .from(batches)
      .where(eq(batches.id, data.batchId))
      .limit(1);
    if (!batch) return { success: false, message: "That batch no longer exists." };
  }

  const year = admissionDate.getFullYear();

  try {
    // One transaction so the reference number cannot be handed out twice, and
    // so a lead is never left marked ADMISSION_CONFIRMED with no admission
    // behind it.
    db.transaction((tx) => {
      const issued = tx
        .select({ admissionNumber: admissions.admissionNumber })
        .from(admissions)
        .where(
          like(admissions.admissionNumber, `ADM-${year}-%`),
        )
        .all()
        .map((r) => r.admissionNumber);

      tx.insert(admissions)
        .values({
          leadId: data.leadId,
          admissionNumber: nextAdmissionNumber(year, issued),
          studentName: data.studentName,
          phone: data.phone,
          email: data.email || null,
          courseSlug: course.slug,
          courseName: course.title,
          batchId: data.batchId ?? null,
          admissionDate,
          courseFee: fees.courseFee,
          discount: fees.discount,
          finalFee: fees.finalFee,
          status: "ENROLLED",
          paymentStatus: data.paymentStatus ?? "PENDING",
          notes: data.notes || null,
          createdByUserId: actor.actorId,
        })
        .run();

      tx.update(leads)
        .set({ status: "ADMISSION_CONFIRMED", updatedAt: new Date() })
        .where(eq(leads.id, data.leadId))
        .run();
    });
  } catch {
    // Reachable through the unique index on lead_id — two counsellors with the
    // same lead open, both clicking Convert.
    return {
      success: false,
      message: "This lead has already been converted to an admission.",
    };
  }

  await logAdminAction({
    action: "create",
    entityType: "admission",
    entityId: String(data.leadId),
    summary: `Converted lead #${data.leadId} (${lead.name}) to an admission for ${course.title}`,
  });
  revalidatePath(`/admin/leads/${data.leadId}`);
  revalidatePath("/admin/admissions");
  revalidatePath("/admin/leads");
  return { success: true, message: "Admission recorded." };
}

const updateSchema = z.object({
  admissionId: z.number().int().positive(),
  leadId: z.number().int().positive(),
  batchId: z.number().int().positive().nullable().optional(),
  status: z.enum(ADMISSION_STATUSES),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  notes: z.string().trim().max(1000).optional(),
  ...feeFields,
});

export type UpdateAdmissionInput = z.input<typeof updateSchema>;

export async function updateAdmission(
  input: UpdateAdmissionInput,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid admission details.",
    };
  }
  const data = parsed.data;

  const fees = computeFees(data.courseFee, data.discount);
  if (!fees.ok) return { success: false, message: fees.message };

  const [existing] = await db
    .select({ id: admissions.id, status: admissions.status })
    .from(admissions)
    .where(eq(admissions.id, data.admissionId))
    .limit(1);
  if (!existing) {
    return { success: false, message: "That admission no longer exists." };
  }

  if (data.batchId) {
    const [batch] = await db
      .select({ id: batches.id })
      .from(batches)
      .where(eq(batches.id, data.batchId))
      .limit(1);
    if (!batch) return { success: false, message: "That batch no longer exists." };
  }

  await db
    .update(admissions)
    .set({
      batchId: data.batchId ?? null,
      status: data.status,
      paymentStatus: data.paymentStatus,
      notes: data.notes || null,
      courseFee: fees.courseFee,
      discount: fees.discount,
      finalFee: fees.finalFee,
      updatedAt: new Date(),
    })
    .where(eq(admissions.id, data.admissionId));

  // A cancelled admission must not leave the lead reading "Admission
  // Confirmed" — every count on the leads screen would be wrong. It moves to
  // FOLLOW_UP rather than LOST on purpose: a cancellation is often a deferral
  // to the next batch, and LOST would close the lead and drop it out of the
  // follow-up queues, hiding somebody who is still worth calling.
  if (data.status === "CANCELLED" && existing.status !== "CANCELLED") {
    await db
      .update(leads)
      .set({ status: "FOLLOW_UP", updatedAt: new Date() })
      .where(
        and(eq(leads.id, data.leadId), eq(leads.status, "ADMISSION_CONFIRMED")),
      );
  }

  // Re-confirming a cancelled admission puts the lead back where it was.
  if (data.status === "ENROLLED" && existing.status === "CANCELLED") {
    await db
      .update(leads)
      .set({ status: "ADMISSION_CONFIRMED", updatedAt: new Date() })
      .where(eq(leads.id, data.leadId));
  }

  await logAdminAction({
    action: "update",
    entityType: "admission",
    entityId: String(data.admissionId),
    summary: `Updated admission #${data.admissionId} for lead #${data.leadId} (${data.status}, ${data.paymentStatus})`,
  });
  revalidatePath(`/admin/leads/${data.leadId}`);
  revalidatePath("/admin/admissions");
  revalidatePath("/admin/leads");
  return { success: true, message: "Admission updated." };
}

export interface AdmissionListFilters {
  status?: string;
  paymentStatus?: string;
  courseSlug?: string;
  search?: string;
  from?: string;
  to?: string;
}

/** Every admission, newest first, for /admin/admissions. */
export async function listAdmissions(filters: AdmissionListFilters = {}) {
  await requireAdminAction();

  const clauses = [];
  if (filters.status) clauses.push(eq(admissions.status, filters.status));
  if (filters.paymentStatus) {
    clauses.push(eq(admissions.paymentStatus, filters.paymentStatus));
  }
  if (filters.courseSlug) {
    clauses.push(eq(admissions.courseSlug, filters.courseSlug));
  }
  if (filters.search) {
    const term = `%${filters.search.trim()}%`;
    clauses.push(
      or(
        like(admissions.studentName, term),
        like(admissions.phone, term),
        like(admissions.email, term),
        like(admissions.admissionNumber, term),
      ),
    );
  }
  if (filters.from) {
    const from = parseAdmissionDate(filters.from);
    if (from) {
      from.setHours(0, 0, 0, 0);
      clauses.push(gte(admissions.admissionDate, from));
    }
  }
  if (filters.to) {
    const to = parseAdmissionDate(filters.to);
    if (to) {
      to.setHours(23, 59, 59, 999);
      clauses.push(lte(admissions.admissionDate, to));
    }
  }

  return db
    .select({
      id: admissions.id,
      leadId: admissions.leadId,
      admissionNumber: admissions.admissionNumber,
      studentName: admissions.studentName,
      phone: admissions.phone,
      email: admissions.email,
      courseName: admissions.courseName,
      courseSlug: admissions.courseSlug,
      batchName: batches.batchName,
      admissionDate: admissions.admissionDate,
      finalFee: admissions.finalFee,
      status: admissions.status,
      paymentStatus: admissions.paymentStatus,
      counsellor: user.name,
    })
    .from(admissions)
    .leftJoin(batches, eq(admissions.batchId, batches.id))
    .leftJoin(user, eq(admissions.createdByUserId, user.id))
    .where(clauses.length ? and(...clauses) : undefined)
    .orderBy(desc(admissions.admissionDate), desc(admissions.id));
}

/** Headline totals for the admissions list. */
export async function getAdmissionTotals(filters: AdmissionListFilters = {}) {
  const rows = await listAdmissions(filters);
  const active = rows.filter((r) => r.status !== "CANCELLED");
  return {
    count: rows.length,
    activeCount: active.length,
    feeTotal: active.reduce((sum, r) => sum + (r.finalFee ?? 0), 0),
    paidCount: active.filter((r) => r.paymentStatus === "PAID").length,
    maxFeePaise: MAX_FEE_PAISE,
  };
}

/** Course slugs that have at least one admission, for the filter dropdown. */
export async function getAdmissionCourseOptions() {
  await requireAdminAction();
  return db
    .select({
      courseSlug: admissions.courseSlug,
      courseName: admissions.courseName,
      count: sql<number>`count(*)`,
    })
    .from(admissions)
    .groupBy(admissions.courseSlug, admissions.courseName)
    .orderBy(admissions.courseName);
}
