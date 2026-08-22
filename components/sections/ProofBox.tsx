import type { ReactNode } from "react";

/** The dark "What this proves" callout box closing each case study's narrative. */
export function ProofBox({ label, heading, children }: { label: string; heading: string; children: ReactNode }) {
  return (
    <div className="rounded-[10px] bg-navy px-10 py-9">
      <div className="mb-3 font-mono text-xs tracking-[0.06em] text-green">{label}</div>
      <h2 className="mb-4 text-2xl leading-tight font-extrabold tracking-tight text-white">{heading}</h2>
      <div className="flex flex-col gap-[18px] text-[17px] leading-[1.75] text-[#b6c0cc]">{children}</div>
    </div>
  );
}
