import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
]);

export const batchModeEnum = pgEnum("batch_mode", ["offline", "online"]);

export const batchStatusEnum = pgEnum("batch_status", [
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
]);

// Batches table - for course batch scheduling
export const batches = pgTable("batches", {
  id: serial("id").primaryKey(),
  courseSlug: varchar("course_slug", { length: 100 }).notNull(),
  courseName: varchar("course_name", { length: 200 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  timing: varchar("timing", { length: 100 }).notNull(), // e.g., "9:00 AM - 12:00 PM"
  duration: varchar("duration", { length: 50 }).notNull(), // e.g., "3 Months"
  mode: batchModeEnum("mode").notNull().default("offline"),
  totalSeats: integer("total_seats").notNull().default(15),
  seatsAvailable: integer("seats_available").notNull().default(15),
  status: batchStatusEnum("status").notNull().default("upcoming"),
  instructor: varchar("instructor", { length: 100 }),
  location: varchar("location", { length: 200 }), // For offline batches
  meetingLink: varchar("meeting_link", { length: 500 }), // For online batches
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leads table - for enquiry form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  courseInterest: varchar("course_interest", { length: 200 }),
  message: text("message"),
  source: varchar("source", { length: 100 }), // e.g., "contact_form", "popup", "whatsapp"
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  status: leadStatusEnum("status").notNull().default("new"),
  notes: text("notes"),
  assignedTo: varchar("assigned_to", { length: 100 }),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Placements table - for student success stories
export const placements = pgTable("placements", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 100 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  designation: varchar("designation", { length: 100 }).notNull(),
  package: varchar("package", { length: 50 }), // e.g., "8 LPA"
  courseTaken: varchar("course_taken", { length: 200 }),
  batchYear: integer("batch_year"),
  photoUrl: varchar("photo_url", { length: 500 }),
  linkedinUrl: varchar("linkedin_url", { length: 500 }),
  testimonial: text("testimonial"),
  isHighlighted: boolean("is_highlighted").default(false),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blog posts table - for SEO content
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: varchar("featured_image", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // Comma-separated tags
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  author: varchar("author", { length: 100 }).default("Archer Infotech"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testimonials table - for student reviews
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }),
  company: varchar("company", { length: 100 }),
  courseTaken: varchar("course_taken", { length: 200 }),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  photoUrl: varchar("photo_url", { length: 500 }),
  placedAt: varchar("placed_at", { length: 100 }), // Company where placed
  isHighlighted: boolean("is_highlighted").default(false),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
