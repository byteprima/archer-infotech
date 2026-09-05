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
    /**
     * Inline the route's CSS into <style> tags instead of emitting
     * render-blocking <link rel=stylesheet>. Turbopack-native, unlike
     * optimizeCss below.
     *
     * WHY: the mobile LCP element is the hero <H1> — server-rendered text
     * that waits on nothing but CSS. Measured 2026-08-14 (Pixel 5, 4x CPU,
     * slow 4G): stylesheet finishes at 986ms, first paint at 1120ms, and
     * LCP === FCP exactly. Paint is gated on the stylesheet and nothing
     * else, so removing the request removes the delay.
     *
     * This was first shipped as 171c7db (2026-06-17) — mobile PSI 88-95,
     * LCP 4.05s -> ~2.9s, 0 render-blocking items — then reverted 3.5h
     * later by 25fcd88 with an empty revert message and no recorded reason.
     * Re-applied after re-measuring from scratch rather than trusting that
     * history. If you are about to revert this again, WRITE DOWN WHY.
     *
     * Trade-off accepted (see Next's inlineCss docs): inlined CSS can't be
     * cached separately, so repeat visitors re-download ~29KB of Tailwind
     * per page. Right call here — traffic is organic-search-led and
     * first-visit dominated, the CSS is small and atomic, and HTML is
     * edge-cached at Cloudflare where it ships brotli-compressed.
     */
    inlineCss: true,
    /**
     * Server Actions default to a 1 MB request body, but this codebase
     * declares MEDIA_MAX_BYTES = 5 MB and validates uploads against it — so
     * every upload between 1 MB and 5 MB was rejected by the framework with
     * a 413 before saveMedia's own limit was ever consulted. That silently
     * affected the existing alumni photo and placement offer-letter forms,
     * not just the popup artwork that surfaced it (a 1.4 MB PNG, 2026-08-15).
     *
     * 6 MB = the declared media limit plus room for the rest of the form.
     * If MEDIA_MAX_BYTES ever rises, raise this with it or uploads will fail
     * with a framework error instead of a readable validation message.
     */
    serverActions: {
      bodySizeLimit: "6mb",
    },
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
    // visitors and crawl efficiency.
    //
    // WARNING: leaving a route out of this list does NOT exclude it from
    // caching. Prerendered (SSG) routes with no rule fall through to the
    // Next.js default of `s-maxage=31536000` — a one-year edge TTL. To
    // genuinely keep a route off the edge, give it an explicit
    // noCacheRule(). Routes that reach origin every time do so because
    // they are dynamic (`no-store`), not because they were omitted here.
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
    // origin the moment the edge TTL expires — the exact ~1s TTFB hit
    // `stale-while-revalidate` exists to avoid. Confirmed 2026-06-21: field
    // LCP p75 was 3.15s with cache HIT TTFB ~0.3s but MISS/EXPIRED TTFB ~1s.
    //
    // 2026-09-05 — that note was right about the mechanism and wrong about
    // the trigger. `s-maxage` does the same thing: RFC 9111 §4.2.4 gives it
    // proxy-revalidate semantics, and Cloudflare honours that by refusing to
    // serve stale. So `max-age=0, s-maxage=N, stale-while-revalidate=86400`
    // asks for two contradictory things and the swr half loses — it has
    // never taken effect on this site.
    //
    // Measured on /blog/<slug> (300s tier) before the fix: at every TTL
    // boundary Cloudflare returned `cf-cache-status: REVALIDATED` — a
    // blocking origin round-trip — never `UPDATING`, which is what working
    // swr produces. TTFB at those boundaries was 0.91s and 1.78s against a
    // ~0.32s median for HIT: the 3-5x penalty this header was written to
    // prevent, and part of why cache-warm.yml exists.
    //
    // The fix is Cloudflare's documented one: express the edge TTL as
    // `max-age` and drop `s-maxage` entirely. The cost is that browsers now
    // cache the HTML for the same window rather than revalidating every
    // time, which is why this is applied to the 5-minute tier first — a
    // visitor holding 5-minute-old HTML is harmless. Decoupling browser TTL
    // from edge TTL on the longer tiers needs Edge Cache TTL set in a
    // Cloudflare Cache Rule, which is a separate change.
    const PUBLIC_CACHE_DYNAMIC = {
      key: "Cache-Control",
      value: "public, max-age=300, stale-while-revalidate=86400",
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
    // Never edge-cache. For routes that must always hit origin (forms whose
    // markup embeds per-deploy server-action ids, personalised or
    // interactive pages).
    const NO_EDGE_CACHE = {
      key: "Cache-Control",
      value: "private, no-cache, no-store, max-age=0, must-revalidate",
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://us.i.posthog.com https://us-assets.i.posthog.com https://*.posthog.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://us.i.posthog.com https://us-assets.i.posthog.com https://*.posthog.com https://connect.facebook.net https://www.facebook.com https://graph.facebook.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
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
    const noCacheRule = (source: string) => ({
      source,
      headers: [NO_EDGE_CACHE],
    });

    return [
      // Long-cache static assets (content-hashed / immutable).
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Production only. In dev, Turbopack reuses stable chunk URLs
      // (e.g. src_components_0fb7wv6._.js) rather than content-hashing them,
      // so `immutable` pins a chunk URL to bytes that later change on disk.
      // The browser then never revalidates and silently mixes stale chunks
      // with fresh ones — surfacing as hydration mismatches and
      // "module factory is not available" errors. Next.js warns about this
      // custom header at dev startup for exactly this reason. Content-hashed
      // production chunks make the header correct there, so prod is unchanged.
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]
        : []),

      // Downloadable PDFs — long-cached, and deliberately NOT indexable.
      //
      // Google crawls and ranks PDFs as standalone documents. A syllabus PDF
      // carrying the same content as its course page produces two URLs
      // competing for the same query, and the PDF is the worse one to win:
      // no enquiry form, no navigation, no analytics. Money keywords already
      // sit around position 11, so splitting the signal is a real cost.
      //
      // X-Robots-Tag is the only mechanism available — a PDF cannot carry a
      // <meta robots> tag. Note this is deliberately NOT a robots.txt
      // Disallow: that would block crawling, which stops Google ever seeing
      // the noindex while still letting the bare URL surface in results.
      //
      // Filenames are versioned (-v1) because of the immutable max-age
      // below: reusing a name means nobody sees the new file for a year.
      {
        source: "/downloads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },

      // DYNAMIC — meaningfully changes weekly+ (5-min edge cache).
      // /placements — new placements published with each batch close.
      // /batch-schedule — DB-backed upcoming-batch dates change weekly.
      dynRule("/placements"),
      dynRule("/batch-schedule"),
      // /blog/:slug — MUST have an explicit rule. This route is statically
      // prerendered via generateStaticParams, so without an override Next.js
      // emits a bare `cache-control: s-maxage=31536000` (one YEAR) that
      // Cloudflare happily caches. Two ways that bit us:
      //
      //   1. A 404 fetched before a post is published gets cached for a year
      //      at that PoP. Confirmed 2026-07-30 on
      //      /blog/future-of-java-with-ai — `cf-cache-status: HIT` on a 404
      //      with `age: 5629` while origin was already serving 200. Every
      //      publish is exposed to this if anything requests the URL first.
      //   2. Edits to an already-published post never propagate — the edge
      //      holds the old HTML for up to a year. The non-cached
      //      `getPublishedPostBySlug` fix addressed the Next data cache but
      //      not the CDN layer above it.
      //
      // 5-min tier (not STABLE/VERY_STABLE) because posts are published and
      // corrected in place from /admin and need to go live promptly.
      // NOTE: /blog and /blog/category/:slug are NOT listed here — they are
      // dynamic and already send `no-store` (cf-cache-status: BYPASS), so new
      // posts surface on the listing immediately.
      dynRule("/blog/:slug"),

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
      // /testimonials — same pattern as the homepage: the page ISR-regenerates
      // every 10 min (revalidate=600) and admin edits push via
      // revalidateTag("testimonials"), but without an edge-TTL override
      // Cloudflare only held it 5 min, so low-traffic hours paid an origin
      // revalidation (cf-cache-status: EXPIRED, ~1s TTFB from India). A 1-hour
      // edge TTL makes the vast majority of hits pure HITs while keeping the
      // same freshness guarantees. TTFB fix, 2026-07-11.
      stableRule("/testimonials"),

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

      // ---------------------------------------------------------------
      // Routes previously left OUT of this list entirely. Omission is NOT
      // the same as "not cached": with no rule, a prerendered (SSG) route
      // falls through to the Next.js default of a bare
      // `cache-control: s-maxage=31536000` — a ONE YEAR edge TTL. The
      // comment above claiming /contact and /blog were "excluded by
      // listing" was therefore backwards: they were opted into the
      // longest possible cache, not out of it.
      //
      // Measured on prod 2026-07-30 before this fix — every one of these
      // sent s-maxage=31536000, and where the Cloudflare cache rule
      // matched them they were already frozen:
      //   /questions        cf-cache-status HIT, age 2413982 (28 days)
      //   /privacy-policy   cf-cache-status HIT, age 1824405 (21 days)
      // Content edits to those pages could not reach users for a year.
      // ---------------------------------------------------------------

      // VERY_STABLE — legal/reference copy, changes annually at most.
      veryStableRule("/privacy-policy"),
      veryStableRule("/terms-of-service"),
      veryStableRule("/glossary"),
      veryStableRule("/about/facts"),

      // STABLE — content hubs edited on the quarterly review cadence.
      stableRule("/questions"),
      stableRule("/questions/:slug"),
      stableRule("/alumni"),
      stableRule("/interview-questions/:path*"),
      stableRule("/it-training-in-pune-for"),
      stableRule("/it-training-in-pune-for/:city"),

      // /contact — a lead-capture form. Its markup embeds per-deploy
      // server-action ids, so a stale copy can post to an action id that
      // no longer exists. Cloudflare currently returns DYNAMIC here so it
      // is not actually being cached today, but that is a property of the
      // CF cache rule rather than anything this app asserts — make the
      // intent explicit at the origin so a future rule change cannot
      // silently start caching the form.
      noCacheRule("/contact"),

      // Security headers — apply to every route.
      { source: "/:path*", headers: SECURITY_HEADERS },
    ];
  },
};

export default nextConfig;
