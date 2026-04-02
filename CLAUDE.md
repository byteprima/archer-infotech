# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev           # Start dev server at localhost:3000

# Build & Production
npm run build         # Build for production
npm run start         # Run production build
npm run lint          # Run ESLint

# Database (Drizzle ORM)
npm run db:generate   # Generate migrations from schema changes
npm run db:migrate    # Apply migrations to database
npm run db:push       # Push schema directly (dev only)
npm run db:studio     # Open Drizzle Studio GUI
```

## Deployment

Deployed via Coolify to VPS (173.212.212.178). After pushing to `main`:

```bash
# Deploy via Coolify MCP
mcp__coolify__deploy with tag_or_uuid: i5knr4obzv3hzjhrkl58rn12
```

See `DEPLOYMENT.md` for full infrastructure details, UUIDs, and troubleshooting.

## Architecture

### Data Flow

- **Static course data**: `src/data/courses.ts` - All course definitions, categories, and helper functions. Not stored in DB.
- **Dynamic data**: PostgreSQL via Drizzle ORM - leads, batches, placements, testimonials, blog posts.
- **Server actions**: Form submissions use Next.js server actions (not API routes for mutations).

### Database Schema (`src/db/schema.ts`)

Five tables: `batches`, `leads`, `placements`, `blogPosts`, `testimonials`. Each has TypeScript types exported (`Lead`, `NewLead`, etc.).

### Admin Panel (`/admin`)

- Simple cookie-based auth via `src/lib/auth.ts` (env: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`)
- CRUD pages for managing dynamic content: leads, batches, placements, testimonials, blog
- API routes only for login/logout at `src/app/api/admin/`

### Course Structure

Courses are organized by category slugs (e.g., `programming`, `full-stack-development`, `cloud-devops`). Routes:
- `/courses` - All categories
- `/courses/[category]` - Courses in category
- `/courses/[category]/[slug]` - Individual course page

## Framework Reference

**IMPORTANT**: This uses Next.js 16.2.1 with React 19. APIs and conventions may differ from older versions. Consult `node_modules/next/dist/docs/` before writing new code. Heed deprecation notices.
