import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BlogFilterGrid } from "@/components/blog/BlogFilterGrid";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";

// Card-preview copy exactly as authored in Blog.dc.html — shorter/different
// from each post's metaDesc in lib/data/blog-posts.ts, which is used for
// the post pages' own meta description instead.
const posts = [
  { num: "02", slug: "what-is-aeo-vs-seo", tag: "AEO & GEO", title: "What is AEO, and how is it different from SEO?", desc: "AEO targets selection inside an answer the AI writes, before anyone sees a list of links.", date: "Aug 14, 2026 · 6 min read" },
  { num: "03", slug: "what-is-geo-vs-aeo", tag: "AEO & GEO", title: "What is GEO, and how is it different from AEO?", desc: "GEO is the umbrella discipline. AEO is one operational piece of it. Where the line sits.", date: "Aug 11, 2026 · 5 min read" },
  { num: "04", slug: "seo-vs-aeo-vs-geo", tag: "AEO & GEO", title: "SEO vs AEO vs GEO: a side by side comparison", desc: "Three disciplines, three different outcomes. Where they overlap and where they diverge.", date: "Aug 7, 2026 · 7 min read" },
  { num: "05", slug: "how-to-structure-content-for-ai-citation", tag: "AI SEARCH", title: "How to structure content so AI search engines actually cite it", desc: "Answer-first paragraphs, question-based headings, named sources, and what differs by platform.", date: "Aug 4, 2026 · 8 min read" },
  { num: "06", slug: "structured-data-and-llms-txt", tag: "TECHNICAL", title: "What is llms.txt, and do I need one?", desc: "What Google has actually confirmed about llms.txt, and what to prioritise instead.", date: "Jul 31, 2026 · 7 min read" },
  { num: "07", slug: "faq-schema-ai-visibility", tag: "TECHNICAL", title: "What's FAQ schema, and does it still help AI visibility?", desc: "Google retired FAQ rich results in May 2026. What that changed, and what it did not.", date: "Jul 28, 2026 · 6 min read" },
  { num: "08", slug: "check-track-ai-brand-visibility", tag: "MEASUREMENT", title: "How do I check and track whether AI systems know my brand?", desc: "Manual prompt auditing, then GA4 setup that captures what the native AI channel misses.", date: "Jul 24, 2026 · 7 min read" },
  { num: "09", slug: "aeo-for-b2b-companies", tag: "AI SEARCH", title: "Does AEO matter for B2B companies?", desc: "What the 2026 Semrush, G2 and Forrester buyer research actually shows.", date: "Jul 21, 2026 · 6 min read" },
  { num: "10", slug: "is-geo-the-future-of-seo", tag: "AEO & GEO", title: "Is GEO the future of SEO, and will AI search replace Google?", desc: "A real shift in share, not the end of search. What the numbers support.", date: "Jul 17, 2026 · 7 min read" },
  { num: "11", slug: "cost-of-ai-search-optimization", tag: "WORKING WITH ME", title: "How much does AI search optimization cost?", desc: "Published 2026 ranges, what actually moves the number, and one useful warning sign.", date: "Jul 14, 2026 · 6 min read" },
  { num: "12", slug: "seo-agency-vs-aeo-specialist", tag: "WORKING WITH ME", title: "Do I need an SEO agency or an AEO specialist?", desc: "Why splitting the two usually backfires, and what to check before hiring anyone.", date: "Jul 10, 2026 · 7 min read" },
];

const featuredCard = (
  <>
    <Eyebrow label="FEATURED NOTE" />
    <Link
      href="/blog/ai-search-optimization-explained"
      className="mt-6 grid grid-cols-1 overflow-hidden rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)] md:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="bg-navy-panel p-9 text-green">
        <div className="mb-4 font-mono text-5xl font-bold">01</div>
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
        <div className="mb-3.5 text-[26px] leading-[1.3] font-extrabold tracking-tight text-navy">
          AI search optimization, explained
        </div>
        <div className="mb-5 text-[15px] leading-relaxed text-body">
          What it actually involves, how it differs from traditional SEO, and why most AI answers cite
          only a handful of sources.
        </div>
        <div className="mb-[22px] text-[13px] text-muted">Aug 18, 2026 · 7 min read</div>
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

export default function BlogPage() {
  return (
    <>
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

      <BlogFilterGrid posts={posts} featuredSlot={featuredCard} />

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
