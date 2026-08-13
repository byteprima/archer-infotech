-- Public placement submissions + the private offer-letter collection.
--
-- Additive only. This project manages schema with `npm run db:push`
-- (see CLAUDE.md); this file is for applying the change to the production
-- SQLite database without touching anything else. Idempotent.
--
-- Production database:
--   /data/coolify/applications/i5knr4obzv3hzjhrkl58rn12/data/sqlite.db
-- Apply with:
--   sqlite3 <path-to-sqlite.db> < 2026-08-13-placement-submissions.sql
--
-- Note: offer letters are written to <volume>/uploads/offer-letters/, which
-- the app creates on first upload. Nothing to do here for that.

CREATE TABLE IF NOT EXISTS `placement_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`linkedin_url` text,
	`company` text NOT NULL,
	`designation` text NOT NULL,
	`package` text,
	`offer_date` text,
	`course_taken` text,
	`batch_year` integer,
	`offer_letter_filename` text,
	`testimonial` text,
	`photo_filename` text,
	`consent_display_public` integer DEFAULT false,
	`status` text DEFAULT 'new' NOT NULL,
	`admin_notes` text,
	`placement_id` integer,
	`source` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
