import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { client } from "@/sanity/lib/client";
import { sitemapCaseStudiesQuery, sitemapPostsQuery } from "@/sanity/lib/queries";

type SitemapDoc = { slug: string; publishedAt?: string; updatedAt?: string; noindex?: boolean };

const STATIC_ROUTES = ["", "/services", "/about", "/contact", "/blog", "/case-studies"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    client.fetch<SitemapDoc[]>(sitemapPostsQuery),
    client.fetch<SitemapDoc[]>(sitemapCaseStudiesQuery),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
    }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies
    .filter((study) => !study.noindex)
    .map((study) => ({
      url: `${siteConfig.url}/case-studies/${study.slug}`,
      // No publishedAt/updatedAt exists for case studies yet (see the
      // Phase 6/7 reports) — omitting lastModified entirely is more
      // honest than fabricating a date.
      ...(study.updatedAt || study.publishedAt ? { lastModified: study.updatedAt ?? study.publishedAt } : {}),
    }));

  return [...staticEntries, ...postEntries, ...caseStudyEntries];
}
