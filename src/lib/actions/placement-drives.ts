"use server";

import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { placementDrives, type PlacementDrive } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { DRIVE_MODES, DRIVE_STATUSES } from "@/lib/records-constants";


const optionalCount = z.preprocess((v) => {
  if (v === "" || v === null || v === undefined) return undefined;
  if (typeof v === "string") return Number(v);
  return v;
}, z.number().int().min(0).max(10000).optional());

const driveSchema = z
  .object({
    company: z.string().trim().min(1, "Company is required").max(200),
    role: z.string().trim().min(1, "Role is required").max(200),
    description: z.string().optional(),
    packageBand: z.string().max(120).optional(),
    location: z.string().max(160).optional(),
    skills: z.string().max(500).optional(),
    eligibility: z.string().max(400).optional(),
    mode: z.enum(DRIVE_MODES).default("campus"),
    driveDate: z.string().optional(),
    status: z.enum(DRIVE_STATUSES).default("upcoming"),
    studentsAppeared: optionalCount,
    studentsSelected: optionalCount,
    applyNote: z.string().max(500).optional(),
    allowJobPostingSchema: z.boolean().optional(),
    validThrough: z.string().optional(),
    isPublished: z.boolean().optional(),
  })
  // Selected can never exceed appeared. Publishing a drive that claims eight
  // selections from six attendees discredits every other number on the site,
  // and it is the kind of slip that happens when two fields are typed months
  // apart.
  .refine(
    (d) =>
      d.studentsAppeared === undefined ||
      d.studentsSelected === undefined ||
      d.studentsSelected <= d.studentsAppeared,
    { message: "Selected cannot exceed the number who appeared", path: ["studentsSelected"] },
  )
  // Google requires validThrough on a live JobPosting and penalises stale
  // ones domain-wide. If someone opts a drive into public markup, the expiry
  // is not optional.
  .refine((d) => !d.allowJobPostingSchema || Boolean(d.validThrough), {
    message:
      "A drive published with JobPosting schema must carry an expiry date — Google penalises postings left live after they close.",
    path: ["validThrough"],
  });

export type PlacementDriveFormData = z.infer<typeof driveSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
};

async function ensureAdmin(): Promise<ActionResult | null> {
  try {
    await requireAdminAction();
    return null;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error && error.message === "Forbidden"
          ? "You do not have permission to manage placement drives."
          : "Please sign in to continue.",
    };
  }
}

function bust() {
  revalidatePath("/admin");
  revalidatePath("/admin/placement-drives");
  revalidatePath("/placement-drives");
  revalidatePath("/placements");
}

export async function getAllDrives(): Promise<PlacementDrive[]> {
  try {
    return await db.select().from(placementDrives).orderBy(desc(placementDrives.driveDate));
  } catch {
    return [];
  }
}

/** Published drives only — what the public page renders. */
export async function getPublishedDrives(): Promise<PlacementDrive[]> {
  try {
    return await db
      .select()
      .from(placementDrives)
      .where(eq(placementDrives.isPublished, true))
      .orderBy(desc(placementDrives.driveDate));
  } catch {
    return [];
  }
}

export async function createPlacementDrive(
  data: PlacementDriveFormData,
): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;

  const parsed = driveSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const [row] = await db
      .insert(placementDrives)
      .values({
        ...parsed.data,
        description: parsed.data.description || null,
        packageBand: parsed.data.packageBand || null,
        location: parsed.data.location || null,
        skills: parsed.data.skills || null,
        eligibility: parsed.data.eligibility || null,
        driveDate: parsed.data.driveDate || null,
        applyNote: parsed.data.applyNote || null,
        validThrough: parsed.data.validThrough || null,
        studentsAppeared: parsed.data.studentsAppeared ?? null,
        studentsSelected: parsed.data.studentsSelected ?? null,
        allowJobPostingSchema: parsed.data.allowJobPostingSchema ?? false,
        isPublished: parsed.data.isPublished ?? false,
      })
      .returning();
    await logAdminAction({
      action: "create",
      entityType: "placement_drive",
      entityId: String(row.id),
      summary: `${parsed.data.company} — ${parsed.data.role}`,
    });
    bust();
    return { success: true, message: "Drive created.", data: row };
  } catch {
    return { success: false, message: "Could not create the drive. Please try again." };
  }
}

export async function updatePlacementDrive(
  id: number,
  data: PlacementDriveFormData,
): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;

  const parsed = driveSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await db
      .update(placementDrives)
      .set({
        ...parsed.data,
        description: parsed.data.description || null,
        packageBand: parsed.data.packageBand || null,
        location: parsed.data.location || null,
        skills: parsed.data.skills || null,
        eligibility: parsed.data.eligibility || null,
        driveDate: parsed.data.driveDate || null,
        applyNote: parsed.data.applyNote || null,
        validThrough: parsed.data.validThrough || null,
        studentsAppeared: parsed.data.studentsAppeared ?? null,
        studentsSelected: parsed.data.studentsSelected ?? null,
        allowJobPostingSchema: parsed.data.allowJobPostingSchema ?? false,
        isPublished: parsed.data.isPublished ?? false,
        updatedAt: new Date(),
      })
      .where(eq(placementDrives.id, id));
    await logAdminAction({
      action: "update",
      entityType: "placement_drive",
      entityId: String(id),
      summary: `${parsed.data.company} — ${parsed.data.role}`,
    });
    bust();
    return { success: true, message: "Drive updated." };
  } catch {
    return { success: false, message: "Could not update the drive. Please try again." };
  }
}

export async function deletePlacementDrive(id: number): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;
  try {
    // Read before deleting so the audit entry names what was removed. An
    // audit line reading "deleted drive 14" is worth very little six months on.
    const [existing] = await db
      .select()
      .from(placementDrives)
      .where(eq(placementDrives.id, id))
      .limit(1);
    await db.delete(placementDrives).where(eq(placementDrives.id, id));
    await logAdminAction({
      action: "delete",
      entityType: "placement_drive",
      entityId: String(id),
      summary: existing ? `${existing.company} — ${existing.role}` : `drive ${id}`,
    });
    bust();
    return { success: true, message: "Drive deleted." };
  } catch {
    return { success: false, message: "Could not delete the drive." };
  }
}
