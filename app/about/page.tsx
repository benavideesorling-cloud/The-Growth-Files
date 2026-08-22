import { PenTool, GraduationCap, Megaphone, Sprout, Rocket, Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { DisciplineGrid } from "@/components/sections/DisciplineGrid";
import { CTABand, CTAHeading, CTADescription } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/lib/config/site";

const stats = [
  { value: "6+", label: "YEARS EXPERIENCE" },
  { value: "€1.3M+", label: "AD SPEND MANAGED" },
  { value: "€6.9M+", label: "REVENUE GENERATED" },
  { value: "554%", label: "PEAK ROAS" },
  { value: "250+", label: "WEEKLY AI CITATIONS" },
];

const checklist = [
  "I combine strategy, paid media, AI Search and analytics into one connected growth system.",
  "That means fewer handoffs, clearer decisions and stronger performance across B2B, B2C, e-commerce, marketplaces and apps.",
  "The goal is simple: turn visibility, data and creative into measurable growth.",
];

const story = [
  { icon: "✎", title: "I started with design.", desc: "I learned Illustrator, Photoshop and After Effects by watching YouTube videos. Today, Figma is the tool I use most." },
  { icon: "↗", title: "Then I moved into paid media.", desc: "Google Ads became the gateway into performance marketing and measurable growth." },
  { icon: "▥", title: "Then I fell in love with analytics.", desc: "Tracking, dashboards and attribution made every click easier to understand." },
  { icon: "↔", title: "Then I worked on B2C and B2B strategy.", desc: "Different models, different cycles — same goal: sustainable growth." },
  { icon: "▤", title: "Then I stepped into app marketing and Google Maps location management.", desc: "Acquisition, retention and lifecycle growth that lives inside the product, plus managing presence across local search." },
  { icon: "⌕", title: "And now, AI Search and website optimisation.", desc: "Understanding how visibility is changing, and how brands can win in the next search era." },
];

const journey = [
  { icon: PenTool, date: "FOUNDATION", title: "Design foundations", desc: "Self-taught in Illustrator, Photoshop and After Effects." },
  { icon: GraduationCap, date: "2019", title: "BA Business Administration", desc: "Marketing · Magna Cum Laude." },
  { icon: Megaphone, date: "NOV 2022–JUN 2023", title: "RocketBarn", desc: "Media strategy across B2B, B2C and lead generation." },
  { icon: GraduationCap, date: "2023", title: "MSc Marketing", desc: "Vrije Universiteit Amsterdam · AI advertising research." },
  { icon: Sprout, date: "SEP–DEC 2023", title: "Growth Marketer." },
  { icon: Rocket, date: "JAN 2024–JAN 2026", title: "ParkBee", desc: "Performance marketing at scale across markets and apps." },
  { icon: Search, date: "FEB 2026–PRESENT", title: "Refreshworks.ai", desc: "AI Search, paid media, SEO, CRM and growth strategy." },
];

const disciplines = [
  { icon: "◎", title: "Strategy", desc: "Roadmaps, positioning and growth systems built for scale." },
  { icon: "↗", title: "Performance Marketing", desc: "Full-funnel paid media across search, social, apps and marketplaces." },
  { icon: "⌕", title: "AI Search & SEO", desc: "Visibility, technical SEO, content architecture and AI-ready pages." },
  { icon: "▥", title: "Analytics & Data", desc: "Tracking, dashboards and insights that drive better decisions." },
  { icon: "⬈", title: "Industry Growth", desc: "B2B, B2C, e-commerce, marketplaces and app marketing." },
  { icon: "✎", title: "Creative & Content", desc: "Landing pages, CRO, copy and visual storytelling." },
];

export default function AboutPage() {
  return (
    <>
      <Header active="About" />

      <section className="bg-navy px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-[90px] md:pb-[70px]">
        <div className="max-w-[680px]">
          <Eyebrow label="ABOUT" />
          <h1 className="my-6 text-[36px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[44px]">
            Not just one tool.
            <br />
            A connected growth discipline.
          </h1>
          <div className="flex flex-col gap-4">
            {checklist.map((line) => (
              <div key={line} className="flex gap-3 text-[15px] leading-relaxed text-[#cbd5e1]">
                <span className="text-green">✓</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsStrip stats={stats} variant="bar" />

      <section className="bg-[#f7f8f7] px-5 py-16 sm:px-8 md:px-12 md:py-[90px]">
        <Container className="grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow label="MY STORY" />
            <h2 className="mt-5 mb-8 text-[28px] font-extrabold leading-tight tracking-tight text-navy md:text-[34px]">
              Built across disciplines. Connected as one system.
            </h2>
            <Reveal offset={20} className="rounded-lg bg-green-soft p-6">
              <div className="mb-2 text-2xl text-green-deep-alt">&ldquo;</div>
              <div className="text-[17px] font-semibold leading-snug text-green-deep">
                I believe in owning the outcome: connecting strategy, creative, media and reporting so every
                euro has a clear role.
              </div>
            </Reveal>
          </div>
          <div>
            <StoryTimeline items={story} />
            <Reveal offset={20} className="flex items-start gap-3.5 rounded-lg bg-green-soft p-5">
              <span className="text-base text-green-dark">★</span>
              <div>
                <div className="mb-1 text-[13px] font-bold text-green-deep">The realization.</div>
                <div className="text-sm leading-relaxed text-green-deep-alt">
                  It is not about specializing. It is about building a connected growth discipline where
                  every piece reinforces the next.
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper px-5 pb-16 sm:px-8 md:px-12 md:pb-[90px]">
        <Container>
          <Eyebrow label="THE JOURNEY" />
          <h2 className="mt-5 mb-9 text-[28px] font-extrabold tracking-tight text-navy md:mb-11 md:text-[34px]">
            From foundations to systems thinking.
          </h2>
          <JourneyTimeline items={journey} />
        </Container>
      </section>

      <section className="bg-navy px-5 py-16 sm:px-8 md:px-12 md:py-[90px]">
        <Container>
          <Eyebrow label="HOW I WORK" />
          <h2 className="mt-5 mb-9 text-[28px] font-extrabold tracking-tight text-white md:mb-11 md:text-[34px]">
            Every tool. Every channel. One goal.
          </h2>
          <DisciplineGrid disciplines={disciplines} />
        </Container>
      </section>

      <CTABand>
        <div>
          <CTAHeading>
            Let&apos;s build something
            <br />
            that actually works.
          </CTAHeading>
          <CTADescription>
            If you&apos;re serious about growth, let&apos;s talk about your goals and how we can reach them
            — together.
          </CTADescription>
          <div className="mt-5">
            <Button href="/contact" variant="inverse">
              Come in contact
            </Button>
          </div>
        </div>
        <div className="text-left text-sm leading-[1.9] font-bold text-navy sm:text-right">
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <div>{contact.location}</div>
          <div>{contact.linkedinLabel}</div>
        </div>
      </CTABand>
    </>
  );
}
