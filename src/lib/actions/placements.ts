"use server";

import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { Placement } from "@/db";
import { logAdminAction, requireAdminAction } from "@/lib/admin";

const optionalNumber = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
}, z.number().int().min(1900).max(new Date().getFullYear() + 1).optional());

const placementSchema = z.object({
  studentName: z.string().trim().min(1, "Student name is required").max(255),
  company: z.string().trim().min(1, "Company is required").max(255),
  designation: z.string().trim().min(1, "Designation is required").max(255),
  package: z.string().optional(),
  courseTaken: z.string().optional(),
  batchYear: optionalNumber,
  photoUrl: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  testimonial: z.string().optional(),
  isHighlighted: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export type PlacementFormData = z.infer<typeof placementSchema>;

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
          ? "You do not have permission to manage placements."
          : "Please sign in to continue.",
    };
  }
}

export async function getAllPlacements(): Promise<{
  placements: Placement[];
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  highlightedCount: number;
}> {
  try {
    if (!process.env.DATABASE_URL) {
      return {
        placements: [],
        totalCount: 0,
        publishedCount: 0,
        draftCount: 0,
        highlightedCount: 0,
      };
    }

    const { db, placements } = await import("@/db");

    const [
      allCountResult,
      publishedCountResult,
      draftCountResult,
      highlightedCountResult,
      placementRows,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(placements),
      db
        .select({ count: sql<number>`count(*)` })
        .from(placements)
        .where(eq(placements.isPublished, true)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(placements)
        .where(eq(placements.isPublished, false)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(placements)
        .where(eq(placements.isHighlighted, true)),
      db.select().from(placements).orderBy(desc(placements.createdAt)),
    ]);

    return {
      placements: placementRows,
      totalCount: Number(allCountResult[0]?.count || 0),
      publishedCount: Number(publishedCountResult[0]?.count || 0),
      draftCount: Number(draftCountResult[0]?.count || 0),
      highlightedCount: Number(highlightedCountResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("Error fetching placements:", error);
    return {
      placements: [],
      totalCount: 0,
      publishedCount: 0,
      draftCount: 0,
      highlightedCount: 0,
    };
  }
}

export async function getPlacementById(id: number): Promise<Placement | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return null;
    }

    const { db, placements } = await import("@/db");
    const result = await db.select().from(placements).where(eq(placements.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching placement by id:", error);
    return null;
  }
}

export async function createPlacement(data: PlacementFormData): Promise<ActionResult> {
  const validationResult = placementSchema.safeParse(data);

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
      console.log("Placement creation (no database configured):", validationResult.data);
      return {
        success: true,
        message: "Placement created successfully (mock)",
      };
    }

    const { db, placements } = await import("@/db");

    const result = await db
      .insert(placements)
      .values({
        studentName: validationResult.data.studentName,
        company: validationResult.data.company,
        designation: validationResult.data.designation,
        package: validationResult.data.package || null,
        courseTaken: validationResult.data.courseTaken || null,
        batchYear: validationResult.data.batchYear ?? null,
        photoUrl: validationResult.data.photoUrl || null,
        linkedinUrl: validationResult.data.linkedinUrl || null,
        testimonial: validationResult.data.testimonial || null,
        isHighlighted: validationResult.data.isHighlighted ?? false,
        isPublished: validationResult.data.isPublished ?? true,
      })
      .returning({ id: placements.id });

    revalidatePath("/admin");
    revalidatePath("/admin/placements");
    revalidatePath("/placements");

    await logAdminAction({
      action: "placement.create",
      entityType: "placement",
      entityId: result[0]?.id || null,
      summary: `Created placement for ${validationResult.data.studentName}`,
      metadata: validationResult.data,
    });

    return {
      success: true,
      message: "Placement created successfully",
      data: { id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error creating placement:", error);
    return {
      success: false,
      message: "Failed to create placement. Please try again.",
    };
  }
}

export async function updatePlacement(id: number, data: PlacementFormData): Promise<ActionResult> {
  const validationResult = placementSchema.safeParse(data);

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
      console.log("Placement update (no database configured):", id, validationResult.data);
      return {
        success: true,
        message: "Placement updated successfully (mock)",
      };
    }

    const { db, placements } = await import("@/db");

    await db
      .update(placements)
      .set({
        studentName: validationResult.data.studentName,
        company: validationResult.data.company,
        designation: validationResult.data.designation,
        package: validationResult.data.package || null,
        courseTaken: validationResult.data.courseTaken || null,
        batchYear: validationResult.data.batchYear ?? null,
        photoUrl: validationResult.data.photoUrl || null,
        linkedinUrl: validationResult.data.linkedinUrl || null,
        testimonial: validationResult.data.testimonial || null,
        isHighlighted: validationResult.data.isHighlighted ?? false,
        isPublished: validationResult.data.isPublished ?? true,
        updatedAt: new Date(),
      })
      .where(eq(placements.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/placements");
    revalidatePath("/placements");

    await logAdminAction({
      action: "placement.update",
      entityType: "placement",
      entityId: id,
      summary: `Updated placement for ${validationResult.data.studentName}`,
      metadata: validationResult.data,
    });

    return {
      success: true,
      message: "Placement updated successfully",
    };
  } catch (error) {
    console.error("Error updating placement:", error);
    return {
      success: false,
      message: "Failed to update placement. Please try again.",
    };
  }
}

export async function deletePlacement(id: number): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Placement deletion (no database configured):", id);
      return {
        success: true,
        message: "Placement deleted successfully (mock)",
      };
    }

    const { db, placements } = await import("@/db");
    const placement = await db
      .select({
        studentName: placements.studentName,
        company: placements.company,
        designation: placements.designation,
      })
      .from(placements)
      .where(eq(placements.id, id))
      .limit(1);

    await db.delete(placements).where(eq(placements.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/placements");
    revalidatePath("/placements");

    await logAdminAction({
      action: "placement.delete",
      entityType: "placement",
      entityId: id,
      summary: `Deleted placement for ${placement[0]?.studentName || "unknown student"}`,
      metadata: placement[0] || null,
    });

    return {
      success: true,
      message: "Placement deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting placement:", error);
    return {
      success: false,
      message: "Failed to delete placement. Please try again.",
    };
  }
}

export async function togglePlacementPublishStatus(
  id: number,
  isPublished: boolean
): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Placement publish toggle (no database configured):", id, isPublished);
      return {
        success: true,
        message: isPublished ? "Placement published successfully" : "Placement unpublished successfully",
      };
    }

    const { db, placements } = await import("@/db");

    await db
      .update(placements)
      .set({
        isPublished,
        updatedAt: new Date(),
      })
      .where(eq(placements.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/placements");
    revalidatePath("/placements");

    await logAdminAction({
      action: isPublished ? "placement.publish" : "placement.unpublish",
      entityType: "placement",
      entityId: id,
      summary: `Set placement ${id} to ${isPublished ? "published" : "draft"}`,
      metadata: { isPublished },
    });

    return {
      success: true,
      message: isPublished ? "Placement published successfully" : "Placement unpublished successfully",
    };
  } catch (error) {
    console.error("Error toggling placement publish status:", error);
    return {
      success: false,
      message: "Failed to update publish status. Please try again.",
    };
  }
}

export async function togglePlacementHighlightStatus(
  id: number,
  isHighlighted: boolean
): Promise<ActionResult> {
  try {
    const adminError = await ensureAdmin();
    if (adminError) {
      return adminError;
    }

    if (!process.env.DATABASE_URL) {
      console.log("Placement highlight toggle (no database configured):", id, isHighlighted);
      return {
        success: true,
        message: isHighlighted ? "Placement highlighted successfully" : "Placement unhighlighted successfully",
      };
    }

    const { db, placements } = await import("@/db");

    await db
      .update(placements)
      .set({
        isHighlighted,
        updatedAt: new Date(),
      })
      .where(eq(placements.id, id));

    revalidatePath("/admin");
    revalidatePath("/admin/placements");

    await logAdminAction({
      action: isHighlighted ? "placement.highlight" : "placement.unhighlight",
      entityType: "placement",
      entityId: id,
      summary: `Set placement ${id} to ${isHighlighted ? "highlighted" : "standard"}`,
      metadata: { isHighlighted },
    });

    return {
      success: true,
      message: isHighlighted ? "Placement highlighted successfully" : "Placement unhighlighted successfully",
    };
  } catch (error) {
    console.error("Error toggling placement highlight status:", error);
    return {
      success: false,
      message: "Failed to update highlight status. Please try again.",
    };
  }
}
