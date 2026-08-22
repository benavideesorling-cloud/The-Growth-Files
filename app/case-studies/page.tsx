import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTABand, CTAHeading, CTADescription } from "@/components/sections/CTABand";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allCaseStudiesQuery } from "@/sanity/lib/queries";
import type { SanityCaseStudyListItem } from "@/sanity/lib/types";
import { contact } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";

export const revalidate = 60;

// Verbatim from the page's own hero copy — not new copy.
const pageDescription =
  "Five growth programs. Clear context, decisions and measurable outcomes. Each case study explains what changed, why it mattered and what came next.";

export const metadata: Metadata = {
  title: "Case Studies",
  description: pageDescription,
  alternates: { canonical: "/case-studies" },
  openGraph: pageOpenGraph({ title: "Case Studies | The Growth Files", description: pageDescription, url: "/case-studies" }),
};

export default async function CaseStudiesPage() {
  const caseStudies = await sanityFetch<SanityCaseStudyListItem[]>(allCaseStudiesQuery);

  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/case-studies", name: "Case Studies", description: pageDescription, type: "CollectionPage" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }])} />
      <Header active="CaseStudies" />

      <section className="bg-navy px-5 pt-16 pb-10 sm:px-8 md:px-12 md:pt-[90px] md:pb-[60px]">
        <Container>
          <Eyebrow label="CASE STUDIES" />
          <h1 className="mt-6 mb-4 text-[34px] leading-[1.1] font-extrabold tracking-tight text-white md:text-[48px]">
            Real campaigns.
            <br />
            Documented results.
          </h1>
          <p className="max-w-[620px] text-[17px] leading-relaxed text-[#b6c0cc]">
            Five growth programs. Clear context, decisions and measurable outcomes. Each case study explains
            what changed, why it mattered and what came next.
          </p>
        </Container>
      </section>

      <section className="bg-navy px-5 pb-16 sm:px-8 md:px-12 md:pb-[90px]">
        <Container className="flex flex-col gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} entry={{ ...study.index, href: `/case-studies/${study.slug}` }} index={i} />
          ))}
        </Container>
      </section>

      <CTABand layout="grid">
        <div>
          <Eyebrow label="LET'S GET IN TOUCH" tone="inverse" />
          <CTAHeading className="mt-5">
            Let&apos;s build something
            <br />
            that actually works.
          </CTAHeading>
          <CTADescription>
            Open to selected projects and interesting opportunities.
          </CTADescription>
          <div className="mt-6">
            <Button href="/contact" variant="inverse">
              Get in touch
            </Button>
          </div>
        </div>
        <div className="text-sm leading-[2.2] font-bold text-navy">
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <div>{contact.location}</div>
          <div>{contact.linkedinLabel}</div>
        </div>
        <div>
          <div className="mb-2.5 text-[13px] font-bold text-navy">Open to:</div>
          <div className="text-sm leading-loose text-navy">
            <div>• Selected performance marketing projects</div>
            <div>• Growth &amp; AI Search projects</div>
            <div>• Interesting opportunities</div>
          </div>
        </div>
      </CTABand>
    </>
  );
}
