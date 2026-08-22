import type { ReactNode } from "react";
import Link from "next/link";
import { StepList } from "@/components/structured/StepList";
import { InfoCard } from "@/components/ui/InfoCard";

export type CaseStudySection = { eyebrow: string; heading: string; body: ReactNode };

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  metaLine: string;
  stats: { value: string; label: string }[];
  sections: CaseStudySection[];
  resultsLabel: string;
  results: ReactNode[];
  proofLabel: string;
  proofHeading: string;
  proof: ReactNode;
  relatedServices: ReactNode;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  index: {
    tag: string;
    title: string;
    desc: string;
    meta: string;
    stat: string;
    statLabel: string;
    statSub: string;
  };
};

// Content ported verbatim from CaseStudyDetail.dc.html (001) through
// CaseStudyDetail005.dc.html and CaseStudies.dc.html's index cards. Two
// internal editorial notes (an unconfirmed campaign-type name in case 003,
// an unconfirmed revenue figure in case 004) were present in the source
// .dc.html files and have been removed per the production brief's
// instruction to strip internal notes from public content — flagged in the
// Phase 4 report, not silently dropped.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "google-ads-revenue-growth",
    eyebrow: "CASE 001 · MOBILITY MARKETPLACE",
    metaTitle: "Scaling Google Ads revenue from €4M to €6.9M | The Growth Files",
    metaDescription:
      "How a mapped, data led approach to Google Ads scaled a mobility marketplace client's paid media revenue 72% year over year, from an 11 day emergency sprint to a full year channel expansion.",
    h1: "From €4M to €6.9M: scaling paid media revenue for a mobility marketplace",
    subtitle: "A mapped, data led approach to Google Ads, from an 11 day emergency sprint to a full year channel expansion.",
    metaLine: "ROLE: PERFORMANCE MARKETING  |  CHANNELS: GOOGLE ADS · SEARCH · DISPLAY · PERFORMANCE MAX",
    stats: [
      { value: "€6.9M", label: "2025 ATTRIBUTED REVENUE" },
      { value: "72%", label: "YoY REVENUE GROWTH" },
      { value: "554%", label: "ROAS, UP FROM 360%" },
      { value: "€90K", label: "CLOSED IN UNDER 11 DAYS" },
    ],
    sections: [
      {
        eyebrow: "THE SITUATION",
        heading: "The situation",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            I joined a European parking and mobility marketplace with prior experience running paid media
            for agencies serving US and Canadian clients. My mandate was straightforward: generate revenue.
            At the time, Google Ads, the company&apos;s main revenue channel, was managed by an external
            agency and wasn&apos;t performing anywhere near its potential.
          </p>
        ),
      },
      {
        eyebrow: "THE CHALLENGE",
        heading: "The challenge: €90K, 11 days left",
        body: (
          <>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-body-alt">
              In my first month, the managing director gave me the situation directly: the company was
              behind on its annual targets, and with 11 days left in the year, we were still €90K short. He
              asked if I could close that gap.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              This wasn&apos;t a strategy problem I could solve by &quot;optimizing.&quot; It was a
              structural one. The account hadn&apos;t been segmented or analyzed in a way that showed where
              the real headroom was. Nobody could say, with evidence, which campaigns had room to scale and
              which didn&apos;t.
            </p>
          </>
        ),
      },
      {
        eyebrow: "DIAGNOSIS",
        heading: "How I diagnosed the problem",
        body: (
          <>
            <p className="mb-5 text-[17px] leading-[1.75] text-body-alt">
              Before touching any budgets, I mapped the entire account:
            </p>
            <div className="mb-5 flex flex-col gap-3">
              {[
                "Performance by city, point of interest (POI), and area",
                "Which campaigns had the highest conversion volume",
                "Which campaigns had the strongest ROAS",
                "Branded vs. generic performance, split out explicitly",
              ].map((line) => (
                <div key={line} className="flex gap-3 text-base leading-relaxed text-body-alt">
                  <span className="font-bold text-green">→</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              This gave me an evidence base instead of a guess. Some campaigns had real scale headroom on
              the generic side, and branded campaigns had ROAS to spare without putting volume at risk.
            </p>
          </>
        ),
      },
      {
        eyebrow: "STRATEGY",
        heading: "The strategy: insight, decision, action",
        body: (
          <StepList
            steps={[
              {
                label: "INSIGHT",
                text: "the fastest path to €90K was reallocating budget toward top performing generic campaigns, while deliberately trading some ROAS on branded campaigns that had efficiency to give up.",
              },
              {
                label: "DECISION",
                text: "I built three budget scenarios and took them to leadership with the trade-off stated plainly. A change this drastic, this fast, would very likely compress ROAS in the short term, because a sudden budget shift disrupts what the bidding algorithm has already learned. I wasn't going to sugarcoat that. If they wanted to move forward, it had to be an informed decision, not a surprise later.",
              },
              {
                label: "ACTION",
                text: "leadership accepted the risk. I increased budget on the top performing generic campaigns and pulled budget (and ROAS target) down on branded. We hit the €90K target in under 11 days.",
              },
            ]}
          />
        ),
      },
      {
        eyebrow: "EXECUTION",
        heading: "Execution: from one sprint to a full year scale up",
        body: (
          <>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-body-alt">
              The sprint bought credibility, not closure. The week after, the question changed from
              &quot;can you fix this&quot; to &quot;we want to grow, what&apos;s next?&quot;
            </p>
            <p className="mb-6 text-[17px] leading-[1.75] text-body-alt">That answer took the rest of the year to build.</p>
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoCard>
                <div className="mb-2.5 text-[15px] font-extrabold text-navy">Channel mapping.</div>
                <p className="m-0 text-[15px] leading-relaxed text-body-alt">
                  I built a tracking system (starting in a spreadsheet) that mapped performance across
                  every channel the company ran: affiliates, Google Ads, SEO, and others, not just Google
                  Ads in isolation. This mattered because affiliates and other channels were actually
                  generating more absolute revenue at the time. The growth story wasn&apos;t &quot;the
                  biggest channel got bigger,&quot; it was specifically about what Google Ads could do with
                  the right structure.
                </p>
              </InfoCard>
              <InfoCard>
                <div className="mb-2.5 text-[15px] font-extrabold text-navy">Time and event based budget pacing.</div>
                <p className="m-0 text-[15px] leading-relaxed text-body-alt">
                  Instead of flat monthly budgets, I identified which days and events consistently drove the
                  most revenue and shifted budget toward them dynamically, rather than spreading spend
                  evenly across the month.
                </p>
              </InfoCard>
              <InfoCard>
                <div className="mb-2.5 text-[15px] font-extrabold text-navy">Format expansion.</div>
                <p className="m-0 text-[15px] leading-relaxed text-body-alt">
                  The account moved from search only to search, display, and Performance Max, adding
                  formats where the earlier structure had none.
                </p>
              </InfoCard>
              <InfoCard>
                <div className="mb-2.5 text-[15px] font-extrabold text-navy">Geographic expansion.</div>
                <p className="m-0 text-[15px] leading-relaxed text-body-alt">
                  Coverage grew to new cities, POIs, and areas beyond the original footprint.
                </p>
              </InfoCard>
            </div>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              The growth from €4M to €6.9M in total revenue was driven primarily by this Google Ads
              expansion. Even though other channels carried a larger absolute share of revenue, Google Ads
              was the specific lever behind the year over year increase.
            </p>
          </>
        ),
      },
    ],
    resultsLabel: "RESULTS",
    results: [
      <>
        <strong className="text-navy">€6.9M</strong> in 2025 attributed revenue, up from{" "}
        <strong className="text-navy">€4M</strong> in 2024: <strong className="text-navy">72% year over year growth</strong>
      </>,
      <>
        <strong className="text-navy">ROAS improved from 360% to 554%</strong>, sustained while budget
        scaled, not traded away for volume
      </>,
      <>
        <strong className="text-navy">€90K delivered in under 11 days</strong> during the initial emergency
        sprint, proof the approach worked under real time pressure, not just in a planned rollout
      </>,
      <>Channel mix expanded from search only to <strong className="text-navy">search, display, and Performance Max</strong></>,
      <>Geographic footprint expanded to new cities, POIs, and areas</>,
    ],
    proofLabel: "WHAT THIS PROVES",
    proofHeading: "What this proves",
    proof: (
      <>
        <p className="m-0">
          Under time pressure, the instinct is to increase spend broadly and hope the algorithm sorts it
          out. That&apos;s not what worked here. What worked was segmenting performance data first, by
          geography, campaign type, and branded vs. generic, so the budget reallocation targeted where
          headroom actually existed, and being transparent with leadership about the real trade-off (short
          term ROAS compression) before acting, not after.
        </p>
        <p className="m-0">
          The longer term scale up followed the same logic: map the full channel picture before assuming
          the answer is &quot;spend more everywhere,&quot; then let the data show where the actual growth
          lever is. In this case, that was Google Ads, even though it wasn&apos;t the largest revenue
          channel by volume.
        </p>
      </>
    ),
    relatedServices: (
      <>
        <p className="mb-3.5 text-[17px] leading-[1.78] text-body-alt">
          This work sits under{" "}
          <Link href="/services#performance-marketing" className="font-semibold text-green-dark">
            Performance Marketing
          </Link>
          : campaign structure, budget allocation, and channel scaling, supported by the{" "}
          <Link href="/services#analytics-data" className="font-semibold text-green-dark">
            Analytics &amp; Data
          </Link>{" "}
          discipline used to build the channel mapping system behind the year long growth.
        </p>
        <p className="m-0 text-[17px] leading-[1.78] text-body-alt">
          See also:{" "}
          <Link href="/case-studies/microsoft-ads-expansion" className="font-semibold text-green-dark">
            Microsoft Ads expansion
          </Link>
          , the same client&apos;s second acquisition channel, built from zero.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Does revenue growth in Google Ads always come from increasing total ad spend?",
        a: "No. In this case, total revenue grew from €4M to €6.9M while the increase was driven by reallocating existing budget toward proven, high performing generic campaigns rather than simply increasing spend across the account. Segmenting performance by city, point of interest, and branded vs. generic identified where the real headroom was before any budget moved.",
      },
      {
        q: "What causes ROAS to drop during a rapid budget increase in Google Ads?",
        a: "A sudden, large shift in budget disrupts what the bidding algorithm has already learned about an account, which typically causes short term efficiency compression while the algorithm relearns. This is a known, predictable effect and can be planned for rather than treated as a failure when it happens.",
      },
      {
        q: "Which campaign types support scaling a Google Ads account beyond search?",
        a: "In this case, the account expanded from search only to search, display, and Performance Max, combined with new geographic coverage across additional cities, points of interest, and areas.",
      },
      {
        q: "How should budget be prioritized across multiple paid media channels?",
        a: "By mapping performance across every channel in use, not just the largest one, and identifying which specific days and events consistently drive the most revenue, then pacing budget toward those periods dynamically instead of spreading spend evenly across the month.",
      },
      {
        q: "Can ROAS improve at the same time as ad spend scales?",
        a: "Yes, when budget reallocation is based on evidence, city, point of interest, and area level performance and branded vs. generic segmentation, rather than increasing spend uniformly across an account. In this case, ROAS improved from 360% to 554% over the course of the scale up.",
      },
    ],
    ctaHeading: "Want results like this on your account?",
    index: {
      tag: "CASE 001 · MOBILITY MARKETPLACE",
      title: "Revenue growth: €4M → €6.9M",
      desc: "Mapped the account by city, POI and branded vs. generic, then reallocated budget where the headroom actually was.",
      meta: "CHANNEL: GOOGLE ADS  |  FORMATS: SEARCH · DISPLAY · PERFORMANCE MAX",
      stat: "€6.9M",
      statLabel: "2025 ATTRIBUTED REVENUE",
      statSub: "72% YoY growth · ROAS improved from 360% to 554%",
    },
  },
  {
    slug: "ai-visibility-geo-aeo",
    eyebrow: "CASE 002 · AI VISIBILITY",
    metaTitle: "Building AI search visibility with a content, trust, and technical approach | The Growth Files",
    metaDescription:
      "How auditing AI referral data, then building content, trust, and technical foundations, moved a client from invisible in AI search to consistently cited.",
    h1: "From invisible to citable: building AI search visibility",
    subtitle: "Measuring AI referrals first, then building content, trust, and technical foundations against what the data showed.",
    metaLine: "ROLE: AI SEARCH & SEO  |  SURFACES: CHATGPT · COPILOT · PERPLEXITY",
    stats: [
      { value: "500+", label: "MONTHLY AI CITATIONS" },
      { value: "20%", label: "SHARE OF AUTHORITY IN CATEGORY" },
      { value: "6", label: "AI-STRUCTURED POSTS IN ONE MONTH" },
    ],
    sections: [
      {
        eyebrow: "THE SITUATION",
        heading: "The situation",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            For one client, the question wasn&apos;t just &quot;are we ranking on Google,&quot; it was
            &quot;do AI systems even know we exist, and for what.&quot; Traditional search visibility
            doesn&apos;t tell you anything about whether ChatGPT, Copilot, or Perplexity ever mention you,
            or under which prompts.
          </p>
        ),
      },
      {
        eyebrow: "MEASUREMENT",
        heading: "How I found out where we actually stood",
        body: (
          <>
            <p className="mb-6 text-[17px] leading-[1.75] text-body-alt">
              Before recommending anything, I needed real data on AI referral behavior, not assumptions. I
              used a combination of tools, each covering a different gap:
            </p>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard>
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">Microsoft Clarity</strong>, which surfaces referral traffic
                  from Microsoft Copilot specifically, something most standard analytics setups miss
                  entirely
                </p>
              </InfoCard>
              <InfoCard>
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">HubSpot&apos;s AEO tooling</strong>, for tracking answer
                  engine visibility
                </p>
              </InfoCard>
              <InfoCard>
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">GA4</strong>, for the traffic and referral side once
                  visitors actually arrived
                </p>
              </InfoCard>
              <InfoCard>
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">Manual testing</strong>, running the same prompts directly
                  in ChatGPT and Perplexity to see, firsthand, what they said and which sources they cited
                </p>
              </InfoCard>
            </div>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              Seeing Copilot referral data specifically through Clarity was a genuine turning point. Most AI
              visibility conversations focus on ChatGPT alone, and this made it clear that different AI
              platforms needed to be measured separately, not lumped into one generic &quot;AI traffic&quot;
              number.
            </p>
          </>
        ),
      },
      {
        eyebrow: "DIAGNOSIS",
        heading: "The diagnosis",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            The audit surfaced something specific: the site was already ranking for a set of prompts that
            had nothing to do with its actual focus area. That traffic was real, but it wasn&apos;t the
            traffic that mattered for the business.
          </p>
        ),
      },
      {
        eyebrow: "APPROACH",
        heading: "The approach: three pillars",
        body: (
          <>
            <p className="mb-6 text-[17px] leading-[1.75] text-body-alt">
              Rather than chasing every possible fix, the work was organized around three areas, each
              answering a different question:
            </p>
            <StepList
              steps={[
                {
                  label: "CONTENT",
                  text: "Does the content actually answer the questions people (and AI systems) are asking, structured in a way AI can extract cleanly?",
                },
                {
                  label: "TRUST",
                  text: "Is there a clear, verifiable reason for an AI system to treat this source as credible, an identified author, references, evidence of expertise?",
                },
                {
                  label: "TECHNICAL",
                  text: "Can AI systems actually read and parse the site correctly in the first place, structured data, a properly configured llms.txt, and accurate crawling instructions?",
                },
              ]}
            />
          </>
        ),
      },
      {
        eyebrow: "EXECUTION",
        heading: "Execution",
        body: (
          <div className="flex flex-col gap-4">
            <InfoCard>
              <div className="mb-2.5 text-[15px] font-extrabold text-navy">Content.</div>
              <p className="m-0 text-base leading-relaxed text-body-alt">
                The existing prompt-level ranking was left in place rather than disrupted, since it was
                still driving some traffic, while new content specifically targeted the topics that
                actually mattered. Six blog posts were published in one month, each structured around a real
                question and a direct, extractable answer rather than traditional keyword-led copy.
              </p>
            </InfoCard>
            <InfoCard>
              <div className="mb-2.5 text-[15px] font-extrabold text-navy">Trust.</div>
              <p className="m-0 text-base leading-relaxed text-body-alt">
                Each piece of content carried a clearly identified author and cited references, rather than
                being published anonymously. This is a direct EEAT (experience, expertise, authoritativeness,
                trustworthiness) signal, and it&apos;s one AI systems weigh heavily when deciding whether to
                cite a source.
              </p>
            </InfoCard>
            <InfoCard>
              <div className="mb-2.5 text-[15px] font-extrabold text-navy">Technical.</div>
              <p className="m-0 text-base leading-relaxed text-body-alt">
                An <span className="font-mono text-[15px]">llms.txt</span> file was built, the{" "}
                <span className="font-mono text-[15px]">robots.txt</span> was updated to reflect how AI
                crawlers should be treated, and FAQ content was properly marked up with structured data so
                the question and answer pairs were machine readable, not just visually formatted.
              </p>
            </InfoCard>
          </div>
        ),
      },
    ],
    resultsLabel: "RESULTS",
    results: [
      <><strong className="text-navy">500+ monthly AI citations</strong> across leading AI platforms</>,
      <><strong className="text-navy">20% Share of Authority</strong> achieved in the client&apos;s category</>,
      <>
        Six pieces of new, AI-structured content published within a single month, without sacrificing the
        traffic already being generated by existing content
      </>,
    ],
    proofLabel: "WHAT THIS PROVES",
    proofHeading: "What this proves",
    proof: (
      <p className="m-0">
        AI visibility isn&apos;t one thing you fix, it&apos;s three separate questions that all have to be
        answered together: is the content actually useful and extractable, is there a real reason to trust
        the source, and can AI systems technically parse the site at all. Measurement mattered just as much
        as the fix. Without checking Copilot referrals specifically through Clarity, that channel would have
        stayed invisible, since it doesn&apos;t show up the same way in standard analytics.
      </p>
    ),
    relatedServices: (
      <>
        <p className="mb-3.5 text-[17px] leading-[1.78] text-body-alt">
          This work sits under{" "}
          <Link href="/services#ai-search-seo" className="font-semibold text-green-dark">
            AI Search &amp; SEO
          </Link>
          : GEO/AEO strategy, structured data, and content architecture.
        </p>
        <p className="m-0 text-[17px] leading-[1.78] text-body-alt">
          See also:{" "}
          <Link href="/case-studies/google-ads-revenue-growth" className="font-semibold text-green-dark">
            Google Ads revenue growth
          </Link>
          , a different channel from the same evidence-led, measure-first approach.
        </p>
      </>
    ),
    faqs: [
      {
        q: "How is AI search visibility measured separately from traditional SEO?",
        a: "Standard SEO tools track search engine rankings, but they don't show whether AI systems like ChatGPT, Copilot, or Perplexity reference a site. Measuring this requires a combination of tools: Microsoft Clarity for Copilot referral data specifically, dedicated AEO tracking tools, GA4 for downstream traffic behavior, and manual prompt testing directly in AI chat interfaces.",
      },
      {
        q: "What are the three pillars of AI search optimization (AEO/GEO)?",
        a: "Content, trust, and technical. Content covers whether material answers real questions in an extractable format. Trust covers whether there's a verifiable reason for an AI system to treat the source as credible, such as identified authorship and references. Technical covers whether AI systems can actually parse the site, through structured data, a correctly configured llms.txt file, and appropriate crawler instructions.",
      },
      {
        q: "Why is identifying the content author important for AI search visibility?",
        a: "AI systems weigh trust signals, including clear authorship and cited references, when deciding which sources to cite. This maps to the EEAT framework (experience, expertise, authoritativeness, trustworthiness), and anonymous or unattributed content is a weaker citation candidate than content with a clear, verifiable author.",
      },
      {
        q: "What is an llms.txt file and why does it matter for AI visibility?",
        a: "An llms.txt file gives AI crawlers explicit guidance about a site, separate from traditional robots.txt crawl instructions. It's one part of the technical foundation needed for AI systems to correctly read and understand a site, alongside structured data and accurate crawler permissions.",
      },
      {
        q: "Should existing search traffic be removed if it isn't relevant to the business?",
        a: "Not necessarily. In this case, traffic from prompts unrelated to the client's actual focus was left in place rather than disrupted, since it was still real, functioning traffic. New, more relevant content was built alongside it instead of replacing it outright.",
      },
    ],
    ctaHeading: "Want to know if AI search can find you?",
    index: {
      tag: "CASE 002 · AI VISIBILITY",
      title: "From invisible to citable",
      desc: "Audited AI referral data across Copilot, ChatGPT and Perplexity, then built content, trust and technical foundations against what it showed.",
      meta: "DISCIPLINE: AI SEARCH & SEO  |  SURFACES: CHATGPT · COPILOT · PERPLEXITY",
      stat: "500+",
      statLabel: "MONTHLY AI CITATIONS",
      statSub: "20% Share of Authority · six AI-structured posts in one month",
    },
  },
  {
    slug: "app-growth-apple-search-ads",
    eyebrow: "CASE 003 · APP GROWTH",
    metaTitle: "Scaling app installs to 85K+ with Apple Search Ads | The Growth Files",
    metaDescription:
      "How a self-taught Apple Search Ads structure, branded, generic, and discovery campaigns working together, took a new app from zero to 85K+ installs.",
    h1: "From zero to 85K+ installs: building an Apple Search Ads program from scratch",
    subtitle: "Branded, generic, and discovery campaigns working together, with a keyword waterfall as the engine.",
    metaLine: "ROLE: APP GROWTH  |  CHANNEL: APPLE SEARCH ADS",
    stats: [
      { value: "85K+", label: "APP INSTALLS DELIVERED" },
      { value: "4", label: "CAMPAIGN TYPES BUILT FROM ZERO" },
      { value: "3", label: "SEGMENTATION LAYERS: DEVICE, COUNTRY, LANGUAGE" },
    ],
    sections: [
      {
        eyebrow: "THE SITUATION",
        heading: "The situation",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            The company I was working for decided to launch a mobile app. When I joined the project, the app
            itself wasn&apos;t ready yet, the development team was still building it.
          </p>
        ),
      },
      {
        eyebrow: "THE CHALLENGE",
        heading: "The challenge",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            There was no product to promote yet. Spending on paid acquisition before there was an app to
            download would just have been burning budget with nothing to show for it. The pressure to
            &quot;do something&quot; was there, but the right move was to not spend anything yet.
          </p>
        ),
      },
      {
        eyebrow: "PREPARATION",
        heading: "How I prepared before spending a euro",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            Instead of putting money into the market too early, I used the waiting period to properly learn
            the channel. I took a dedicated Apple Search Ads course to understand budgeting, account
            structure, and the mechanics of how the platform actually works, rather than launching on
            assumptions once the app was ready.
          </p>
        ),
      },
      {
        eyebrow: "ACCOUNT STRUCTURE",
        heading: "The account structure",
        body: (
          <>
            <p className="mb-5 text-[17px] leading-[1.75] text-body-alt">
              Once the app was ready to launch, I built the account around four campaign types, based on
              keyword research done up front:
            </p>
            <div className="flex flex-col gap-3.5">
              <InfoCard leading="1">
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">Branded campaigns</strong>, to protect the brand&apos;s own
                  name in search
                </p>
              </InfoCard>
              <InfoCard leading="2">
                <p className="mb-2 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">Generic campaigns</strong>, split into:
                </p>
                <div className="flex flex-col gap-1.5 pl-0.5">
                  <div className="flex gap-2.5 text-base leading-relaxed text-body-alt">
                    <span className="text-green">·</span>
                    <span>Competitor terms</span>
                  </div>
                  <div className="flex gap-2.5 text-base leading-relaxed text-body-alt">
                    <span className="text-green">·</span>
                    <span>Generic category terms relevant to the product</span>
                  </div>
                </div>
              </InfoCard>
              <InfoCard leading="3">
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">A placement based campaign</strong>
                </p>
              </InfoCard>
              <InfoCard leading="4">
                <p className="m-0 text-base leading-relaxed text-body-alt">
                  <strong className="text-navy">Discovery campaigns</strong>, used specifically as a keyword
                  mining tool
                </p>
              </InfoCard>
            </div>
          </>
        ),
      },
      {
        eyebrow: "STRATEGY",
        heading: "The strategy: how the waterfall worked",
        body: (
          <>
            <p className="mb-6 text-[17px] leading-[1.75] text-body-alt">
              The core of the approach was a waterfall between the discovery campaign and the generic
              campaigns.
            </p>
            <StepList
              steps={[
                {
                  label: "MINE",
                  text: "The discovery campaign worked similarly to a dynamic search ads campaign: instead of targeting fixed keywords, it surfaced whatever relevant search terms were actually driving downloads. Those keywords were then reviewed, and the strongest performers were moved into the generic campaigns as dedicated, targeted keywords.",
                },
                {
                  label: "PROMOTE, THEN EXCLUDE",
                  text: "Once a keyword was promoted into a generic campaign, it was added back into the discovery campaign as a negative keyword. That stopped the discovery campaign from competing with the generic campaign over the same term, and forced it to keep surfacing new keyword opportunities instead of just repeating what already worked.",
                },
                {
                  label: "MAINTAIN",
                  text: "This meant constant negative keyword maintenance, checking for overlap between campaigns and updating the negative lists, was the ongoing engine behind the account rather than a one time setup task.",
                },
              ]}
            />
          </>
        ),
      },
    ],
    resultsLabel: "RESULTS",
    results: [
      <><strong className="text-navy">85K+ app installs</strong> delivered through this Apple Search Ads structure</>,
      <>Account built from zero, with no prior paid app acquisition history to build on</>,
      <>Segmented by device, country, and language to match how the app was actually being searched for and used</>,
    ],
    proofLabel: "WHAT THIS PROVES",
    proofHeading: "What this proves",
    proof: (
      <>
        <p className="m-0">
          The instinct when told to launch an app is to start spending on day one. Waiting instead, and
          using that time to genuinely learn the channel through a proper course rather than trial and error
          on a live budget, meant the account was structured correctly from the start instead of needing to
          be rebuilt later.
        </p>
        <p className="m-0">
          The waterfall structure itself is the more transferable lesson: a discovery or broad campaign
          isn&apos;t just a top of funnel play, it&apos;s a live keyword research engine, as long as
          negative keyword hygiene is maintained so it doesn&apos;t just end up competing with your own
          targeted campaigns.
        </p>
      </>
    ),
    relatedServices: (
      <>
        <p className="mb-3.5 text-[17px] leading-[1.78] text-body-alt">
          This work sits under <strong className="text-navy">App Growth</strong> within{" "}
          <Link href="/services#industry-growth" className="font-semibold text-green-dark">
            Industry Growth
          </Link>
          , supported by the core{" "}
          <Link href="/services#performance-marketing" className="font-semibold text-green-dark">
            Performance Marketing
          </Link>{" "}
          discipline used to structure and manage the campaigns.
        </p>
        <p className="m-0 text-[17px] leading-[1.78] text-body-alt">
          See also:{" "}
          <Link href="/case-studies/google-ads-revenue-growth" className="font-semibold text-green-dark">
            Google Ads revenue growth
          </Link>
          , the same client&apos;s paid search work on a different channel.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Should app store ad spend start before an app is fully built?",
        a: "No. Spending on paid acquisition before there's a product to download burns budget with nothing to show for it. The more effective use of that period is preparation, such as formal training on the ad platform's budgeting and account structure, so the account is built correctly once the app is ready to launch.",
      },
      {
        q: "What is a discovery campaign in Apple Search Ads used for?",
        a: "It functions as a keyword mining tool, similar in principle to a dynamic search ads campaign. Instead of targeting fixed terms, it surfaces whatever relevant search terms are actually driving downloads, which can then be evaluated and promoted into more targeted campaigns.",
      },
      {
        q: "Why add promoted keywords back as negative keywords in the discovery campaign?",
        a: "To prevent the discovery campaign from competing with the more targeted campaign over the same keyword. Without that step, the two campaigns would bid against each other instead of the discovery campaign continuing to surface new, untapped keyword opportunities, a structure often called a keyword waterfall.",
      },
      {
        q: "How should an Apple Search Ads account be segmented?",
        a: "By device, country, and language, so campaigns match how an app is actually being searched for and used in each market, rather than running a single undifferentiated structure globally.",
      },
      {
        q: "Is a keyword waterfall strategy a one time setup or an ongoing process?",
        a: "Ongoing. It only works if negative keywords are actively maintained and checked for overlap between campaigns on a continuing basis, rather than configured once and left alone.",
      },
    ],
    ctaHeading: "Launching an app and need the acquisition side built?",
    index: {
      tag: "CASE 003 · APP GROWTH",
      title: "App growth: 0 → 85K+ installs",
      desc: "Built an Apple Search Ads program from zero, with a discovery-to-generic keyword waterfall as the engine.",
      meta: "CHANNEL: APPLE SEARCH ADS  |  SEGMENTED BY: DEVICE · COUNTRY · LANGUAGE",
      stat: "85K+",
      statLabel: "APP INSTALLS",
      statSub: "Four campaign types built before a euro was spent",
    },
  },
  {
    slug: "microsoft-ads-expansion",
    eyebrow: "CASE 004 · CHANNEL EXPANSION",
    metaTitle: "Building a Microsoft Ads channel to €295K revenue | The Growth Files",
    metaDescription:
      "How fixing an unmanaged Microsoft Ads account and importing proven Google Ads campaigns opened a new revenue channel, sustaining 400 to 580% ROAS.",
    h1: "From unmanaged spend to a €295K revenue channel: expanding into Microsoft Ads",
    subtitle: "Fixing a neglected account, then importing a proven Google Ads structure instead of rebuilding from zero.",
    metaLine: "ROLE: PERFORMANCE MARKETING  |  CHANNEL: MICROSOFT ADS",
    stats: [
      { value: "€295K", label: "ATTRIBUTED REVENUE" },
      { value: "400–580%", label: "ROAS, SUSTAINED THROUGH SCALE-UP" },
      { value: "~15", label: "PROVEN CAMPAIGNS IMPORTED" },
    ],
    sections: [
      {
        eyebrow: "THE SITUATION",
        heading: "The situation",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            While I was growing revenue for the company, there was a constant push to experiment and try new
            things. One opportunity was sitting there already, and it didn&apos;t need a new idea, it needed
            cleanup.
          </p>
        ),
      },
      {
        eyebrow: "THE FIRST WIN",
        heading: "The first win: fixing what was already broken",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            When I checked the Microsoft Ads account, I found roughly €10K in spend that nobody was actively
            managing. The team didn&apos;t have access to it, and in some cases didn&apos;t even know it
            existed. Before building anything new, the first job was simply gaining control of it: fixing
            access, and fixing tracking so the spend that was already happening could actually be measured
            and acted on.
          </p>
        ),
      },
      {
        eyebrow: "STRATEGY",
        heading: "The strategy: import, don't rebuild",
        body: (
          <>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-body-alt">
              At that point, the Google Ads account was already sharp, well structured, and performing.
              Rather than rebuilding Microsoft Ads campaigns from scratch, I used Microsoft Ads&apos; native
              option to import campaigns directly from Google Ads.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              I selected around 15 of the top performing Google Ads campaigns, a mix of branded and generic,
              chosen specifically because they combined the highest revenue with strong ROAS, not just the
              biggest spenders. That gave the new channel a proven starting structure instead of an untested
              one.
            </p>
          </>
        ),
      },
      {
        eyebrow: "TRACTION",
        heading: "What happened when it started working",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            The first month brought in meaningful extra revenue. That result got attention internally, and
            leadership wanted to keep pushing the channel further, so we did.
          </p>
        ),
      },
      {
        eyebrow: "THE LIMIT",
        heading: "The limit I found",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            As the channel scaled, one thing became clear: Microsoft Ads never reached the same market share
            or revenue level as Google Ads on the same account. I was never able to match Google Ads&apos;
            revenue with Microsoft Ads, and that&apos;s a real limit of the channel, not a failure of
            execution. What it did do was open a genuinely new revenue stream for the company, on top of
            what Google Ads was already generating, rather than cannibalizing it.
          </p>
        ),
      },
    ],
    resultsLabel: "RESULTS",
    results: [
      <>
        <strong className="text-navy">€295K in attributed revenue</strong>, built from a channel that
        started as roughly €10K in unmanaged, untracked spend
      </>,
      <><strong className="text-navy">Sustained 400 to 580% ROAS</strong> through the scale-up</>,
      <>Built by importing and adapting a proven Google Ads structure, rather than starting from zero</>,
      <>A genuinely new revenue channel added alongside Google Ads, not a replacement for it</>,
    ],
    proofLabel: "WHAT THIS PROVES",
    proofHeading: "What this proves",
    proof: (
      <>
        <p className="m-0">
          Not every new channel needs to be built from scratch. The fastest, most defensible way to prove
          out Microsoft Ads here was reusing a Google Ads structure that had already been tested and proven,
          rather than guessing at a new one. That turned a first month into a fast, credible win instead of
          a slow ramp-up.
        </p>
        <p className="m-0">
          The other lesson is just as important: a new channel doesn&apos;t have to match your biggest
          channel to be worth running. Microsoft Ads never caught up to Google Ads on this account, and it
          didn&apos;t need to. €295K in incremental revenue at 400 to 580% ROAS is a real result on its own,
          and recognizing that a channel has a natural ceiling is part of managing it honestly, not a reason
          to call it a failure.
        </p>
      </>
    ),
    relatedServices: (
      <>
        <p className="mb-3.5 text-[17px] leading-[1.78] text-body-alt">
          This work sits under{" "}
          <Link href="/services#performance-marketing" className="font-semibold text-green-dark">
            Performance Marketing
          </Link>
          : campaign structure, budget allocation, and channel expansion, using the tracking foundation
          described in{" "}
          <Link href="/services#analytics-data" className="font-semibold text-green-dark">
            Analytics &amp; Data
          </Link>
          .
        </p>
        <p className="m-0 text-[17px] leading-[1.78] text-body-alt">
          See also:{" "}
          <Link href="/case-studies/google-ads-revenue-growth" className="font-semibold text-green-dark">
            Google Ads revenue growth
          </Link>
          , the same client&apos;s primary paid search channel, and the source of the campaign structure
          imported into Microsoft Ads.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Should Microsoft Ads campaigns be rebuilt from scratch or imported from Google Ads?",
        a: "Microsoft Ads supports importing campaigns directly from an existing Google Ads account. When the Google Ads account is already well structured and performing, importing proven campaigns gives a new Microsoft Ads account a tested starting point instead of an untested one, and can shorten the time to profitability.",
      },
      {
        q: "How can a new or neglected Microsoft Ads account become profitable quickly?",
        a: "By first fixing basic account hygiene, access and conversion tracking, then importing a small set of already proven campaigns rather than launching untested ones. In this case, around 15 top performing branded and generic Google Ads campaigns, selected for both revenue and ROAS, were used to seed the account.",
      },
      {
        q: "Does Microsoft Ads typically match Google Ads revenue on the same account?",
        a: "Not necessarily. In this case, Microsoft Ads never reached the same market share or revenue level as Google Ads on the same account, even at scale. That is a real limit of the channel rather than a failure of execution, and the channel can still be a genuinely new, incremental revenue source rather than a replacement for Google Ads.",
      },
      {
        q: "What ROAS range is achievable when importing proven Google Ads campaigns into Microsoft Ads?",
        a: "In this case, the imported campaigns sustained 400 to 580% ROAS through the scale-up, rather than a single strong month followed by a drop-off.",
      },
      {
        q: "What is an efficient way to launch a new paid media channel?",
        a: "Starting from an account's existing, proven campaign data rather than a blank strategy. Reusing what already works on a mature channel, combined with fixing any existing tracking or management gaps first, reduces both the time and risk involved in proving out a new channel.",
      },
    ],
    ctaHeading: "Sitting on a channel nobody is managing?",
    index: {
      tag: "CASE 004 · CHANNEL EXPANSION",
      title: "Microsoft Ads: unmanaged spend to €295K",
      desc: "Fixed access and tracking on a neglected account, then imported proven Google Ads campaigns instead of rebuilding.",
      meta: "CHANNEL: MICROSOFT ADS  |  METHOD: IMPORT, DO NOT REBUILD",
      stat: "€295K",
      statLabel: "ATTRIBUTED REVENUE",
      statSub: "Sustained 400–580% ROAS · ~15 proven campaigns imported",
    },
  },
  {
    slug: "global-b2b-social-reach",
    eyebrow: "CASE 005 · B2B SOCIAL",
    metaTitle: "Managing B2B social media across four global brands | The Growth Files",
    metaDescription:
      "Running organic and paid social on LinkedIn, Instagram and Facebook across a global B2B account with four brands, and using engagement and follow rate to guide where focus shifts next.",
    h1: "Global B2B social reach across four brands, on one shared account",
    subtitle: "Organic and paid social on LinkedIn, Instagram and Facebook, with engagement and follow rate as the one comparable signal.",
    metaLine: "ROLE: CREATIVE & CONTENT  |  REGIONS: AMERICAS · EUROPE · ASIA  |  STATUS: ACTIVE",
    stats: [
      { value: "24.4M+", label: "COMBINED IMPRESSIONS, 28 DAYS" },
      { value: "3,920+", label: "NEW FOLLOWERS ACROSS BOTH CHANNELS" },
      { value: "4", label: "UMBRELLA BRANDS, THREE CONTINENTS" },
    ],
    sections: [
      {
        eyebrow: "THE SITUATION",
        heading: "The situation",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            This account is a global B2B portfolio spanning four umbrella brands, run across the Americas,
            Europe, and Asia. The work covers both organic and paid social on LinkedIn, Instagram and
            Facebook, for all four brands at once rather than one company page in isolation.
          </p>
        ),
      },
      {
        eyebrow: "THE CHALLENGE",
        heading: "The challenge",
        body: (
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
            Running four brands across three continents on two very different platforms creates a specific
            measurement problem. LinkedIn, Instagram and Facebook don&apos;t behave the same way, audiences
            and content formats differ by platform, and by region. Without a shared way to compare
            performance, it&apos;s easy to end up judging brands and regions against the wrong benchmark, or
            missing where attention should actually shift next.
          </p>
        ),
      },
      {
        eyebrow: "WHAT THE DATA SHOWED",
        heading: "What the data showed",
        body: (
          <>
            <p className="mb-6 text-[17px] leading-[1.75] text-body-alt">
              Looking at a 28 day window across the account, one thing stood out: despite very different
              audiences, formats, and absolute volumes, Meta and LinkedIn converted impressions into new
              followers at almost the same rate, roughly 6,200 impressions per new follower on Meta and
              6,300 on LinkedIn. Two platforms that don&apos;t otherwise look comparable were, in fact,
              producing a nearly identical underlying efficiency signal.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard>
                <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">
                  META (INSTAGRAM &amp; FACEBOOK)
                </div>
                <div className="mb-1 text-[30px] font-extrabold tracking-tight text-navy">~6,200</div>
                <div className="text-[13px] leading-relaxed text-[#6b788a]">impressions per new follower</div>
              </InfoCard>
              <InfoCard>
                <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">LINKEDIN</div>
                <div className="mb-1 text-[30px] font-extrabold tracking-tight text-navy">~6,300</div>
                <div className="text-[13px] leading-relaxed text-[#6b788a]">impressions per new follower</div>
              </InfoCard>
            </div>
          </>
        ),
      },
      {
        eyebrow: "APPROACH",
        heading: "The approach: one shared signal across different channels and brands",
        body: (
          <>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-body-alt">
              That consistency mattered, because it meant engagement and follow rate could be used as a
              shared, channel agnostic signal across all four brands and every region, rather than comparing
              raw impressions or follower counts directly, which would have been misleading given how
              differently each platform and market performs at the surface level.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] text-body-alt">
              Right now, that signal is actively being used to decide where to shift focus next: pulling
              attention and content investment out of areas that are underperforming on engagement and
              follow rate, and putting it into the areas producing the strongest response, across brands and
              regions rather than treating each one in isolation.
            </p>
          </>
        ),
      },
    ],
    resultsLabel: "RESULTS (28 DAY SNAPSHOT)",
    results: [
      <>
        <strong className="text-navy">18,758,005 impressions and 3,020 new followers</strong> on Meta
        (Instagram and Facebook), combining paid and organic
      </>,
      <><strong className="text-navy">5,672,588 impressions and 902 new followers</strong> on LinkedIn</>,
      <>
        <strong className="text-navy">24.4M+ combined impressions and 3,920+ new followers</strong> across
        both channels
      </>,
      <>
        A near identical impressions to new follower ratio across both platforms (roughly 6,200 to 6,300),
        despite very different audiences and content formats
      </>,
    ],
    proofLabel: "WHAT THIS IS SHOWING SO FAR",
    proofHeading: "What this is showing so far",
    proof: (
      <p className="m-0">
        This is an active, ongoing account, not a closed chapter, so the honest takeaway right now is about
        the method rather than a final outcome. At genuine multi-brand, multi-region scale, comparing
        platforms or brands on raw volume alone doesn&apos;t tell you much, the numbers are too different by
        nature. Finding a consistent, comparable signal, in this case engagement and follow rate, is what
        actually makes it possible to decide where to reallocate focus across four brands and three
        continents with any confidence.
      </p>
    ),
    relatedServices: (
      <>
        <p className="mb-3.5 text-[17px] leading-[1.78] text-body-alt">
          This work sits under{" "}
          <Link href="/services#creative-content" className="font-semibold text-green-dark">
            Creative &amp; Content
          </Link>
          : content planning and channel management across brands, supported by the multi-market
          coordination covered in{" "}
          <Link href="/services#industry-growth" className="font-semibold text-green-dark">
            Industry Growth
          </Link>
          .
        </p>
        <p className="m-0 text-[17px] leading-[1.78] text-body-alt">
          See also:{" "}
          <Link href="/case-studies/google-ads-revenue-growth" className="font-semibold text-green-dark">
            Google Ads revenue growth
          </Link>
          , the same evidence first approach applied to a paid search account.
        </p>
      </>
    ),
    faqs: [
      {
        q: "How do you compare social media performance across brands and regions that behave very differently?",
        a: "Raw impressions or follower counts aren't directly comparable across platforms, brands, or regions, since audience size and behavior vary too much. A more reliable approach is finding a shared efficiency signal, such as the rate at which impressions convert into new followers, and comparing that ratio instead of the raw numbers.",
      },
      {
        q: "Is LinkedIn or Instagram more effective for global B2B reach?",
        a: "It depends on the account. In this case, both platforms converted impressions into new followers at a nearly identical rate, roughly 6,200 to 6,300 impressions per new follower, despite very different audiences, formats, and absolute volumes. That made them directly comparable on efficiency, even though their raw numbers looked very different.",
      },
      {
        q: "How should budget or content focus be prioritized across multiple brands in one global account?",
        a: "By using a consistent, shared performance signal, such as engagement and follow rate, to identify which brands or regions are underperforming and which are producing the strongest response, then shifting focus and investment accordingly, rather than applying a flat, equal approach across every brand or region.",
      },
      {
        q: "How often should a multi-brand social account be reassessed?",
        a: "On a rolling basis. This account is actively monitored and reallocated in near real time based on engagement and follow rate signals, rather than reviewed only at fixed quarterly or annual checkpoints.",
      },
      {
        q: "What does a high volume of impressions with a low follower conversion rate actually mean?",
        a: "It's expected at this scale, and isn't necessarily a problem on its own. A very small percentage of impressions converting into new followers is normal for large B2B accounts, what matters more is whether that rate is consistent and comparable across channels, which is what makes it useful for guiding decisions.",
      },
    ],
    ctaHeading: "Running social across more brands than benchmarks?",
    index: {
      tag: "CASE 005 · B2B SOCIAL",
      title: "Global B2B social reach across four brands",
      desc: "Organic and paid social on LinkedIn and Instagram, using engagement and follow rate as the one comparable signal.",
      meta: "REGIONS: AMERICAS · EUROPE · ASIA  |  STATUS: ACTIVE",
      stat: "24.4M+",
      statLabel: "COMBINED IMPRESSIONS, 28 DAYS",
      statSub: "3,920+ new followers · four umbrella brands, three continents",
    },
  },
];
