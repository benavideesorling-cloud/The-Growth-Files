import { StepList } from "@/components/structured/StepList";
import { InfoCard } from "@/components/ui/InfoCard";
import { renderInline } from "@/lib/content/inline";

type SectionParagraph = { _key: string; _type: "sectionParagraph"; text: string };
type SectionArrowList = { _key: string; _type: "sectionArrowList"; items: string[] };
type SectionStep = { _key: string; label: string; text: string };
type SectionStepList = { _key: string; _type: "sectionStepList"; steps: SectionStep[] };
type SectionCard = {
  _key: string;
  leading?: string;
  title?: string;
  body?: string;
  subItems?: string[];
  stat?: string;
  statLabel?: string;
};
type SectionCardGrid = { _key: string; _type: "sectionCardGrid"; columns?: 1 | 2; cards: SectionCard[] };

export type CaseStudySectionBlock = SectionParagraph | SectionArrowList | SectionStepList | SectionCardGrid;

/**
 * Renders a case study section's `body` array (sourced from Sanity). Each
 * block type maps to the same components and classNames as the original
 * hand-authored case study JSX did pre-migration — same visual output,
 * now driven by CMS content instead of a static data file.
 */
export function CaseStudySectionBody({ body }: { body: CaseStudySectionBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {body.map((block) => {
        switch (block._type) {
          case "sectionParagraph":
            return (
              <p key={block._key} className="m-0 text-[17px] leading-[1.75] text-body-alt">
                {renderInline(block.text, block._key)}
              </p>
            );
          case "sectionArrowList":
            return (
              <div key={block._key} className="flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <div key={i} className="flex gap-3 text-base leading-relaxed text-body-alt">
                    <span className="font-bold text-green">→</span>
                    <span>{renderInline(item, `${block._key}-${i}`)}</span>
                  </div>
                ))}
              </div>
            );
          case "sectionStepList":
            return (
              <StepList
                key={block._key}
                steps={block.steps.map((step) => ({
                  label: step.label,
                  text: renderInline(step.text, step._key),
                }))}
              />
            );
          case "sectionCardGrid":
            return (
              <div
                key={block._key}
                className={
                  block.columns === 1
                    ? "flex flex-col gap-4"
                    : "grid grid-cols-1 gap-4 sm:grid-cols-2"
                }
              >
                {block.cards.map((card) => (
                  <InfoCard key={card._key} leading={card.leading}>
                    {card.stat !== undefined ? (
                      <>
                        {card.title ? (
                          <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green-dark">{card.title}</div>
                        ) : null}
                        <div className="mb-1 text-[30px] font-extrabold tracking-tight text-navy">{card.stat}</div>
                        {card.statLabel ? (
                          <div className="text-[13px] leading-relaxed text-[#6b788a]">{card.statLabel}</div>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {card.title ? <div className="mb-2.5 text-[15px] font-extrabold text-navy">{card.title}</div> : null}
                        {card.body ? (
                          <p className="m-0 text-[15px] leading-relaxed text-body-alt">
                            {renderInline(card.body, `${card._key}-body`)}
                          </p>
                        ) : null}
                        {card.subItems?.length ? (
                          <div className="mt-2 flex flex-col gap-1.5 pl-0.5">
                            {card.subItems.map((item, i) => (
                              <div key={i} className="flex gap-2.5 text-base leading-relaxed text-body-alt">
                                <span className="text-green">·</span>
                                <span>{renderInline(item, `${card._key}-sub-${i}`)}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </>
                    )}
                  </InfoCard>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
