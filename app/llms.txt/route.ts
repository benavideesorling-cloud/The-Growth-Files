import { client } from "@/sanity/lib/client";
import { llmsTxtCaseStudiesQuery, llmsTxtPostsQuery } from "@/sanity/lib/queries";
import { buildLlmsTxt, type LlmsTxtCaseStudy, type LlmsTxtPost } from "@/lib/content/llms";

export const revalidate = 60;

/**
 * llms.txt — a structured, machine-readable overview of The Growth Files:
 * positioning, services, results, case studies, topic clusters, FAQs and
 * the article knowledge base. Case studies/posts/FAQs are fetched live
 * from Sanity's published-only client (never drafts), filtered to exclude
 * anything marked noindex — see lib/content/llms.ts for how the document
 * is assembled and why nothing here is invented.
 */
export async function GET() {
  const [posts, caseStudies] = await Promise.all([
    client.fetch<LlmsTxtPost[]>(llmsTxtPostsQuery),
    client.fetch<LlmsTxtCaseStudy[]>(llmsTxtCaseStudiesQuery),
  ]);

  const body = buildLlmsTxt(posts, caseStudies);

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
