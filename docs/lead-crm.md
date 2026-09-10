# Lead & Enquiry Management — implementation notes

Phases 1 to 4 of the Training Institute Lead & Enquiry Management
specification. This file records the decisions taken while building them, so
the reasoning survives the commit messages.

## Technology

No new framework. The spec allows free choice; the existing stack already
covers everything Phase 1 needs, and introducing a second way to do anything
here would cost more than it bought:

| Concern | Existing choice, reused |
|---|---|
| Data | SQLite + Drizzle ORM (`src/db/schema.ts`) |
| Mutations | Next.js server actions (`src/lib/actions/*`) |
| Auth + roles | better-auth, `user.role` on the existing `user` table |
| Audit trail | `audit_logs` + `logAdminAction()` |
| UI | Existing admin components, shadcn/ui primitives, Tailwind |
| Validation | Zod schemas alongside each action |

No new dependency has been added in any phase so far.

## Decisions

### Migrations, not `db:push`

The project had no `drizzle/` folder: schema changes were applied with
`drizzle-kit push`, which diffs and alters in place. That is fine while a
database is disposable, and wrong once it holds real enquiries — a push can
drop a column without ever showing you the SQL.

Phase 1 introduces a migration baseline and applies changes with
`db:generate` → review the SQL → `db:migrate`. Every column added here is
nullable or carries a default, so existing lead rows remain valid without a
backfill step.

### Courses stay static

The specification implies database-managed courses. They stay in
`src/data/courses.ts`, and leads/batches reference a course **slug**.

`courses.ts` drives 61 public pages, the sitemap, and every piece of course
schema on the site. Moving it into the database would be a large, risky
change to the public site in service of an admin feature that does not need
it — the CRM only ever needs a stable identifier for "which course", and the
slug already is one.

### Backfills ship as migrations

The lifecycle change needs existing rows mapped onto the new vocabulary. That
mapping is migration `0002`, not a script, because it has to happen on
production exactly once and in step with the schema change. A backfill that
lives in somebody's shell history is one that gets forgotten on the machine
that matters.

Every statement is scoped to rows that still hold the old shape, so
re-running it changes nothing. Verified by applying it twice to a copy of the
pre-migration database and diffing the result.

### Lead status is a controlled string, not a DB enum

SQLite has no native enum, and Drizzle's `text({ enum: [...] })` only
constrains the TypeScript type. The 13 statuses live in one constant with
their display labels, validated in Zod at every write. Existing values
(`new`, `contacted`, `qualified`) are mapped forward in the migration.

### `assigned_to` is kept, `assigned_to_user_id` is added

The old free-text `assigned_to` column is not dropped. It holds names typed
by hand, some of which may not correspond to a user account, and deleting it
would lose that. New assignment writes the user id; the text column is left
as historical record.

### Phase 3: fees are integers, in paise

`course_fee`, `discount` and `final_fee` are stored as an INTEGER number of
paise. ₹45,000 less a 12% discount is ₹39,600 exactly in paise and
39599.999999999996 in a float — the kind of error that surfaces months later
as a receipt disagreeing with itself by a rupee.

`src/lib/admissions/money.ts` is the only place rupees and paise meet. The
admin types rupees; nothing else in the codebase sees them.

### `final_fee` is stored, but always derived

Storing a value you can compute invites the three columns to disagree. It is
stored anyway, because an admission is a financial record and the figure
agreed on the day has to survive somebody later correcting the course fee.
The drift is prevented by never accepting `finalFee` from the client —
`computeFees()` recalculates it on every write.

### Two statuses, not one

`status` (ENROLLED / ON_HOLD / CANCELLED) answers "is this person joining".
`payment_status` (PENDING / PARTIAL / PAID / REFUNDED) answers "how much of
the fee has arrived". They move at different times — enrolled and owing the
whole fee is normal, so is fully paid and then cancelling. One combined
status would force one of those to be recorded as a lie.

### Cancelling an admission returns the lead to FOLLOW_UP

Not to LOST. A cancelled admission is often a deferral to the next batch, and
LOST is a closed status: it would drop the lead out of the follow-up queues
and hide somebody still worth calling. FOLLOW_UP puts them back in the queue.
Leaving the lead on ADMISSION_CONFIRMED was not an option — every count on
the leads screen would be wrong.

### Conversion is one transaction

The reference number is allocated and the lead is flipped to
ADMISSION_CONFIRMED inside the same transaction as the insert, so a failure
cannot leave a lead marked as converted with no admission behind it. Verified
against a copy of the dev database: a rejected duplicate left the lead on its
original status.

One admission per lead is enforced by a unique index on `lead_id`, not by a
check in the action — two counsellors clicking Convert at the same moment is
exactly what an application-level check misses.

### Admission numbers count from the highest issued, not from the row count

`ADM-2026-0007`. Counting rows and counting the highest number in use are the
same until an admission is deleted, at which point counting rows starts
reissuing a number that is already printed on somebody's receipt. Kept pure in
`src/lib/admissions/numbering.ts` and tested — the equivalent enquiry-number
rule shipped with a bug that gave every row ENQ-2026-0001.

### Batch seats are not decremented on admission

`batches.seats_available` is maintained by hand in the batch editor and stays
that way. Wiring it to admissions means also handling cancellation, batch
reassignment and edits, each of which can double-count; that is a change to
how batches work, and it belongs with batch management rather than smuggled
into the conversion action. Recorded here because the two numbers can now
disagree, and somebody will notice.

### Phase 4: no charting library

The spec allows adding one. None was added. Every chart these reports need is
a bar or a line, the project already draws its SEO sparklines as inline SVG
(`admin/seo/_components/cwv-tab.tsx`), and Recharts is ~100KB that would have
to run as a client component. The chart primitives in
`components/admin/reports/charts.tsx` are server-rendered and ship no
JavaScript.

### Conversion is counted against the ENQUIRY, not the admission date

Course-wise and source-wise rates divide admissions by enquiries. If the
numerator counted admissions *dated* in the range, it would include people who
enquired last year, and the rate could exceed 100% while describing nothing.
So an admission is counted in the range its originating ENQUIRY falls in. The
admissions list and its fee totals use the admission date instead, because
that report is about money received, not about conversion. Each function in
`lib/actions/reports.ts` says which it uses.

A cancelled admission does not count as a conversion anywhere.

### Closure reasons were built here, not in Phase 3

The Lost Lead report is part of Phase 4 and has nothing to group by without
them, so §16 (Lead Closing) shipped with this phase. `setLeadStatus` refuses
the five closing statuses without a reason — enforced in the action, not only
in the form, because a report built on a column that is *sometimes* filled is
not a report. Moving a lead back to an active status clears the reason, so a
reopened lead cannot still be counted as lost.

Migration `0006` backfills `closed_at` for leads closed before the column
existed, using `updated_at` as an approximation. Without it the report can
only ever describe closures from today onward, and reads as "we have never
lost anybody". Those rows keep a NULL reason and appear as "Not recorded" —
guessing a reason from the status would put a fabricated number in a report
somebody makes decisions from.

### Percentages are not forced to sum to 100

Each row is rounded independently, so a distribution can total 99.9 or 100.1.
Forcing the total means silently altering one row, and a reader checking that
row against its count would find the altered one wrong.

### CSV: formula injection and zero

`lib/reports/csv.ts` prefixes any cell starting `=`, `+`, `-`, `@`, tab or CR
with an apostrophe. Names and messages in these exports come from public web
forms, and a lead called `=HYPERLINK("http://evil","click")` becomes a live
link when the office opens the file in Excel. Verified end to end by seeding
that exact name and downloading the enquiry report.

The old inline `escapeCsv` also returned an empty cell for any falsy value, so
a count of 0 exported as blank — a different claim from zero in a report. The
leads export now uses the same module.

### The dashboard menu is filtered by role

It previously showed all fifteen cards to everyone, so a counsellor was
offered eleven destinations that bounce to /admin/unauthorized. It now filters
with `canAccessAdminPath`, the same rule that guards the pages.
`requireAdminPage` still runs on every destination — this only stops offering
the trip.

### Phase 2 gap: demo sessions had no writer

Phase 2 shipped everything that hangs off a demo — registering a lead,
recording attendance, moving the lead's status — and nothing that creates one.
`demo_sessions` had readers and no writer, so the dropdown on every lead page
was permanently empty and the feature was unreachable. It looked functional in
testing only because the one row in the dev database had been inserted by hand
with SQL.

`/admin/demos` closes it: list, create, edit, cancel. The course is a select
over the catalogue rather than a typed slug and name pair, so the two cannot
disagree — unlike the batch form, which asks for both.

`capacity` was the same class of bug on a smaller scale: stored from the start,
never checked, so it was decoration. `registerLeadForDemo` now refuses a full
session, and refuses one that is not `scheduled` — the id comes from the
client and a session can be cancelled while the page is open. `updateDemoSession`
refuses a capacity below the number already registered rather than leaving a
session silently over its own limit.

### Demos are cancelled, never deleted

Registrations reference the session, and leads have been moved to
DEMO_SCHEDULED on the strength of it. Deleting cascades the registrations away
and leaves a lead whose status points at a demo that no longer exists.

## Tests

`npm test` runs Node's own test runner through `tsx` — no test framework was
added, because the repository had none and Node 24 ships one.

The suite covers the pure decision logic, which is where a mistake here is
silent: the role matrix, the status vocabulary, course matching, fee
arithmetic, admission numbering, and — from Phase 4 — conversion arithmetic,
date-range boundaries and CSV escaping. The
course-matching tests are regressions for two bugs that were live in the
database, not hypotheticals — a value of `"C"` attaching itself to 41 course
pages, and `"Java full-stack development "` reaching none.

Not covered: anything needing a database. Testing lead creation, assignment
and follow-up writes needs a throwaway-SQLite harness, which is a decision
about test infrastructure rather than a gap in this feature, and is left for
whoever picks that up.

## Known conflicts, deliberately not resolved here

**Learning-mode vocabulary.** The public forms ship
`Online / Offline / Hybrid / No preference` (`leads.mode_preference`), while
the specification says `Classroom / Online / Hybrid`. The admin displays
"Offline (classroom)" so the two read as one thing. Changing the stored
values would mean editing five live public forms and backfilling; it is a
content decision, not a technical one, and is left for the site owner.

**Counsellor restriction is a UI boundary, not yet a security one.** Route
access is enforced by `requireAdminPage(pathname)` on all 33 admin pages, so
a counsellor is redirected away from content, SEO and user management. It is
enforced server-side, but it depends on the caller having a `user` row — see
the legacy login below.

**The legacy shared login.** `ADMIN_USERNAME` / `ADMIN_PASSWORD` in the
environment still grant admin access without a `user` row, so role-based
permissions have a bypass. Closing it is a prerequisite for trusting COUNSELOR
restrictions.

It is hardened but not yet removed. Hardened (`src/lib/legacy-admin-auth.ts`):
the built-in `admin` / `archer2024` fallback is gone and missing configuration
now fails closed; the session cookie is an HMAC over the issue time instead of
carrying `ADMIN_SESSION_SECRET` in recoverable plaintext; sessions expire
server-side; credential comparison is constant-time. `ADMIN_LEGACY_LOGIN=off`
disables it without unsetting the variables.

Not removed, because the Flutter admin app authenticates against
`/api/mobile/v1/auth/login`, which calls `verifyCredentials` and mints a JWT
with `role: "admin"`. The website's own `/admin/login` no longer touches it.
So the order to close it is: give the mobile app a real-account login, then set
`ADMIN_LEGACY_LOGIN=off`, then delete `legacy-admin-auth.ts`, the two routes
that call it, and the legacy branches in `isAuthenticated` / `isAdmin` /
`getCurrentRole`.
