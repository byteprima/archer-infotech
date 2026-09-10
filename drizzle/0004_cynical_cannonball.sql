CREATE TABLE `admissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lead_id` integer NOT NULL,
	`admission_number` text,
	`student_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`course_slug` text NOT NULL,
	`course_name` text NOT NULL,
	`batch_id` integer,
	`admission_date` integer NOT NULL,
	`course_fee` integer DEFAULT 0 NOT NULL,
	`discount` integer DEFAULT 0 NOT NULL,
	`final_fee` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'ENROLLED' NOT NULL,
	`payment_status` text DEFAULT 'PENDING' NOT NULL,
	`notes` text,
	`created_by_user_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admissions_lead_idx` ON `admissions` (`lead_id`);--> statement-breakpoint
CREATE INDEX `admissions_status_idx` ON `admissions` (`status`);--> statement-breakpoint
CREATE INDEX `admissions_date_idx` ON `admissions` (`admission_date`);