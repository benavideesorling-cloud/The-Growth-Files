import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABand, CTAHeading, CTADescription } from "@/components/sections/CTABand";

const services = [
  { num: "01", title: "Strategy", desc: "Roadmaps, priorities, workshops and senior growth direction.", output: "FOCUS" },
  { num: "02", title: "Performance Marketing", desc: "SEA and paid media across search, social, apps and marketplaces.", output: "DEMAND" },
  { num: "03", title: "AI Search & SEO", desc: "GEO/AEO, SEO, structured data, schema and content architecture.", output: "CITATIONS" },
  { num: "04", title: "Analytics & Data", desc: "GA4, GTM, dashboards, attribution and funnel analysis.", output: "EVIDENCE" },
  { num: "05", title: "Industry Growth", desc: "B2B, B2C, CRM, local visibility and app growth systems.", output: "FIT" },
  { num: "06", title: "Creative & Content", desc: "Landing pages, CRO, UX collaboration and content planning.", output: "ACTION" },
];

const steps = [
  { title: "Diagnose", desc: "Find the leaks across visibility, media, tracking and conversion." },
  { title: "Prioritize", desc: "Choose what to fix, scale, stop or automate first." },
  { title: "Execute", desc: "Turn strategy into campaigns, content, tracking and workflows." },
  { title: "Improve", desc: "Measure outcomes and refine what works." },
];

export default function ServicesPage() {
  return (
    <>
      <Header active="Services" />

      <section className="bg-navy px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-[90px] md:pb-[70px]">
        <Container>
          <Eyebrow label="SERVICES" />
          <h1 className="mt-6 mb-4 max-w-[760px] text-[36px] font-extrabold tracking-tight text-white md:text-[48px]">
            Growth services, not marketing tasks.
          </h1>
          <p className="max-w-[620px] text-[17px] leading-relaxed text-[#b6c0cc]">
            Six connected disciplines, each with clear ownership, proof and measurable outcomes.
          </p>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-16 pb-8 sm:px-8 md:px-12 md:pt-[80px] md:pb-10">
        <Container>
          <Eyebrow label="THE DISCIPLINES" />
          <h2 className="mt-5 mb-10 text-[28px] font-extrabold tracking-tight text-navy md:text-[34px]">
            Every tool. Every channel. One goal.
          </h2>
          <ServiceGrid services={services} />
        </Container>
      </section>

      <section className="bg-paper px-5 pt-8 pb-16 sm:px-8 md:px-12 md:pt-10 md:pb-[90px]">
        <Container>
          <ProcessSteps
            eyebrow="HOW IT WORKS"
            headline="Diagnose. Prioritize. Execute. Improve."
            steps={steps}
            variant="bordered"
          />
        </Container>
      </section>

      <CTABand>
        <div>
          <CTAHeading>Let&apos;s build something that actually works.</CTAHeading>
          <CTADescription>
            Available for consulting, freelance projects and performance marketing roles.
          </CTADescription>
        </div>
        <Button href="/contact" variant="inverse">
          Get in touch
        </Button>
      </CTABand>
    </>
  );
}
