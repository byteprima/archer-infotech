/**
 * Shared constants for the alumni data-collection feature.
 *
 * Used by the public form (`/alumni`), the submit + admin server actions
 * (`src/lib/actions/alumni.ts`), and the admin review UI
 * (`/admin/alumni`). Keep this the single source of truth so the form
 * dropdown, Zod validation, and admin filters never drift apart.
 */

/**
 * Salary bands — deliberately ranges, not exact figures, so alumni are
 * comfortable sharing. Order matters: the form renders them in this order.
 */
export const ALUMNI_PACKAGE_BANDS = [
  "Below 5 LPA",
  "5 LPA+",
  "10 LPA+",
  "20 LPA+",
  "25 LPA+",
  "30 LPA+",
  "50 LPA+",
  "60 LPA+",
  "Prefer not to say",
] as const;

export type AlumniPackageBand = (typeof ALUMNI_PACKAGE_BANDS)[number];

/**
 * Review workflow states. A submission starts as "new"; admin moves it
 * toward "published" (promoted to a public testimonial) or "rejected".
 */
export const ALUMNI_STATUSES = [
  "new",
  "reviewed",
  "approved",
  "published",
  "rejected",
] as const;

export type AlumniStatus = (typeof ALUMNI_STATUSES)[number];

/** Accepted photo upload types + size cap (server-enforced). */
export const ALUMNI_PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALUMNI_PHOTO_ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
