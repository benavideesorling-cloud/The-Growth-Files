import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyDetailTemplate } from "@/components/case-studies/CaseStudyDetailTemplate";
import { CaseStudyViewTracker } from "@/components/analytics/CaseStudyViewTracker";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { allCaseStudySlugsQuery, caseStudyBySlugQuery } from "@/sanity/lib/queries";
import type { SanityCaseStudy } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";
import {
  resolveCanonicalPath,
  resolveDisplayTitle,
  resolveMetaDescription,
  resolveSocialDescription,
  resolveSocialTitle,
} from "@/lib/seo/resolve";

export const revalidate = 60;

export async function generateStaticParams() {
  // Plain published client, not sanityFetch — see app/blog/[slug]/page.tsx.
  const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await sanityFetch<SanityCaseStudy | null>(caseStudyBySlugQuery, { slug });
  if (!study) return {};

  const title = resolveDisplayTitle(study.seo?.metaTitle, study.h1);
  const description = resolveMetaDescription(study.seo?.metaDescription, study.subtitle);
  const socialTitle = resolveSocialTitle(study.seo?.socialTitle, title);
  const socialDescription = resolveSocialDescription(study.seo?.socialDescription, description);
  const canonicalPath = resolveCanonicalPath(study.seo?.canonicalUrl, `/case-studies/${study.slug}`);
  const ogImage = study.seo?.ogImage || study.featuredImage;

  return {
    // See app/blog/[slug]/page.tsx — resolveDisplayTitle already produces
    // the fully suffixed string either way, so this always bypasses
    // Next's title template.
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: !study.seo?.noindex,
      follow: !study.seo?.nofollow,
    },
    openGraph: pageOpenGraph({
      title: socialTitle,
      description: socialDescription,
      type: "article",
      publishedTime: study.publishedAt,
      modifiedTime: study.updatedAt,
      // Same reasoning as app/blog/[slug]/page.tsx — omit the key rather
      // than passing `images: undefined`.
      ...(ogImage ? { images: [urlFor(ogImage).width(1200).height(630).url()] } : {}),
    }),
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await sanityFetch<SanityCaseStudy | null>(caseStudyBySlugQuery, { slug });
  if (!study) notFound();

  const articleImageUrl = study.featuredImage ? urlFor(study.featuredImage).width(1200).height(630).url() : undefined;

  return (
    <>
      <CaseStudyViewTracker slug={study.slug} name={study.h1} />
      <JsonLd
        data={articleJsonLd({
          path: `/case-studies/${study.slug}`,
          headline: study.h1,
          description: study.subtitle,
          // No real publishedAt/updatedAt exists for case studies yet
          // (see the Phase 6/7 reports) — omitted rather than fabricated.
          datePublished: study.publishedAt,
          dateModified: study.updatedAt,
          imageUrl: articleImageUrl,
          isCaseStudy: true,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.h1, path: `/case-studies/${study.slug}` },
        ])}
      />
      <CaseStudyDetailTemplate study={study} />
    </>
  );
}
