import { siteConfig, contact } from "@/lib/config/site";
import { client } from "@/sanity/lib/client";
import { allCaseStudiesQuery, allPostsQuery } from "@/sanity/lib/queries";
import type { SanityCaseStudyListItem, SanityPostListItem } from "@/sanity/lib/types";

export const revalidate = 60;

/**
 * llms.txt — an emerging, unstandardized convention for giving AI
 * crawlers a curated overview of a site. Per the site's own "What is
 * llms.txt, and do I need one?" post, Google has explicitly said it isn't
 * used for Search or its AI features, and the confirmed evidence of any
 * citation benefit is thin — this exists as a low-cost, honest summary
 * (real titles/URLs pulled live from Sanity, nothing invented) rather
 * than a claimed ranking lever.
 */
export async function GET() {
  const [posts, caseStudies] = await Promise.all([
    client.fetch<SanityPostListItem[]>(allPostsQuery),
    client.fetch<SanityCaseStudyListItem[]>(allCaseStudiesQuery),
  ]);

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Services](${siteConfig.url}/services): Performance marketing, AI Search & SEO, analytics, industry growth, and creative disciplines.`);
  lines.push(`- [About](${siteConfig.url}/about): Background and working discipline.`);
  lines.push(`- [Case studies](${siteConfig.url}/case-studies): Documented growth results with context, decisions and outcomes.`);
  lines.push(`- [Blog](${siteConfig.url}/blog): Field notes on AI Search, paid media, analytics and growth.`);
  lines.push(`- [Contact](${siteConfig.url}/contact): ${contact.email}`);
  lines.push("");

  if (caseStudies.length) {
    lines.push("## Case studies");
    for (const study of caseStudies) {
      lines.push(`- [${study.index.title}](${siteConfig.url}/case-studies/${study.slug}): ${study.index.desc}`);
    }
    lines.push("");
  }

  if (posts.length) {
    lines.push("## Blog posts");
    for (const post of posts) {
      lines.push(`- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.excerpt}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
