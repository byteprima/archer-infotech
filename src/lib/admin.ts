import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { getCurrentUser, isAdmin, isAuthenticated } from "@/lib/auth";

type AdminActor = {
  actorId: string | null;
  actorLabel: string;
};

type AuditLogInput = {
  action: string;
  entityType: string;
  entityId?: string | number | null;
  summary: string;
  metadata?: Record<string, unknown> | null;
};

export async function requireAdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const admin = await isAdmin();

  if (!admin) {
    redirect("/admin/unauthorized");
  }

  return getAdminActor();
}

export async function requireAdminAction() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error("Unauthorized");
  }

  const admin = await isAdmin();

  if (!admin) {
    throw new Error("Forbidden");
  }

  return getAdminActor();
}

export async function logAdminAction({
  action,
  entityType,
  entityId,
  summary,
  metadata,
}: AuditLogInput) {
  try {
    const actor = await getAdminActor();
    const headerList = await headers();
    const ipAddress = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const userAgent = headerList.get("user-agent") || null;

    await db.insert(auditLogs).values({
      actorId: actor.actorId,
      actorLabel: actor.actorLabel,
      action,
      entityType,
      entityId: entityId == null ? null : String(entityId),
      summary,
      metadata: metadata ? JSON.stringify(metadata) : null,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.warn("Failed to write admin audit log:", error);
  }
}

async function getAdminActor(): Promise<AdminActor> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      actorId: null,
      actorLabel: "legacy-admin",
    };
  }

  return {
    actorId: "id" in user && typeof user.id === "string" ? user.id : null,
    actorLabel:
      ("email" in user && typeof user.email === "string" && user.email) ||
      ("name" in user && typeof user.name === "string" && user.name) ||
      "admin-user",
  };
}
