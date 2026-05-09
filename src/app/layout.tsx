import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GoogleAnalyticsLazy } from "@/components/analytics/google-analytics-lazy";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButtonLazy } from "@/components/common/whatsapp-button-lazy";
import { Toaster } from "@/components/ui/sonner";
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
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <OrganizationJsonLd />
      </head>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalyticsLazy gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      {/* suppressHydrationWarning ignores attributes Grammarly / LanguageTool /
          other browser extensions inject into <body> before React hydrates. */}
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButtonLazy />
        <Toaster />
      </body>
    </html>
  );
}
