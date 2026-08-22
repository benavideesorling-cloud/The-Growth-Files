import { siteConfig, contact } from "@/lib/config/site";

/**
 * JSON-LD builders for the site's structured data. Every builder here maps
 * to content that's actually visible on the page it's attached to — no
 * schema type is used unless the page genuinely represents that kind of
 * thing. Notably absent: Organization (this is a personal site/brand, not
 * a registered company — Person is the accurate entity), and FAQPage
 * (Google has sharply restricted FAQ rich results since May 2026 — see
 * the site's own "FAQ schema" post — so FAQ content here stays visible
 * Q&A, not schema, even though the `faqs` field would technically
 * support it).
 *
 * Person identity fields (name, url, sameAs) mirror the Sanity `author`
 * document's stable, already-approved facts rather than being fetched
 * live from Sanity — the root layout renders this on every page,
 * including /studio, and a fetch failure there shouldn't be able to
 * break every page on the site for a handful of facts that don't change
 * without a code deploy anyway.
 */

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}

// The only verified identity facts available: name (matches the Sanity
// author doc and the site's LinkedIn handle) and the one verified social
// profile. jobTitle and worksFor are deliberately omitted — the approved
// site copy never states a single formal job title, and asserting an
// employer relationship as a structured-data fact needs explicit
// confirmation first (flagged in the Phase 7 report).
//
// jobTitle: "Performance Marketer" was explicitly approved post-Phase-7,
// conditioned on consistency with existing copy. The exact phrase doesn't
// appear verbatim anywhere, but "performance marketing" is the first and
// most repeated discipline across the site (Home's hero eyebrow, About's
// journey timeline, Services' #2 discipline, the site description) — a
// reasonable single-title compression of already-approved content, not a
// new fact. worksFor is deliberately still omitted (not yet confirmed).
export const PERSON_ID = absoluteUrl("/#person");

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Orling Benavides",
    url: siteConfig.url,
    jobTitle: "Performance Marketer",
    sameAs: [contact.linkedinUrl],
    description: siteConfig.description,
  };
}

export const WEBSITE_ID = absoluteUrl("/#website");

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": PERSON_ID },
  };
}

export function personRootJsonLd() {
  return { "@context": "https://schema.org", ...personJsonLd() };
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    ...(type === "AboutPage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": PERSON_ID },
    url: absoluteUrl(path),
  };
}

/**
 * Article/BlogPosting-shaped JSON-LD, shared by blog posts and case
 * studies (case studies are written narrative articles — there's no more
 * accurate schema.org type for them). `datePublished`/`dateModified` are
 * only included when a real date exists — case studies currently have
 * none (the source content never had publication dates; see the Phase 6
 * report), so their Article JSON-LD simply omits those fields rather than
 * fabricating one.
 */
export function articleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  imageUrl,
  section,
  isCaseStudy = false,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string;
  section?: string[];
  isCaseStudy?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": isCaseStudy ? "Article" : "BlogPosting",
    "@id": absoluteUrl(`${path}#article`),
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    headline,
    description,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    ...(section?.length ? { articleSection: section } : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}
