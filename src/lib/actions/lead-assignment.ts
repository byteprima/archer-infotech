"use server";

import { z } from "zod";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { leads, user } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { getCurrentRole } from "@/lib/auth";
import { canAssignLeads, STAFF_ROLES } from "@/lib/leads/roles";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "@/lib/leads/lifecycle";

/**
 * Assignment, priority and status changes.
 *
 * Every one of these re-checks the caller's role on the server. The UI hides
 * what a role cannot do, but hiding a button is a courtesy, not a control —
 * the specification is explicit that authorization must be enforced in the
 * backend, and a server action is a public HTTP endpoint like any other.
 */

export type ActionResult = { success: boolean; message: string };

/** Staff who can own a lead, for the assignment dropdown. */
export async function getAssignableStaff() {
  await requireAdminAction();
  return db
    .select({ id: user.id, name: user.name, email: user.email, role: user.role })
    .from(user)
    .where(inArray(user.role, [...STAFF_ROLES]))
    .orderBy(user.name);
}

const assignSchema = z.object({
  leadId: z.number().int().positive(),
  /** Empty string unassigns. */
  userId: z.string().trim(),
});

export async function assignLead(input: z.infer<typeof assignSchema>): Promise<ActionResult> {
  const actor = await requireAdminAction();
  const role = await getCurrentRole();
  if (!canAssignLeads(role)) {
    return { success: false, message: "Your role cannot assign leads." };
  }

  const parsed = assignSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid request." };
  const { leadId, userId } = parsed.data;

  let assigneeLabel = "Unassigned";
  if (userId) {
    const [assignee] = await db
      .select({ id: user.id, name: user.name, role: user.role })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);
    // Guard the id as well as the role: an arbitrary string would otherwise
    // be written straight into the column by a crafted request.
    if (!assignee) return { success: false, message: "That user does not exist." };
    if (!(STAFF_ROLES as readonly string[]).includes(assignee.role)) {
      return { success: false, message: "That user is not staff." };
    }
    assigneeLabel = assignee.name;
  }

  await db
    .update(leads)
    .set({
      assignedToUserId: userId || null,
      assignedAt: userId ? new Date() : null,
      assignedBy: userId ? actor.actorId : null,
      // Keep the legacy text column readable for anyone looking at the row
      // directly; it is display only and no longer the source of truth.
      assignedTo: userId ? assigneeLabel : null,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, leadId));

  await logAdminAction({
    action: "update",
    entityType: "lead",
    entityId: String(leadId),
    summary: userId
      ? `Assigned lead #${leadId} to ${assigneeLabel}`
      : `Unassigned lead #${leadId}`,
  });

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  return { success: true, message: userId ? `Assigned to ${assigneeLabel}.` : "Unassigned." };
}

const prioritySchema = z.object({
  leadId: z.number().int().positive(),
  priority: z.enum(LEAD_PRIORITIES).nullable(),
});

export async function setLeadPriority(
  input: z.infer<typeof prioritySchema>,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = prioritySchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid priority." };

  await db
    .update(leads)
    .set({ priority: parsed.data.priority, updatedAt: new Date() })
    .where(eq(leads.id, parsed.data.leadId));

  await logAdminAction({
    action: "update",
    entityType: "lead",
    entityId: String(parsed.data.leadId),
    summary: `Set priority of lead #${parsed.data.leadId} to ${parsed.data.priority ?? "none"}`,
  });

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Priority updated." };
}

const statusSchema = z.object({
  leadId: z.number().int().positive(),
  status: z.enum(LEAD_STATUSES),
});

export async function setLeadStatus(
  input: z.infer<typeof statusSchema>,
): Promise<ActionResult> {
  await requireAdminAction();
  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid status." };

  await db
    .update(leads)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(leads.id, parsed.data.leadId));

  await logAdminAction({
    action: "update",
    entityType: "lead",
    entityId: String(parsed.data.leadId),
    summary: `Moved lead #${parsed.data.leadId} to ${parsed.data.status}`,
  });

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Status updated." };
}
