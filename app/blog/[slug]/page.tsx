import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQList } from "@/components/sections/FAQList";
import { BlogPortableText } from "@/components/sanity/BlogPortableText";
import { renderInline } from "@/lib/content/inline";
import { formatDisplayDate } from "@/lib/content/formatDate";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { allPostSlugsQuery, allPostsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import type { SanityPost, SanityPostListItem } from "@/sanity/lib/types";
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
  // Uses the plain published client directly, not sanityFetch — draftMode()
  // can't be called from generateStaticParams (it runs at build time, with
  // no request/cookies), and static params should only ever enumerate
  // published slugs anyway.
  const slugs = await client.fetch<string[]>(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!post) return {};

  const title = resolveDisplayTitle(post.seo?.metaTitle, post.title);
  const description = resolveMetaDescription(post.seo?.metaDescription, post.excerpt);
  const socialTitle = resolveSocialTitle(post.seo?.socialTitle, title);
  const socialDescription = resolveSocialDescription(post.seo?.socialDescription, description);
  const canonicalPath = resolveCanonicalPath(post.seo?.canonicalUrl, `/blog/${post.slug}`);
  const ogImage = post.seo?.ogImage || post.featuredImage;

  return {
    // resolveDisplayTitle already produces the full " | The Growth Files"
    // suffixed string either way (override used as-is, since migrated
    // content bakes the suffix in by convention; fallback built from the
    // same template the root layout would otherwise apply) — so this
    // always bypasses Next's title template rather than conditionally.
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: !post.seo?.noindex,
      follow: !post.seo?.nofollow,
    },
    openGraph: pageOpenGraph({
      title: socialTitle,
      description: socialDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      // Omit the key entirely (not `images: undefined`) when there's no
      // Sanity image — an explicit `undefined` value still counts as
      // "provided" to Next's metadata resolver and suppresses the
      // automatic fallback to the default opengraph-image.tsx route.
      ...(ogImage ? { images: [urlFor(ogImage).width(1200).height(630).url()] } : {}),
    }),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    sanityFetch<SanityPost | null>(postBySlugQuery, { slug }),
    sanityFetch<SanityPostListItem[]>(allPostsQuery),
  ]);
  if (!post) notFound();

  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[(index - 1 + allPosts.length) % allPosts.length]!;
  const next = allPosts[(index + 1) % allPosts.length]!;

  const articleImageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          path: `/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          imageUrl: articleImageUrl,
          section: post.categories,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Header active="Blog" />

      <section className="bg-navy px-5 pt-14 pb-12 sm:px-8 md:px-12 md:pt-16 md:pb-14">
        <Container>
          <Link href="/blog" className="text-[13px] text-muted-alt">
            ← All field notes
          </Link>
          <div className="mt-6">
            <Eyebrow label={`FIELD NOTE ${post.num} · ${post.categories.join(" · ")}`} />
          </div>
          <h1 className="mt-5 mb-[18px] max-w-[880px] text-[32px] leading-[1.15] font-extrabold tracking-tight text-white md:text-[44px]">
            {post.title}
          </h1>
          <p className="mb-5 max-w-[700px] text-[17px] leading-relaxed text-[#b6c0cc]">{post.excerpt}</p>
          <div className="font-mono text-xs tracking-[0.04em] text-muted-alt">
            {post.categories.join(" · ").toUpperCase()} &nbsp;|&nbsp; {formatDisplayDate(post.publishedAt).toUpperCase()}{" "}
            &nbsp;|&nbsp; {(post.readingTime ?? "").toUpperCase()}
          </div>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-16 pb-5 sm:px-8 md:px-12">
        <Container className="max-w-[760px]">
          <p className="m-0 mb-2 border-l-2 border-green pl-[22px] text-xl leading-relaxed font-medium text-navy">
            {renderInline(post.lead, "lead")}
          </p>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-6 pb-16 sm:px-8 md:px-12 md:pb-20">
        <Container className="max-w-[760px]">
          <BlogPortableText value={post.body} />
        </Container>
      </section>

      {post.faqs?.length ? (
        <section className="bg-navy px-5 py-16 sm:px-8 md:px-12 md:py-[76px]">
          <Container className="max-w-[760px]">
            <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-green">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="mb-8 text-[28px] font-extrabold tracking-tight text-white md:mb-[34px] md:text-[30px]">
              The questions people actually ask.
            </h2>
            <FAQList
              faqs={post.faqs.map((f, i) => ({ q: f.q, a: renderInline(f.a, `faq-${i}`) }))}
              variant="dark"
            />
          </Container>
        </section>
      ) : null}

      {post.relatedServices?.length ? (
        <section className="bg-[#f8f9f8] px-5 py-16 sm:px-8 md:px-12 md:py-[70px]">
          <Container className="max-w-[760px]">
            <h2 className="mb-3.5 font-mono text-xs tracking-[0.06em] text-green-dark">RELATED SERVICES</h2>
            {post.relatedServices.map((paragraph, i) => (
              <p key={i} className="mb-4 text-[17px] leading-[1.78] text-body-alt last:mb-0">
                {renderInline(paragraph, `related-${i}`)}
              </p>
            ))}
          </Container>
        </section>
      ) : null}

      <section className="bg-[#f8f9f8] px-5 pb-16 sm:px-8 md:px-12 md:pb-[90px]">
        <Container className="grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href={`/blog/${prev.slug}`}
            className="block rounded-lg border border-[#e2e6e2] bg-white px-6 py-[22px] transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(13,24,38,0.08)]"
          >
            <div className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-muted">← PREVIOUS NOTE</div>
            <div className="text-base leading-snug font-bold text-navy">{prev.title}</div>
          </Link>
          <Link
            href={`/blog/${next.slug}`}
            className="block rounded-lg border border-[#e2e6e2] bg-white px-6 py-[22px] text-right transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(13,24,38,0.08)]"
          >
            <div className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-muted">NEXT NOTE →</div>
            <div className="text-base leading-snug font-bold text-navy">{next.title}</div>
          </Link>
        </Container>
      </section>
    </>
  );
}
