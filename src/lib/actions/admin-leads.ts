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

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function getLeadById(id: number) {
  await requireAdminAction();

  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0] || null;
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
