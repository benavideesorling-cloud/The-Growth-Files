import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ManifestCard } from "@/components/structured/ManifestCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { contact } from "@/lib/config/site";

const directContact = [
  { label: "EMAIL", value: contact.email },
  { label: "PHONE", value: contact.phone },
  { label: "LOCATION", value: contact.location },
  { label: "LINKEDIN", value: contact.linkedinLabel },
];

const availableFor = [
  "Freelance performance marketing projects",
  "Growth and AI Search consulting",
  "Full-time performance marketing roles",
  "Hybrid roles based in Amsterdam",
];

export default function ContactPage() {
  return (
    <>
      <Header active="Contact" />

      <section className="bg-navy px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-[90px] md:pb-[70px]">
        <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-[60px]">
          <div>
            <Eyebrow label="GET IN TOUCH" />
            <h1 className="mt-6 mb-5 text-[36px] leading-[1.1] font-extrabold tracking-tight text-white md:text-[44px]">
              Open to the right opportunities.
            </h1>
            <p className="max-w-[460px] text-base leading-relaxed text-[#b6c0cc]">
              Available for freelance projects, consulting and full-time performance marketing roles based
              in Amsterdam.
            </p>
          </div>
          <ManifestCard
            filename="contact-manifest.json"
            rows={[
              { label: '"location"', value: '"Amsterdam, NL"' },
              { label: '"availability"', value: '["freelance","consulting","full-time"]' },
              { label: '"focus"', value: '["performance","AI Search","growth"]' },
              { label: '"workingModel"', value: '"hybrid / Amsterdam-based"' },
            ]}
            statusLine={{ label: '"status"', value: '"open"' }}
          />
        </Container>
      </section>

      <section className="bg-paper px-5 py-16 sm:px-8 md:px-12 md:py-20">
        <Container>
          <Eyebrow label="START A CONVERSATION" />
          <h2 className="mt-5 mb-3 text-[28px] font-extrabold tracking-tight text-navy md:text-[32px]">
            Tell me what you&apos;re working on.
          </h2>
          <p className="mb-11 text-[15px] text-body">
            Share the challenge, current situation and the outcome you want to achieve.
          </p>

          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.6fr_1fr]">
            <ContactForm />

            <div className="border-navy/10 md:border-l md:pl-11">
              <div className="mb-6 font-mono text-xs tracking-[0.06em] text-green-dark">DIRECT CONTACT</div>
              {directContact.map((item, i) => (
                <div
                  key={item.label}
                  className={`mb-5 pb-5 ${i < directContact.length - 1 ? "border-b border-navy/[0.08]" : ""}`}
                >
                  <div className="mb-1.5 text-[11px] tracking-[0.04em] text-muted">{item.label}</div>
                  <div className="text-[15px] font-bold text-navy">{item.value}</div>
                </div>
              ))}
              <div className="mb-4 font-mono text-xs tracking-[0.06em] text-green-dark">AVAILABLE FOR</div>
              <div className="flex flex-col gap-1 text-sm leading-relaxed text-[#3d4a5a]">
                {availableFor.map((item) => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-11 flex flex-col gap-5 rounded-lg bg-green-soft px-7 py-[22px] sm:flex-row sm:items-start">
            <div className="font-mono text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-green-deep">
              WHAT HELPS
            </div>
            <div className="text-sm leading-relaxed font-semibold text-green-deep">
              Your goal, current channels, approximate timeline and the main problem you want to solve.
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-green px-5 py-16 sm:px-8 md:px-12 md:py-[70px]">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="mb-3 text-[28px] leading-tight font-extrabold tracking-tight text-navy md:text-[32px]">
              A clear conversation is
              <br />
              the best first step.
            </h2>
            <p className="text-[15px] text-navy/80">Bring the context. We&apos;ll figure out the next move from there.</p>
          </div>
          <div className="rounded-lg bg-navy px-7 py-[22px]">
            <div className="mb-2 font-mono text-[11px] tracking-[0.06em] text-green">EMAIL</div>
            <div className="mb-1 text-base font-bold text-white">{contact.email}</div>
            <div className="text-[13px] text-muted">{contact.location}</div>
          </div>
        </Container>
      </section>
    </>
  );
}
