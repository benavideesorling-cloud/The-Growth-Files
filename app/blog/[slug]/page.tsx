import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQList } from "@/components/sections/FAQList";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { POSTS } from "@/lib/data/blog-posts";
import { parseBlogMarkdown } from "@/lib/content/parseBlogMarkdown";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = POSTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const post = POSTS[index]!;
  const prev = POSTS[(index - 1 + POSTS.length) % POSTS.length]!;
  const next = POSTS[(index + 1) % POSTS.length]!;
  const parsed = parseBlogMarkdown(post.md);

  return (
    <>
      <Header active="Blog" />

      <section className="bg-navy px-5 pt-14 pb-12 sm:px-8 md:px-12 md:pt-16 md:pb-14">
        <Container>
          <Link href="/blog" className="text-[13px] text-muted-alt">
            ← All field notes
          </Link>
          <div className="mt-6">
            <Eyebrow label={`FIELD NOTE ${post.num} · ${post.tag}`} />
          </div>
          <h1 className="mt-5 mb-[18px] max-w-[880px] text-[32px] leading-[1.15] font-extrabold tracking-tight text-white md:text-[44px]">
            {post.title}
          </h1>
          <p className="mb-5 max-w-[700px] text-[17px] leading-relaxed text-[#b6c0cc]">{post.metaDesc}</p>
          <div className="font-mono text-xs tracking-[0.04em] text-muted-alt">
            {post.tag} &nbsp;|&nbsp; {post.date.toUpperCase()} &nbsp;|&nbsp; {post.read.toUpperCase()}
          </div>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-16 pb-5 sm:px-8 md:px-12">
        <Container className="max-w-[760px]">
          <p className="m-0 mb-2 border-l-2 border-green pl-[22px] text-xl leading-relaxed font-medium text-navy">
            {parsed.lead}
          </p>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-6 pb-16 sm:px-8 md:px-12 md:pb-20">
        <Container className="max-w-[760px]">
          <BlogPostBody blocks={parsed.blocks} />
        </Container>
      </section>

      {parsed.faqs.length ? (
        <section className="bg-navy px-5 py-16 sm:px-8 md:px-12 md:py-[76px]">
          <Container className="max-w-[760px]">
            <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-green">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="mb-8 text-[28px] font-extrabold tracking-tight text-white md:mb-[34px] md:text-[30px]">
              The questions people actually ask.
            </h2>
            <FAQList faqs={parsed.faqs} variant="dark" />
          </Container>
        </section>
      ) : null}

      {parsed.related.length ? (
        <section className="bg-[#f8f9f8] px-5 py-16 sm:px-8 md:px-12 md:py-[70px]">
          <Container className="max-w-[760px]">
            <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-green-dark">RELATED SERVICES</div>
            {parsed.related.map((paragraph, i) => (
              <p key={i} className="mb-4 text-[17px] leading-[1.78] text-body-alt last:mb-0">
                {paragraph}
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
