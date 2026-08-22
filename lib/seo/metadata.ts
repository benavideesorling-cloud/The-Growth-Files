import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

/**
 * Next.js does not deep-merge `openGraph` between a layout and a page —
 * if a page defines its own `openGraph` object, it fully replaces the
 * root layout's (losing siteName/locale/type), rather than merging field
 * by field. This helper re-applies those site-wide defaults on every page
 * that sets its own openGraph, so `og:site_name` and `og:locale` don't
 * silently disappear the moment a page adds a title/description.
 *
 * It also carries a default `images` entry pointing at the site-wide
 * opengraph-image.tsx route. That file-convention route only
 * auto-attaches to the exact segment it's colocated in (the `/` route
 * itself) — Next does NOT cascade it down to descendant routes like
 * /services or /blog/[slug] the way `title`/`description` inherit from a
 * layout — so every other page needs an explicit reference to it, or it
 * silently has no image at all. Pages with their own image (Sanity
 * ogImage/featuredImage) override this by passing their own `images`.
 */
export const DEFAULT_OG_IMAGE = {
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "The Growth Files — Performance Marketing + AI Search, Orling Benavides",
};

export function pageOpenGraph(og: NonNullable<Metadata["openGraph"]>): NonNullable<Metadata["openGraph"]> {
  return {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
    ...og,
  };
}
