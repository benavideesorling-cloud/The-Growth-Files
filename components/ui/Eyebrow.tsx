type Tone = "default" | "inverse";

// "inverse" (navy) remains for use on green/light backgrounds where the
// default green would fail contrast (see CaseStudies.dc.html's CTA band) —
// unrelated to the dash removal below.
const textClasses: Record<Tone, string> = {
  default: "text-green",
  inverse: "text-navy",
};

/** Small mono-uppercase section label. Per user correction, no leading dash. */
export function Eyebrow({ label, tone = "default" }: { label: string; tone?: Tone }) {
  return (
    <span className={`font-mono text-xs font-bold uppercase tracking-[0.08em] ${textClasses[tone]}`}>
      {label}
    </span>
  );
}
