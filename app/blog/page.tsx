import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BlogFilterGrid } from "@/components/blog/BlogFilterGrid";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allCategoriesQuery, allPostsQuery, featuredPostQuery } from "@/sanity/lib/queries";
import type { SanityCategory, SanityPostListItem } from "@/sanity/lib/types";
import { formatDisplayDate } from "@/lib/content/formatDate";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";

export const revalidate = 60;

// Verbatim from the page's own hero copy — not new copy.
const pageDescription =
  "Practical frameworks, experiments and postmortems from running performance marketing, AI Search, SEO and analytics across real businesses.";

export const metadata: Metadata = {
  title: "Blog",
  description: pageDescription,
  alternates: { canonical: "/blog" },
  openGraph: pageOpenGraph({ title: "Blog | The Growth Files", description: pageDescription, url: "/blog" }),
};

type FeaturedPost = {
  num: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: string;
};

/**
 * The featured-note panel (mini CONTENT/TRUST/TECHNICAL/SURFACES stat list,
 * "START HERE · AI SEARCH" framing, "01" numeral treatment) is bespoke
 * editorial design built around one specific post, not a generic per-post
 * layout — reproducing it from structured fields would mean inventing
 * schema fields with no other use, which the brief prohibits. Its chrome
 * stays hardcoded; only the title/excerpt/date/num text is wired to the
 * live Sanity post marked `featured` so it can never drift from real
 * content.
 */
function FeaturedCard({ post }: { post: FeaturedPost }) {
  return (
    <>
      <Eyebrow label="FEATURED NOTE" />
      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 grid grid-cols-1 overflow-hidden rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)] md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="bg-navy-panel p-9 text-green">
          <div className="mb-4 font-mono text-5xl font-bold">{post.num}</div>
          <div className="mb-6 text-[15px] font-bold tracking-[0.02em] text-white">
            AI SEARCH
            <br />
            OPTIMIZATION
          </div>
          <div className="flex flex-col gap-2.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span>CONTENT</span>
              <span className="text-muted-alt">EXTRACTABLE</span>
            </div>
            <div className="flex justify-between">
              <span>TRUST</span>
              <span className="text-muted-alt">VERIFIABLE</span>
            </div>
            <div className="flex justify-between">
              <span>TECHNICAL</span>
              <span className="text-muted-alt">PARSEABLE</span>
            </div>
            <div className="flex justify-between">
              <span>SURFACES</span>
              <span className="text-muted-alt">4 PLATFORMS</span>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="mb-3.5 font-mono text-xs tracking-[0.04em] text-green-dark">START HERE · AI SEARCH</div>
          <h2 className="mb-3.5 text-[26px] leading-[1.3] font-extrabold tracking-tight text-navy">{post.title}</h2>
          <div className="mb-5 text-[15px] leading-relaxed text-body">{post.excerpt}</div>
          <div className="mb-[22px] text-[13px] text-muted">
            {formatDisplayDate(post.publishedAt)}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </div>
          <div className="inline-block rounded-md bg-navy px-[22px] py-3 text-sm font-bold text-white">
            Read field note
          </div>
        </div>
      </Link>

      <div className="mt-16 md:mt-20">
        <Eyebrow label="LATEST NOTES" />
        <h2 className="mt-5 text-[28px] font-extrabold tracking-tight text-navy md:text-[32px]">
          Frameworks, experiments and postmortems.
        </h2>
      </div>
    </>
  );
}

export default async function BlogPage() {
  const [posts, featured, categories] = await Promise.all([
    sanityFetch<SanityPostListItem[]>(allPostsQuery),
    sanityFetch<FeaturedPost | null>(featuredPostQuery),
    sanityFetch<SanityCategory[]>(allCategoriesQuery),
  ]);

  const cards = posts
    .filter((post) => post.slug !== featured?.slug)
    .map((post) => ({
      num: post.num,
      slug: post.slug,
      categories: post.categories,
      title: post.title,
      desc: post.teaser,
      date: `${formatDisplayDate(post.publishedAt)}${post.readingTime ? ` · ${post.readingTime}` : ""}`,
    }));

  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/blog", name: "Blog", description: pageDescription, type: "CollectionPage" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <Header active="Blog" />

      <section className="bg-navy px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-[90px] md:pb-[70px]">
        <Container>
          <Eyebrow label="FIELD NOTES" />
          <h1 className="mt-6 mb-5 max-w-[700px] text-[32px] leading-[1.15] font-extrabold tracking-tight text-white md:text-[44px]">
            Writing about AI, paid media and the unglamorous work of growth.
          </h1>
          <p className="max-w-[600px] text-base leading-relaxed text-[#b6c0cc]">
            Practical frameworks, experiments and postmortems from running performance marketing, AI
            Search, SEO and analytics across real businesses.
          </p>
        </Container>
      </section>

      <BlogFilterGrid posts={cards} categories={categories} featuredSlot={featured ? <FeaturedCard post={featured} /> : null} />

      <section className="bg-navy px-5 py-14 sm:px-8 md:px-12">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="mb-2.5 font-mono text-xs tracking-[0.06em] text-green">NOTES, NOT NOISE.</div>
            <div className="mb-2 text-[26px] font-extrabold text-white">Get the useful ones by email.</div>
            <div className="text-sm text-muted">
              Occasional field notes on AI Search, paid media, analytics and growth systems.
            </div>
          </div>
          <NewsletterSignup />
        </Container>
      </section>
    </>
  );
}
