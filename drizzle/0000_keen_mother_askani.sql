CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`id_token` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ai_citation_audits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`audit_date` text NOT NULL,
	`engine` text NOT NULL,
	`prompt` text NOT NULL,
	`mentioned` integer DEFAULT false NOT NULL,
	`cited` integer DEFAULT false NOT NULL,
	`cited_url` text,
	`sentiment` text,
	`notes` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `alumni` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`city` text,
	`linkedin_url` text,
	`github_url` text,
	`course_taken` text,
	`completion_year` text,
	`current_company` text,
	`current_role` text,
	`package_band` text,
	`years_experience` text,
	`open_to_referrals` integer DEFAULT false,
	`company_hiring` integer DEFAULT false,
	`hiring_roles` text,
	`hr_contacts` text,
	`testimonial_content` text,
	`rating` integer DEFAULT 5 NOT NULL,
	`photo_filename` text,
	`consent_display_public` integer DEFAULT false,
	`consent_share_partners` integer DEFAULT false,
	`looking_for_job_change` integer DEFAULT false,
	`status` text DEFAULT 'new' NOT NULL,
	`admin_notes` text,
	`testimonial_id` integer,
	`source` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`actor_id` text,
	`actor_label` text NOT NULL,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text,
	`summary` text NOT NULL,
	`metadata` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `batches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_slug` text NOT NULL,
	`course_name` text NOT NULL,
	`start_date` integer NOT NULL,
	`timing` text NOT NULL,
	`duration` text NOT NULL,
	`mode` text DEFAULT 'offline' NOT NULL,
	`total_seats` integer DEFAULT 15 NOT NULL,
	`seats_available` integer DEFAULT 15 NOT NULL,
	`status` text DEFAULT 'upcoming' NOT NULL,
	`instructor` text,
	`location` text,
	`meeting_link` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` text,
	`category` text,
	`tags` text,
	`meta_title` text,
	`meta_description` text,
	`author` text DEFAULT 'Archer Infotech',
	`is_published` integer DEFAULT false,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `gbp_reviews` (
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
--> statement-breakpoint
CREATE UNIQUE INDEX `gbp_reviews_review_id_unique` ON `gbp_reviews` (`review_id`);--> statement-breakpoint
CREATE TABLE `gbp_sync_state` (
	`id` integer PRIMARY KEY NOT NULL,
	`total_review_count` integer,
	`average_rating` real,
	`last_success_at` integer,
	`last_attempt_at` integer,
	`last_error` text,
	`last_synced_count` integer
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`course_interest` text,
	`mode_preference` text,
	`experience_level` text,
	`message` text,
	`source` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`status` text DEFAULT 'new' NOT NULL,
	`notes` text,
	`assigned_to` text,
	`follow_up_date` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `placement_drives` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`role` text NOT NULL,
	`description` text,
	`package_band` text,
	`location` text,
	`skills` text,
	`eligibility` text,
	`mode` text DEFAULT 'campus' NOT NULL,
	`drive_date` text,
	`status` text DEFAULT 'upcoming' NOT NULL,
	`students_appeared` integer,
	`students_selected` integer,
	`apply_note` text,
	`allow_job_posting_schema` integer DEFAULT false NOT NULL,
	`valid_through` text,
	`is_published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `placement_submissions` (
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
--> statement-breakpoint
CREATE TABLE `placements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_name` text NOT NULL,
	`company` text NOT NULL,
	`designation` text NOT NULL,
	`package` text,
	`course_taken` text,
	`batch_year` integer,
	`photo_url` text,
	`linkedin_url` text,
	`github_url` text,
	`testimonial` text,
	`institute_note` text,
	`consent_display_name` integer DEFAULT false,
	`consent_display_salary` integer DEFAULT false,
	`proof_filename` text,
	`proof_type` text,
	`verified_at` integer,
	`is_highlighted` integer DEFAULT false,
	`is_published` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `popup_campaigns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`subject` text NOT NULL,
	`image_filename` text NOT NULL,
	`image_width` integer NOT NULL,
	`image_height` integer NOT NULL,
	`image_alt` text NOT NULL,
	`mode` text DEFAULT 'image_and_form' NOT NULL,
	`link_url` text,
	`enabled` integer DEFAULT false NOT NULL,
	`start_date` text,
	`end_date` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `seminars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`host_organisation` text NOT NULL,
	`host_type` text DEFAULT 'corporate' NOT NULL,
	`city` text,
	`topic` text NOT NULL,
	`technologies` text,
	`format` text DEFAULT 'seminar' NOT NULL,
	`held_on` text,
	`duration` text,
	`attendees` integer,
	`trainer_id` text,
	`summary` text,
	`outcome` text,
	`is_published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `seo_daily_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`captured_at` integer NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `seo_daily_metrics_date_unique` ON `seo_daily_metrics` (`date`);--> statement-breakpoint
CREATE TABLE `seo_keyword_ranks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`keyword` text NOT NULL,
	`page` text,
	`clicks` integer DEFAULT 0 NOT NULL,
	`impressions` integer DEFAULT 0 NOT NULL,
	`ctr` real DEFAULT 0 NOT NULL,
	`position` real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `seo_metrics_cache` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source` text NOT NULL,
	`scope_value` text NOT NULL,
	`variant` text,
	`payload` text NOT NULL,
	`fetched_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`role` text,
	`company` text,
	`course_taken` text,
	`content` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`photo_url` text,
	`linkedin_url` text,
	`github_url` text,
	`is_highlighted` integer DEFAULT false,
	`is_published` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
