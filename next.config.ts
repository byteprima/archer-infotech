import type { NextConfig } from "next";

/* P-7 perf: bundle analysis via Turbopack-native flag —
 *   `npx next build --experimental-analyze`
 * emits a chunk treemap. @next/bundle-analyzer (webpack-only) does NOT
 * work under Next 16's Turbopack default. */

// Legacy redirects (old course slugs + WordPress URLs) now live in
// src/lib/legacy-redirects.ts and are applied in middleware, so trailing-slash
// variants resolve in a single 308 instead of a 2-hop chain. See that file.

const nextConfig: NextConfig = {
  /**
   * P-7 perf: tree-shake barrel exports from large dependencies.
   *
   * Without this flag, an `import { ChevronLeft } from "lucide-react"` pulls
   * the full barrel module graph during bundling — PSI flagged 82.5 KiB of
   * unused 1st-party JS, much of it dead lucide-react icons and unused
   * @base-ui primitives that hitch a ride with their barrel siblings.
   *
   * Next.js rewrites these imports to direct subpath imports at build time,
   * which lets the bundler eliminate genuinely-unused exports. Universal
   * speed win — no behavioural change on any device.
   *
   * Verified safe for our deps:
   *   - lucide-react: official upstream support (Next 13+)
   *   - @base-ui/react: subpath exports already used in our shadcn primitives
   *   - posthog-js: tree-shakable; helps drop dead capture/replay code paths
   */
  experimental: {
    // NOTE: experimental.optimizeCss (Beasties critical-CSS inlining) was
    // tried 2026-06-22 to kill the render-blocking Tailwind sheet but is a
    // no-op in the App Router — React manages stylesheets via
    // data-precedence and Beasties (a Pages-Router/static-HTML tool) never
    // touches the streamed RSC output. Verified: served HTML still carried
    // both blocking <link rel=stylesheet> and zero inlined <style>. Do not
    // re-add without confirming it actually inlines in the served response.
    optimizePackageImports: [
      "lucide-react",
      "@base-ui/react",
      "posthog-js",
    ],
  },
  // Disable Next's built-in trailing-slash redirect — it runs BEFORE middleware,
  // so a legacy `/x/` URL would 308 to `/x` and only then to its destination (a
  // 2-hop chain). With it off, middleware owns trailing-slash handling: it
  // resolves legacy URLs in one hop and normalises every other `/x/` to `/x`.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /**
   * Canonical-host redirect: any request hitting the `www.` host gets a
   * permanent 308 to the apex URL. Dormant today (Traefik still 503s the
   * www host); activates as soon as Coolify's `domains` field includes
   * www.archerinfotech.in and Traefik starts routing it to Next. Audit
   * issue #2 — kills the lingering 503 on `www.`, consolidates SEO signals
   * on the apex.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          { type: "host", value: "www.archerinfotech.in" },
        ],
        destination: "https://archerinfotech.in/:path*",
        permanent: true,
      },
      /**
       * P5-27 — refresh-urgency scorer (2026-06-11) surfaced
       * `/courses?category=<slug>` as a query-param duplicate
       * competing with the clean `/courses/<category-slug>` URL.
       * Score 54.3 (high urgency). 301-redirect the query-param
       * form to the canonical clean URL so the SEO signal
       * consolidates on the right page.
       */
      {
        source: "/courses",
        has: [{ type: "query", key: "category", value: "(?<cat>.+)" }],
        destination: "/courses/:cat",
        permanent: true,
      },
    ];
  },
  /**
   * Long-cache static assets. Next.js already sends the right Cache-Control
   * for /_next/static/* but PSI flagged ~153KiB savings from longer TTLs on
   * /images/* (logos, OG images, course thumbnails). These files are
   * content-hashed via Next.js or otherwise immutable in our deployment,
   * so 1-year cache + immutable is safe — we redeploy a fresh URL when
   * an image changes.
   */
  async headers() {
    // Edge-cacheable evergreen SEO routes. The home page is `force-dynamic`
    // and Next/Cloudflare would otherwise send `private, no-cache, no-store`
    // — overriding here lets Cloudflare cache the rendered HTML and serve
    // stale-while-revalidate up to 1 day. Big LCP/TTFB win for repeat
    // visitors and crawl efficiency. Excluded by listing:
    // /admin, /api, /contact (form), /blog (DB-backed), /review (308).
    //
    // P8-24 — three-tier cache TTL aligned to actual content update cadence.
    // Each tier keeps the same stale-while-revalidate budget (1 day) but
    // varies s-maxage based on how often content actually changes. Tradeoff
    // window = s-maxage = max time users might see stale content after a
    // deploy. With stale-while-revalidate intact, the origin recovery
    // path is unchanged.
    //
    //   DYNAMIC      (5 min)  — routes that meaningfully change weekly+
    //                            (home, placements, batch-schedule)
    //   STABLE       (1 hour) — routes that change quarterly
    //                            (about/courses/bootcamps/trainers/etc)
    //   VERY_STABLE  (6 hour) — routes that change annually+
    //                            (compare/guides/tools/career-paths/reports)
    //
    // Justification for raising stable-route TTL: a 1-hour s-maxage means
    // Cloudflare returns to origin ~24x/day per route instead of ~288x.
    // Hit rate increases proportionally; TTFB falls. The 1-hour staleness
    // window is acceptable because evergreen routes don't carry
    // time-sensitive content — the rare deploy lag is invisible to users.
    //
    // NOTE: do NOT add `must-revalidate` here. It forbids serving a stale
    // response, which forces Cloudflare to revalidate synchronously against
    // origin the moment s-maxage expires (cf-cache-status: EXPIRED) — the
    // exact ~1s TTFB hit `stale-while-revalidate` exists to avoid. Confirmed
    // 2026-06-21: field LCP p75 was 3.15s with cache HIT TTFB ~0.3s but
    // MISS/EXPIRED TTFB ~1s. Without must-revalidate, post-TTL visitors get
    // an instant stale response while Cloudflare refreshes in the background.
    const PUBLIC_CACHE_DYNAMIC = {
      key: "Cache-Control",
      value:
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    };
    const PUBLIC_CACHE_STABLE = {
      key: "Cache-Control",
      value:
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    };
    const PUBLIC_CACHE_VERY_STABLE = {
      key: "Cache-Control",
      value:
        "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
    };

    // Content-Security-Policy (P1, 2026-06-25 audit — closes the "Missing CSP"
    // finding). Pragmatic policy: the high-value directives are strict
    // (object-src none, base-uri self, frame-ancestors self, form-action self)
    // for real clickjacking / base-tag / plugin / exfil protection, while
    // script/style/img/connect/frame allow the known third parties so nothing
    // breaks. script-src keeps 'unsafe-inline' + 'unsafe-eval' because Next.js
    // emits inline hydration scripts and GTM injects inline — a nonce-based
    // strict policy would need app-wide nonce plumbing (separate task).
    // Allowed origins: Google Tag Manager + GA4, Meta Pixel, PostHog, YouTube
    // (no-cookie embeds) and Google Maps embeds. Add new origins here when a
    // new tag/embed is introduced — GTM-injected tags from un-allowlisted
    // hosts will otherwise be blocked.
    const CONTENT_SECURITY_POLICY = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://us.i.posthog.com https://us-assets.i.posthog.com https://*.posthog.com https://static.cloudflareinsights.com https://analytics.ahrefs.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://us.i.posthog.com https://us-assets.i.posthog.com https://*.posthog.com https://connect.facebook.net https://www.facebook.com https://graph.facebook.com https://cloudflareinsights.com https://static.cloudflareinsights.com https://analytics.ahrefs.com",
      "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://td.doubleclick.net",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    // Security headers — set globally on every response.
    const SECURITY_HEADERS = [
      // HSTS: 2 years + includeSubDomains + preload (no www subdomain in use today
      // but matches the standard preload requirement).
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Minimal permissions-policy — no use of these features anywhere on the site.
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    // Per-tier rule builders.
    const dynRule = (source: string) => ({
      source,
      headers: [PUBLIC_CACHE_DYNAMIC],
    });
    const stableRule = (source: string) => ({
      source,
      headers: [PUBLIC_CACHE_STABLE],
    });
    const veryStableRule = (source: string) => ({
      source,
      headers: [PUBLIC_CACHE_VERY_STABLE],
    });

    return [
      // Long-cache static assets (content-hashed / immutable).
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // DYNAMIC — meaningfully changes weekly+ (5-min edge cache).
      // /placements — new placements published with each batch close.
      // /batch-schedule — DB-backed upcoming-batch dates change weekly.
      dynRule("/placements"),
      dynRule("/batch-schedule"),

      // STABLE — changes quarterly (1-hour edge cache).
      // Course/bootcamp/trainer/audience pages refresh on quarterly content
      // review cadence per P5-27 playbook. /press + /internships + corporate
      // training are stable but occasionally bumped.
      // / — homepage moved from DYNAMIC→STABLE 2026-06-22: at 5-min s-maxage
      // most low-traffic visits hit cf-cache-status:EXPIRED and paid an origin
      // revalidation (the LCP TTFB segment). Content changes weekly and live
      // admin edits push via revalidateTag, so a 1-hour edge TTL is safe and
      // makes the vast majority of requests pure HITs (~0.3s TTFB).
      stableRule("/"),
      stableRule("/about"),
      stableRule("/internships"),
      stableRule("/corporate-training"),
      stableRule("/press"),
      stableRule("/trainers"),
      stableRule("/trainers/:slug"),
      stableRule("/bootcamps"),
      stableRule("/bootcamps/:slug"),
      stableRule("/courses"),
      stableRule("/courses/:category"),
      stableRule("/courses/:category/:slug"),
      stableRule("/courses/for/:audience"),
      stableRule("/locations"),
      stableRule("/locations/:slug"),

      // VERY_STABLE — changes annually+ (6-hour edge cache).
      // Compare + guide pages are deeply evergreen (e.g. Java vs Python).
      // Tools are interactive but their HTML wrapper is static; the
      // calculator state lives client-side. Career-paths pillars and the
      // /reports landing pages refresh only on annual data updates.
      veryStableRule("/compare"),
      veryStableRule("/compare/:slug"),
      veryStableRule("/guides"),
      veryStableRule("/guides/:slug"),
      veryStableRule("/tools/:path*"),
      veryStableRule("/career-paths"),
      veryStableRule("/career-paths/:slug"),
      veryStableRule("/reports"),
      veryStableRule("/reports/:slug"),

      // Security headers — apply to every route.
      { source: "/:path*", headers: SECURITY_HEADERS },
    ];
  },
};

export default nextConfig;
