"use server";

import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { Testimonial } from "@/db";
import { logAdminAction, requireAdminAction } from "@/lib/admin";

const optionalNumber = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
}, z.number().int().min(1).max(5).optional());

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  role: z.string().optional(),
  company: z.string().optional(),
  courseTaken: z.string().optional(),
  content: z.string().trim().min(1, "Testimonial content is required"),
  rating: optionalNumber,
  photoUrl: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  placedAt: z.string().optional(),
  isHighlighted: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

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
          ? "You do not have permission to manage testimonials."
          : "Please sign in to continue.",
    };
  }
}

export async function getAllTestimonials(): Promise<{
  testimonials: Testimonial[];
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  highlightedCount: number;
}> {
  try {
    if (!process.env.DATABASE_URL) {
      return {
        testimonials: [],
        totalCount: 0,
        publishedCount: 0,
        draftCount: 0,
        highlightedCount: 0,
      };
    }

    const { db, testimonials } = await import("@/db");

    const [
      allCountResult,
      publishedCountResult,
      draftCountResult,
      highlightedCountResult,
      testimonialRows,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(testimonials),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testimonials)
        .where(eq(testimonials.isPublished, true)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testimonials)
        .where(eq(testimonials.isPublished, false)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testimonials)
        .where(eq(testimonials.isHighlighted, true)),
      db.select().from(testimonials).orderBy(desc(testimonials.createdAt)),
    ]);

    return {
      testimonials: testimonialRows,
      totalCount: Number(allCountResult[0]?.count || 0),
      publishedCount: Number(publishedCountResult[0]?.count || 0),
      draftCount: Number(draftCountResult[0]?.count || 0),
      highlightedCount: Number(highlightedCountResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return {
      testimonials: [],
      totalCount: 0,
      publishedCount: 0,
      draftCount: 0,
      highlightedCount: 0,
    };
  }
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return null;
    }

    const { db, testimonials } = await import("@/db");
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching testimonial by id:", error);
    return null;
  }
}

export async function createTestimonial(data: TestimonialFormData): Promise<ActionResult> {
  const validationResult = testimonialSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Testimonial creation (no database configured):", validationResult.data);
      return {
        success: true,
        message: "Testimonial created successfully (mock)",
      };
    }

    const { db, testimonials } = await import("@/db");

    const result = await db
      .insert(testimonials)
      .values({
        name: validationResult.data.name,
        role: validationResult.data.role || null,
        company: validationResult.data.company || null,
        courseTaken: validationResult.data.courseTaken || null,
        content: validationResult.data.content,
        rating: validationResult.data.rating ?? 5,
        photoUrl: validationResult.data.photoUrl || null,
        linkedinUrl: validationResult.data.linkedinUrl || null,
        githubUrl: validationResult.data.githubUrl || null,
        placedAt: validationResult.data.placedAt || null,
        isHighlighted: validationResult.data.isHighlighted ?? false,
        isPublished: validationResult.data.isPublished ?? true,
      })
      .returning({ id: testimonials.id });

    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");

    await logAdminAction({
      action: "testimonial.create",
      entityType: "testimonial",
      entityId: result[0]?.id || null,
      summary: `Created testimonial for ${validationResult.data.name}`,
      metadata: validationResult.data,
    });

    return {
      success: true,
      message: "Testimonial created successfully",
      data: { id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return {
      success: false,
      message: "Failed to create testimonial. Please try again.",
    };
  }
}

export async function updateTestimonial(
  id: number,
  data: TestimonialFormData
): Promise<ActionResult> {
  const validationResult = testimonialSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Testimonial update (no database configured):", id, validationResult.data);
      return {
        success: true,
        message: "Testimonial updated successfully (mock)",
      };
    }

    const { db, testimonials } = await import("@/db");

    await db
      .update(testimonials)
      .set({
        name: validationResult.data.name,
        role: validationResult.data.role || null,
        company: validationResult.data.company || null,
        courseTaken: validationResult.data.courseTaken || null,
        content: validationResult.data.content,
        rating: validationResult.data.rating ?? 5,
        photoUrl: validationResult.data.photoUrl || null,
        linkedinUrl: validationResult.data.linkedinUrl || null,
        githubUrl: validationResult.data.githubUrl || null,
        placedAt: validationResult.data.placedAt || null,
        isHighlighted: validationResult.data.isHighlighted ?? false,
        isPublished: validationResult.data.isPublished ?? true,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");

    await logAdminAction({
      action: "testimonial.update",
      entityType: "testimonial",
      entityId: id,
      summary: `Updated testimonial for ${validationResult.data.name}`,
      metadata: validationResult.data,
    });

    return {
      success: true,
      message: "Testimonial updated successfully",
    };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return {
      success: false,
      message: "Failed to update testimonial. Please try again.",
    };
  }
}

export async function deleteTestimonial(id: number): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Testimonial deletion (no database configured):", id);
      return {
        success: true,
        message: "Testimonial deleted successfully (mock)",
      };
    }

    const { db, testimonials } = await import("@/db");
    const testimonial = await db
      .select({
        name: testimonials.name,
        company: testimonials.company,
        role: testimonials.role,
      })
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    await db.delete(testimonials).where(eq(testimonials.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");

    await logAdminAction({
      action: "testimonial.delete",
      entityType: "testimonial",
      entityId: id,
      summary: `Deleted testimonial for ${testimonial[0]?.name || "unknown student"}`,
      metadata: testimonial[0] || null,
    });

    return {
      success: true,
      message: "Testimonial deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return {
      success: false,
      message: "Failed to delete testimonial. Please try again.",
    };
  }
}

export async function toggleTestimonialPublishStatus(
  id: number,
  isPublished: boolean
): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Testimonial publish toggle (no database configured):", id, isPublished);
      return {
        success: true,
        message: isPublished ? "Testimonial published successfully" : "Testimonial unpublished successfully",
      };
    }

    const { db, testimonials } = await import("@/db");

    await db
      .update(testimonials)
      .set({
        isPublished,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");

    await logAdminAction({
      action: isPublished ? "testimonial.publish" : "testimonial.unpublish",
      entityType: "testimonial",
      entityId: id,
      summary: `Set testimonial ${id} to ${isPublished ? "published" : "draft"}`,
      metadata: { isPublished },
    });

    return {
      success: true,
      message: isPublished ? "Testimonial published successfully" : "Testimonial unpublished successfully",
    };
  } catch (error) {
    console.error("Error toggling testimonial publish status:", error);
    return {
      success: false,
      message: "Failed to update publish status. Please try again.",
    };
  }
}

export async function toggleTestimonialHighlightStatus(
  id: number,
  isHighlighted: boolean
): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Testimonial highlight toggle (no database configured):", id, isHighlighted);
      return {
        success: true,
        message: isHighlighted ? "Testimonial highlighted successfully" : "Testimonial unhighlighted successfully",
      };
    }

    const { db, testimonials } = await import("@/db");

    await db
      .update(testimonials)
      .set({
        isHighlighted,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/placements");

    await logAdminAction({
      action: isHighlighted ? "testimonial.highlight" : "testimonial.unhighlight",
      entityType: "testimonial",
      entityId: id,
      summary: `Set testimonial ${id} to ${isHighlighted ? "highlighted" : "standard"}`,
      metadata: { isHighlighted },
    });

    return {
      success: true,
      message: isHighlighted ? "Testimonial highlighted successfully" : "Testimonial unhighlighted successfully",
    };
  } catch (error) {
    console.error("Error toggling testimonial highlight status:", error);
    return {
      success: false,
      message: "Failed to update highlight status. Please try again.",
    };
  }
}
