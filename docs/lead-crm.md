# Lead & Enquiry Management — implementation notes

Phases 1 to 5 of the Training Institute Lead & Enquiry Management
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

### Reference numbers count up in their own table, not from MAX(existing)

`ENQ-2026-0042` and `ADM-2026-0007` are allocated from `reference_counters`
(migration 0007), not from the highest number currently in the table.

The first version of both did `MAX(existing) + 1`, and both shipped with unit
tests that passed. The tests only covered a gap in the MIDDLE of the sequence
(0001, 0003 → 0004). Delete the HIGHEST row and the max drops back, so the next
lead is handed a reference the office has already quoted to somebody — and the
admin lead list has a delete button. Caught by exercising the allocator against
a copy of the real database rather than by the unit test.

The counter is seeded from the highest number visible the first time a scope
and year are used, so the rows migration 0002 backfilled are respected, and it
takes `max(counter, observed)` on every allocation so an import or a restore
cannot make it hand out a duplicate either. Allocation happens inside the
insert's transaction: read-then-write is not atomic, and two enquiries arriving
together is exactly when that matters.

### Nothing was ever assigning an enquiry number

Migration 0002 backfilled every lead that existed and no code path assigned one
afterwards, so every enquiry that arrived after it had a NULL reference and
displayed as "#42" in the follow-up queue, the reports table and the CSV
export. The 25 rows in the dev database were all numbered, which is precisely
why it looked correct. `insertLeadWithEnquiryNumber` is now the single way a
lead is created, shared by the public form, the chatbot and the admin's own Add
Lead.

### What the website asks a visitor, and what it does not

A student enquiring about a course gives **name, mobile, email, mode and
fresher/experienced** — and the course, which comes from the page they are on.
That is the whole public form and it is not to be extended.

Qualification, college, passing year, current status, alternate phone,
preferred timing and expected joining come out of the counselling call. They
live in `counsellorFields` in `lib/actions/admin-leads.ts` and appear only in
the Education & Preferences card on the admin lead form. Do not add them to a
public form: every extra field on an enquiry form costs enquiries, and the
counsellor is going to phone the person anyway.

`utm_content` and `utm_term` are now captured alongside the three UTMs that
already were, via `lib/leads/utm.ts`. They are read from the URL the marketing
link carried, so they cost the visitor nothing.

### `leads.campaign` is deliberately unwritten

It duplicates `utm_campaign`, which the popup already fills with the campaign
name (and `source` carries `popup:<campaign>`). Left in place rather than
dropped — an unused nullable column is harmless, and a migration to remove it
is risk without benefit. Recorded here so the next sweep does not treat it as
a gap.

### The writer/reader sweep

`demo_sessions` had readers and no writer for a whole phase, and
`enquiryNumber` had five readers and no writer. Both looked fine because the
dev database had been seeded by hand. The check that finds this class of bug:

- every table in `schema.ts` — is there a `.insert(<table>)` anywhere in `src`?
  (better-auth's `user`, `session`, `account` and `verification` are written by
  the library, not by us, and will always show as gaps here.)
- every column — is the name used as an object key in a write anywhere?

Run both before calling a phase complete. As of this commit the only column
without a writer is `leads.campaign`, above, and every CRM table has an insert
path.

### Phone normalisation and duplicate detection (§26, §11)

Neither was in any phase's bullet list, but they underpin the Phase 4 reports:
before this, `9876543210`, `+91 98765 43210` and `098765 43210` were three
different leads, so every count on the reports screen was inflated and two
counsellors could call the same person.

**Two columns, not one.** `phone` keeps exactly what was typed — that is what
the counsellor recognises on screen — and `phone_normalised` holds E.164 for
matching. Rewriting `phone` in place would destroy the original for no gain;
one of the two columns is allowed to be lossy.

**Not libphonenumber.** ~500KB to know every country's numbering plan. This
needs to be right about India, sane elsewhere, and never destructive: anything
it cannot classify is kept as digits rather than rejected, because the site
takes enquiries from abroad and "a valid international number treated as
invalid" is the failure the specification names. `confident` records whether
the country was identified or assumed.

**A NULL key never matches another NULL key.** Otherwise every lead with a
blank or unusable phone becomes a duplicate of every other one.

**The backfill is SQL, and it was verified against the TypeScript.** Migration
0009 reimplements the rules in SQL, which is a drift risk — the alternative was
a Node script run by hand on the server, which is a backfill that lives in
somebody's shell history. The risk was closed empirically: both implementations
were run over every row including eleven awkward shapes (`+91 98765 43210`,
`098765 43210`, `00919876543212`, `+971501234567`, bare `971501234567`,
`N/A`, `12345`, a ten-digit number starting 1) and agreed on all 36.

**Duplicates are derived, never stored as a flag.** A stored flag goes stale
the moment the other lead is deleted or its number corrected, and a stale
duplicate warning teaches people to ignore the warning. `findLeadsByPhone`
runs on every lead detail load; `/admin/leads/duplicates` groups on read.

**A website enquiry is never blocked or merged.** The specification is explicit
that valid repeat enquiries must not be lost, and somebody who asked in March
and asks again in September is a warmer lead than a stranger. The public form
creates the lead and the admin is shown the earlier ones. The Add Lead form
warns before creating, with Open Existing and Create Anyway.

**Nothing merges automatically.** Which course interest, counsellor and
follow-up history survives a merge is a judgement made by reading both; closing
one as DUPLICATE already records the reason and drops it out of the queues.

### One dashboard tile, not six

Everything the four phases built lives behind a single **Lead & Enquiry CRM**
tile, which opens `/admin/crm`.

It was six tiles — Leads, Follow-ups, Demos, Batches, Admissions, Reports —
sitting among the blog, placements, popup and SEO cards, so the pipeline read
as six unrelated tools rather than one system. Somebody arriving at the
dashboard could not tell which of sixteen tiles belonged to their job.

The hub groups by **where a person is in the pipeline**, not by which phase
shipped the feature: Capture (leads, possible duplicates), Work the pipeline
(follow-ups, demos, batches), Outcome (admissions, reports). The phases are our
history; they are not the counsellor's mental model.

Each tile carries the number worth knowing before opening it, and the two that
mean "something needs doing today" — overdue follow-ups and unreviewed
duplicates — also show a red count. `getCrmOverview()` fetches all of them in
one pass rather than each tile querying for itself; the hub is the first thing
opened in the morning and should not cost eight round trips to render a menu.

Tiles are filtered with `canAccessAdminPath`, the same rule guarding the pages,
so a counsellor is not offered Reports or Batches. `/admin/crm` itself is in
COUNSELOR_ALLOWED_PREFIXES; the filtering happens inside.

### Phase 5: notifications are of two kinds, and only one is stored

**Event** notifications — "a lead was assigned to you", "a demo was booked for
your lead" — happened once, to a named person, and must survive until seen.
They are rows in `notifications`, marked read.

**Due** reminders — overdue, due today — are NOT rows. They are derived live
from `leads.follow_up_date` on every read. Storing them would need a scheduler
this project does not have, and a stored "due today" is wrong by tomorrow
morning: it would need generating daily and expiring daily, and the two jobs
would disagree. Deriving them cannot go stale.

`notify()` never throws. A notification that fails must not roll back the
assignment it was announcing.

### Both automations ship OFF

`auto_assign_enabled` and `auto_follow_up_enabled` default to false in
`lib/crm/settings.ts`. Turning auto-assignment on quietly would start routing
real enquiries to people who are not expecting them, and put follow-up dates on
leads nobody agreed to own. The office turns them on at `/admin/crm/settings`,
where the screen also names who the next enquiry would actually go to.

Automation applies to **website enquiries only**. A lead typed in by hand is
never auto-assigned — whoever typed it is standing there and can decide.

It runs AFTER the insert and swallows its own failures: the enquiry is the
thing that must not be lost. A lead that could not be routed is still a lead,
unassigned and visible.

### Round-robin by workload, not by a stored pointer

`nextAssignee()` picks the counsellor with the fewest OPEN leads, ties broken
by who was assigned least recently. A stored "next counsellor" pointer drifts
the moment somebody is added, removed or goes on leave, and then quietly sends
everything to one person. Counsellors are preferred; if none exist it falls
back to any staff, and if there is nobody it returns null and the lead stays
unassigned — which is not an error.

### Settings are a table, not environment variables

These are decisions the office makes and changes. An env var needs a deploy;
this needs a click. `/admin/crm/settings` is denied to counsellors by an
explicit carve-out (`COUNSELOR_DENIED_PATHS`) because the allow-list matches by
prefix and `/admin/crm` would otherwise cover it — a counsellor must not be
able to point the enquiry queue at themselves.

### Messaging: composed, recorded, never sent

There is no WhatsApp or email provider and the specification says not to add
one. `lib/crm/message-templates.ts` composes the six messages the spec names
(course details, syllabus, fees, batch info, demo reminder, follow-up reminder)
from the lead's own data; the counsellor copies the text or opens `wa.me` with
it prefilled. `messages` records what was prepared.

Status stops at **"copied"**. It cannot honestly say "sent" — nothing here
knows whether the text was actually pasted, and claiming a delivery we did not
perform would make every later report about messaging a lie.

A template returns **null rather than composing** when the context lacks what
it needs. A fees message with no fee, or "your batch starts on " with no date,
is worse than no message. That is why `FEES` is currently never offered:
`courses.ts` carries no price, so nothing can fill it honestly.

When a provider is added it delivers these rows; the templates, the record and
the UI do not change. That is the provider-independent abstraction the spec
asks for.

### Campaign attribution answers a different question from source-wise

Source-wise says where enquiries came from. Campaign attribution says which
spend produced a *student*, grouped on the full source/medium/campaign triple —
google/cpc/brand and google/cpc/java are different decisions. Sorted by
admissions first, so one admission outranks fifty clicks and none.

Leads with no UTMs are counted under "Direct / unattributed" rather than
dropped, so the totals still reconcile with the source-wise report.

Fees shown are what was **agreed**, not collected. Nothing in this system
tracks receipts, and the column is labelled accordingly.

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
