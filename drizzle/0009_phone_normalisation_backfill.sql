-- Backfill `phone_normalised` for leads that predate the column.
--
-- The rules here mirror src/lib/leads/phone.ts. Two implementations of one
-- rule is a drift risk, and the alternative — a Node script run by hand on the
-- server — is a backfill that lives in somebody's shell history and gets
-- forgotten on the machine that matters. The migration is verified against the
-- TypeScript by normalising every existing row both ways and diffing; see
-- docs/lead-crm.md.
--
-- Anything these rules cannot classify is left NULL rather than guessed at. A
-- NULL never matches another NULL, so an unclassifiable number simply takes no
-- part in duplicate detection until the lead is next saved, at which point the
-- application fills it in with the full rules.
--
-- Scoped to rows that are still NULL, so re-running changes nothing.
UPDATE leads
SET phone_normalised = (
  WITH cleaned AS (
    SELECT
      -- Strip everything the application strips: spaces, dashes, dots,
      -- parens, and a leading plus (which is re-added below).
      replace(replace(replace(replace(replace(replace(
        phone, ' ', ''), '-', ''), '.', ''), '(', ''), ')', ''), '+', '') AS d,
      -- Remember whether a country code was given explicitly.
      CASE WHEN phone LIKE '+%' THEN 1 ELSE 0 END AS had_plus
  )
  SELECT CASE
    -- Explicit country code: trust it. +91 followed by a valid mobile
    -- collapses to the Indian form, everything else is kept as given.
    WHEN had_plus = 1 AND length(d) = 12 AND substr(d, 1, 2) = '91'
         AND substr(d, 3, 1) BETWEEN '6' AND '9'
      THEN '+91' || substr(d, 3)
    WHEN had_plus = 1 AND length(d) BETWEEN 7 AND 15
      THEN '+' || d
    -- 00 as a plus.
    WHEN substr(d, 1, 2) = '00' AND length(d) BETWEEN 9 AND 17
      THEN '+' || substr(d, 3)
    -- Bare ten-digit Indian mobile.
    WHEN length(d) = 10 AND substr(d, 1, 1) BETWEEN '6' AND '9'
      THEN '+91' || d
    -- Trunk prefix.
    WHEN length(d) = 11 AND substr(d, 1, 1) = '0'
         AND substr(d, 2, 1) BETWEEN '6' AND '9'
      THEN '+91' || substr(d, 2)
    -- Country code without a plus.
    WHEN length(d) = 12 AND substr(d, 1, 2) = '91'
         AND substr(d, 3, 1) BETWEEN '6' AND '9'
      THEN '+91' || substr(d, 3)
    -- Plausible but unidentified: consistent, and the application agrees.
    WHEN length(d) BETWEEN 7 AND 15
      THEN '+' || d
    ELSE NULL
  END
  FROM cleaned
)
WHERE phone_normalised IS NULL;
