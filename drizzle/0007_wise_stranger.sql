CREATE TABLE `reference_counters` (
	`scope` text NOT NULL,
	`year` integer NOT NULL,
	`last_value` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`scope`, `year`)
);
