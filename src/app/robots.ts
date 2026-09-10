import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

/**
 * TRAINING CRAWLERS — status corrected 2026-09-10.
 *
 * This comment used to say Cloudflare's "Block AI scrapers and crawlers"
 * managed rule was injecting top-level Disallow directives for GPTBot,
 * ClaudeBot, Google-Extended, CCBot and Bytespider, and that we were honouring
 * that opt-out. Checked against the live file on 2026-09-10: **there are no
 * such directives in the served robots.txt.** Either the rule was turned off
 * or it never applied to this zone. Those crawlers are currently allowed, by
 * the "*" group.
 *
 * They are deliberately still not named here. Naming them would turn an
 * inherited default into a stated policy, and whether this business wants its
 * content used for model training is an owner decision, not a code decision.
 * The distinction that matters: training crawlers feed long-term model
 * familiarity, retrieval agents produce citations today. Only the second group
 * is named below.
 *
 * What we DO add explicit Allow rules for: live-retrieval AI agents
 * (PerplexityBot, ChatGPT-User, Perplexity-User, OAI-SearchBot) — these
 * fetch pages on demand to answer a user's query, separate from training
 * crawlers, and are not in Cloudflare's block list. Explicit Allow makes
 * intent unambiguous for AEO/GEO citation pickup.
 *
 * Note (2026-07-19): AhrefsBot/SemrushBot/MJ12bot/DotBot are intentionally NOT
 * blocked. Blocking them did not hide our inbound-link data (backlinks are
 * discovered by crawling the *linking* pages elsewhere), but it DID keep these
 * tools' DA/DR metrics for this domain stale — including the free Moz metrics
 * this account itself uses. There's no competitive upside to blocking them, so
 * they fall under the default "*" allow policy.
 */
export default function robots(): MetadataRoute.Robots {
  /* Each AI-allowlist group MUST repeat /admin/ + /api/ disallows.
   * Per RFC 9309 + Google's robots.txt spec, when a UA has its own group
   * the wildcard `*` group's rules don't apply to it. Without these
   * explicit Disallows, Perplexity/ChatGPT bots would waste crawl budget
   * on /admin/login (auth-walled but still served) and /api/ endpoints.
   * Allow: "/" is implicit (default), so omitting it is cleaner.
   */
  const protectedPaths = ["/admin/", "/api/"];

  return {
    rules: [
      // Live-retrieval AI agents — explicitly welcome on public routes.
      // These fetch a page when a user asks a question, which is the traffic
      // that produces a citation. Anthropic's two were missing until
      // 2026-09-10; they were allowed by the "*" group but not named, so the
      // intent was inferred rather than stated.
      { userAgent: "PerplexityBot", disallow: protectedPaths },
      { userAgent: "Perplexity-User", disallow: protectedPaths },
      { userAgent: "ChatGPT-User", disallow: protectedPaths },
      { userAgent: "OAI-SearchBot", disallow: protectedPaths },
      { userAgent: "Claude-SearchBot", disallow: protectedPaths },
      { userAgent: "Claude-User", disallow: protectedPaths },
      // Default policy — everything else allowed except admin/API
      // (SEO crawlers AhrefsBot/SemrushBot/MJ12bot/DotBot fall under this — see note above)
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
