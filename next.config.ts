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
   * Long-cache static assets. Next.js already sends the right Cache-Control
   * for /_next/static/* but PSI flagged ~153KiB savings from longer TTLs on
   * /images/* (logos, OG images, course thumbnails). These files are
   * content-hashed via Next.js or otherwise immutable in our deployment,
   * so 1-year cache + immutable is safe — we redeploy a fresh URL when
   * an image changes.
   */
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
