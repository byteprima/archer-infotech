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

## Known conflicts, deliberately not resolved here

**Learning-mode vocabulary.** The public forms ship
`Online / Offline / Hybrid / No preference` (`leads.mode_preference`), while
the specification says `Classroom / Online / Hybrid`. The admin displays
"Offline (classroom)" so the two read as one thing. Changing the stored
values would mean editing five live public forms and backfilling; it is a
content decision, not a technical one, and is left for the site owner.

**The legacy shared login.** `ADMIN_USERNAME` / `ADMIN_PASSWORD` in the
environment still grant admin access without a `user` row. Role-based
permissions therefore have a bypass. It is treated as ADMIN for now and
flagged rather than removed, because removing it could lock the owner out of
the panel. Closing it is a prerequisite for trusting COUNSELOR restrictions.
