import { contact, siteConfig } from "@/lib/config/site";
import { services } from "@/lib/content/services";
import { stats } from "@/lib/content/stats";

/**
 * Builds the full /llms.txt document — a structured, machine-readable
 * overview of The Growth Files for AI crawlers. Every fact here traces
 * back to something already published on the site: the six services and
 * five headline stats come from lib/content/services.ts and
 * lib/content/stats.ts (the same source the visual Services/Home/About
 * pages render from), and case studies/posts/FAQs are fetched live from
 * Sanity by the route handler and passed in here — nothing is
 * hardcoded that would go stale as content changes. Per the site's own
 * "What is llms.txt, and do I need one?" post, Google has said this file
 * isn't used for Search or its AI features, so this exists as a low-cost,
 * honest summary rather than a claimed ranking lever.
 *
 * A small number of items below (the "Working with The Growth Files" FAQ
 * group, and a few Topics entries) aren't quoted verbatim from a single
 * page — they're short factual restatements of the service descriptions
 * above them (e.g. "SEA" spelled out, or "which paid channels" listed from
 * what the case studies actually show), never a new claim, stat, or client
 * name.
 */

export type LlmsTxtPost = {
  title: string;
  slug: string;
  excerpt: string;
  categories: string[];
  faqs: { q: string; a: string }[];
};

export type LlmsTxtCaseStudyIndex = {
  tag: string;
  title: string;
  desc: string;
  meta: string;
  stat: string;
  statLabel: string;
  statSub: string;
};

export type LlmsTxtCaseStudy = {
  slug: string;
  h1: string;
  subtitle: string;
  metaLine?: string;
  index: LlmsTxtCaseStudyIndex;
  results?: string[];
};

/** Collapses embedded newlines/tabs so CMS text can't break the line-based Markdown structure. Sanity's own intentional [text](url) links inside FAQ answers are left intact. */
function clean(text: string | undefined | null): string {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function url(path: string): string {
  return `${siteConfig.url}${path}`;
}

const CASE_STUDIES_URL = url("/case-studies");

const CORE_EXPERTISE: { heading: string; items: string[] }[] = [
  {
    heading: "Performance Marketing",
    items: [
      "performance marketing",
      "paid media",
      "paid acquisition",
      "Google Ads",
      "SEA (Search Engine Advertising)",
      "Microsoft Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "Apple Search Ads",
      "ROAS",
      "conversion tracking",
    ],
  },
  {
    heading: "AI Search / AEO / GEO",
    items: [
      "AI Search optimization",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
      "AI visibility",
      "AI citations",
      "AI brand visibility",
      "ChatGPT visibility",
      "generative search",
    ],
  },
  {
    heading: "SEO",
    items: [
      "SEO strategy",
      "technical SEO",
      "content structure",
      "structured data",
      "schema markup",
      "FAQ schema",
      "llms.txt",
      "search visibility",
    ],
  },
  {
    heading: "Analytics & Measurement",
    items: ["GA4", "Google Tag Manager (GTM)", "conversion tracking", "attribution", "funnel analysis", "marketing reporting"],
  },
];

const TOPIC_CLUSTERS: { heading: string; items: string[] }[] = [
  { heading: "Performance Marketing", items: ["Performance marketing strategy", "Paid acquisition", "ROAS optimization", "Budget allocation and channel scaling"] },
  { heading: "Google Ads / SEA", items: ["Google Ads", "Search, Display and Performance Max", "Microsoft Ads", "SEA account structure"] },
  { heading: "Paid Social", items: ["Meta Ads (Instagram, Facebook)", "LinkedIn Ads", "Organic and paid social reach"] },
  { heading: "AI Search / AEO / GEO", items: ["AI Search optimization", "Answer Engine Optimization (AEO)", "Generative Engine Optimization (GEO)", "AI citations and AI brand visibility"] },
  { heading: "SEO", items: ["Technical SEO", "Structured data and schema markup", "FAQ schema", "llms.txt"] },
  { heading: "Analytics & Measurement", items: ["GA4 and Google Tag Manager", "Attribution and funnel analysis", "Tracking AI referral traffic"] },
  { heading: "CRM / Lifecycle", items: ["CRM as part of the Industry Growth discipline"] },
  { heading: "App Acquisition", items: ["Apple Search Ads", "App install campaigns", "Discovery-to-generic keyword structure"] },
  { heading: "B2B Growth", items: ["B2B lead generation", "B2B social reach", "AEO for B2B buyer research"] },
];

/** Business-facing FAQs answered directly from Services/case-study/contact facts — not sourced from a single Sanity post. */
function businessFaqs(): { q: string; a: string; sourcePath: string }[] {
  return [
    {
      q: "What does The Growth Files do?",
      a: clean(siteConfig.description),
      sourcePath: "/",
    },
    {
      q: "What is SEA?",
      a: "SEA (Search Engine Advertising) is the paid-media discipline covering search advertising across platforms such as Google Ads and Microsoft Ads — one of the core channels under the Performance Marketing service.",
      sourcePath: "/services#performance-marketing",
    },
    {
      q: "Which paid media channels does The Growth Files work with?",
      a: "Documented work spans Google Ads, Microsoft Ads, Apple Search Ads, and paid social on Meta (Instagram and Facebook) and LinkedIn — see the individual case studies for each channel.",
      sourcePath: "/case-studies",
    },
    {
      q: "Does The Growth Files work with B2B and B2C companies?",
      a: "Yes. The Industry Growth discipline explicitly covers B2B, B2C, CRM, local visibility and app growth systems.",
      sourcePath: "/services#industry-growth",
    },
    {
      q: "What marketing analytics services are offered?",
      a: "GA4, Google Tag Manager, dashboards, attribution and funnel analysis, under the Analytics & Data discipline.",
      sourcePath: "/services#analytics-data",
    },
    {
      q: "What does The Growth Files' performance marketing work involve?",
      a: "SEA and paid media across search, social, apps and marketplaces, under the Performance Marketing discipline.",
      sourcePath: "/services#performance-marketing",
    },
  ];
}

/**
 * Across 12 posts' independently-written FAQ sets, exactly one pair asks
 * the literal same yes/no question in reverse ("Is GEO the same as AEO?"
 * vs. "Is AEO the same as GEO?") with near-identical answers — including
 * both adds no additional machine-readable context. Kept the version from
 * the post that defines GEO itself; dropped the other post's restatement.
 * Everything else in the FAQ set answers a genuinely distinct question, so
 * nothing else is excluded here.
 */
const DUPLICATE_FAQS = new Set(["seo-vs-aeo-vs-geo::is aeo the same as geo?"]);

function isDuplicateFaq(postSlug: string, question: string): boolean {
  return DUPLICATE_FAQS.has(`${postSlug}::${question.trim().toLowerCase()}`);
}

function section(heading: string, bodyLines: string[]): string[] {
  return [`## ${heading}`, "", ...bodyLines, ""];
}

export function buildLlmsTxt(posts: LlmsTxtPost[], caseStudies: LlmsTxtCaseStudy[]): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${clean(siteConfig.description)}`);
  lines.push("");

  // ## About
  lines.push(
    ...section("About", [
      `${siteConfig.name} is the performance marketing and AI Search practice of Orling Benavides, based in ${contact.location}.`,
      "",
      `- The Growth Files — ${siteConfig.url}`,
      `- Orling Benavides — practitioner behind The Growth Files, see ${url("/about")}`,
      `- Amsterdam, Netherlands — see ${url("/about")}`,
      `- Performance Marketing — ${url("/services#performance-marketing")}`,
      `- AI Search / AEO / GEO — ${url("/services#ai-search-seo")}`,
      `- SEO — part of the AI Search & SEO discipline: ${url("/services#ai-search-seo")}`,
      `- Marketing Analytics — ${url("/services#analytics-data")}`,
      `- Paid Media — part of Performance Marketing: ${url("/services#performance-marketing")}`,
      `- CRM — part of the Industry Growth discipline: ${url("/services#industry-growth")}`,
      `- App Acquisition — part of Industry Growth, see also "App growth: 0 → 85K+ installs" at ${url("/case-studies/app-growth-apple-search-ads")}`,
    ]),
  );

  // ## Core Expertise
  lines.push(`## Core Expertise`, "");
  for (const group of CORE_EXPERTISE) {
    lines.push(`### ${group.heading}`, "");
    for (const item of group.items) lines.push(`- ${item}`);
    lines.push("");
  }

  // ## Services
  lines.push(`## Services`, "");
  for (const svc of services) {
    const serviceUrl = url(`/services#${svc.slug}`);
    lines.push(`### ${svc.title}`, "");
    lines.push(`${svc.desc}`);
    lines.push(`- Output: ${svc.output}`);
    lines.push(`- URL: ${serviceUrl}`);
    lines.push("");
  }

  // ## Results / Experience
  lines.push(
    ...section("Results / Experience", [
      "Only metrics already published on the site — see the linked page/case study for full context.",
      "",
      ...stats.map((stat) => {
        let sourcePath = "/about";
        if (stat.label === "REVENUE GENERATED" || stat.label === "PEAK ROAS") sourcePath = "/case-studies/google-ads-revenue-growth";
        if (stat.label === "AD SPEND MANAGED") sourcePath = "/case-studies";
        if (stat.label === "MONTHLY AI CITATIONS") sourcePath = "/case-studies/ai-visibility-geo-aeo";
        const sourceUrl = url(sourcePath);
        return `- **${stat.value} ${stat.label.toLowerCase()}** — ${sourceUrl}`;
      }),
    ]),
  );

  // ## Case Studies
  lines.push(`## Case Studies`, "");
  for (const study of caseStudies) {
    const studyUrl = url(`/case-studies/${study.slug}`);
    lines.push(`### ${clean(study.index?.title || study.h1)}`, "");
    lines.push(`- Challenge: ${clean(study.subtitle)}`);
    if (study.metaLine) lines.push(`- Disciplines/channels: ${clean(study.metaLine)}`);
    if (study.index) lines.push(`- Outcome: **${clean(study.index.stat)} ${clean(study.index.statLabel)}** — ${clean(study.index.statSub)}`);
    lines.push(`- URL: ${studyUrl}`);
    lines.push("");
  }

  // ## Topics
  lines.push(`## Topics`, "");
  for (const cluster of TOPIC_CLUSTERS) {
    lines.push(`### ${cluster.heading}`, "");
    for (const item of cluster.items) lines.push(`- ${item}`);
    lines.push("");
  }

  // ## Frequently Asked Questions
  lines.push(`## Frequently Asked Questions`, "");
  lines.push(`### Working with The Growth Files`, "");
  for (const faq of businessFaqs()) {
    const sourceUrl = url(faq.sourcePath);
    lines.push(`**Q: ${faq.q}**`, "", faq.a, "", `Source: ${sourceUrl}`, "");
  }

  const postsByCategory = groupPostsByCategory(posts);
  for (const [category, categoryPosts] of postsByCategory) {
    const faqPosts = categoryPosts.filter((post) => post.faqs.length > 0);
    if (faqPosts.length === 0) continue;
    lines.push(`### ${category}`, "");
    for (const post of faqPosts) {
      const postUrl = url(`/blog/${post.slug}`);
      for (const faq of post.faqs) {
        if (isDuplicateFaq(post.slug, faq.q)) continue;
        lines.push(`**Q: ${clean(faq.q)}**`, "", clean(faq.a), "", `Source: ${postUrl}`, "");
      }
    }
  }

  // ## Articles / Knowledge Base
  lines.push(`## Articles / Knowledge Base`, "");
  for (const [category, categoryPosts] of postsByCategory) {
    lines.push(`### ${category}`, "");
    for (const post of categoryPosts) {
      const postUrl = url(`/blog/${post.slug}`);
      lines.push(`- [${clean(post.title)}](${postUrl}): ${clean(post.excerpt)}`);
    }
    lines.push("");
  }

  // ## Case Studies (Knowledge Base cross-reference, no separate section
  // needed — case studies already have their own dedicated section above)

  // ## Important URLs
  lines.push(
    ...section("Important URLs", [
      `- Homepage: ${url("/")}`,
      `- Services: ${url("/services")}`,
      `- Case Studies: ${CASE_STUDIES_URL}`,
      `- About: ${url("/about")}`,
      `- Blog: ${url("/blog")}`,
      `- Contact: ${url("/contact")}`,
      `- Sitemap: ${url("/sitemap.xml")}`,
      `- robots.txt: ${url("/robots.txt")}`,
    ]),
  );

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/**
 * Groups by each post's first category only — several posts carry more
 * than one (e.g. "AI Search" + "AEO & GEO"), and listing the same post
 * under every one of them would repeat its URL across sections.
 */
function groupPostsByCategory(posts: LlmsTxtPost[]): Map<string, LlmsTxtPost[]> {
  const map = new Map<string, LlmsTxtPost[]>();
  for (const post of posts) {
    const category = post.categories[0] ?? "General";
    if (!map.has(category)) map.set(category, []);
    map.get(category)!.push(post);
  }
  return map;
}
