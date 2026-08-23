import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { personRootJsonLd, websiteJsonLd } from "@/lib/seo/schema";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/metadata";
import "./globals.css";

// Blank/whitespace-only is treated the same as unset, so a Vercel
// environment variable saved empty can't render a broken GTM snippet —
// same defensive pattern as siteConfig.url in lib/config/site.ts. Only
// GTM is wired up here; GA4 is configured inside the GTM container
// itself, not loaded as a separate direct gtag.js integration.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="font-sans antialiased">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={personRootJsonLd()} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
