type Tone = "default" | "inverse";

const toneClasses: Record<Tone, string> = {
  default: "bg-green text-green",
  // The prototype places this component on green CTA sections (e.g.
  // CaseStudies.dc.html) with no color variant, which renders green-on-green
  // (~1:1 contrast, fails WCAG). "inverse" swaps to navy for use on light or
  // green backgrounds — an accessibility fix, not a design change.
  inverse: "bg-navy text-navy",
};

export function Eyebrow({ label, tone = "default" }: { label: string; tone?: Tone }) {
  const [dashClass, textClass] = toneClasses[tone].split(" ");
  return (
    <div className="flex items-center gap-2.5">
      <div className={`h-0.5 w-6 shrink-0 ${dashClass}`} />
      <span className={`font-mono text-xs font-bold uppercase tracking-[0.08em] ${textClass}`}>
        {label}
      </span>
    </div>
  );
}
