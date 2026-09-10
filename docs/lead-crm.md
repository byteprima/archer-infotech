# Lead & Enquiry Management — implementation notes

Phase 1 of the Training Institute Lead & Enquiry Management specification.
This file records the decisions taken while building it, so the reasoning
survives the commit messages.

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

No new dependency was added for Phase 1.

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

## Tests

`npm test` runs Node's own test runner through `tsx` — no test framework was
added, because the repository had none and Node 24 ships one.

The suite covers the pure decision logic, which is where a mistake here is
silent: the role matrix, the status vocabulary, and course matching. The
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
