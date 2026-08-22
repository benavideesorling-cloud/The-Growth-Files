import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

type Step = { title: string; desc: string };

/**
 * Ports the "Diagnose. Prioritize. Execute. Improve." process grid, reused
 * on Home (plain, dark-on-light headings) and Services (green left border
 * per card). Step copy itself differs slightly between the two pages (e.g.
 * the "Improve" description), so it's passed in rather than hardcoded.
 */
export function ProcessSteps({
  eyebrow,
  headline,
  steps,
  variant = "plain",
}: {
  eyebrow: string;
  headline: string;
  steps: Step[];
  variant?: "plain" | "bordered";
}) {
  return (
    <div>
      <Eyebrow label={eyebrow} />
      <h2 className="mt-5 mb-10 text-[34px] font-extrabold tracking-tight text-navy">{headline}</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} index={i} className="transition-transform duration-250 ease-out hover:-translate-y-1">
            <div className={variant === "bordered" ? "border-l-2 border-green pl-5" : ""}>
              <div className="mb-2 text-base font-bold text-navy">{step.title}</div>
              <div className="text-[13px] leading-relaxed text-body">{step.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
