import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ManifestCard } from "@/components/structured/ManifestCard";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { SystemLeakMap } from "@/components/structured/SystemLeakMap";
import { SchemaTable } from "@/components/structured/SchemaTable";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CaseRecords } from "@/components/sections/CaseRecords";
import { CTABand, CTAHeading, CTADescription } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { contact, siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ title: siteConfig.name, description: siteConfig.description, url: "/" }),
};

const stats = [
  { value: "6+", label: "YEARS EXPERIENCE" },
  { value: "€1.3M+", label: "AD SPEND MANAGED" },
  { value: "€6.9M+", label: "REVENUE GENERATED" },
  { value: "554%", label: "PEAK ROAS" },
  { value: "250+", label: "WEEKLY AI CITATIONS" },
];

const ledgerRows = [
  { id: "01", label: '"visibility"', value: "AI Search + SEO" },
  { id: "02", label: '"acquisition"', value: "SEA + paid media" },
  { id: "03", label: '"measurement"', value: "analytics + CRM" },
  { id: "04", label: '"conversion"', value: "creative + CRO" },
  { label: '"systemOutput"', value: "measurable growth" },
];

const brands = [
  { name: "AkzoNobel", src: "/assets/logos/akzonobel.webp" },
  { name: "Ben & Jerry's", src: "/assets/logos/ben-jerrys.png", height: 72 },
  { name: "SUPS", src: "/assets/logos/sups.png", height: 64 },
  { name: "Virtek", src: "/assets/logos/virtek.png" },
  { name: "White Shark Media", src: "/assets/logos/whiteshark.png" },
  { name: "Central Bark", src: "/assets/logos/centralbark.jpeg", height: 72 },
  { name: "Heffner Toyota", src: "/assets/logos/heffner-toyota.png", height: 62 },
  { name: "Boels Rental", src: "/assets/logos/boels.webp" },
  { name: "ParkBee", src: "/assets/logos/parkbee.png" },
  { name: "Chameleon Business Centres", src: "/assets/logos/chameleon.png" },
  { name: "Rocketbarn", src: "/assets/logos/rocketbarn.png" },
  { name: "Hogenhouck M&A", src: "/assets/logos/hogenhouck.png" },
];

const solution = [
  { id: "01", property: '"direction"', title: "Strategy", desc: "Roadmaps, priorities, workshops and senior growth direction.", output: "focus" },
  { id: "02", property: '"acquisition"', title: "Performance Marketing", desc: "SEA and paid media across search, social, apps and marketplaces.", output: "demand" },
  { id: "03", property: '"visibility"', title: "AI Search & SEO", desc: "GEO/AEO, SEO, structured data, schema and content architecture.", output: "citations" },
  { id: "04", property: '"measurement"', title: "Analytics & Data", desc: "GA4, GTM, dashboards, attribution and funnel analysis.", output: "evidence" },
  { id: "05", property: '"adaptation"', title: "Industry Growth", desc: "B2B, B2C, CRM, local visibility and app growth systems.", output: "fit" },
  { id: "06", property: '"conversion"', title: "Creative & Content", desc: "Landing pages, CRO, UX collaboration and content planning.", output: "action" },
];

const steps = [
  { title: "Diagnose", desc: "Find the leaks across visibility, media, tracking and conversion." },
  { title: "Prioritize", desc: "Choose what to fix, scale, stop or automate first." },
  { title: "Execute", desc: "Turn strategy into campaigns, content, tracking and workflows." },
  { title: "Improve", desc: "Use evidence and testing to compound performance." },
];

const records = [
  {
    tag: "CASE 001",
    title: "Revenue Growth",
    stat: "€4M → €6.9M",
    sub: "72% year-on-year growth",
    href: "/case-studies/google-ads-revenue-growth",
  },
  {
    tag: "CASE 002",
    title: "AI Search Visibility",
    stat: "250+",
    sub: "weekly citations across AI platforms",
    href: "/case-studies/ai-visibility-geo-aeo",
  },
  {
    tag: "CASE 003",
    title: "App Growth",
    stat: "85K+",
    sub: "downloads through acquisition programs",
    href: "/case-studies/app-growth-apple-search-ads",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/", name: siteConfig.name, description: siteConfig.description })} />
      <Header active="Home" />

      <section className="bg-navy px-5 py-24 sm:px-8 md:px-12 md:py-[100px] md:pb-[90px]">
        <Container className="grid grid-cols-1 items-center gap-10 md:gap-[60px] md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow label="PERFORMANCE MARKETING + AI SEARCH" />
            <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[56px]">
              Every euro accountable.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#b6c0cc]">
              I help brands grow through performance marketing, AI Search, SEO, SEA, analytics and growth
              strategy, connecting visibility, paid media, tracking and conversion into one measurable
              system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/contact">Work with me</Button>
              <Button href="/case-studies" variant="secondary">
                View case studies
              </Button>
            </div>
          </div>

          <ManifestCard
            filename="growth-ledger.json"
            dots
            rows={ledgerRows}
            trace={[47, 51, 49, 54, 52, 57, 60]}
            variant="panel-alt"
            className="p-7"
          />
        </Container>
      </section>

      <StatsStrip stats={stats} variant="bar" />

      <section className="bg-paper px-5 pt-14 pb-10 sm:px-8 md:px-12">
        <Container>
          <Eyebrow label="BRANDS I COLLABORATED WITH" />
          <div className="mt-7">
            <BrandMarquee brands={brands} />
          </div>
        </Container>
      </section>

      <section className="bg-paper px-5 pt-10 pb-16 sm:px-8 md:px-12 md:pt-[60px] md:pb-[90px]">
        <Container className="grid grid-cols-1 items-center gap-10 md:gap-[60px] md:grid-cols-[1fr_0.9fr]">
          <Reveal offset={24}>
            <Eyebrow label="THE PROBLEM" />
            <h2 className="mt-5 mb-4 text-[28px] font-extrabold leading-tight tracking-tight text-navy md:text-[34px]">
              Most teams do not have a traffic problem.
              <br />
              They have a system problem.
            </h2>
            <p className="text-[15px] leading-relaxed text-body">
              Visibility, paid media, analytics, creative, CRM and reporting often operate as separate
              projects. That creates expensive handoffs, unclear ownership and decisions based on partial
              evidence.
            </p>
          </Reveal>
          <Reveal offset={24}>
            <SystemLeakMap />
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy px-5 py-16 sm:px-8 md:px-12 md:py-[90px]">
        <Container>
          <Eyebrow label="THE SOLUTION" />
          <h2 className="mt-5 mb-3 text-[28px] font-extrabold tracking-tight text-white md:text-[34px]">
            The full growth discipline, owned end-to-end.
          </h2>
          <p className="mb-9 max-w-xl text-[15px] text-muted">
            Six disciplines connected through one strategy, one measurement model and one owner.
          </p>
          <SchemaTable rows={solution} />
        </Container>
      </section>

      <section className="bg-paper px-5 pt-16 pb-8 sm:px-8 md:px-12 md:pt-[90px] md:pb-[50px]">
        <Container>
          <ProcessSteps eyebrow="HOW IT WORKS" headline="Diagnose. Prioritize. Execute. Improve." steps={steps} variant="plain" />
        </Container>
      </section>

      <section className="bg-paper px-5 pt-8 pb-16 sm:px-8 md:px-12 md:pt-[50px] md:pb-[90px]">
        <Container>
          <Eyebrow label="CASE RECORDS" />
          <h2 className="mt-5 mb-9 text-[28px] font-extrabold tracking-tight text-navy md:text-[34px]">
            Real campaigns. Documented outcomes.
          </h2>
          <CaseRecords records={records} />
        </Container>
      </section>

      <CTABand>
        <div>
          <CTAHeading>Let&apos;s build something that actually works.</CTAHeading>
          <CTADescription>
            Open to selected projects and interesting opportunities.
          </CTADescription>
        </div>
        <div className="text-left text-sm leading-[1.8] font-bold text-navy sm:text-right">
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <div>{contact.location}</div>
          <div>{contact.linkedinLabel}</div>
        </div>
      </CTABand>
    </>
  );
}
