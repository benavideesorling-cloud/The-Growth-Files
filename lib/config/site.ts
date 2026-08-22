export const siteConfig = {
  name: "The Growth Files",
  tagline: "Website growth + performance systems",
  description:
    "I help brands grow through performance marketing, AI Search, SEO, SEA, analytics and growth strategy, connecting visibility, paid media, tracking and conversion into one measurable system.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const contact = {
  email: "benavidesorling@gmail.com",
  phone: "+31 6 28022153",
  location: "Amsterdam, The Netherlands",
  linkedinLabel: "linkedin.com/in/benavideesf1b4",
  linkedinUrl: "https://linkedin.com/in/benavideesf1b4",
} as const;

export type NavKey = "Home" | "Services" | "CaseStudies" | "Blog" | "About" | "Contact";

export const mainNav: { key: NavKey; label: string; href: string }[] = [
  { key: "Services", label: "Services", href: "/services" },
  { key: "CaseStudies", label: "Case Studies", href: "/case-studies" },
  { key: "Blog", label: "Blog", href: "/blog" },
  { key: "About", label: "About", href: "/about" },
  { key: "Contact", label: "Contact", href: "/contact" },
];

export const footerNav = mainNav;
