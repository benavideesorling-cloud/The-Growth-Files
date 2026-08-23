/**
 * Resolves NEXT_PUBLIC_SITE_URL defensively: `??` alone only guards against
 * `undefined`/`null`, not an empty or whitespace-only string — and an empty
 * string is exactly what reaches this code if the variable is declared but
 * left blank for the active Vercel environment (or unset locally). Any
 * blank or non-URL value falls back to localhost rather than letting it
 * reach `new URL()` downstream in lib/seo/schema.ts. When the variable is
 * present and valid, its value is always used as-is (production prefers
 * the real configured domain over the fallback).
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";

  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

export const siteConfig = {
  name: "The Growth Files",
  tagline: "Website growth + performance systems",
  description:
    "I help brands grow through performance marketing, AI Search, SEO, SEA, analytics and growth strategy, connecting visibility, paid media, tracking and conversion into one measurable system.",
  url: resolveSiteUrl(),
} as const;

export const contact = {
  email: "benavidesorling@gmail.com",
  phone: "+31 6 28022153",
  location: "Amsterdam, The Netherlands",
  linkedinLabel: "linkedin.com/in/benavideesf1b4",
  linkedinUrl: "https://linkedin.com/in/benavideesf1b4",
} as const;

/**
 * Where contact-form submissions are delivered. Overridable via
 * CONTACT_TO_EMAIL (server-only env var, read only in API routes — never
 * imported into a client component) for staging/testing without touching
 * the publicly-displayed address above. Not a secret: it defaults to the
 * same email already shown throughout the site.
 */
export const contactDestinationEmail = process.env.CONTACT_TO_EMAIL || contact.email;

export type NavKey = "Home" | "Services" | "CaseStudies" | "Blog" | "About" | "Contact";

export const mainNav: { key: NavKey; label: string; href: string }[] = [
  { key: "Services", label: "Services", href: "/services" },
  { key: "CaseStudies", label: "Case Studies", href: "/case-studies" },
  { key: "Blog", label: "Blog", href: "/blog" },
  { key: "About", label: "About", href: "/about" },
  { key: "Contact", label: "Contact", href: "/contact" },
];

export const footerNav = mainNav;
