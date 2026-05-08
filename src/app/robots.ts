import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

/**
 * Cloudflare's "Block AI scrapers and crawlers" managed rule injects
 * top-level Disallow directives for AI training crawlers (GPTBot, ClaudeBot,
 * Google-Extended, CCBot, Bytespider, meta-externalagent, etc.) into the
 * served robots.txt. That's the user's intentional opt-out from training-data
 * scraping and we honour it — no Allow rules here for those crawlers (an
 * Allow lower in the file wouldn't override Cloudflare's edge-injected
 * Disallow at the top anyway).
 *
 * What we DO add explicit Allow rules for: live-retrieval AI agents
 * (PerplexityBot, ChatGPT-User, Perplexity-User, OAI-SearchBot) — these
 * fetch pages on demand to answer a user's query, separate from training
 * crawlers, and are not in Cloudflare's block list. Explicit Allow makes
 * intent unambiguous for AEO/GEO citation pickup.
 *
 * Plus explicit Disallow for known scraper-spam crawlers (AhrefsBot,
 * SemrushBot, MJ12bot, DotBot) that bring no SEO value and waste server
 * resources on a small site.
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
      // Live-retrieval AI agents — explicitly welcome on public routes
      { userAgent: "PerplexityBot", disallow: protectedPaths },
      { userAgent: "Perplexity-User", disallow: protectedPaths },
      { userAgent: "ChatGPT-User", disallow: protectedPaths },
      { userAgent: "OAI-SearchBot", disallow: protectedPaths },
      // Known scraper-spam crawlers — block to save bandwidth
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      // Default policy — everything else allowed except admin/API
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
