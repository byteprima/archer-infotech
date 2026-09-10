-- Backfill `closed_at` for leads that were already closed before closure
-- reasons existed.
--
-- Without this the Lost Lead report can only ever describe leads closed from
-- today onward: every historical closure has a NULL `closed_at` and is
-- filtered out of every date range, so the report reads as "we have never lost
-- anybody" until enough new closures accumulate.
--
-- `updated_at` is an APPROXIMATION of the closing date. It moves on any edit,
-- so a lead closed in March and corrected in July backfills as July. It is the
-- only signal this database holds, and an approximate date on rows that are
-- visibly marked "Not recorded" is more honest than a report that silently
-- omits its own history.
--
-- These rows keep `closure_reason` NULL on purpose. The report groups them
-- under "Not recorded" rather than guessing a reason from the status — LOST
-- and NOT_INTERESTED are outcomes, not reasons, and inventing "Not interested"
-- for every one of them would put a fabricated number in a report someone
-- makes decisions from.
--
-- Scoped to rows that still have the old shape, so re-running changes nothing.
UPDATE leads
SET closed_at = updated_at
WHERE closed_at IS NULL
  AND status IN ('NOT_INTERESTED', 'LOST', 'NO_RESPONSE', 'INVALID', 'DUPLICATE');
