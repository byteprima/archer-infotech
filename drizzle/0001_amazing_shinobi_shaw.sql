CREATE TABLE `follow_ups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lead_id` integer NOT NULL,
	`created_by_user_id` text,
	`follow_up_type` text NOT NULL,
	`outcome` text NOT NULL,
	`notes` text,
	`follow_up_at` integer NOT NULL,
	`next_follow_up_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
ALTER TABLE `leads` ADD `priority` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `assigned_to_user_id` text REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `leads` ADD `assigned_at` integer;--> statement-breakpoint
ALTER TABLE `leads` ADD `assigned_by` text REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `leads` ADD `enquiry_number` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `alt_phone` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `qualification` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `college` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `passing_year` integer;--> statement-breakpoint
ALTER TABLE `leads` ADD `current_status` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `preferred_timing` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `expected_joining` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `utm_content` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `utm_term` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `campaign` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `landing_page` text;