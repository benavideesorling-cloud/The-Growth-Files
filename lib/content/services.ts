/**
 * The six service disciplines — single source shared by the visual
 * Services page (app/services/page.tsx), the homepage's solution table
 * (app/page.tsx), and llms.txt (lib/content/llms.ts), so the same facts
 * never have to be edited in more than one place.
 */
export type Service = {
  num: string;
  slug: string;
  title: string;
  desc: string;
  output: string;
};

export const services: Service[] = [
  { num: "01", slug: "strategy", title: "Strategy", desc: "Roadmaps, priorities, workshops and senior growth direction.", output: "FOCUS" },
  { num: "02", slug: "performance-marketing", title: "Performance Marketing", desc: "SEA and paid media across search, social, apps and marketplaces.", output: "DEMAND" },
  { num: "03", slug: "ai-search-seo", title: "AI Search & SEO", desc: "GEO/AEO, SEO, structured data, schema and content architecture.", output: "CITATIONS" },
  { num: "04", slug: "analytics-data", title: "Analytics & Data", desc: "GA4, GTM, dashboards, attribution and funnel analysis.", output: "EVIDENCE" },
  { num: "05", slug: "industry-growth", title: "Industry Growth", desc: "B2B, B2C, CRM, local visibility and app growth systems.", output: "FIT" },
  { num: "06", slug: "creative-content", title: "Creative & Content", desc: "Landing pages, CRO, UX collaboration and content planning.", output: "ACTION" },
];
