import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/**
 * The green closing CTA section, reused across nearly every page with real
 * structural variation: some pass just a headline + button, some add a
 * description, a contact-info block, or (CaseStudies) a 3-column grid with
 * an eyebrow and an "available for" list. Rather than guess a rigid content
 * API that would only fit one page, this is a shell (background, padding,
 * container, layout) plus typographic primitives — Phase 3 composes the
 * actual per-page content into it.
 */
export function CTABand({
  layout = "split",
  className = "",
  children,
}: {
  layout?: "split" | "grid";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`bg-green px-5 py-16 sm:px-8 md:px-12 ${className}`}>
      <Container
        className={
          layout === "grid"
            ? "grid gap-8 md:grid-cols-[1.3fr_1fr_0.8fr]"
            : "flex flex-wrap items-center justify-between gap-8 md:flex-nowrap"
        }
      >
        {children}
      </Container>
    </section>
  );
}

export function CTAHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[32px] font-extrabold leading-tight tracking-tight text-navy ${className}`}>
      {children}
    </h2>
  );
}

export function CTADescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`mt-3 max-w-md text-[15px] text-navy/80 ${className}`}>{children}</p>;
}
