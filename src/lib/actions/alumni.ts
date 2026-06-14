"use server";

import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Alumni } from "@/db";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { captureServerEvent } from "@/lib/posthog/server";
import {
  ALUMNI_PACKAGE_BANDS,
  ALUMNI_STATUSES,
  type AlumniStatus,
} from "@/lib/alumni/constants";
import {
  saveAlumniPhoto,
  deleteAlumniPhoto,
  alumniPhotoUrl,
} from "@/lib/storage/alumni-photos";

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
};

// ---------------------------------------------------------------------------
// Public submission
// ---------------------------------------------------------------------------

const optionalUrl = z
  .string()
  .trim()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

const submitSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name").max(255),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z
      .string()
      .trim()
      .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
    city: z.string().trim().max(120).optional().or(z.literal("")),
    linkedinUrl: optionalUrl,
    githubUrl: optionalUrl,
    courseTaken: z.string().trim().max(160).optional().or(z.literal("")),
    completionYear: z.string().trim().max(40).optional().or(z.literal("")),
    currentCompany: z
      .string()
      .trim()
      .min(1, "Please tell us your current company")
      .max(160),
    currentRole: z.string().trim().max(160).optional().or(z.literal("")),
    packageBand: z
      .enum(ALUMNI_PACKAGE_BANDS)
      .optional()
      .or(z.literal("")),
    yearsExperience: z.string().trim().max(40).optional().or(z.literal("")),
    openToReferrals: z.boolean().optional(),
    companyHiring: z.boolean().optional(),
    hiringRoles: z.string().trim().max(500).optional().or(z.literal("")),
    hrContacts: z.string().trim().max(2000).optional().or(z.literal("")),
    testimonialContent: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .or(z.literal("")),
    rating: z.coerce.number().int().min(1).max(5).optional(),
    consentDisplayPublic: z.boolean().optional(),
    consentSharePartners: z.boolean().optional(),
    lookingForJobChange: z.boolean().optional(),
    source: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    analyticsDistinctId: z.string().optional(),
  })
  .refine(
    (d) => !d.consentDisplayPublic || (d.testimonialContent ?? "").length >= 10,
    {
      message:
        "Please write a short testimonial (at least 10 characters) to display publicly, or untick public display.",
      path: ["testimonialContent"],
    }
  );

function bool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/**
 * Public alumni submission. Accepts FormData (so it can carry an optional
 * photo file). Validates, stores the photo on the persistent volume, and
 * inserts a row with status "new" for admin review. Nothing is published
 * publicly here — that only happens when an admin approves.
 */
export async function submitAlumni(formData: FormData): Promise<ActionResult> {
  const parsed = submitSchema.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    city: str(formData, "city"),
    linkedinUrl: str(formData, "linkedinUrl"),
    githubUrl: str(formData, "githubUrl"),
    courseTaken: str(formData, "courseTaken"),
    completionYear: str(formData, "completionYear"),
    currentCompany: str(formData, "currentCompany"),
    currentRole: str(formData, "currentRole"),
    packageBand: str(formData, "packageBand"),
    yearsExperience: str(formData, "yearsExperience"),
    openToReferrals: bool(formData, "openToReferrals"),
    companyHiring: bool(formData, "companyHiring"),
    hiringRoles: str(formData, "hiringRoles"),
    hrContacts: str(formData, "hrContacts"),
    testimonialContent: str(formData, "testimonialContent"),
    rating: str(formData, "rating") || undefined,
    consentDisplayPublic: bool(formData, "consentDisplayPublic"),
    consentSharePartners: bool(formData, "consentSharePartners"),
    lookingForJobChange: bool(formData, "lookingForJobChange"),
    source: str(formData, "source") || "alumni_form",
    utmSource: str(formData, "utmSource") || undefined,
    utmMedium: str(formData, "utmMedium") || undefined,
    utmCampaign: str(formData, "utmCampaign") || undefined,
    analyticsDistinctId: str(formData, "analyticsDistinctId") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const d = parsed.data;

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Alumni submission (no database configured):", d.name);
      return {
        success: true,
        message: "Thank you! Your details were received (mock mode).",
      };
    }

    // Optional photo upload.
    let photoFilename: string | null = null;
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const saved = await saveAlumniPhoto(photo);
      if (!saved.ok) {
        return {
          success: false,
          message: saved.error,
          errors: { photo: [saved.error] },
        };
      }
      photoFilename = saved.filename;
    }

    const { db, alumni } = await import("@/db");

    const result = await db
      .insert(alumni)
      .values({
        name: d.name,
        email: d.email,
        phone: d.phone,
        city: d.city || null,
        linkedinUrl: d.linkedinUrl || null,
        githubUrl: d.githubUrl || null,
        courseTaken: d.courseTaken || null,
        completionYear: d.completionYear || null,
        currentCompany: d.currentCompany || null,
        currentRole: d.currentRole || null,
        packageBand: d.packageBand || null,
        yearsExperience: d.yearsExperience || null,
        openToReferrals: d.openToReferrals ?? false,
        companyHiring: d.companyHiring ?? false,
        hiringRoles: d.hiringRoles || null,
        hrContacts: d.hrContacts || null,
        testimonialContent: d.testimonialContent || null,
        rating: d.rating ?? 5,
        photoFilename,
        consentDisplayPublic: d.consentDisplayPublic ?? false,
        consentSharePartners: d.consentSharePartners ?? false,
        lookingForJobChange: d.lookingForJobChange ?? false,
        status: "new",
        source: d.source || "alumni_form",
        utmSource: d.utmSource || null,
        utmMedium: d.utmMedium || null,
        utmCampaign: d.utmCampaign || null,
      })
      .returning({ id: alumni.id });

    revalidatePath("/admin");
    revalidatePath("/admin/alumni");

    try {
      await captureServerEvent({
        distinctId: d.analyticsDistinctId,
        event: "alumni_submitted",
        properties: {
          source: d.source || "alumni_form",
          package_band: d.packageBand || null,
          open_to_referrals: d.openToReferrals ?? false,
          company_hiring: d.companyHiring ?? false,
          consent_display_public: d.consentDisplayPublic ?? false,
          has_photo: Boolean(photoFilename),
        },
      });
    } catch {
      /* analytics is non-fatal */
    }

    return {
      success: true,
      message:
        "Thank you! Your details have been received. Our team will review and may reach out to you.",
      data: { id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error submitting alumni form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

async function ensureAdmin(): Promise<ActionResult | null> {
  try {
    await requireAdminAction();
    return null;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error && error.message === "Forbidden"
          ? "You do not have permission to manage alumni submissions."
          : "Please sign in to continue.",
    };
  }
}

export async function getAllAlumni(): Promise<{
  rows: Alumni[];
  totalCount: number;
  newCount: number;
  publishedCount: number;
}> {
  try {
    if (!process.env.DATABASE_URL) {
      return { rows: [], totalCount: 0, newCount: 0, publishedCount: 0 };
    }

    const { db, alumni } = await import("@/db");
    const [totalResult, newResult, publishedResult, rows] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(alumni),
      db
        .select({ count: sql<number>`count(*)` })
        .from(alumni)
        .where(eq(alumni.status, "new")),
      db
        .select({ count: sql<number>`count(*)` })
        .from(alumni)
        .where(eq(alumni.status, "published")),
      db.select().from(alumni).orderBy(desc(alumni.createdAt)),
    ]);

    return {
      rows,
      totalCount: Number(totalResult[0]?.count || 0),
      newCount: Number(newResult[0]?.count || 0),
      publishedCount: Number(publishedResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return { rows: [], totalCount: 0, newCount: 0, publishedCount: 0 };
  }
}

export async function getAlumnusById(id: number): Promise<Alumni | null> {
  try {
    if (!process.env.DATABASE_URL) return null;
    const { db, alumni } = await import("@/db");
    const result = await db
      .select()
      .from(alumni)
      .where(eq(alumni.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching alumnus:", error);
    return null;
  }
}

export async function updateAlumnusStatus(
  id: number,
  status: AlumniStatus,
  adminNotes?: string
): Promise<ActionResult> {
  const adminError = await ensureAdmin();
  if (adminError) return adminError;

  if (!ALUMNI_STATUSES.includes(status)) {
    return { success: false, message: "Invalid status." };
  }

  try {
    if (!process.env.DATABASE_URL) {
      return { success: true, message: "Status updated (mock)." };
    }
    const { db, alumni } = await import("@/db");
    await db
      .update(alumni)
      .set({
        status,
        ...(adminNotes !== undefined ? { adminNotes: adminNotes || null } : {}),
        updatedAt: new Date(),
      })
      .where(eq(alumni.id, id));

    revalidatePath("/admin/alumni");
    revalidatePath(`/admin/alumni/${id}`);

    await logAdminAction({
      action: "alumni.status",
      entityType: "alumni",
      entityId: id,
      summary: `Set alumni ${id} status to ${status}`,
      metadata: { status },
    });

    return { success: true, message: `Marked as ${status}.` };
  } catch (error) {
    console.error("Error updating alumnus status:", error);
    return { success: false, message: "Failed to update status." };
  }
}

/**
 * Promote an alumni submission to a public testimonial. Requires the
 * submitter's display consent and a non-empty testimonial. Creates a new
 * testimonial (or updates the linked one), links it on the alumni row, and
 * sets status "published". Private fields are never copied across.
 */
export async function approveAndPublishAlumnus(
  id: number
): Promise<ActionResult> {
  const adminError = await ensureAdmin();
  if (adminError) return adminError;

  try {
    if (!process.env.DATABASE_URL) {
      return { success: true, message: "Published (mock)." };
    }

    const { db, alumni, testimonials } = await import("@/db");
    const row = (
      await db.select().from(alumni).where(eq(alumni.id, id)).limit(1)
    )[0];

    if (!row) {
      return { success: false, message: "Alumni submission not found." };
    }
    if (!row.consentDisplayPublic) {
      return {
        success: false,
        message:
          "This alumnus did not consent to public display, so it cannot be published as a testimonial.",
      };
    }
    if (!row.testimonialContent || row.testimonialContent.trim().length === 0) {
      return {
        success: false,
        message:
          "No testimonial text was provided, so there is nothing to publish.",
      };
    }

    const photoUrl = row.photoFilename
      ? alumniPhotoUrl(row.photoFilename)
      : null;

    const fields = {
      name: row.name,
      role: row.currentRole || null,
      company: row.currentCompany || null,
      courseTaken: row.courseTaken || null,
      content: row.testimonialContent,
      rating: row.rating ?? 5,
      photoUrl,
      linkedinUrl: row.linkedinUrl || null,
      githubUrl: row.githubUrl || null,
      placedAt: row.currentCompany || null,
      isPublished: true,
    };

    let testimonialId = row.testimonialId ?? null;
    if (testimonialId) {
      await db
        .update(testimonials)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(testimonials.id, testimonialId));
    } else {
      const inserted = await db
        .insert(testimonials)
        .values(fields)
        .returning({ id: testimonials.id });
      testimonialId = inserted[0]?.id ?? null;
    }

    await db
      .update(alumni)
      .set({ status: "published", testimonialId, updatedAt: new Date() })
      .where(eq(alumni.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/alumni");
    revalidatePath(`/admin/alumni/${id}`);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");
    revalidateTag("testimonials", "default");

    await logAdminAction({
      action: "alumni.publish",
      entityType: "alumni",
      entityId: id,
      summary: `Published alumni ${id} (${row.name}) as testimonial ${testimonialId}`,
      metadata: { testimonialId },
    });

    return {
      success: true,
      message: "Published as a public testimonial.",
      data: { testimonialId },
    };
  } catch (error) {
    console.error("Error publishing alumnus:", error);
    return { success: false, message: "Failed to publish. Please try again." };
  }
}

export async function deleteAlumnus(id: number): Promise<ActionResult> {
  const adminError = await ensureAdmin();
  if (adminError) return adminError;

  try {
    if (!process.env.DATABASE_URL) {
      return { success: true, message: "Deleted (mock)." };
    }
    const { db, alumni } = await import("@/db");
    const row = (
      await db
        .select({ name: alumni.name, photoFilename: alumni.photoFilename })
        .from(alumni)
        .where(eq(alumni.id, id))
        .limit(1)
    )[0];

    await db.delete(alumni).where(eq(alumni.id, id));
    if (row?.photoFilename) {
      await deleteAlumniPhoto(row.photoFilename);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/alumni");

    await logAdminAction({
      action: "alumni.delete",
      entityType: "alumni",
      entityId: id,
      summary: `Deleted alumni submission ${id} (${row?.name || "unknown"})`,
      metadata: null,
    });

    return { success: true, message: "Alumni submission deleted." };
  } catch (error) {
    console.error("Error deleting alumnus:", error);
    return { success: false, message: "Failed to delete submission." };
  }
}
