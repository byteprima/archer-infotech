-- GBP review mirror — additive DDL for the nightly review sync.
--
-- This project manages schema with `npm run db:push`, not migration files
-- (see CLAUDE.md), so this file exists for the one case push does not
-- cover: applying the two new tables to the production SQLite database
-- without touching anything else.
--
-- `drizzle-kit generate` was deliberately NOT used here. With no prior
-- migration history it emits a 0000 baseline that recreates every table in
-- the schema, which is not safe to point at a live database.
--
-- Idempotent — safe to run more than once.
--
-- Production database:
--   /data/coolify/applications/i5knr4obzv3hzjhrkl58rn12/data/sqlite.db
-- Apply with:
--   sqlite3 <path-to-sqlite.db> < 2026-08-09-gbp-reviews.sql

CREATE TABLE IF NOT EXISTS `gbp_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`review_id` text NOT NULL,
	`reviewer_name` text,
	`reviewer_photo_url` text,
	`star_rating` integer NOT NULL,
	`comment` text,
	`reply_comment` text,
	`reply_updated_at` integer,
	`create_time` integer,
	`update_time` integer,
	`is_hidden` integer DEFAULT false NOT NULL,
	`synced_at` integer NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `gbp_reviews_review_id_unique`
	ON `gbp_reviews` (`review_id`);

CREATE TABLE IF NOT EXISTS `gbp_sync_state` (
	`id` integer PRIMARY KEY NOT NULL,
	`total_review_count` integer,
	`average_rating` real,
	`last_success_at` integer,
	`last_attempt_at` integer,
	`last_error` text,
	`last_synced_count` integer
);
