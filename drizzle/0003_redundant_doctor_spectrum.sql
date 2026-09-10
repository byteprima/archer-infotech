CREATE TABLE `batch_interests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lead_id` integer NOT NULL,
	`batch_id` integer NOT NULL,
	`notes` text,
	`created_by_user_id` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `batch_interests_lead_batch_idx` ON `batch_interests` (`lead_id`,`batch_id`);--> statement-breakpoint
CREATE TABLE `demo_registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`demo_session_id` integer NOT NULL,
	`lead_id` integer NOT NULL,
	`attendance` text DEFAULT 'scheduled' NOT NULL,
	`notes` text,
	`created_by_user_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`demo_session_id`) REFERENCES `demo_sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `demo_registrations_session_lead_idx` ON `demo_registrations` (`demo_session_id`,`lead_id`);--> statement-breakpoint
CREATE TABLE `demo_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_slug` text NOT NULL,
	`course_name` text NOT NULL,
	`batch_id` integer,
	`scheduled_at` integer NOT NULL,
	`mode` text DEFAULT 'offline' NOT NULL,
	`meeting_link` text,
	`location` text,
	`trainer` text,
	`capacity` integer,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
ALTER TABLE `batches` ADD `batch_name` text;--> statement-breakpoint
ALTER TABLE `batches` ADD `end_date` integer;