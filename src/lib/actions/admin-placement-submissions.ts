"use server";

/**
 * Admin review of public placement submissions.
 *
 * Approving is the only path from a public submission to the public
 * /placements page, and it is a COPY, not a status flip: the row is written
 * into `placements`, and the submission keeps its own record with a pointer.
 * Rejecting or editing a submission afterwards therefore cannot silently
 * alter what is already published, and the evidence trail survives.
 */
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { placements, placementSubmissions } from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { mediaUrl } from "@/lib/storage/media";

export type SubmissionActionResult = {
  success: boolean;
  message: string;
};

export async function listPlacementSubmissions() {
  await requireAdminAction();
  return db
    .select()
    .from(placementSubmissions)
    .orderBy(desc(placementSubmissions.createdAt));
}

/**
 * Copy an approved submission into `placements`.
 *
 * `isPublished` follows the student's own consent. Someone who submitted
 * their placement for our records but did not tick "show my name" gets a
 * row that exists internally and renders nowhere — approving a submission
 * must not override the consent attached to it.
 */
export async function approvePlacementSubmission(
  id: number,
): Promise<SubmissionActionResult> {
  await requireAdminAction();

  const [row] = await db
    .select()
    .from(placementSubmissions)
    .where(eq(placementSubmissions.id, id))
    .limit(1);

  if (!row) return { success: false, message: "Submission not found." };
  if (row.placementId) {
    return { success: false, message: "This submission is already published." };
  }

  const [created] = await db
    .insert(placements)
    .values({
      studentName: row.studentName,
      company: row.company,
      designation: row.designation,
      package: row.package,
      courseTaken: row.courseTaken,
      batchYear: row.batchYear,
      // The offer letter is NEVER copied across — it lives only in the
      // private collection. Only the optional public-facing photo moves.
      photoUrl: row.photoFilename ? mediaUrl("placements", row.photoFilename) : null,
      linkedinUrl: row.linkedinUrl,
      testimonial: row.testimonial,
      isPublished: Boolean(row.consentDisplayPublic),
    })
    .returning({ id: placements.id });

  await db
    .update(placementSubmissions)
    .set({ status: "approved", placementId: created.id, updatedAt: new Date() })
    .where(eq(placementSubmissions.id, id));

  await logAdminAction({
    action: "approve",
    entityType: "placement_submission",
    entityId: String(id),
    summary: `Approved placement submission from ${row.studentName} (${row.company}) → placement #${created.id}`,
  });

  revalidatePath("/placements");
  revalidatePath("/admin/placement-submissions");
  return {
    success: true,
    message: row.consentDisplayPublic
      ? "Approved and published."
      : "Approved. Saved to records only — the student did not consent to public display.",
  };
}

export async function setPlacementSubmissionStatus(
  id: number,
  status: "new" | "reviewed" | "rejected",
  adminNotes?: string,
): Promise<SubmissionActionResult> {
  await requireAdminAction();

  await db
    .update(placementSubmissions)
    .set({ status, adminNotes: adminNotes ?? undefined, updatedAt: new Date() })
    .where(eq(placementSubmissions.id, id));

  await logAdminAction({
    action: "update",
    entityType: "placement_submission",
    entityId: String(id),
    summary: `Placement submission #${id} marked ${status}`,
  });

  revalidatePath("/admin/placement-submissions");
  return { success: true, message: `Marked ${status}.` };
}
