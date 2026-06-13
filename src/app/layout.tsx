import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GoogleAnalyticsLazy } from "@/components/analytics/google-analytics-lazy";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButtonLazy } from "@/components/common/whatsapp-button-lazy";
// P-12 follow-up (2026-06-04): sonner Toaster was 37 KB in the eager shared
// chunk on every public route. The actual dynamic import + ssr:false lives
// inside ToasterLazy (a Client Component), because Next 16 App Router only
// allows ssr:false in client contexts. This Server Component (layout.tsx)
// just renders the wrapper — sonner now lands in its own chunk that
// hydrates on idle, not in the critical first-paint bundle.
import { ToasterLazy } from "@/components/ui/toaster-lazy";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site-config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to third-party origins the page contacts during /
            shortly after load. Establishing the DNS + TCP + TLS handshake
            earlier saves 100-300ms per origin on mobile-4G — PSI's
            network dependency tree currently shows zero preconnects.
            Limit to four origins (Chrome ignores additional preconnects
            beyond ~6, and each one consumes a connection slot).
              - Google Tag Manager: gtag.js loader (lazy-mounted via
                GoogleAnalyticsLazy, but the handshake can warm up early)
              - Google Analytics: gtag config endpoint
              - fonts.gstatic.com: served by next/font, but the runtime
                still fetches the WOFF2 from there during paint
              - static.cloudflareinsights.com: beacon.min.js
            crossOrigin is required for fonts (anonymous CORS request);
            for analytics it's harmless and matches the actual fetch. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 4th (final) preconnect slot: www.google.com — every Google Maps
            iframe (contact + 12 location pages) goes here, and the /review
            redirect target (g.page) sits on Google infra too. Warming the
            handshake saves 100-300ms on iframe load. */}
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Ahrefs Web Analytics handshake warm-up (cookieless, no PII). Uses a
            dns-prefetch rather than a 5th preconnect so it doesn't evict one of
            the four critical-path preconnect slots above. */}
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <OrganizationJsonLd />
      </head>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalyticsLazy gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      {/* Ahrefs Web Analytics — cookieless, privacy-friendly traffic monitoring.
          Loaded lazyOnload (after the browser goes idle) so it stays off the
          critical path and preserves the banked TBT/LCP wins. */}
      <Script
        id="ahrefs-analytics"
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="3sx73cLbPlYkuRloMtEssg"
        strategy="lazyOnload"
      />
      {/* suppressHydrationWarning ignores attributes Grammarly / LanguageTool /
          other browser extensions inject into <body> before React hydrates. */}
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButtonLazy />
        <ToasterLazy />
      </body>
    </html>
  );
}
