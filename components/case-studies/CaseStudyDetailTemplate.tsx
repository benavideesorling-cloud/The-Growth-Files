import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CheckList } from "@/components/sections/CheckList";
import { ProofBox } from "@/components/sections/ProofBox";
import { FAQList } from "@/components/sections/FAQList";
import { CTABand } from "@/components/sections/CTABand";
import type { CaseStudy } from "@/lib/data/case-studies";

/**
 * Shared template for all 5 case study detail pages — same section-by-
 * section structure across every CaseStudyDetail*.dc.html file, differing
 * only in content and which optional pieces (StepList vs InfoCard grid vs
 * plain paragraphs) each section body composes, which lives in the data
 * file rather than here.
 */
export function CaseStudyDetailTemplate({ study }: { study: CaseStudy }) {
  return (
    <>
      <Header active="CaseStudies" />

      <section className="bg-navy px-5 pt-12 pb-10 sm:px-8 md:px-12 md:pt-[70px] md:pb-[60px]">
        <Container>
          <Link href="/case-studies" className="text-[13px] text-muted-alt">
            ← All case studies
          </Link>
          <div className="mt-6">
            <Eyebrow label={study.eyebrow} />
          </div>
          <h1 className="mt-5 mb-4 max-w-[900px] text-[34px] leading-[1.1] font-extrabold tracking-tight text-white md:text-[46px]">
            {study.h1}
          </h1>
          <p className="mb-4 max-w-[680px] text-[17px] leading-relaxed text-[#b6c0cc]">{study.subtitle}</p>
          <div className="font-mono text-xs tracking-[0.04em] text-muted-alt">{study.metaLine}</div>
        </Container>
      </section>

      <StatsStrip stats={study.stats} variant="card" />

      <section className="bg-paper px-5 py-16 sm:px-8 md:px-12 md:py-20">
        <Container className="flex max-w-[760px] flex-col gap-14">
          {study.sections.map((section) => (
            <div key={section.heading}>
              <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">{section.eyebrow}</div>
              <h2 className="mb-4 text-[28px] leading-[1.25] font-extrabold tracking-tight text-navy">
                {section.heading}
              </h2>
              {section.body}
            </div>
          ))}

          <div>
            <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">{study.resultsLabel}</div>
            <h2 className="mb-5 text-[28px] leading-[1.25] font-extrabold tracking-tight text-navy">Results</h2>
            <CheckList items={study.results} />
          </div>

          <ProofBox label={study.proofLabel} heading={study.proofHeading}>
            {study.proof}
          </ProofBox>

          <div>
            <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">RELATED SERVICES</div>
            <h2 className="mb-4 text-2xl leading-[1.3] font-extrabold tracking-tight text-navy">Related services</h2>
            {study.relatedServices}
          </div>

          <div>
            <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">FAQ</div>
            <h2 className="mb-5 text-2xl leading-[1.3] font-extrabold tracking-tight text-navy">FAQ</h2>
            <FAQList faqs={study.faqs} variant="light" />
          </div>
        </Container>
      </section>

      <CTABand>
        <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-navy md:text-[30px]">
          {study.ctaHeading}
        </h2>
        <Button href="/contact" variant="inverse">
          Get in touch
        </Button>
      </CTABand>
    </>
  );
}
