import type { Image as SanityImageValue } from "sanity";
import type { PortableTextBlock } from "@portabletext/react";
import type { CaseStudySectionBlock } from "@/components/case-studies/CaseStudySectionBody";

export type SanityAuthor = {
  name: string;
  slug: string;
  role?: string;
  shortBio?: string;
  image?: SanityImageValue & { aspectRatio?: number };
  linkedinUrl?: string;
  websiteUrl?: string;
};

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyphrase?: string;
  secondaryKeyphrases?: string[];
  socialTitle?: string;
  socialDescription?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: (SanityImageValue & { aspectRatio?: number; alt?: string }) | null;
};

export type SanityFaq = { q: string; a: string };

export type SanityCategory = { title: string; slug: string };

export type SanityRelatedPostRef = { title: string; slug: string };
export type SanityRelatedCaseStudyRef = { h1: string; slug: string };

export type SanityPostListItem = {
  num: string;
  title: string;
  slug: string;
  excerpt: string;
  teaser: string;
  categories: string[];
  featuredImage?: (SanityImageValue & { aspectRatio?: number; alt?: string; caption?: string }) | null;
  publishedAt: string;
  readingTime?: string;
  featured?: boolean;
  author: SanityAuthor;
};

export type SanityPost = SanityPostListItem & {
  lead: string;
  body: PortableTextBlock[];
  faqs?: SanityFaq[];
  relatedServices?: string[];
  relatedPosts?: SanityRelatedPostRef[];
  relatedCaseStudies?: SanityRelatedCaseStudyRef[];
  updatedAt?: string;
  seo?: SanitySeo;
};

export type SanityCaseStudyStat = { value: string; label: string };

export type SanityCaseStudySection = {
  eyebrow: string;
  heading: string;
  body: CaseStudySectionBlock[];
};

export type SanityCaseStudyIndex = {
  tag: string;
  title: string;
  desc: string;
  meta: string;
  stat: string;
  statLabel: string;
  statSub: string;
};

export type SanityCaseStudyListItem = {
  slug: string;
  eyebrow: string;
  index: SanityCaseStudyIndex;
};

export type SanityCaseStudy = {
  eyebrow: string;
  slug: string;
  h1: string;
  subtitle: string;
  metaLine?: string;
  stats?: SanityCaseStudyStat[];
  sections: SanityCaseStudySection[];
  resultsLabel?: string;
  results?: string[];
  proofLabel?: string;
  proofHeading?: string;
  proof?: string[];
  relatedServices?: string[];
  relatedPosts?: SanityRelatedPostRef[];
  faqs?: SanityFaq[];
  ctaHeading?: string;
  index: SanityCaseStudyIndex;
  order: number;
  featuredImage?: (SanityImageValue & { aspectRatio?: number; alt?: string; caption?: string }) | null;
  publishedAt?: string;
  updatedAt?: string;
  seo?: SanitySeo;
};
