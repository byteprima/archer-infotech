"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { LEAD_STATUS, leads } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";

const updateLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  courseInterest: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(LEAD_STATUS),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
  followUpDate: z.string().optional(),
});

export type LeadUpdateData = z.infer<typeof updateLeadSchema>;

// Manual create: name + phone are required (a WhatsApp enquiry often has only a
// phone), email is optional, and source defaults to "manual".
const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address.").or(z.literal("")).optional(),
  phone: z.string().min(8, "Please enter a valid phone number."),
  courseInterest: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(LEAD_STATUS).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
  followUpDate: z.string().optional(),
});

export type LeadCreateData = z.infer<typeof createLeadSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  id?: number;
};

export async function getLeadById(id: number) {
  await requireAdminAction();

  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0] || null;
}

export async function createLead(data: LeadCreateData): Promise<ActionResult> {
  await requireAdminAction();

  const validation = createLeadSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const followUpDate = validation.data.followUpDate
    ? new Date(validation.data.followUpDate)
    : null;

  const inserted = await db
    .insert(leads)
    .values({
      name: validation.data.name,
      email: validation.data.email || "",
      phone: validation.data.phone,
      courseInterest: validation.data.courseInterest || null,
      message: validation.data.message || null,
      source: validation.data.source || "manual",
      status: validation.data.status || "new",
      notes: validation.data.notes || null,
      assignedTo: validation.data.assignedTo || null,
      followUpDate,
    })
    .returning({ id: leads.id });

  const newId = inserted[0]?.id;

  revalidatePath("/admin/leads");

  await logAdminAction({
    action: "lead.create",
    entityType: "lead",
    entityId: newId,
    summary: `Added lead "${validation.data.name}"`,
    metadata: {
      source: validation.data.source || "manual",
      status: validation.data.status || "new",
    },
  });

  return {
    success: true,
    message: "Lead added successfully.",
    id: newId,
  };
}

export async function updateLead(id: number, data: LeadUpdateData): Promise<ActionResult> {
  await requireAdminAction();

  const validation = updateLeadSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const existing = await db.select().from(leads).where(eq(leads.id, id)).limit(1);

  if (!existing[0]) {
    return {
      success: false,
      message: "Lead not found.",
    };
  }

  const followUpDate = validation.data.followUpDate
    ? new Date(validation.data.followUpDate)
    : null;

  await db
    .update(leads)
    .set({
      name: validation.data.name,
      email: validation.data.email,
      phone: validation.data.phone,
      courseInterest: validation.data.courseInterest || null,
      message: validation.data.message || null,
      source: validation.data.source || null,
      status: validation.data.status,
      notes: validation.data.notes || null,
      assignedTo: validation.data.assignedTo || null,
      followUpDate,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);

  await logAdminAction({
    action: "lead.update",
    entityType: "lead",
    entityId: id,
    summary: `Updated lead "${validation.data.name}"`,
    metadata: {
      status: validation.data.status,
      assignedTo: validation.data.assignedTo || null,
      followUpDate: followUpDate?.toISOString() || null,
    },
  });

  return {
    success: true,
    message: "Lead updated successfully.",
  };
}

// Permanently delete a lead — used from the admin leads table to remove
// duplicate / spam enquiries. Guarded by admin auth and audit-logged.
export async function deleteLead(id: number): Promise<ActionResult> {
  await requireAdminAction();

  const existing = await db.select().from(leads).where(eq(leads.id, id)).limit(1);

  if (!existing[0]) {
    return {
      success: false,
      message: "Lead not found.",
    };
  }

  await db.delete(leads).where(eq(leads.id, id));

  revalidatePath("/admin/leads");

  await logAdminAction({
    action: "lead.delete",
    entityType: "lead",
    entityId: id,
    summary: `Deleted lead "${existing[0].name}"`,
    metadata: {
      email: existing[0].email || null,
      phone: existing[0].phone || null,
      courseInterest: existing[0].courseInterest || null,
    },
  });

  return {
    success: true,
    message: "Lead deleted successfully.",
  };
}
