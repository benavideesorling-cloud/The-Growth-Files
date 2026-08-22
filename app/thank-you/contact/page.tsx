import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

// Reachable only via a confirmed Contact submission redirect, not from any
// nav or internal link — kept out of search results and future crawl
// files (sitemap, llms.txt) since it isn't content, it's a transaction
// receipt. Direct URL access is intentionally still allowed.
export const metadata: Metadata = {
  title: "Message received",
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <>
      <Header active="Contact" />

      <section className="bg-navy px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <Container className="max-w-[640px] text-center">
          <div className="flex justify-center">
            <Eyebrow label="MESSAGE RECEIVED" />
          </div>
          <h1 className="mt-6 mb-5 text-[36px] leading-[1.1] font-extrabold tracking-tight text-white md:text-[44px]">
            Thanks for reaching out.
          </h1>
          <p className="mx-auto mb-9 max-w-[480px] text-base leading-relaxed text-[#b6c0cc]">
            Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <Button href="/case-studies" variant="secondary">
              View case studies
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
