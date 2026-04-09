# Archer Infotech Website

Marketing website and lightweight admin panel for Archer Infotech, built with Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, and Drizzle ORM.

## Stack

- Next.js 16.2.1 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (`base-nova`)
- Drizzle ORM + PostgreSQL

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint

npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables from `.env.example` into a local `.env`.

3. Start the dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [.env.example](./.env.example) for the current template.

Important values:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_POSTHOG_TOKEN`
- `NEXT_PUBLIC_POSTHOG_HOST`

## PostHog Setup

1. Create a PostHog account and a project to get your project token.
2. Copy `.env.example` to `.env.local` or `.env`.
3. Set `NEXT_PUBLIC_POSTHOG_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.
4. Install dependencies with `npm install`.
5. Start the app and verify events in PostHog's live events view.

The app captures page-level and lead-generation events such as contact form starts,
form submissions, WhatsApp clicks, contact method clicks, social link clicks, and
course enquiry clicks.

## Project Notes

- App routes live in `src/app`
- Static marketing content lives mostly in `src/data`
- Dynamic operational content uses PostgreSQL via Drizzle
- Lead submissions use a server action in `src/lib/actions/leads.ts`
- Admin auth is intentionally simple and cookie-based

## Working In This Repo

- Read [AGENTS.md](./AGENTS.md) for agent-specific instructions
- Read [docs/engineering.md](./docs/engineering.md) for project conventions
- For framework-level changes, check the relevant Next.js 16 guide in `node_modules/next/dist/docs/`

## Deployment

Deployment and infrastructure notes live in [DEPLOYMENT.md](./DEPLOYMENT.md).
