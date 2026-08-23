import { groq } from "next-sanity";

const authorFields = groq`
  author-> {
    name,
    "slug": slug.current,
    role,
    shortBio,
    image,
    linkedinUrl,
    websiteUrl
  }
`;

const seoFields = groq`
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyphrase,
    secondaryKeyphrases,
    socialTitle,
    socialDescription,
    noindex,
    nofollow,
    ogImage {
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  }
`;

const featuredImageField = groq`
  featuredImage {
    ...,
    "aspectRatio": asset->metadata.dimensions.aspectRatio
  }
`;

// Internal-linking prep for Phase 7 — fetched but not yet rendered anywhere.
const relatedContentFields = groq`
  relatedPosts[]-> { title, "slug": slug.current },
  relatedCaseStudies[]-> { h1, "slug": slug.current }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    num,
    title,
    "slug": slug.current,
    excerpt,
    "teaser": coalesce(teaser, excerpt),
    "categories": categories[]->title,
    ${featuredImageField},
    publishedAt,
    readingTime,
    featured,
    ${authorFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    num,
    title,
    "slug": slug.current,
    excerpt,
    lead,
    body,
    "faqs": faqs[] { "q": question, "a": answer },
    relatedServices,
    "categories": categories[]->title,
    ${featuredImageField},
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    ${authorFields},
    ${relatedContentFields},
    ${seoFields}
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    num,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    title,
    "slug": slug.current
  }
`;

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    "slug": slug.current,
    eyebrow,
    index
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    eyebrow,
    "slug": slug.current,
    h1,
    subtitle,
    metaLine,
    stats,
    sections,
    resultsLabel,
    results,
    proofLabel,
    proofHeading,
    proof,
    relatedServices,
    "faqs": faqs[] { "q": question, "a": answer },
    ctaHeading,
    index,
    order,
    ${featuredImageField},
    "relatedPosts": relatedPosts[]-> { title, "slug": slug.current },
    publishedAt,
    updatedAt,
    ${seoFields}
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

// Minimal projections for sitemap generation — slug, dates, and noindex
// only, so a noindexed document can be excluded without pulling its full
// content.
export const sitemapPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    updatedAt,
    "noindex": seo.noindex
  }
`;

export const sitemapCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    updatedAt,
    "noindex": seo.noindex
  }
`;

// Projections for llms.txt — published, non-noindex documents only, with
// just the fields the knowledge document actually surfaces.
export const llmsTxtPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && seo.noindex != true] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    "categories": categories[]->title,
    "faqs": faqs[] { "q": question, "a": answer }
  }
`;

export const llmsTxtCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && seo.noindex != true] | order(order asc) {
    "slug": slug.current,
    h1,
    subtitle,
    metaLine,
    index,
    results
  }
`;
