import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABand, CTAHeading, CTADescription } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";
import { services } from "@/lib/content/services";

const pageDescription = "Six connected disciplines, each with clear ownership, proof and measurable outcomes.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDescription,
  alternates: { canonical: "/services" },
  openGraph: pageOpenGraph({ title: "Services | The Growth Files", description: pageDescription, url: "/services" }),
};

const steps = [
  { title: "Diagnose", desc: "Find the leaks across visibility, media, tracking and conversion." },
  { title: "Prioritize", desc: "Choose what to fix, scale, stop or automate first." },
  { title: "Execute", desc: "Turn strategy into campaigns, content, tracking and workflows." },
  { title: "Improve", desc: "Measure outcomes and refine what works." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/services", name: "Services", description: pageDescription })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      {services.map((service) => (
        <JsonLd
          key={service.num}
          data={serviceJsonLd({ name: service.title, description: service.desc, path: "/services" })}
        />
      ))}
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
            Open to selected projects and interesting opportunities.
          </CTADescription>
        </div>
        <Button href="/contact" variant="inverse">
          Get in touch
        </Button>
      </CTABand>
    </>
  );
}
