import {
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// ============================================
// Better-Auth Tables
// ============================================

// User table - for authentication
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("user"), // "user" | "admin"
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Session table - for user sessions
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Account table - for OAuth providers
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Verification table - for email verification, password reset, etc.
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// ============================================
// Application Tables
// ============================================

// Enum values (validated at application level for SQLite)
/**
 * Re-exported from lib/leads/lifecycle.ts so there is one definition.
 *
 * This was a separate five-value lowercase list ("new", "contacted",
 * "qualified", "converted", "closed") which the admin action validated
 * against with z.enum — so after the lifecycle migration it would have
 * rejected every value the app now writes.
 */
export { LEAD_STATUSES as LEAD_STATUS } from "@/lib/leads/lifecycle";
// "hybrid" added for Phase 2: the institute runs hybrid batches and there was
// no way to say so. The existing two values are untouched — they are read by
// ~50 files including public pages and Course schema, and renaming them would
// be a large change to the public site for an admin feature.
export const BATCH_MODE = ["offline", "online", "hybrid"] as const;
// "planned" added for Phase 2. The specification distinguishes PLANNED (dated
// but not yet taking enrolments) from OPEN (taking them); "upcoming" already
// means the latter here, so only the former was missing.
export const BATCH_STATUS = ["planned", "upcoming", "ongoing", "completed", "cancelled"] as const;

export type { LeadStatus } from "@/lib/leads/lifecycle";
export type BatchMode = (typeof BATCH_MODE)[number];
export type BatchStatus = (typeof BATCH_STATUS)[number];

// Batches table - for course batch scheduling
export const batches = sqliteTable("batches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Human label for a batch, e.g. "Java FS — Aug Weekend". Optional: the
   *  existing rows identify a batch by course and start date. */
  batchName: text("batch_name"),
  endDate: integer("end_date", { mode: "timestamp" }),
  courseSlug: text("course_slug").notNull(),
  courseName: text("course_name").notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  timing: text("timing").notNull(), // e.g., "9:00 AM - 12:00 PM"
  duration: text("duration").notNull(), // e.g., "3 Months"
  mode: text("mode").notNull().default("offline"), // "offline" | "online"
  totalSeats: integer("total_seats").notNull().default(15),
  seatsAvailable: integer("seats_available").notNull().default(15),
  status: text("status").notNull().default("upcoming"), // "upcoming" | "ongoing" | "completed" | "cancelled"
  instructor: text("instructor"),
  location: text("location"), // For offline batches
  meetingLink: text("meeting_link"), // For online batches
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Leads table - for enquiry form submissions
export const leads = sqliteTable(
  "leads",
  {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  /**
   * The phone in E.164, used ONLY for matching — duplicate detection, search.
   *
   * `phone` keeps exactly what the person typed, because that is what the
   * counsellor recognises on screen and what a correction should preserve.
   * Rewriting it in place would destroy the original for no gain: two columns
   * cost nothing and one of them is allowed to be lossy.
   *
   * Null when the value could not be normalised at all (blank, "N/A", four
   * digits). Nulls never match each other — see samePhone().
   */
  phoneNormalised: text("phone_normalised"),
  courseInterest: text("course_interest"),
  /**
   * Which delivery format the enquirer wants: "Online", "Offline",
   * "Hybrid" or "No preference".
   *
   * A real column rather than a line folded into `message`, because this is
   * the field the counselling team routes on — a classroom enquiry from
   * outside Pune is a different conversation from an online one — and
   * because it is the kind of thing you want to filter and count, not read.
   * Nullable: older leads pre-date the field, and not every lead form asks
   * (a newsletter signup is not expressing a course-format preference).
   */
  modePreference: text("mode_preference"),
  /**
   * Whether the enquirer is a "Fresher" or "Experienced".
   *
   * Its own column for the same reason as `modePreference`: it is the first
   * thing the counselling team routes on — a fresher gets the placement-track
   * pitch and the long batch, a working professional gets weekend timings and
   * the upskilling pitch — and it is something you filter and count, not read.
   * Nullable: leads captured before this field existed have no answer, and the
   * newsletter signup has no business asking for one.
   */
  experienceLevel: text("experience_level"),
  message: text("message"),
  source: text("source"), // e.g., "contact_form", "popup", "whatsapp"
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  /**
   * Lifecycle status. One of LEAD_STATUSES (lib/leads/lifecycle.ts).
   *
   * Left as free text rather than a Drizzle enum: SQLite has no native enum
   * and `text({ enum })` only narrows the TypeScript type, so the real guard
   * is the Zod schema on every write. Keeping it plain text also means the
   * pre-existing values survive the migration and can be mapped forward.
   */
  status: text("status").notNull().default("new"),
  /**
   * HOT / WARM / COLD. Deliberately independent of `status` — a lead can be
   * hot and still only at CONTACTED, and collapsing the two loses exactly the
   * signal a counsellor prioritises the day's calls by.
   */
  priority: text("priority"),
  notes: text("notes"),
  /**
   * Historical free-text owner. NOT dropped: it holds names typed by hand,
   * some of which never corresponded to an account. New assignments write
   * `assignedToUserId` and leave this as the record of what came before.
   */
  assignedTo: text("assigned_to"),
  /** Counsellor this lead belongs to, as a real user. */
  assignedToUserId: text("assigned_to_user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  assignedAt: integer("assigned_at", { mode: "timestamp" }),
  /** Who performed the assignment — for the audit trail, not for display. */
  assignedBy: text("assigned_by").references(() => user.id, {
    onDelete: "set null",
  }),
  /**
   * Human-readable reference quoted on the phone ("ENQ-2026-0042").
   * Nullable because 25 rows predate it; assigned on creation from here on.
   */
  enquiryNumber: text("enquiry_number"),
  altPhone: text("alt_phone"),
  qualification: text("qualification"),
  college: text("college"),
  passingYear: integer("passing_year"),
  /** Student / Fresher / Working Professional / Career Break / Other. */
  currentStatus: text("current_status"),
  /** Morning / Afternoon / Evening / Weekend / Flexible. */
  preferredTiming: text("preferred_timing"),
  /** Immediately / Within 1 month / 1-3 months / Just exploring. */
  expectedJoining: text("expected_joining"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  campaign: text("campaign"),
  landingPage: text("landing_page"),
  followUpDate: integer("follow_up_date", { mode: "timestamp" }),
  /**
   * Why this lead was closed — one of LOSS_REASONS. Required by
   * setLeadStatus for the five closing statuses, and the column the Lost
   * Lead report groups by. Controlled values, because a column of hand-typed
   * variations on "fees too high" cannot be counted.
   */
  closureReason: text("closure_reason"),
  /** The detail behind the reason, in the counsellor's own words. */
  closureNote: text("closure_note"),
  /**
   * When it was closed. Not the same as `updated_at`, which moves for any
   * edit — the report needs the date the outcome was decided.
   */
  closedAt: integer("closed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
},
  (table) => [
    // Every duplicate check is a lookup on this column, on every website
    // submission. Not unique: a genuine repeat enquiry months later is a new
    // lead, and the specification is explicit that those must not be lost.
    index("leads_phone_normalised_idx").on(table.phoneNormalised),
  ],
);

// Placements table - for student success stories
/**
 * Follow-up log for a lead. Append-only by design.
 *
 * The specification is explicit that previous follow-ups must never be
 * overwritten, and it is right: the value of this table is the history, not
 * the latest row. `leads.followUpDate` still holds the NEXT scheduled contact
 * so the existing list view keeps working, but it is derived from the most
 * recent follow-up rather than being the record itself.
 */
export const followUps = sqliteTable("follow_ups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: integer("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  /** Who logged it. Null survives a staff member's account being removed. */
  createdByUserId: text("created_by_user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  /** CALL / WHATSAPP / EMAIL / IN_PERSON / DEMO / OTHER. */
  followUpType: text("follow_up_type").notNull(),
  /** CONNECTED / NO_ANSWER / CALL_LATER / INTERESTED / NOT_INTERESTED / ... */
  outcome: text("outcome").notNull(),
  notes: text("notes"),
  /** When the contact actually happened. */
  followUpAt: integer("follow_up_at", { mode: "timestamp" }).notNull(),
  /** When the next one is due, if one was scheduled. */
  nextFollowUpAt: integer("next_follow_up_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type FollowUp = typeof followUps.$inferSelect;
export type NewFollowUp = typeof followUps.$inferInsert;

/**
 * A lead saying "that batch, please".
 *
 * Separate from assigning them to it: interest is the lead's signal, and it
 * has to survive the batch filling up or the lead choosing another. One row
 * per lead per batch — the unique index is what stops a counsellor logging
 * the same interest twice from two screens.
 */
export const batchInterests = sqliteTable(
  "batch_interests",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    batchId: integer("batch_id")
      .notNull()
      .references(() => batches.id, { onDelete: "cascade" }),
    notes: text("notes"),
    createdByUserId: text("created_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("batch_interests_lead_batch_idx").on(table.leadId, table.batchId),
  ],
);

export const DEMO_SESSION_STATUS = ["scheduled", "completed", "cancelled"] as const;
export type DemoSessionStatus = (typeof DEMO_SESSION_STATUS)[number];

/**
 * A demo or trial class someone can be invited to.
 *
 * `batchId` is optional: a demo often runs before a batch exists, which is
 * the point of it. `courseSlug` rather than a course id because courses stay
 * in courses.ts — see docs/lead-crm.md.
 */
export const demoSessions = sqliteTable("demo_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseSlug: text("course_slug").notNull(),
  courseName: text("course_name").notNull(),
  batchId: integer("batch_id").references(() => batches.id, {
    onDelete: "set null",
  }),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }).notNull(),
  /** Reuses BATCH_MODE so a demo and a batch describe delivery the same way. */
  mode: text("mode").notNull().default("offline"),
  meetingLink: text("meeting_link"),
  location: text("location"),
  trainer: text("trainer"),
  capacity: integer("capacity"),
  status: text("status").notNull().default("scheduled"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const DEMO_ATTENDANCE = ["scheduled", "attended", "no_show", "cancelled"] as const;
export type DemoAttendance = (typeof DEMO_ATTENDANCE)[number];

/**
 * One lead's place in one demo, and whether they turned up.
 *
 * Attendance lives here rather than on the session because it is per person:
 * a demo with eight registrations has eight different answers, and rolling
 * them into a session-level status would lose exactly the information the
 * follow-up conversation needs.
 */
export const demoRegistrations = sqliteTable(
  "demo_registrations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    demoSessionId: integer("demo_session_id")
      .notNull()
      .references(() => demoSessions.id, { onDelete: "cascade" }),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    attendance: text("attendance").notNull().default("scheduled"),
    notes: text("notes"),
    createdByUserId: text("created_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("demo_registrations_session_lead_idx").on(
      table.demoSessionId,
      table.leadId,
    ),
  ],
);

/**
 * An admission — the point a lead stops being an enquiry and becomes a student.
 *
 * One admission per lead at most (the unique index below), and the lead row is
 * never deleted: the enquiry, its follow-ups and its admission together are the
 * history of how this student arrived, which is the thing the reports are
 * eventually going to ask about.
 *
 * Money is stored in PAISE as integers. See src/lib/admissions/money.ts for
 * why, and for the only two functions that convert between paise and the
 * rupees an admin types.
 *
 * `courseSlug` rather than a course id, matching batches and demo sessions —
 * courses stay in courses.ts, see docs/lead-crm.md.
 */
export const admissions = sqliteTable(
  "admissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    /** Human-readable reference for a receipt or a phone call: ADM-2026-0007. */
    admissionNumber: text("admission_number"),
    /**
     * Copied from the lead at conversion rather than joined on every read.
     * The lead record keeps being edited afterwards — a corrected spelling, a
     * new phone number — and an admission has to say who enrolled on the day.
     */
    studentName: text("student_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    courseSlug: text("course_slug").notNull(),
    courseName: text("course_name").notNull(),
    /** Optional: an admission is often taken before the batch is fixed. */
    batchId: integer("batch_id").references(() => batches.id, {
      onDelete: "set null",
    }),
    admissionDate: integer("admission_date", { mode: "timestamp" }).notNull(),
    /** All three in paise. `finalFee` is always derived server-side. */
    courseFee: integer("course_fee").notNull().default(0),
    discount: integer("discount").notNull().default(0),
    finalFee: integer("final_fee").notNull().default(0),
    /** ADMISSION_STATUSES — is this person joining? */
    status: text("status").notNull().default("ENROLLED"),
    /** PAYMENT_STATUSES — how much of the fee has arrived? */
    paymentStatus: text("payment_status").notNull().default("PENDING"),
    notes: text("notes"),
    createdByUserId: text("created_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    // Lead 1 --- 0..1 Admission. Enforced here rather than by a check in the
    // action, because two counsellors clicking Convert at the same moment is
    // exactly the case an application-level check misses.
    uniqueIndex("admissions_lead_idx").on(table.leadId),
    index("admissions_status_idx").on(table.status),
    index("admissions_date_idx").on(table.admissionDate),
  ],
);

/**
 * Monotonic counters for human-readable references (ENQ-…, ADM-…).
 *
 * Deriving the next number from MAX(existing) looks equivalent and is not: it
 * only holds while nothing is ever deleted. Delete the newest lead and the max
 * drops back, so the next enquiry is handed a reference the office has already
 * quoted to somebody — two different people, one number, and the admin lead
 * list has a delete button.
 *
 * This table only ever counts up. A deleted row's number is retired.
 */
export const referenceCounters = sqliteTable(
  "reference_counters",
  {
    /** "ENQ" or "ADM". */
    scope: text("scope").notNull(),
    year: integer("year").notNull(),
    lastValue: integer("last_value").notNull().default(0),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [primaryKey({ columns: [table.scope, table.year] })],
);

/**
 * In-app notifications for counsellors.
 *
 * Only EVENT notifications are stored — something happened once, to a named
 * person, and it must survive until they have seen it: a lead assigned to
 * them, a demo scheduled for their lead.
 *
 * Time-based reminders (follow-up due today, follow-up overdue) are NOT rows
 * here. They are derived live from `leads.follow_up_date` the way the queue
 * page already derives them, because a stored "due today" is wrong by
 * tomorrow morning and generating them needs a scheduler this project does
 * not have. See lib/actions/notifications.ts.
 *
 * The spec asks that this be designed so WhatsApp and email can deliver the
 * same notifications later; `channel` is what that hangs on, and today every
 * row is "in_app".
 */
export const NOTIFICATION_TYPES = [
  "LEAD_ASSIGNED",
  "DEMO_SCHEDULED",
  "ADMISSION_CONFIRMED",
  "LEAD_REASSIGNED",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const notifications = sqliteTable(
  "notifications",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    /** Who should see it. Null means every admin — used for unassigned work. */
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    /** Where clicking it should go. */
    href: text("href"),
    leadId: integer("lead_id").references(() => leads.id, { onDelete: "cascade" }),
    /** "in_app" today. The seam for WhatsApp/email delivery later. */
    channel: text("channel").notNull().default("in_app"),
    readAt: integer("read_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("notifications_user_read_idx").on(table.userId, table.readAt),
    index("notifications_created_idx").on(table.createdAt),
  ],
);

export type Notification = typeof notifications.$inferSelect;

/**
 * Admin-controlled CRM settings, as key/value.
 *
 * A table rather than environment variables because these are decisions the
 * office makes and changes — whether new website enquiries are auto-assigned,
 * and how soon the first follow-up is due. An env var change needs a deploy;
 * this needs a click.
 */
export const crmSettings = sqliteTable("crm_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type CrmSetting = typeof crmSettings.$inferSelect;

/**
 * Messages prepared for a lead — course details, syllabus, fees, a demo
 * reminder.
 *
 * NOTHING IS SENT FROM HERE. The specification is explicit that WhatsApp must
 * not be implemented without a configured provider, and there is none. What
 * this does is compose the message from the lead's own data so a counsellor
 * can copy it into WhatsApp, and record that it was prepared — which is the
 * provider-independent abstraction the spec asks for. When a provider is
 * added, it delivers these rows; nothing else has to change.
 *
 * `status` therefore never reaches "sent" today. It stops at "copied".
 */
export const MESSAGE_CHANNELS = ["whatsapp", "email", "sms"] as const;
export const MESSAGE_STATUSES = ["draft", "copied", "queued", "sent", "failed"] as const;
export type MessageChannel = (typeof MESSAGE_CHANNELS)[number];
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export const messages = sqliteTable(
  "messages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    channel: text("channel").notNull().default("whatsapp"),
    /** Which template produced it, for reporting on what gets sent. */
    template: text("template").notNull(),
    subject: text("subject"),
    body: text("body").notNull(),
    status: text("status").notNull().default("draft"),
    createdByUserId: text("created_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    /** Set when a provider actually delivers it. Null for every row today. */
    sentAt: integer("sent_at", { mode: "timestamp" }),
  },
  (table) => [index("messages_lead_idx").on(table.leadId)],
);

export type Message = typeof messages.$inferSelect;

export type ReferenceCounter = typeof referenceCounters.$inferSelect;

export type Admission = typeof admissions.$inferSelect;
export type NewAdmission = typeof admissions.$inferInsert;

export type BatchInterest = typeof batchInterests.$inferSelect;
export type DemoSession = typeof demoSessions.$inferSelect;
export type NewDemoSession = typeof demoSessions.$inferInsert;
export type DemoRegistration = typeof demoRegistrations.$inferSelect;

export const placements = sqliteTable("placements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  studentName: text("student_name").notNull(),
  company: text("company").notNull(),
  designation: text("designation").notNull(),
  package: text("package"), // e.g., "8 LPA"
  courseTaken: text("course_taken"),
  batchYear: integer("batch_year"),
  photoUrl: text("photo_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  /**
   * The STUDENT's own words, captured on the public submission form.
   * Distinct from `instituteNote` below — do not mix the two voices in one
   * column. On approval this is promoted into `testimonials`, which is the
   * table that actually reaches the home page, /testimonials and the course
   * pages; here it is kept only as the record of what was submitted.
   */
  testimonial: text("testimonial"),
  /**
   * OUR words about the student, their placement and the course they took.
   * Rendered on the spotlight card for highlighted placements — the
   * institute-authored announcement, the opposite direction from a
   * testimonial.
   */
  instituteNote: text("institute_note"),
  /**
   * Consent to show the student's FULL name and photo publicly.
   *
   * Defaults to false, and deliberately separate from `isPublished`: a row
   * can be part of the public record while the person stays pseudonymous
   * ("Rutuja G."). Set from `consentDisplayPublic` when a submission is
   * approved — the public form asks exactly this ("You may show my name,
   * company and photo on the website"). Rows typed by hand in admin carry
   * no consent trail, so they start false and an admin must tick it.
   */
  consentDisplayName: integer("consent_display_name", { mode: "boolean" }).default(false),
  /**
   * Consent to publish this student's INDIVIDUAL salary figure.
   *
   * Separate from, and narrower than, `consentDisplayName`. The public
   * submission form currently promises "your salary figure is never
   * published either way", so every existing submission must default to
   * false and stay false — the aggregate band on /placements is derived
   * from all rows regardless, which is what that promise allows.
   */
  consentDisplaySalary: integer("consent_display_salary", { mode: "boolean" }).default(false),
  /**
   * Proof of employment held on file — offer letter, ID card, salary slip or
   * similar. Stored in the PRIVATE "offer-letters" media collection, which
   * the public /media route refuses to serve (404) and which only
   * /admin/media/... can read, behind an auth check.
   *
   * This file is never published to anyone, crawlers included: it carries a
   * real person's name, employer, salary and often a signature. What is
   * public is the ATTESTATION that it exists and was checked — see
   * `verifiedAt` — never the document itself.
   */
  proofFilename: text("proof_filename"),
  /** What the proof actually is, so the attestation can be specific. */
  proofType: text("proof_type"),
  /**
   * When a human checked the proof against this row. Null means unverified,
   * and the public record says so rather than quietly implying every entry
   * was checked.
   */
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
  isHighlighted: integer("is_highlighted", { mode: "boolean" }).default(false),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Blog posts table - for SEO content
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  category: text("category"),
  tags: text("tags"), // Comma-separated tags
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  author: text("author").default("Archer Infotech"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  // Stored as Unix milliseconds (matches what was actually written to the DB).
  // Earlier `mode: "timestamp"` (Unix seconds) caused Drizzle to multiply the
  // already-ms value by 1000 on read → year 58239 dates in rendered HTML.
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

// Testimonials table - for student reviews
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role"),
  company: text("company"),
  courseTaken: text("course_taken"),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  photoUrl: text("photo_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  isHighlighted: integer("is_highlighted", { mode: "boolean" }).default(false),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Alumni submissions — self-service form (public /alumni link) where past
// students share their current career details. Admin reviews each row and,
// on approval, promotes the public-safe fields into the `testimonials`
// table (linked via `testimonialId`). Private fields (package band, phone,
// email, location, hiring/referral offers) stay admin-only for placement
// outreach and are never copied to the public testimonial.
export const alumni = sqliteTable("alumni", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // --- Identity / contact (private) ---
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city"), // current location
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  // --- Career now ---
  courseTaken: text("course_taken"),
  completionYear: text("completion_year"), // free text: "2021" or batch label
  currentCompany: text("current_company"),
  currentRole: text("current_role"),
  packageBand: text("package_band"), // one of AlumniPackageBand (private)
  yearsExperience: text("years_experience"),
  // --- Help place current students (private placement intel) ---
  openToReferrals: integer("open_to_referrals", { mode: "boolean" }).default(false),
  companyHiring: integer("company_hiring", { mode: "boolean" }).default(false),
  hiringRoles: text("hiring_roles"),
  hrContacts: text("hr_contacts"), // free text: HR name / phone / email the alumnus can refer us to
  // --- Testimonial (public after approval) ---
  testimonialContent: text("testimonial_content"),
  rating: integer("rating").notNull().default(5),
  photoFilename: text("photo_filename"), // stored on the persistent volume
  // --- Consent ---
  consentDisplayPublic: integer("consent_display_public", { mode: "boolean" }).default(false),
  consentSharePartners: integer("consent_share_partners", { mode: "boolean" }).default(false),
  lookingForJobChange: integer("looking_for_job_change", { mode: "boolean" }).default(false),
  // --- Workflow ---
  status: text("status").notNull().default("new"), // AlumniStatus
  adminNotes: text("admin_notes"),
  testimonialId: integer("testimonial_id"), // set once promoted to testimonials
  source: text("source"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// SEO metrics cache — single table for all SEO API responses (GSC,
// PSI, CrUX, URL Inspection). The /admin/seo dashboard reads this to
// render KPI tiles + tables without blowing through API quotas every
// page load. Each row is the response for one (source, scope_value)
// pair, expiring on `expires_at` so the dashboard refresh button can
// force a re-fetch by deleting expired rows.
//
// `payload` is the raw API response stored as a JSON string (SQLite
// has no native JSON column type — TEXT is the canonical pattern with
// JSON.parse on read).
export const seoMetricsCache = sqliteTable("seo_metrics_cache", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // Source API: 'gsc-query' | 'gsc-inspect' | 'psi' | 'crux' | 'crux-history'
  source: text("source").notNull(),
  // What this cache row covers — typically a URL, or "global" for
  // origin-level / aggregate queries.
  scopeValue: text("scope_value").notNull(),
  // Optional discriminator for sources that have multiple variants
  // (e.g. PSI has mobile + desktop runs against the same URL; we use
  // variant="mobile" / "desktop" to disambiguate).
  variant: text("variant"),
  payload: text("payload").notNull(),
  fetchedAt: integer("fetched_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

// AI citation audits — manual log of monthly prompt audits across
// AI search engines (ChatGPT, Claude, Perplexity, Google AI Overviews,
// Bing Copilot, Gemini). One row per (audit_date, engine, prompt) tuple.
// Rendered in the SEO Dashboard's AI Citations tab; aggregations
// computed on read. Pillar 8 P8-26 / Pillar 5 P5-29.
export const aiCitationAudits = sqliteTable("ai_citation_audits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // ISO date (YYYY-MM-DD) — store as text for easy month-grouping in SQL
  auditDate: text("audit_date").notNull(),
  // 'chatgpt' | 'claude' | 'perplexity' | 'google-aio' | 'bing-copilot' | 'gemini' | (custom)
  engine: text("engine").notNull(),
  prompt: text("prompt").notNull(),
  // Whether Archer Infotech was mentioned in the response
  mentioned: integer("mentioned", { mode: "boolean" }).notNull().default(false),
  // Whether archerinfotech.in was cited as a source URL
  cited: integer("cited", { mode: "boolean" }).notNull().default(false),
  // Optional cited URL if known
  citedUrl: text("cited_url"),
  // 'positive' | 'neutral' | 'negative' | 'inaccurate'
  sentiment: text("sentiment"),
  // Free-text observations from the auditor
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// SEO daily metrics — one row per day (keyed on the GSC anchor date,
// which lags ~3 days). Turns the live-snapshot dashboard into a time
// series: headline totals, branded split, position distribution, and
// per-segment rollup are stored as a JSON payload (DailyRollup shape in
// src/lib/seo-dashboard/history.ts) for trend lines over weeks/months.
// Written by the POST /api/seo/snapshot cron route.
export const seoDailyMetrics = sqliteTable("seo_daily_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // ISO date (YYYY-MM-DD) — the GSC window end (anchor). Unique = one row/day.
  date: text("date").notNull().unique(),
  capturedAt: integer("captured_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  // JSON-encoded DailyRollup (totals, brandedSplit, positionDist, segments).
  payload: text("payload").notNull(),
});

// SEO keyword ranks — daily snapshot of the tracked target money
// keywords (TARGET_KEYWORDS in targets.ts). One row per (date, keyword)
// so each keyword gets a position/clicks/impressions sparkline over time.
export const seoKeywordRanks = sqliteTable("seo_keyword_ranks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(), // YYYY-MM-DD (GSC anchor)
  keyword: text("keyword").notNull(),
  // Best-ranking URL GSC attributes to this query, if known.
  page: text("page"),
  clicks: integer("clicks").notNull().default(0),
  impressions: integer("impressions").notNull().default(0),
  ctr: real("ctr").notNull().default(0),
  position: real("position").notNull().default(0),
});

// Google Business Profile reviews — mirror of the reviews on the GBP
// (CID 6025358486108162616), pulled by the nightly sync in
// /api/reviews/sync from GBP API v4 accounts.locations.reviews.list.
//
// Why a mirror rather than a live call on render: GBP API is rate-limited
// and the profile changes slowly. Unlike Places API content, GBP review
// data is the business's own and carries no caching prohibition, so it is
// safe to persist.
//
// `reviewId` is Google's opaque ID and the upsert key — review text can be
// edited by its author, so rows are updated in place rather than appended.
export const gbpReviews = sqliteTable("gbp_reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // Google's review name/ID — stable across edits. Upsert key.
  reviewId: text("review_id").notNull().unique(),
  reviewerName: text("reviewer_name"),
  reviewerPhotoUrl: text("reviewer_photo_url"),
  // 1-5. Google's API returns a STAR_RATING enum; the client maps it to int.
  starRating: integer("star_rating").notNull(),
  comment: text("comment"),
  // The business's public reply, if any — a visible responsiveness signal.
  replyComment: text("reply_comment"),
  replyUpdatedAt: integer("reply_updated_at", { mode: "timestamp_ms" }),
  createTime: integer("create_time", { mode: "timestamp_ms" }),
  updateTime: integer("update_time", { mode: "timestamp_ms" }),
  // Admin can suppress a row from the public wall without deleting it, so
  // the aggregate still counts what Google counts. Hiding a review changes
  // only what the page displays, never the reported total.
  isHidden: integer("is_hidden", { mode: "boolean" }).notNull().default(false),
  syncedAt: integer("synced_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Single-row state for the GBP review sync. Keyed on `id = 1`.
//
// The staleness fields are the point of this table. The site previously
// published a hand-typed review count for two months with nothing able to
// signal that it had gone stale. `lastSuccessAt` lets the rating resolver
// withhold AggregateRating entirely once the mirror ages out, which fails
// closed instead of publishing a confident wrong number.
export const gbpSyncState = sqliteTable("gbp_sync_state", {
  id: integer("id").primaryKey(),
  // Totals as reported by Google, not recomputed from the mirrored rows —
  // Google's own total is the figure that must match the AggregateRating.
  totalReviewCount: integer("total_review_count"),
  averageRating: real("average_rating"),
  // Last run that completed without error. Drives the staleness guard.
  lastSuccessAt: integer("last_success_at", { mode: "timestamp_ms" }),
  lastAttemptAt: integer("last_attempt_at", { mode: "timestamp_ms" }),
  lastError: text("last_error"),
  // Rows written by the most recent successful run — cheap sanity check.
  lastSyncedCount: integer("last_synced_count"),
});

// Public placement submissions — students reporting their own offer via
// /placements/submit, rather than an admin typing it in.
//
// DELIBERATELY NOT THE `placements` TABLE. That one renders straight onto
// the public /placements page, so letting anonymous input write to it would
// publish unverified salary and employer claims — the same failure mode as
// the hand-typed review count that ran for two months. Submissions land
// here, an admin reviews the attached offer letter, and approval copies the
// row into `placements`. Nothing here is public.
//
// `offerLetterFilename` points into the PRIVATE `offer-letters` collection,
// readable only through the admin-authenticated media route.
export const placementSubmissions = sqliteTable("placement_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // --- Identity (private) ---
  studentName: text("student_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedinUrl: text("linkedin_url"),
  // --- The offer ---
  company: text("company").notNull(),
  designation: text("designation").notNull(),
  package: text("package"),
  offerDate: text("offer_date"), // YYYY-MM-DD, free-form enough to accept "joined last month"
  courseTaken: text("course_taken"),
  batchYear: integer("batch_year"),
  // --- Evidence (private) ---
  offerLetterFilename: text("offer_letter_filename"),
  // --- Optional public-facing extras ---
  testimonial: text("testimonial"),
  photoFilename: text("photo_filename"),
  consentDisplayPublic: integer("consent_display_public", { mode: "boolean" }).default(false),
  // --- Workflow ---
  // Mirrors ALUMNI_STATUSES so both review queues behave the same way.
  status: text("status").notNull().default("new"),
  adminNotes: text("admin_notes"),
  /** Set once approved and copied into `placements`. */
  placementId: integer("placement_id"),
  source: text("source"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit logs table - for tracking admin actions
export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actorId: text("actor_id"),
  actorLabel: text("actor_label").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  summary: text("summary").notNull(),
  metadata: text("metadata"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Types for TypeScript
export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type Placement = typeof placements.$inferSelect;
export type NewPlacement = typeof placements.$inferInsert;

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type Alumni = typeof alumni.$inferSelect;
export type NewAlumni = typeof alumni.$inferInsert;

export type PlacementSubmission = typeof placementSubmissions.$inferSelect;
export type NewPlacementSubmission = typeof placementSubmissions.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export type GbpReview = typeof gbpReviews.$inferSelect;
export type NewGbpReview = typeof gbpReviews.$inferInsert;

export type GbpSyncState = typeof gbpSyncState.$inferSelect;
export type NewGbpSyncState = typeof gbpSyncState.$inferInsert;

export type SeoMetricsCache = typeof seoMetricsCache.$inferSelect;
export type NewSeoMetricsCache = typeof seoMetricsCache.$inferInsert;

export type AiCitationAudit = typeof aiCitationAudits.$inferSelect;
export type NewAiCitationAudit = typeof aiCitationAudits.$inferInsert;

export type SeoDailyMetric = typeof seoDailyMetrics.$inferSelect;
export type NewSeoDailyMetric = typeof seoDailyMetrics.$inferInsert;

export type SeoKeywordRank = typeof seoKeywordRanks.$inferSelect;
export type NewSeoKeywordRank = typeof seoKeywordRanks.$inferInsert;

// Auth types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;

/**
 * Promotional popup campaigns, managed from /admin/popups.
 *
 * Config lives in the DB rather than in code so a campaign can be switched
 * off, or its artwork swapped, without a 45-minute rebuild and deploy. The
 * public site reads it through /api/popup, which is uncached — the site's
 * HTML is edge-cached for up to 6 hours, so anything baked into a page would
 * take that long to react to an admin toggle.
 */
export const popupCampaigns = sqliteTable("popup_campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Human name for the campaign; also what tags the leads it generates. */
  subject: text("subject").notNull(),
  /** Filename inside the "offers" media collection. */
  imageFilename: text("image_filename").notNull(),
  /** Read off the uploaded file so the popup can reserve space (no CLS). */
  imageWidth: integer("image_width").notNull(),
  imageHeight: integer("image_height").notNull(),
  /** The offer in words — the artwork's text is pixels, invisible to search. */
  imageAlt: text("image_alt").notNull(),
  /** "image_only" | "image_and_form" */
  mode: text("mode").notNull().default("image_and_form"),
  /** Where the artwork links in image_only mode. Ignored when collecting data. */
  linkUrl: text("link_url"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(false),
  /** Inclusive YYYY-MM-DD in IST. NULL on either side means open-ended. */
  startDate: text("start_date"),
  endDate: text("end_date"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type PopupCampaign = typeof popupCampaigns.$inferSelect;
export type NewPopupCampaign = typeof popupCampaigns.$inferInsert;

// ---------------------------------------------------------------------------
// Placement drives — the "we bring companies in" half of the placement story.
//
// DELIBERATELY NOT A JOB BOARD, and deliberately carrying no JobPosting
// schema. Google requires a job posting to be applied to by whoever finds it,
// and treats stale postings harshly: a listing left unexpired can trigger a
// manual action that removes every job on the domain from Google Jobs. These
// drives are for enrolled students, so a stranger arriving from Google Jobs
// could not apply — a bad result for them and an ongoing liability for us, in
// exchange for traffic this page is not trying to attract.
//
// What the page IS for is proof: a dated, specific, checkable record that
// named companies ran drives here and named numbers of students were selected.
// `studentsAppeared` and `studentsSelected` are the fields that make this
// different from a job list — they are why a completed drive stays worth
// publishing instead of becoming stale content to delete.
//
// `allowJobPostingSchema` is the escape hatch for the rare drive that is
// genuinely open to outside applicants. Off by default, and it should stay off
// unless someone has checked that the posting meets Google's guidelines,
// including a working way for a stranger to apply.
export const placementDrives = sqliteTable("placement_drives", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Hiring company. The real employer, never "a leading MNC". */
  company: text("company").notNull(),
  /** Role as the company titled it. */
  role: text("role").notNull(),
  /** Full JD. Markdown; rendered on the drive detail view. */
  description: text("description"),
  /** Package band as offered, e.g. "₹4.5–6 LPA". Never a single inflated figure. */
  packageBand: text("package_band"),
  location: text("location"),
  /** Skills the drive screened on, comma-separated. */
  skills: text("skills"),
  /** Which course/batch could sit it — the eligibility line students look for. */
  eligibility: text("eligibility"),
  /** "campus" | "virtual" | "walk_in" | "partner_office" */
  mode: text("mode").notNull().default("campus"),
  /** YYYY-MM-DD in IST. Null for a drive with no date fixed yet. */
  driveDate: text("drive_date"),
  /** "upcoming" | "in_progress" | "completed" | "cancelled" */
  status: text("status").notNull().default("upcoming"),
  /**
   * Outcome. Null means not recorded, which the page must render as
   * "not recorded" rather than as zero — an unreported drive and a drive
   * where nobody was selected are different facts.
   */
  studentsAppeared: integer("students_appeared"),
  studentsSelected: integer("students_selected"),
  /** How a student applies — placement cell, form URL, or partner link. */
  applyNote: text("apply_note"),
  /** Opt-in, per drive, for genuine public JobPosting markup. See note above. */
  allowJobPostingSchema: integer("allow_job_posting_schema", { mode: "boolean" })
    .notNull()
    .default(false),
  /** Required by Google when JobPosting markup is on. YYYY-MM-DD. */
  validThrough: text("valid_through"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type PlacementDrive = typeof placementDrives.$inferSelect;
export type NewPlacementDrive = typeof placementDrives.$inferInsert;

// ---------------------------------------------------------------------------
// Seminars and training sessions already delivered.
//
// NO Event SCHEMA, for the same class of reason. Google requires an Event to
// be "bookable to the general public" and explicitly lists student events on
// school premises as ineligible. A corporate session delivered inside a
// client's office two years ago is neither upcoming nor publicly bookable, so
// Event markup would earn no rich result and would be a claim we cannot
// support. These render as an ItemList plus real visible content.
//
// The value here is entity authority. "Archer Infotech delivered a Java
// workshop at Amdocs Pune in March 2025 to about 40 engineers" is a specific,
// dated, checkable claim — the kind an answer engine will quote. A logo strip
// on /corporate-training, which is what exists today, is not.
export const seminars = sqliteTable("seminars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Where it was delivered — company or college. The real name. */
  hostOrganisation: text("host_organisation").notNull(),
  /** "corporate" | "college" | "public" | "online" */
  hostType: text("host_type").notNull().default("corporate"),
  city: text("city"),
  /** What was taught. */
  topic: text("topic").notNull(),
  /** Technologies covered, comma-separated. */
  technologies: text("technologies"),
  /** "seminar" | "workshop" | "corporate_batch" | "guest_lecture" | "bootcamp" */
  format: text("format").notNull().default("seminar"),
  /** YYYY-MM or YYYY-MM-DD. Month precision is honest when the day is lost. */
  heldOn: text("held_on"),
  /** e.g. "2 days", "16 hours". Free text because real sessions vary. */
  duration: text("duration"),
  /**
   * Approximate headcount. Null when nobody recorded it — better than a
   * confident guess, and the page says "attendance not recorded".
   */
  attendees: integer("attendees"),
  /** Trainer slug from team.ts, so the session resolves to a real person. */
  trainerId: text("trainer_id"),
  /** One or two sentences of what actually happened. */
  summary: text("summary"),
  /** Did it lead to anything — a corporate batch, a hiring tie-up. */
  outcome: text("outcome"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Seminar = typeof seminars.$inferSelect;
export type NewSeminar = typeof seminars.$inferInsert;
