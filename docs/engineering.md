# Engineering Guide

This document captures the conventions already used in this repo so Codex, Clockwork, and humans can make changes without fighting each other.

## Stack

- Next.js 16.2.1 with the App Router in `src/app`
- React 19
- TypeScript with `strict: true`
- Tailwind CSS 4 via `@import "tailwindcss"` in `src/app/globals.css`
- shadcn/ui components with the `base-nova` style
- Drizzle ORM with PostgreSQL for dynamic content
- `react-hook-form` + `zod` for client form validation
- `sonner` for toast feedback

## Working Rules

- Treat this as a modern Next.js 16 app, not an older Pages Router codebase.
- Check the relevant guide in `node_modules/next/dist/docs/` before introducing framework-level changes.
- Prefer server components by default. Add `"use client"` only when a component needs browser state, effects, event handlers, or client-only libraries.
- Keep route files in `src/app` thin. Compose pages from reusable components in `src/components`.
- Use the `@/` import alias instead of long relative paths.
- Prefer TypeScript types and existing data helpers over ad hoc object shapes.
- Keep changes aligned with the current brand and content structure unless the task explicitly calls for a redesign.

## App Structure

### Routing

- Main app routes live in `src/app`.
- The site uses the App Router and route conventions like `layout.tsx`, `page.tsx`, `sitemap.ts`, and `robots.ts`.
- Admin auth endpoints live in `src/app/api/admin`.
- There is no `pages/` directory. New routes should follow App Router conventions.

### Layout

- `src/app/layout.tsx` owns global metadata, fonts, header, footer, WhatsApp CTA, and toaster mounting.
- Site-wide SEO settings come from `src/data/site-config.ts`.
- Shared chrome belongs in `src/components/layout`.

### Content Model

- Static marketing content lives in `src/data`.
- `src/data/courses.ts` is the source of truth for course categories, featured courses, course details, FAQs, and helpers.
- `src/data/site-config.ts` is the source of truth for contact info, brand copy, navigation, stats, and SEO defaults.
- Dynamic operational content belongs in PostgreSQL via Drizzle.

## Static vs Dynamic Data

Use the existing split when adding or editing features:

- Keep it in `src/data` when the content is mostly editorial and changes rarely.
  Examples: course catalog, category definitions, company info, trainer/team content, site navigation, SEO defaults.
- Use Drizzle/Postgres when the content is operational, admin-managed, or user-submitted.
  Examples: leads, placements, testimonials, blog posts, batches.

If a feature could go either way, prefer the current simpler model unless the admin panel clearly needs to manage it.

## Database Conventions

- Schema lives in `src/db/schema.ts`.
- Database setup lives in `src/db/index.ts`.
- Use `npm run db:generate`, `npm run db:migrate`, and `npm run db:push` for schema workflows.
- Existing dynamic tables are:
  - `leads`
  - `batches`
  - `placements`
  - `blogPosts`
  - `testimonials`
- Export and reuse Drizzle-inferred types from the schema file instead of duplicating DTOs.

### Database Safety

- `src/db/index.ts` throws if `DATABASE_URL` is missing.
- Some server actions intentionally use dynamic imports to avoid build-time failures when the database is not configured.
- Preserve that behavior unless the task explicitly moves the project to a hard database requirement.

## Forms and Mutations

- This repo uses Next.js server actions for form submissions where possible.
- `src/lib/actions/leads.ts` is the reference pattern:
  - validate with `zod`
  - return a simple `{ success, message, errors? }` result
  - dynamically import the DB layer when env-dependent
- Client forms typically use:
  - `react-hook-form`
  - `zodResolver`
  - shadcn form primitives
  - `sonner` toasts for success/error states

When adding a new form:

- Keep validation close to the action or form.
- Reuse the same response shape when practical.
- Show clear success and error feedback.
- Avoid inventing a second mutation style unless there is a good reason.

## Admin Area

- Admin UI lives under `src/app/admin`.
- Current auth is simple cookie-based auth in `src/lib/auth.ts`.
- Login and logout are handled by `src/app/api/admin/login/route.ts` and `src/app/api/admin/logout/route.ts`.
- This is intentionally lightweight and MVP-style, not a full auth framework.

When touching admin features:

- Keep admin pages non-indexable.
- Preserve the simple login flow unless the task is specifically about upgrading auth.
- Be careful around cookie scope and redirects in `/admin`.

## Styling and UI

- Global theme tokens live in `src/app/globals.css`.
- The current visual direction is a professional deep blue, gold, and teal palette.
- Tailwind utility classes are used directly in components.
- Shared UI primitives live in `src/components/ui`.
- Marketing sections live in `src/components/home`, `src/components/common`, and `src/components/layout`.

### Styling Guidelines

- Prefer existing CSS variables and semantic color tokens such as `bg-primary`, `text-secondary`, and `bg-muted`.
- Reuse existing spacing and section patterns before inventing new layout systems.
- Preserve the current typography setup from `next/font`.
- Keep animations purposeful and consistent with the current style already defined in `globals.css`.
- Use `cn` from `src/lib/utils.ts` for conditional class composition.

## SEO and Metadata

- Central SEO defaults come from `src/data/site-config.ts`.
- Route-level metadata should use Next.js metadata APIs rather than ad hoc `<head>` markup, except where structured data requires it.
- `src/components/seo/json-ld.tsx` holds structured data helpers.
- `src/app/sitemap.ts` and `src/app/robots.ts` should stay aligned with route changes.

When adding public pages:

- Add route metadata.
- Update sitemap coverage if the page should be indexed.
- Consider whether the page belongs in the header, footer, or both.

## Assets

- Public assets live in `public/`.
- Course and brand imagery live under `public/images`.
- Prefer keeping asset paths stable because marketing components and SEO metadata reference them directly.

## Tooling

- Run `npm run lint` for linting.
- In Next.js 16, `next lint` is removed, so use the ESLint CLI via the existing npm script.
- There are currently no dedicated test suites in the repo, so lint and focused manual checks are the main verification path.

## Known Gaps and Future Cleanup

These are useful to know before making bigger changes:

- `README.md` started as the default `create-next-app` template and should reflect the real project.
- Auth is intentionally simple and should be treated as an MVP area.
- Blog CRUD appears partially planned but not fully implemented yet.
- Some deployment and ops details live in repo docs instead of a private runbook.

## Good First Moves For Codex

When making future changes in this repo, a safe default workflow is:

1. Check the relevant Next.js 16 doc in `node_modules/next/dist/docs/` if the change touches routing, metadata, config, or framework behavior.
2. Decide whether the change belongs in static data or the database-backed admin layer.
3. Reuse existing UI primitives and theme tokens.
4. Verify with `npm run lint` and a targeted read-through of affected routes/components.
