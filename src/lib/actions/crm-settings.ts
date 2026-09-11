"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { crmSettings } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { getCurrentRole } from "@/lib/auth";
import { canManageContent } from "@/lib/leads/roles";
import {
  CRM_SETTING_DEFAULTS,
  CRM_SETTING_KEYS,
  isCrmSettingKey,
  type CrmSettingKey,
} from "@/lib/crm/settings";
import { getSettings, nextAssignee } from "@/lib/crm/automation";

export type ActionResult = { success: boolean; message: string };

export async function readCrmSettings(): Promise<Record<CrmSettingKey, string>> {
  await requireAdminAction();
  return getSettings();
}

/** Who the next auto-assigned enquiry would go to, for the settings preview. */
export async function previewNextAssignee(): Promise<string | null> {
  await requireAdminAction();
  const assignee = await nextAssignee();
  return assignee?.name ?? null;
}

const saveSchema = z.object({
  auto_assign_enabled: z.enum(["true", "false"]),
  auto_follow_up_enabled: z.enum(["true", "false"]),
  auto_follow_up_days: z.string().trim(),
  ai_insights_enabled: z.enum(["true", "false"]),
});

export async function saveCrmSettings(
  input: z.infer<typeof saveSchema>,
): Promise<ActionResult> {
  await requireAdminAction();

  // Automation decides who real enquiries go to. A counsellor should not be
  // able to route the queue to themselves.
  const role = await getCurrentRole();
  if (!canManageContent(role)) {
    return { success: false, message: "Your role cannot change these settings." };
  }

  const parsed = saveSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid settings." };

  const entries = Object.entries(parsed.data).filter(([key]) => isCrmSettingKey(key));

  for (const [key, value] of entries) {
    await db
      .insert(crmSettings)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: crmSettings.key,
        set: { value, updatedAt: new Date() },
      });
  }

  await logAdminAction({
    action: "update",
    entityType: "crm_settings",
    entityId: "crm",
    summary: `Updated CRM automation: ${entries.map(([k, v]) => `${k}=${v}`).join(", ")}`,
  });

  revalidatePath("/admin/crm/settings");
  revalidatePath("/admin/crm");
  return { success: true, message: "Settings saved." };
}

/** Restore every key to its shipped default. */
export async function resetCrmSettings(): Promise<ActionResult> {
  await requireAdminAction();
  const role = await getCurrentRole();
  if (!canManageContent(role)) {
    return { success: false, message: "Your role cannot change these settings." };
  }

  for (const key of CRM_SETTING_KEYS) {
    await db
      .insert(crmSettings)
      .values({ key, value: CRM_SETTING_DEFAULTS[key], updatedAt: new Date() })
      .onConflictDoUpdate({
        target: crmSettings.key,
        set: { value: CRM_SETTING_DEFAULTS[key], updatedAt: new Date() },
      });
  }

  await logAdminAction({
    action: "update",
    entityType: "crm_settings",
    entityId: "crm",
    summary: "Reset CRM automation to defaults (both automations off)",
  });

  revalidatePath("/admin/crm/settings");
  return { success: true, message: "Reset to defaults — both automations are off." };
}
