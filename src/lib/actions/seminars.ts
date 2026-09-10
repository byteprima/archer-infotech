"use server";

import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { seminars, type Seminar } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { HOST_TYPES, SEMINAR_FORMATS } from "@/lib/records-constants";


const optionalCount = z.preprocess((v) => {
  if (v === "" || v === null || v === undefined) return undefined;
  if (typeof v === "string") return Number(v);
  return v;
}, z.number().int().min(0).max(100000).optional());

const seminarSchema = z.object({
  hostOrganisation: z.string().trim().min(1, "Host organisation is required").max(200),
  hostType: z.enum(HOST_TYPES).default("corporate"),
  city: z.string().max(120).optional(),
  topic: z.string().trim().min(1, "Topic is required").max(240),
  technologies: z.string().max(500).optional(),
  format: z.enum(SEMINAR_FORMATS).default("seminar"),
  // YYYY-MM or YYYY-MM-DD. Month precision is accepted deliberately: for a
  // session delivered three years ago, "March 2025" is the honest resolution
  // and inventing a day to satisfy a date input would be worse.
  heldOn: z
    .string()
    .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  duration: z.string().max(120).optional(),
  attendees: optionalCount,
  trainerId: z.string().max(80).optional(),
  summary: z.string().max(2000).optional(),
  outcome: z.string().max(1000).optional(),
  isPublished: z.boolean().optional(),
});

export type SeminarFormData = z.infer<typeof seminarSchema>;

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
          ? "You do not have permission to manage seminars."
          : "Please sign in to continue.",
    };
  }
}

function bust() {
  revalidatePath("/admin");
  revalidatePath("/admin/seminars");
  revalidatePath("/seminars");
  revalidatePath("/corporate-training");
}

function normalise(data: SeminarFormData) {
  return {
    ...data,
    city: data.city || null,
    technologies: data.technologies || null,
    heldOn: data.heldOn || null,
    duration: data.duration || null,
    trainerId: data.trainerId || null,
    summary: data.summary || null,
    outcome: data.outcome || null,
    attendees: data.attendees ?? null,
    isPublished: data.isPublished ?? false,
  };
}

export async function getAllSeminars(): Promise<Seminar[]> {
  try {
    return await db.select().from(seminars).orderBy(desc(seminars.heldOn));
  } catch {
    return [];
  }
}

export async function getPublishedSeminars(): Promise<Seminar[]> {
  try {
    return await db
      .select()
      .from(seminars)
      .where(eq(seminars.isPublished, true))
      .orderBy(desc(seminars.heldOn));
  } catch {
    return [];
  }
}

export async function createSeminar(data: SeminarFormData): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;

  const parsed = seminarSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const [row] = await db.insert(seminars).values(normalise(parsed.data)).returning();
    await logAdminAction({
      action: "create",
      entityType: "seminar",
      entityId: String(row.id),
      summary: `${parsed.data.hostOrganisation} — ${parsed.data.topic}`,
    });
    bust();
    return { success: true, message: "Session recorded.", data: row };
  } catch {
    return { success: false, message: "Could not save the session. Please try again." };
  }
}

export async function updateSeminar(id: number, data: SeminarFormData): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;

  const parsed = seminarSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await db
      .update(seminars)
      .set({ ...normalise(parsed.data), updatedAt: new Date() })
      .where(eq(seminars.id, id));
    await logAdminAction({
      action: "update",
      entityType: "seminar",
      entityId: String(id),
      summary: `${parsed.data.hostOrganisation} — ${parsed.data.topic}`,
    });
    bust();
    return { success: true, message: "Session updated." };
  } catch {
    return { success: false, message: "Could not update the session. Please try again." };
  }
}

export async function deleteSeminar(id: number): Promise<ActionResult> {
  const denied = await ensureAdmin();
  if (denied) return denied;
  try {
    const [existing] = await db.select().from(seminars).where(eq(seminars.id, id)).limit(1);
    await db.delete(seminars).where(eq(seminars.id, id));
    await logAdminAction({
      action: "delete",
      entityType: "seminar",
      entityId: String(id),
      summary: existing ? `${existing.hostOrganisation} — ${existing.topic}` : `seminar ${id}`,
    });
    bust();
    return { success: true, message: "Session deleted." };
  } catch {
    return { success: false, message: "Could not delete the session." };
  }
}
