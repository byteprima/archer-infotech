ALTER TABLE `leads` ADD `phone_normalised` text;--> statement-breakpoint
CREATE INDEX `leads_phone_normalised_idx` ON `leads` (`phone_normalised`);