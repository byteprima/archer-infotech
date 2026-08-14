"use server";

/**
 * Campaign popup configuration — admin CRUD plus the public resolver.
 *
 * Everything the popup needs lives in the DB so the campaign can be turned
 * off, retargeted or re-skinned without a rebuild. The public site never
 * imports from here directly; it reads /api/popup, which is uncached.
 */

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";

// Server Actions are POST endpoints — reachable by anyone who knows the
// action id, not only by someone looking at the admin page. These upload
// files and change what every visitor sees, so each one re-checks.
import { requireAdminAction, logAdminAction } from "@/lib/admin";
import { saveMedia, deleteMedia, mediaUrl } from "@/lib/storage/media";

export type PopupMode = "image_only" | "image_and_form";

export interface ActivePopup {
  id: number;
  subject: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  mode: PopupMode;
  linkUrl: string | null;
}

const DATE = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
  .optional()
  .or(z.literal(""))
  .transform((v) => v || null);

const schema = z.object({
  subject: z.string().trim().min(2, "Give the campaign a subject."),
  imageAlt: z
    .string()
    .trim()
    .min(10, "Describe the offer in words — screen readers and Google can't read the artwork."),
  mode: z.enum(["image_only", "image_and_form"]),
  linkUrl: z.string().trim().optional().or(z.literal("")).transform((v) => v || null),
  enabled: z.boolean(),
  startDate: DATE,
  endDate: DATE,
  imageWidth: z.number().int().positive(),
  imageHeight: z.number().int().positive(),
});

export interface PopupActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/** Today in IST as YYYY-MM-DD. The offer window is stated in local dates. */
function todayIST(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

/**
 * The one campaign the public site should show right now, or null.
 *
 * Enabled, and inside its date window if it has one. If several qualify the
 * most recently updated wins, so turning a new one on effectively replaces
 * the old without needing to switch the old one off first.
 */
export async function getActivePopup(): Promise<ActivePopup | null> {
  try {
    const { db } = await import("@/db");
    const { popupCampaigns } = await import("@/db/schema");

    const rows = await db
      .select()
      .from(popupCampaigns)
      .where(eq(popupCampaigns.enabled, true))
      .orderBy(desc(popupCampaigns.updatedAt));

    const today = todayIST();
    const live = rows.find(
      (r) =>
        (!r.startDate || today >= r.startDate) &&
        (!r.endDate || today <= r.endDate),
    );
    if (!live) return null;

    return {
      id: live.id,
      subject: live.subject,
      imageUrl: mediaUrl("offers", live.imageFilename),
      imageWidth: live.imageWidth,
      imageHeight: live.imageHeight,
      imageAlt: live.imageAlt,
      mode: live.mode === "image_only" ? "image_only" : "image_and_form",
      linkUrl: live.linkUrl,
    };
  } catch {
    // A popup is never worth breaking a page render over.
    return null;
  }
}

/** Admin list. */
export async function listPopupCampaigns() {
  await requireAdminAction();
  const { db } = await import("@/db");
  const { popupCampaigns } = await import("@/db/schema");
  return db.select().from(popupCampaigns).orderBy(desc(popupCampaigns.updatedAt));
}

export async function getPopupCampaign(id: number) {
  await requireAdminAction();
  const { db } = await import("@/db");
  const { popupCampaigns } = await import("@/db/schema");
  const rows = await db
    .select()
    .from(popupCampaigns)
    .where(eq(popupCampaigns.id, id))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Create or update. `id` absent means create, in which case an image is
 * required; on update, leaving the file input empty keeps the current image.
 */
export async function savePopupCampaign(
  formData: FormData,
): Promise<PopupActionResult> {
  await requireAdminAction();

  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;

  const parsed = schema.safeParse({
    subject: str(formData, "subject"),
    imageAlt: str(formData, "imageAlt"),
    mode: str(formData, "mode") === "image_only" ? "image_only" : "image_and_form",
    linkUrl: str(formData, "linkUrl"),
    enabled: str(formData, "enabled") === "on",
    startDate: str(formData, "startDate"),
    endDate: str(formData, "endDate"),
    imageWidth: Number(str(formData, "imageWidth")) || 0,
    imageHeight: Number(str(formData, "imageHeight")) || 0,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const d = parsed.data;

  if (d.startDate && d.endDate && d.endDate < d.startDate) {
    return {
      success: false,
      message: "The end date is before the start date.",
      errors: { endDate: ["The end date is before the start date."] },
    };
  }

  const { db } = await import("@/db");
  const { popupCampaigns } = await import("@/db/schema");

  const file = formData.get("image");
  const hasNewImage = file instanceof File && file.size > 0;

  let imageFilename: string | null = null;
  if (hasNewImage) {
    const saved = await saveMedia(file, "offers");
    if (!saved.ok) {
      return { success: false, message: saved.error, errors: { image: [saved.error] } };
    }
    imageFilename = saved.filename;
  }

  try {
    if (id) {
      const existing = await db
        .select()
        .from(popupCampaigns)
        .where(eq(popupCampaigns.id, id))
        .limit(1);
      if (!existing[0]) return { success: false, message: "That campaign no longer exists." };

      await db
        .update(popupCampaigns)
        .set({
          subject: d.subject,
          imageAlt: d.imageAlt,
          mode: d.mode,
          linkUrl: d.linkUrl,
          enabled: d.enabled,
          startDate: d.startDate,
          endDate: d.endDate,
          ...(imageFilename
            ? {
                imageFilename,
                imageWidth: d.imageWidth,
                imageHeight: d.imageHeight,
              }
            : {}),
          updatedAt: new Date(),
        })
        .where(eq(popupCampaigns.id, id));

      // Only once the row points at the new file — deleting first would
      // leave a live campaign with no artwork if the update then failed.
      if (imageFilename && existing[0].imageFilename !== imageFilename) {
        await deleteMedia("offers", existing[0].imageFilename).catch(() => {});
      }
    } else {
      if (!imageFilename) {
        const msg = "Upload the popup artwork.";
        return { success: false, message: msg, errors: { image: [msg] } };
      }
      await db.insert(popupCampaigns).values({
        subject: d.subject,
        imageFilename,
        imageWidth: d.imageWidth,
        imageHeight: d.imageHeight,
        imageAlt: d.imageAlt,
        mode: d.mode,
        linkUrl: d.linkUrl,
        enabled: d.enabled,
        startDate: d.startDate,
        endDate: d.endDate,
      });
    }
  } catch {
    return { success: false, message: "Couldn't save the campaign. Please try again." };
  }

  await logAdminAction({
    action: id ? "popup.update" : "popup.create",
    entityType: "popup_campaign",
    entityId: id ?? undefined,
    summary: `${id ? "Updated" : "Created"} popup campaign "${d.subject}" (${d.mode}, ${d.enabled ? "enabled" : "disabled"})`,
  });

  revalidatePath("/admin/popups");
  return { success: true, message: id ? "Campaign updated." : "Campaign created." };
}

/** The enable/disable switch on the list page. */
export async function togglePopupCampaign(
  id: number,
  enabled: boolean,
): Promise<PopupActionResult> {
  await requireAdminAction();
  try {
    const { db } = await import("@/db");
    const { popupCampaigns } = await import("@/db/schema");
    await db
      .update(popupCampaigns)
      .set({ enabled, updatedAt: new Date() })
      .where(eq(popupCampaigns.id, id));
  } catch {
    return { success: false, message: "Couldn't change that. Please try again." };
  }
  await logAdminAction({
    action: "popup.toggle",
    entityType: "popup_campaign",
    entityId: id,
    summary: `Popup campaign ${id} ${enabled ? "enabled" : "disabled"}`,
  });

  revalidatePath("/admin/popups");
  return { success: true, message: enabled ? "Popup is live." : "Popup switched off." };
}

export async function deletePopupCampaign(id: number): Promise<PopupActionResult> {
  await requireAdminAction();
  try {
    const { db } = await import("@/db");
    const { popupCampaigns } = await import("@/db/schema");
    const rows = await db
      .select()
      .from(popupCampaigns)
      .where(and(eq(popupCampaigns.id, id)))
      .limit(1);
    await db.delete(popupCampaigns).where(eq(popupCampaigns.id, id));
    if (rows[0]) await deleteMedia("offers", rows[0].imageFilename).catch(() => {});
  } catch {
    return { success: false, message: "Couldn't delete that. Please try again." };
  }
  await logAdminAction({
    action: "popup.delete",
    entityType: "popup_campaign",
    entityId: id,
    summary: `Deleted popup campaign ${id}`,
  });

  revalidatePath("/admin/popups");
  return { success: true, message: "Campaign deleted." };
}
