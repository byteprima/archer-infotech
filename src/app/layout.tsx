import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalyticsLazy } from "@/components/analytics/google-analytics-lazy";
import { MetaPixelLazy } from "@/components/analytics/meta-pixel-lazy";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButtonLazy } from "@/components/common/whatsapp-button-lazy";
import { ChatWidgetLazy } from "@/components/chat/chat-widget-lazy";
import { CookieConsentBanner } from "@/components/common/cookie-consent-banner";
// P-12 follow-up (2026-06-04): sonner Toaster was 37 KB in the eager shared
// chunk on every public route. The actual dynamic import + ssr:false lives
// inside ToasterLazy (a Client Component), because Next 16 App Router only
// allows ssr:false in client contexts. This Server Component (layout.tsx)
// just renders the wrapper — sonner now lands in its own chunk that
// hydrates on idle, not in the critical first-paint bundle.
import { ToasterLazy } from "@/components/ui/toaster-lazy";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site-config";

// Inter is the only webfont actually rendered: it backs both --font-sans and
// --font-heading (globals.css remaps --font-heading to var(--font-sans)). It's
// the LCP element's font (the H1), so it's preloaded with display:swap so the
// heading paints in a metric-matched fallback immediately, then upgrades.
// Playfair Display was removed 2026-06-22: it was loaded + preloaded onto the
// LCP critical path (~47KiB) but never rendered — 0 font-family refs in the
// built CSS — so it only stole bandwidth from the Inter (LCP) font on mobile.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Resource hints for third-party origins. None of these are
            contacted during the LCP window, so they're dns-prefetch (DNS
            only, ~free) rather than preconnect (full TCP+TLS handshake held
            open). PSI flagged the previous four preconnects as "unused" —
            a preconnect that isn't used within ~10s is dropped by Chrome and
            wastes a connection slot.
              - Google Tag Manager / Google Analytics: lazy-mounted via
                GoogleAnalyticsLazy, fire seconds after paint
              - www.google.com: below-the-fold Maps iframes (contact + 12
                location pages) and the /review (g.page) redirect target
              - static.cloudflareinsights.com: beacon.min.js (post-load RUM)
            fonts.gstatic.com is intentionally absent: next/font/google
            downloads the WOFF2 at build time and self-hosts it from
            /_next/static/media, so the browser never connects to gstatic. */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Ahrefs Web Analytics handshake warm-up (cookieless, no PII). Uses a
            dns-prefetch rather than a 5th preconnect so it doesn't evict one of
            the four critical-path preconnect slots above. */}
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        {/* Ahrefs Web Analytics — rendered into the server HTML <head> (not via
            next/script, which injects client-side post-hydration and is invisible
            to Ahrefs' HTML-fetch "Recheck installation"). `async` keeps it off the
            critical render path, so the banked LCP/TBT wins are preserved. */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="3sx73cLbPlYkuRloMtEssg"
          async
        />
        <OrganizationJsonLd />
      </head>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalyticsLazy gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
        <MetaPixelLazy pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID} />
      )}
      {/* suppressHydrationWarning ignores attributes Grammarly / LanguageTool /
          other browser extensions inject into <body> before React hydrates. */}
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButtonLazy />
        {process.env.NEXT_PUBLIC_CHAT_ENABLED === "true" && <ChatWidgetLazy />}
        <CookieConsentBanner />
        <ToasterLazy />
      </body>
    </html>
  );
}
