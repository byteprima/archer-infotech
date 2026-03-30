# Archer Infotech Website

## Quick Reference

- **Live Site**: https://archerinfotech.in
- **Admin Panel**: https://archerinfotech.in/admin/login (admin / Archer@123456)
- **GitHub**: https://github.com/byteprima/archer-infotech
- **Coolify Dashboard**: https://coolify.byteprima.com

## Deployment

This site is deployed on a VPS via Coolify. See `DEPLOYMENT.md` for full details including:
- Server access credentials
- Coolify resource UUIDs
- Environment variables
- Troubleshooting guides
- Common commands

### Quick Deploy

```bash
# Push changes to GitHub, then deploy via Coolify MCP:
# mcp__coolify__deploy with tag_or_uuid: i5knr4obzv3hzjhrkl58rn12
```

### VPS Details

- **IP**: 173.212.212.178
- **Credentials**: See `/Users/vinodpatil/openclaw-vm/.vm-credentials`

## Tech Stack

- **Framework**: Next.js 16.2.1 + React 19
- **Database**: PostgreSQL (Drizzle ORM)
- **Styling**: Tailwind CSS 4
- **Hosting**: Coolify on VPS
- **SSL**: Let's Encrypt (auto-renewed)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel
│   ├── courses/           # Course pages
│   ├── contact/           # Contact form
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer
│   ├── home/             # Homepage sections
│   └── forms/            # Form components
├── data/                  # Static data (courses, testimonials)
├── db/                    # Drizzle ORM schema
└── lib/                   # Utilities, server actions
```

## Framework Reference

@AGENTS.md
