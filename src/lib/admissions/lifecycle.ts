/**
 * The controlled vocabulary for an admission.
 *
 * Same shape as src/lib/leads/lifecycle.ts and for the same reason: one module
 * so the DB value, the Zod validator and the on-screen label cannot drift
 * apart. SQLite has no enum and Drizzle's `text({ enum })` only narrows the
 * TypeScript type, so these arrays are the real definition.
 *
 * Two independent statuses, deliberately not collapsed into one:
 *
 *   ADMISSION_STATUS — is this person actually joining?
 *   PAYMENT_STATUS   — how much of the fee has arrived?
 *
 * They answer different questions and move at different times. Someone can be
 * enrolled and owing the whole fee, or fully paid and then cancel. A single
 * combined status would force one of those to be recorded as a lie.
 */

export const ADMISSION_STATUSES = ["ENROLLED", "ON_HOLD", "CANCELLED"] as const;
export type AdmissionStatus = (typeof ADMISSION_STATUSES)[number];

export const ADMISSION_STATUS_LABELS: Record<AdmissionStatus, string> = {
  ENROLLED: "Enrolled",
  ON_HOLD: "On Hold",
  CANCELLED: "Cancelled",
};

export const PAYMENT_STATUSES = [
  "PENDING",
  "PARTIAL",
  "PAID",
  "REFUNDED",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Payment Pending",
  PARTIAL: "Part Paid",
  PAID: "Fully Paid",
  REFUNDED: "Refunded",
};

/** Admission statuses that mean the seat is no longer being taken up. */
export const INACTIVE_ADMISSION_STATUSES: readonly AdmissionStatus[] = [
  "CANCELLED",
];

export function isAdmissionStatus(value: unknown): value is AdmissionStatus {
  return (
    typeof value === "string" &&
    (ADMISSION_STATUSES as readonly string[]).includes(value)
  );
}

export function isPaymentStatus(value: unknown): value is PaymentStatus {
  return (
    typeof value === "string" &&
    (PAYMENT_STATUSES as readonly string[]).includes(value)
  );
}

/** Label for display, falling back to the raw value rather than hiding it. */
export function admissionStatusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return isAdmissionStatus(value) ? ADMISSION_STATUS_LABELS[value] : value;
}

export function paymentStatusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return isPaymentStatus(value) ? PAYMENT_STATUS_LABELS[value] : value;
}
