# Production image for archerinfotech.in.
#
# Why this file exists: the site used to be built on the VPS by nixpacks, and
# that stopped working. A cold Next.js 16 build of ~410 routes needs more
# memory than the 7.9 GB box has spare while it is also serving the live site
# and ~20 other containers, so `npm run build` was silently OOM-killed by the
# kernel — no error text, killed at a different phase each run. Three weeks of
# commits never reached production. The build now happens on a GitHub runner
# and Coolify only pulls the finished image.
#
# The layout deliberately mirrors what nixpacks produced, so the runtime
# behaviour is unchanged: full node_modules, .next and public under /app, and
# `npm run start` (drizzle-kit push && next start) as the command.

# ---------------------------------------------------------------- dependencies
# The full (non-slim) image is needed here: better-sqlite3 is a native module
# and compiles against python3/make/g++ during `npm ci`. The runtime stage is
# slim and inherits the already-compiled binary, which is safe because both
# stages are the same Debian release and glibc.
FROM node:22-bookworm AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------------------------------------------------------------------- build
FROM node:22-bookworm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so they
# have to be present here rather than only at runtime.
#
# NEXT_SERVER_ACTIONS_ENCRYPTION_KEY is the one that bites: Next derives the
# server-action encryption from it during the build, so a build-time value that
# differs from the runtime value makes every server action (contact form, lead
# capture, admin) fail at runtime. It must match Coolify exactly.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_POSTHOG_TOKEN
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_FACEBOOK_PIXEL_ID
ARG NEXT_PUBLIC_CHAT_ENABLED
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_POSTHOG_TOKEN=$NEXT_PUBLIC_POSTHOG_TOKEN \
    NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID=$NEXT_PUBLIC_FACEBOOK_PIXEL_ID \
    NEXT_PUBLIC_CHAT_ENABLED=$NEXT_PUBLIC_CHAT_ENABLED \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# DATABASE_URL is deliberately NOT set for the build. The SQLite file lives on
# the runtime volume and does not exist on a build runner; the data helpers
# already fall back to placeholder content when it is absent, which is exactly
# what the nixpacks build was doing too. Blog and other DB-backed routes render
# on demand at runtime.
# The encryption key arrives as a BuildKit secret, not an ARG/ENV, so it is
# mounted only for the length of this one command and never lands in the image
# or its layer history. An ARG would have been readable by anyone who can pull
# the image — Docker warns about exactly this (SecretsUsedInArgOrEnv).
#
# The emptiness check is not paranoia. When the key is absent Next silently
# generates its own, the build succeeds, and the failure only surfaces in
# production as every server action breaking — contact form, lead capture,
# admin. Failing the build here makes that impossible to ship by accident.
RUN --mount=type=secret,id=next_server_actions_key \
    set -eu; \
    if [ ! -s /run/secrets/next_server_actions_key ]; then \
      echo "ERROR: NEXT_SERVER_ACTIONS_ENCRYPTION_KEY build secret is missing or empty." >&2; \
      echo "       Set it as a repo secret; it must match Coolify's runtime value exactly." >&2; \
      exit 1; \
    fi; \
    NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(cat /run/secrets/next_server_actions_key)" \
      npm run build

# -------------------------------------------------------------------- runtime
FROM node:22-bookworm-slim AS runner
WORKDIR /app

# curl is required, not a convenience. On a Dockerfile-based deployment Coolify
# runs its healthcheck from *inside* the container, and the slim image ships
# neither curl nor wget — so the check can never pass, the new container is
# declared unhealthy, and the deploy rolls back with nothing else wrong. The
# nixpacks image happened to provide it, which is why this only appeared after
# the switch. (The ar-demo-api image has the same requirement.)
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# node_modules is copied whole rather than pruned to production-only, because
# `npm run start` runs `drizzle-kit push` first and drizzle-kit is a
# devDependency. Pruning here would break startup.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src

# Runs as root to match the previous nixpacks container: the persistent volume
# mounted at /app/data is root-owned, and the app writes uploads into it.
EXPOSE 3000
CMD ["npm", "run", "start"]
