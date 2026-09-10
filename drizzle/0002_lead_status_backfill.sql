-- Map the lead statuses this database held before the lifecycle vocabulary
-- onto the new values, and give the rows that predate enquiry numbers one.
--
-- Written as a migration rather than a script run by hand because it has to
-- happen on production too, exactly once, in step with the schema change that
-- introduced the vocabulary. A backfill that lives in someone's shell history
-- is a backfill that gets forgotten on the machine that matters.
--
-- Every statement is idempotent: re-running it changes nothing, because each
-- one is scoped to rows that still hold the old shape.

UPDATE leads SET status = 'NEW'                 WHERE status = 'new';
--> statement-breakpoint
UPDATE leads SET status = 'CONTACTED'           WHERE status = 'contacted';
--> statement-breakpoint
-- "qualified" meant the counsellor had established real intent, which is
-- INTERESTED in the new vocabulary rather than a stage of its own.
UPDATE leads SET status = 'INTERESTED'          WHERE status = 'qualified';
--> statement-breakpoint
UPDATE leads SET status = 'ADMISSION_CONFIRMED' WHERE status = 'converted';
--> statement-breakpoint
UPDATE leads SET status = 'LOST'                WHERE status IN ('lost', 'closed');
--> statement-breakpoint

-- Anything else is left exactly as it is. An unrecognised status stays
-- visible in the admin (leadStatusLabel falls back to the raw value), which
-- is a better outcome than guessing one and hiding the fact.

-- Enquiry numbers, numbered by arrival so the sequence reflects when the
-- enquiry actually came in rather than the order rows happen to sit in.
--
-- The position is counted against ALL leads, not only the unnumbered ones.
-- Counting `WHERE enquiry_number IS NULL` looks right and is not: rows stop
-- being NULL as the UPDATE walks them, so the subquery returns 1 for every
-- row and every lead ends up as ENQ-YYYY-0001. Counting against a predicate
-- the statement is not changing keeps each row's position stable.
UPDATE leads
SET enquiry_number = 'ENQ-' ||
  strftime('%Y', datetime(created_at, 'unixepoch')) || '-' ||
  substr('0000' || (
    SELECT COUNT(*) FROM leads AS earlier
    WHERE earlier.created_at < leads.created_at
       OR (earlier.created_at = leads.created_at AND earlier.id <= leads.id)
  ), -4)
WHERE enquiry_number IS NULL;
