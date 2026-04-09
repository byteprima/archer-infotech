"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  BATCH_MODE,
  BATCH_STATUS,
  type Batch,
  type BatchMode,
  type BatchStatus,
} from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { batchFormSchema, type BatchFormData } from "@/lib/validations/batches";

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
};

type BatchFilters = {
  status?: BatchStatus | "all";
  mode?: BatchMode | "all";
};

type BatchStats = {
  totalCount: number;
  filteredCount: number;
  statusCounts: Record<BatchStatus, number>;
  modeCounts: Record<BatchMode, number>;
};

function emptyStats(): BatchStats {
  return {
    totalCount: 0,
    filteredCount: 0,
    statusCounts: {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0,
    },
    modeCounts: {
      offline: 0,
      online: 0,
    },
  };
}

function normalizeOptionalText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function buildBatchValues(data: BatchFormData) {
  const startDate = new Date(`${data.startDate}T00:00:00`);

  return {
    courseSlug: data.courseSlug.trim(),
    courseName: data.courseName.trim(),
    startDate,
    timing: data.timing.trim(),
    duration: data.duration.trim(),
    mode: data.mode,
    totalSeats: data.totalSeats,
    seatsAvailable: data.seatsAvailable,
    status: data.status,
    instructor: normalizeOptionalText(data.instructor),
    location: normalizeOptionalText(data.location),
    meetingLink: normalizeOptionalText(data.meetingLink),
    updatedAt: new Date(),
  };
}

export async function getAdminBatches(options?: BatchFilters): Promise<{
  batches: Batch[];
  stats: BatchStats;
}> {
  try {
    if (!process.env.DATABASE_URL) {
      return {
        batches: [],
        stats: emptyStats(),
      };
    }

    const { db, batches } = await import("@/db");

    const filters: Array<ReturnType<typeof eq>> = [];
    if (options?.status && options.status !== "all") {
      filters.push(eq(batches.status, options.status));
    }
    if (options?.mode && options.mode !== "all") {
      filters.push(eq(batches.mode, options.mode));
    }

    const [
      totalCountResult,
      upcomingCountResult,
      ongoingCountResult,
      completedCountResult,
      cancelledCountResult,
      offlineCountResult,
      onlineCountResult,
      filteredCountResult,
      batchRows,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(batches),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.status, "upcoming")),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.status, "ongoing")),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.status, "completed")),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.status, "cancelled")),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.mode, "offline")),
      db.select({ count: sql<number>`count(*)` }).from(batches).where(eq(batches.mode, "online")),
      filters.length > 0
        ? db.select({ count: sql<number>`count(*)` }).from(batches).where(and(...filters))
        : db.select({ count: sql<number>`count(*)` }).from(batches),
      db
        .select()
        .from(batches)
        .where(filters.length > 0 ? and(...filters) : undefined)
        .orderBy(desc(batches.startDate), desc(batches.createdAt)),
    ]);

    return {
      batches: batchRows,
      stats: {
        totalCount: Number(totalCountResult[0]?.count || 0),
        filteredCount: Number(filteredCountResult[0]?.count || 0),
        statusCounts: {
          upcoming: Number(upcomingCountResult[0]?.count || 0),
          ongoing: Number(ongoingCountResult[0]?.count || 0),
          completed: Number(completedCountResult[0]?.count || 0),
          cancelled: Number(cancelledCountResult[0]?.count || 0),
        },
        modeCounts: {
          offline: Number(offlineCountResult[0]?.count || 0),
          online: Number(onlineCountResult[0]?.count || 0),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching admin batches:", error);
    return {
      batches: [],
      stats: emptyStats(),
    };
  }
}

export async function getBatchById(id: number): Promise<Batch | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return null;
    }

    const { db, batches } = await import("@/db");

    const result = await db.select().from(batches).where(eq(batches.id, id)).limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching batch by id:", error);
    return null;
  }
}

export async function createBatch(data: BatchFormData): Promise<ActionResult> {
  await requireAdminAction();

  const validationResult = batchFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Batch creation (no database configured):", validationResult.data);
      const result = {
        success: true,
        message: "Batch created successfully (mock)",
      };
      await logAdminAction({
        action: "batch.create",
        entityType: "batch",
        summary: `Created batch "${validationResult.data.courseName}"`,
        metadata: {
          courseSlug: validationResult.data.courseSlug,
          status: validationResult.data.status,
          mode: validationResult.data.mode,
        },
      });
      return result;
    }

    const { db, batches } = await import("@/db");
    const values = buildBatchValues(validationResult.data);

    const result = await db.insert(batches).values(values).returning({ id: batches.id });

    await logAdminAction({
      action: "batch.create",
      entityType: "batch",
      entityId: result[0]?.id ?? null,
      summary: `Created batch "${validationResult.data.courseName}"`,
      metadata: {
        courseSlug: validationResult.data.courseSlug,
        status: validationResult.data.status,
        mode: validationResult.data.mode,
      },
    });

    revalidatePath("/admin/batches");
    revalidatePath("/batch-schedule");

    return {
      success: true,
      message: "Batch created successfully",
      data: { id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error creating batch:", error);
    return {
      success: false,
      message: "Failed to create batch. Please try again.",
    };
  }
}

export async function updateBatch(id: number, data: BatchFormData): Promise<ActionResult> {
  await requireAdminAction();

  const validationResult = batchFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Batch update (no database configured):", id, validationResult.data);
      const result = {
        success: true,
        message: "Batch updated successfully (mock)",
      };
      await logAdminAction({
        action: "batch.update",
        entityType: "batch",
        entityId: id,
        summary: `Updated batch "${validationResult.data.courseName}"`,
        metadata: {
          courseSlug: validationResult.data.courseSlug,
          status: validationResult.data.status,
          mode: validationResult.data.mode,
        },
      });
      return result;
    }

    const { db, batches } = await import("@/db");

    const current = await db.select({ id: batches.id }).from(batches).where(eq(batches.id, id)).limit(1);

    if (current.length === 0) {
      return {
        success: false,
        message: "Batch not found",
      };
    }

    await db
      .update(batches)
      .set(buildBatchValues(validationResult.data))
      .where(eq(batches.id, id));

    await logAdminAction({
      action: "batch.update",
      entityType: "batch",
      entityId: id,
      summary: `Updated batch "${validationResult.data.courseName}"`,
      metadata: {
        courseSlug: validationResult.data.courseSlug,
        status: validationResult.data.status,
        mode: validationResult.data.mode,
      },
    });

    revalidatePath("/admin/batches");
    revalidatePath("/batch-schedule");

    return {
      success: true,
      message: "Batch updated successfully",
      data: { id },
    };
  } catch (error) {
    console.error("Error updating batch:", error);
    return {
      success: false,
      message: "Failed to update batch. Please try again.",
    };
  }
}

export async function deleteBatch(id: number): Promise<ActionResult> {
  await requireAdminAction();

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Batch deletion (no database configured):", id);
      const result = {
        success: true,
        message: "Batch deleted successfully (mock)",
      };
      await logAdminAction({
        action: "batch.delete",
        entityType: "batch",
        entityId: id,
        summary: `Deleted batch ${id}`,
      });
      return result;
    }

    const { db, batches } = await import("@/db");

    await db.delete(batches).where(eq(batches.id, id));

    await logAdminAction({
      action: "batch.delete",
      entityType: "batch",
      entityId: id,
      summary: `Deleted batch ${id}`,
    });

    revalidatePath("/admin/batches");
    revalidatePath("/batch-schedule");

    return {
      success: true,
      message: "Batch deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting batch:", error);
    return {
      success: false,
      message: "Failed to delete batch. Please try again.",
    };
  }
}

export { BATCH_MODE, BATCH_STATUS };
