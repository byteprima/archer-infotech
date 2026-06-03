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
    // — overriding here lets Cloudflare cache the rendered HTML for 5 min
    // (s-maxage) and serve stale-while-revalidate up to 1 day. Big LCP/TTFB
    // win for repeat visitors and crawl efficiency. Excluded by listing:
    // /admin, /api, /contact (form), /blog (DB-backed), /review (308).
    const PUBLIC_CACHE = {
      key: "Cache-Control",
      value:
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400, must-revalidate",
    };

    // Security headers — set globally on every response.
    const SECURITY_HEADERS = [
      // HSTS: 2 years + includeSubDomains + preload (no www subdomain in use today
      // but matches the standard preload requirement).
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Minimal permissions-policy — no use of these features anywhere on the site.
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    const cacheRule = (source: string) => ({
      source,
      headers: [PUBLIC_CACHE],
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

      // Edge cache for evergreen SEO routes.
      cacheRule("/"),
      cacheRule("/about"),
      cacheRule("/placements"),
      cacheRule("/internships"),
      cacheRule("/corporate-training"),
      cacheRule("/batch-schedule"),
      cacheRule("/press"),
      cacheRule("/trainers"),
      cacheRule("/trainers/:slug"),
      cacheRule("/bootcamps"),
      cacheRule("/bootcamps/:slug"),
      cacheRule("/courses"),
      cacheRule("/courses/:category"),
      cacheRule("/courses/:category/:slug"),
      cacheRule("/courses/for/:audience"),
      cacheRule("/compare"),
      cacheRule("/compare/:slug"),
      cacheRule("/guides"),
      cacheRule("/guides/:slug"),
      cacheRule("/locations"),
      cacheRule("/locations/:slug"),
      cacheRule("/tools/:path*"),

      // Security headers — apply to every route.
      { source: "/:path*", headers: SECURITY_HEADERS },
    ];
  },
};

export default nextConfig;
