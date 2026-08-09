import {
  sqliteTable,
  text,
  integer,
  real,
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
export const LEAD_STATUS = ["new", "contacted", "qualified", "converted", "closed"] as const;
export const BATCH_MODE = ["offline", "online"] as const;
export const BATCH_STATUS = ["upcoming", "ongoing", "completed", "cancelled"] as const;

export type LeadStatus = (typeof LEAD_STATUS)[number];
export type BatchMode = (typeof BATCH_MODE)[number];
export type BatchStatus = (typeof BATCH_STATUS)[number];

// Batches table - for course batch scheduling
export const batches = sqliteTable("batches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseInterest: text("course_interest"),
  message: text("message"),
  source: text("source"), // e.g., "contact_form", "popup", "whatsapp"
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  status: text("status").notNull().default("new"), // LeadStatus
  notes: text("notes"),
  assignedTo: text("assigned_to"),
  followUpDate: integer("follow_up_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Placements table - for student success stories
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
  testimonial: text("testimonial"),
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
  placedAt: text("placed_at"), // Company where placed
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
