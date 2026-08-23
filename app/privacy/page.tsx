import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contact, siteConfig } from "@/lib/config/site";
import { formatDisplayDate } from "@/lib/content/formatDate";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/schema";
import { pageOpenGraph } from "@/lib/seo/metadata";

// The date this policy's content was last reviewed/edited — update
// manually alongside any future change to this page.
const LAST_UPDATED_ISO = "2026-08-23";

const pageDescription =
  "How The Growth Files collects, uses and protects information from the contact form, newsletter and optional analytics — and how to control cookie consent.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: pageDescription,
  alternates: { canonical: "/privacy" },
  openGraph: pageOpenGraph({ title: "Privacy Policy | The Growth Files", description: pageDescription, url: "/privacy" }),
};

type Section = { id: string; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    id: "who-operates-this-site",
    title: "Who operates The Growth Files",
    body: (
      <>
        <p>
          The Growth Files is the personal marketing practice of Orling Benavides, based in Amsterdam, the
          Netherlands. It currently operates as an individual practice — no separate registered company name,
          business registration number, or postal address is published beyond the contact details listed in{" "}
          <a href="#contact" className="font-semibold text-green-dark underline underline-offset-2">
            Contact
          </a>{" "}
          below.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information visitors provide",
    body: (
      <p>
        Some information is only collected when you choose to provide it — by submitting the contact form or
        subscribing to the newsletter. The sections below describe exactly what each of those collects and why.
      </p>
    ),
  },
  {
    id: "contact-form",
    title: "Contact form",
    body: (
      <>
        <p>The contact form may process:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name</li>
          <li>Email address</li>
          <li>Company (optional)</li>
          <li>Subject</li>
          <li>Message</li>
          <li>Opportunity type (the option you select describing the kind of project or role)</li>
        </ul>
        <p>
          Submitting the form sends this information, by email, to Orling Benavides via Resend (see{" "}
          <a href="#email-processing" className="font-semibold text-green-dark underline underline-offset-2">
            Email processing
          </a>
          ), with your email address set as the reply-to address so a response can reach you directly.
        </p>
      </>
    ),
  },
  {
    id: "newsletter",
    title: "Newsletter",
    body: (
      <p>
        Subscribing to the newsletter collects your email address, which is stored in a Resend Audience (a mailing
        list managed through Resend, the email platform this site uses). It&apos;s retained until you unsubscribe or
        request deletion — no more specific retention period is currently configured beyond that.
      </p>
    ),
  },
  {
    id: "technical-security-processing",
    title: "Technical / security processing",
    body: (
      <p>
        The contact and newsletter forms use your IP address to apply a short-term rate limit, to reduce spam and
        abuse. This is held only in server memory for the duration needed to enforce that limit — it isn&apos;t
        written to a database or log, isn&apos;t retained afterward, and isn&apos;t shared with any third party.
      </p>
    ),
  },
  {
    id: "analytics",
    title: "Analytics",
    body: (
      <p>
        This site can use Google Analytics 4, loaded through Google Tag Manager (see below), to understand how
        visitors use the site — for example, which pages are viewed, approximate location derived from IP address,
        device and browser type, and on-site actions such as viewing a case study or blog post. Analytics only runs
        if you grant Analytics consent through the cookie banner or Cookie settings; it does not run before that
        choice is made.
      </p>
    ),
  },
  {
    id: "google-tag-manager",
    title: "Google Tag Manager",
    body: (
      <p>
        Google Tag Manager is tag-management infrastructure — it doesn&apos;t collect data on its own, but it&apos;s the
        mechanism this site uses to load Google Analytics (and any future analytics or marketing tag) in a
        centrally managed, consent-aware way, rather than adding separate scripts for each one.
      </p>
    ),
  },
  {
    id: "hosting",
    title: "Hosting",
    body: (
      <p>
        This site is hosted on Vercel. Like any hosting provider, Vercel processes standard web request data
        (such as IP address and request metadata) as part of serving the site&apos;s pages and assets.
      </p>
    ),
  },
  {
    id: "content-infrastructure",
    title: "Content infrastructure",
    body: (
      <p>
        Editorial content — blog posts and case studies — is managed in Sanity, a headless content management
        system, and images are served through Sanity&apos;s image CDN. This infrastructure stores and delivers site
        content; it isn&apos;t used to collect information about visitors.
      </p>
    ),
  },
  {
    id: "email-processing",
    title: "Email processing",
    body: (
      <p>
        Resend is the email platform used to deliver contact-form submissions and to manage the newsletter
        Audience described above.
      </p>
    ),
  },
  {
    id: "cookies-and-consent",
    title: "Cookies and consent",
    body: (
      <>
        <p>Cookies and similar technologies on this site fall into three categories:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-navy">Necessary</strong> — required for the site to function and to remember
            your cookie preference. Always active; cannot be disabled.
          </li>
          <li>
            <strong className="text-navy">Analytics</strong> — Google Analytics 4, governed by your consent choice.
          </li>
          <li>
            <strong className="text-navy">Marketing</strong> — reserved for advertising, remarketing and ad
            measurement. No advertising tooling is currently active on this site; this category exists so
            it&apos;s ready and consent-gated if that changes.
          </li>
        </ul>
        <p>
          On your first visit, a banner offers <strong className="text-navy">Accept all</strong>,{" "}
          <strong className="text-navy">Reject non-essential</strong>, or{" "}
          <strong className="text-navy">Manage preferences</strong> for a category-by-category choice. You can
          change your decision at any time via the <strong className="text-navy">Cookie settings</strong> link in
          the footer — doing so updates Google Consent Mode immediately, without needing to reload the page.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong className="text-navy">Consent</strong> — for Analytics/Marketing cookies, and for adding your
          email to the newsletter.
        </li>
        <li>
          <strong className="text-navy">Legitimate interest</strong> — for responding to contact-form inquiries you
          initiate, and for short-term, in-memory rate limiting to prevent form abuse.
        </li>
      </ul>
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Contact-form submissions: retained as needed to respond to your inquiry, as an email.</li>
        <li>Newsletter email addresses: retained until you unsubscribe or request deletion.</li>
        <li>Cookie consent preference: retained for 12 months, or until you change it.</li>
        <li>Rate-limiting IP data: in-memory only, cleared automatically; never persisted.</li>
        <li>
          Analytics data (when consented to): subject to Google Analytics&apos; own retention settings, which are
          configurable independently of this site&apos;s code.
        </li>
      </ul>
    ),
  },
  {
    id: "third-party-processors",
    title: "Third-party processors",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Vercel — hosting</li>
        <li>Sanity — content management and image delivery</li>
        <li>Resend — contact-form email delivery and newsletter management</li>
        <li>Google (Tag Manager, Analytics) — tag management and, with consent, analytics</li>
      </ul>
    ),
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    body: (
      <p>
        Some of the providers listed above may process data outside the European Economic Area, including in the
        United States. Where that happens, these providers generally rely on their own appropriate safeguards —
        such as the EU-U.S. Data Privacy Framework or Standard Contractual Clauses — as part of their standard
        compliance programs.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Access the personal data held about you</li>
          <li>Correct inaccurate data</li>
          <li>Request erasure of your data</li>
          <li>Restrict or object to certain processing</li>
          <li>Receive your data in a portable format</li>
          <li>Withdraw consent at any time, without affecting processing that already took place</li>
          <li>Lodge a complaint with your local data protection supervisory authority</li>
        </ul>
      </>
    ),
  },
  {
    id: "changing-your-consent",
    title: "How to change or withdraw consent",
    body: (
      <p>
        Use the <strong className="text-navy">Cookie settings</strong> link in the footer at any time to reopen
        your preferences and change your Analytics or Marketing choice — the update takes effect immediately. To
        stop receiving the newsletter, use the unsubscribe link included in any newsletter email, or contact Orling
        directly (below).
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        For questions about this policy or to exercise any of the rights above, contact Orling Benavides at{" "}
        <a href={`mailto:${contact.email}`} className="font-semibold text-green-dark underline underline-offset-2">
          {contact.email}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({ path: "/privacy", name: "Privacy Policy", description: pageDescription, type: "WebPage" })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <Header />

      <section className="bg-navy px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-[90px] md:pb-[70px]">
        <Container className="max-w-[760px]">
          <Eyebrow label="PRIVACY" />
          <h1 className="mt-6 mb-4 text-[36px] font-extrabold tracking-tight text-white md:text-[48px]">
            Privacy Policy
          </h1>
          <p className="text-[13px] tracking-[0.02em] text-muted-alt">
            Last updated {formatDisplayDate(LAST_UPDATED_ISO)}
          </p>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-[#b6c0cc]">
            This page explains what {siteConfig.name} actually collects, why, and how you can control it —
            including cookie consent for analytics.
          </p>
        </Container>
      </section>

      <section className="bg-paper px-5 py-14 sm:px-8 md:px-12 md:py-16">
        <Container className="max-w-[760px]">
          <nav aria-label="Table of contents" className="mb-14 rounded-lg border border-navy/[0.08] bg-white p-6">
            <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">ON THIS PAGE</div>
            <ol className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-body-alt underline-offset-2 hover:text-green-dark hover:underline"
                  >
                    {i + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl leading-[1.3] font-extrabold tracking-tight text-navy">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-body-alt">{section.body}</div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
