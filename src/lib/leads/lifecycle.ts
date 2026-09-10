/**
 * The controlled vocabulary for the lead lifecycle.
 *
 * One module so the UI label, the Zod validator and the DB value can never
 * disagree. SQLite has no native enum and Drizzle's `text({ enum })` only
 * narrows the TypeScript type, so these arrays are the real definition and
 * every write validates against them.
 *
 * Labels are separate from values on purpose: the spec asks for
 * ADMISSION_CONFIRMED in the database and "Admission Confirmed" on screen.
 */

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "COUNSELLING",
  "FOLLOW_UP",
  "DEMO_SCHEDULED",
  "DEMO_ATTENDED",
  "INTERESTED",
  "ADMISSION_CONFIRMED",
  "NOT_INTERESTED",
  "LOST",
  "NO_RESPONSE",
  "INVALID",
  "DUPLICATE",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  COUNSELLING: "Counselling",
  FOLLOW_UP: "Follow-up",
  DEMO_SCHEDULED: "Demo Scheduled",
  DEMO_ATTENDED: "Demo Attended",
  INTERESTED: "Interested",
  ADMISSION_CONFIRMED: "Admission Confirmed",
  NOT_INTERESTED: "Not Interested",
  LOST: "Lost",
  NO_RESPONSE: "No Response",
  INVALID: "Invalid",
  DUPLICATE: "Duplicate",
};

/**
 * Statuses that end the lead's active life. Used to keep closed leads out of
 * the follow-up queues — an overdue reminder on a lead that already enrolled
 * is noise, and noise is what stops people reading a queue at all.
 */
export const CLOSED_LEAD_STATUSES: readonly LeadStatus[] = [
  "ADMISSION_CONFIRMED",
  "NOT_INTERESTED",
  "LOST",
  "NO_RESPONSE",
  "INVALID",
  "DUPLICATE",
];

export const LEAD_PRIORITIES = ["HOT", "WARM", "COLD"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export const LEAD_PRIORITY_LABELS: Record<LeadPriority, string> = {
  HOT: "Hot",
  WARM: "Warm",
  COLD: "Cold",
};

export const FOLLOW_UP_TYPES = [
  "CALL",
  "WHATSAPP",
  "EMAIL",
  "IN_PERSON",
  "DEMO",
  "OTHER",
] as const;
export type FollowUpType = (typeof FOLLOW_UP_TYPES)[number];

export const FOLLOW_UP_TYPE_LABELS: Record<FollowUpType, string> = {
  CALL: "Call",
  WHATSAPP: "WhatsApp",
  EMAIL: "Email",
  IN_PERSON: "In person",
  DEMO: "Demo",
  OTHER: "Other",
};

export const FOLLOW_UP_OUTCOMES = [
  "CONNECTED",
  "NO_ANSWER",
  "CALL_LATER",
  "INTERESTED",
  "NOT_INTERESTED",
  "WRONG_NUMBER",
  "SWITCHED_OFF",
  "BUSY",
  "OTHER",
] as const;
export type FollowUpOutcome = (typeof FOLLOW_UP_OUTCOMES)[number];

export const FOLLOW_UP_OUTCOME_LABELS: Record<FollowUpOutcome, string> = {
  CONNECTED: "Connected",
  NO_ANSWER: "No answer",
  CALL_LATER: "Call later",
  INTERESTED: "Interested",
  NOT_INTERESTED: "Not interested",
  WRONG_NUMBER: "Wrong number",
  SWITCHED_OFF: "Switched off",
  BUSY: "Busy",
  OTHER: "Other",
};

/** Education / current-situation options from the specification. */
export const CURRENT_STATUS_OPTIONS = [
  "Student",
  "Fresher",
  "Working Professional",
  "Career Break",
  "Other",
] as const;

export const PREFERRED_TIMING_OPTIONS = [
  "Morning",
  "Afternoon",
  "Evening",
  "Weekend",
  "Flexible",
] as const;

export const EXPECTED_JOINING_OPTIONS = [
  "Immediately",
  "Within 1 month",
  "1-3 months",
  "Just exploring",
] as const;

/**
 * Enquiry sources the admin can set by hand.
 *
 * Separate from `leads.source`, which records the MECHANISM a website lead
 * arrived through ("contact_form", "internship_interest") and is written by
 * the public forms. This list is what a counsellor picks for a walk-in or a
 * phone call, where no mechanism string exists.
 */
export const LEAD_SOURCE_OPTIONS = [
  "Website",
  "Google",
  "Google Ads",
  "Walk-in",
  "Phone",
  "WhatsApp",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Referral",
  "Existing Student",
  "JustDial",
  "Other",
] as const;

/**
 * Map the statuses this database already held onto the new vocabulary.
 *
 * Applied once by the backfill script. Anything unrecognised is left alone
 * rather than guessed at — a wrong status is worse than an obviously old one.
 */
export const LEGACY_STATUS_MAP: Record<string, LeadStatus> = {
  new: "NEW",
  contacted: "CONTACTED",
  qualified: "INTERESTED",
  converted: "ADMISSION_CONFIRMED",
  lost: "LOST",
  closed: "LOST",
};

export function isLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

export function leadStatusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return isLeadStatus(value) ? LEAD_STATUS_LABELS[value] : value;
}

export function leadPriorityLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return (LEAD_PRIORITIES as readonly string[]).includes(value)
    ? LEAD_PRIORITY_LABELS[value as LeadPriority]
    : value;
}

/**
 * Why a lead was closed.
 *
 * Controlled values rather than free text, because the whole point of
 * collecting them is the Lost Lead report — and a column of hand-typed
 * variations on "fees too high" cannot be counted. The free-text note beside
 * it is where the detail goes.
 */
export const LOSS_REASONS = [
  "FEES_TOO_HIGH",
  "JOINED_ANOTHER_INSTITUTE",
  "TIMING_ISSUE",
  "COURSE_NOT_AVAILABLE",
  "LOCATION_ISSUE",
  "NOT_INTERESTED",
  "UNABLE_TO_CONTACT",
  "POSTPONED_PLAN",
  "ONLY_CHECKING_FEES",
  "INVALID_LEAD",
  "DUPLICATE",
  "OTHER",
] as const;

export type LossReason = (typeof LOSS_REASONS)[number];

export const LOSS_REASON_LABELS: Record<LossReason, string> = {
  FEES_TOO_HIGH: "Fees too high",
  JOINED_ANOTHER_INSTITUTE: "Joined another institute",
  TIMING_ISSUE: "Timing issue",
  COURSE_NOT_AVAILABLE: "Course not available",
  LOCATION_ISSUE: "Location issue",
  NOT_INTERESTED: "Not interested",
  UNABLE_TO_CONTACT: "Unable to contact",
  POSTPONED_PLAN: "Postponed plan",
  ONLY_CHECKING_FEES: "Only checking fees",
  INVALID_LEAD: "Invalid lead",
  DUPLICATE: "Duplicate",
  OTHER: "Other",
};

/**
 * Statuses that may not be set without saying why.
 *
 * Narrower than CLOSED_LEAD_STATUSES, which also contains
 * ADMISSION_CONFIRMED — that one has an admission record explaining itself.
 * These five are the outcomes the Lost Lead report is about.
 */
export const REASON_REQUIRED_STATUSES: readonly LeadStatus[] = [
  "NOT_INTERESTED",
  "LOST",
  "NO_RESPONSE",
  "INVALID",
  "DUPLICATE",
];

export function requiresClosureReason(status: string): boolean {
  return (REASON_REQUIRED_STATUSES as readonly string[]).includes(status);
}

export function isLossReason(value: unknown): value is LossReason {
  return (
    typeof value === "string" &&
    (LOSS_REASONS as readonly string[]).includes(value)
  );
}

export function lossReasonLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return isLossReason(value) ? LOSS_REASON_LABELS[value] : value;
}
