import type { ReactNode } from "react";

type Step = { label: string; text: ReactNode };

/**
 * Ports the green-left-border stacked step list used for case study
 * "insight/decision/action", "three pillars" and "waterfall" sections.
 */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col gap-0.5 border-l-2 border-green pl-6">
      {steps.map((step, i) => (
        <div key={step.label} className={i < steps.length - 1 ? "pb-[22px]" : ""}>
          <div className="mb-2 text-[13px] font-extrabold tracking-[0.06em] text-navy">{step.label}</div>
          <p className="m-0 text-[17px] leading-[1.75] text-body-alt">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
