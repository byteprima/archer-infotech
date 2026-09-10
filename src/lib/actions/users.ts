"use server";

import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { user } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { USER_ROLES, canManageUsers, type UserRole as StaffUserRole } from "@/lib/leads/roles";
import { getCurrentRole } from "@/lib/auth";


type ActionResult = {
  success: boolean;
  message: string;
};

export async function updateUserRole(
  userId: string,
  nextRole: StaffUserRole
): Promise<ActionResult> {
  const actor = await requireAdminAction();

  if (!userId) {
    return {
      success: false,
      message: "A user ID is required.",
    };
  }

  // Was a two-value check, which would have rejected the manager and
  // counsellor roles the lead pipeline now uses.
  if (!(USER_ROLES as readonly string[]).includes(nextRole)) {
    return {
      success: false,
      message: "Invalid role provided.",
    };
  }

  // Only an admin may change roles at all: granting a role is how someone
  // would escalate their own, so a manager with this power is an admin.
  const actorRole = await getCurrentRole();
  if (!canManageUsers(actorRole)) {
    return {
      success: false,
      message: "Only an admin can change user roles.",
    };
  }

  const existingUser = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  if (!existingUser[0]) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  if (existingUser[0].role === nextRole) {
    return {
      success: true,
      message: "User role is already up to date.",
    };
  }

  if (actor.actorId && actor.actorId === userId && nextRole !== "admin") {
    return {
      success: false,
      message: "You cannot remove your own admin access.",
    };
  }

  if (existingUser[0].role === "admin" && nextRole === "user") {
    const adminCountResult = await db
      .select({ count: count() })
      .from(user)
      .where(eq(user.role, "admin"));

    if ((adminCountResult[0]?.count ?? 0) <= 1) {
      return {
        success: false,
        message: "At least one admin user must remain.",
      };
    }
  }

  await db
    .update(user)
    .set({
      role: nextRole,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));

  revalidatePath("/admin/users");
  revalidatePath("/admin");

  await logAdminAction({
    action: "user.role.update",
    entityType: "user",
    entityId: userId,
    summary: `Changed ${existingUser[0].email} role to ${nextRole}`,
    metadata: {
      previousRole: existingUser[0].role,
      nextRole,
    },
  });

  return {
    success: true,
    message: "User role updated successfully.",
  };
}
