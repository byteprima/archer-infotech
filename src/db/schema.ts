import {
  sqliteTable,
  text,
  integer,
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
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
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

// Auth types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;
