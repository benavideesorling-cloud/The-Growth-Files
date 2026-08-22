import type { ReactNode } from "react";

type FAQ = { q: string; a: ReactNode };

/**
 * Two FAQ visual treatments exist in the prototype: a light bordered list
 * (case study detail pages) and dark hover-bordered cards (blog posts).
 * Both are static Q+A pairs, not an accordion — neither prototype source
 * collapses/expands them.
 */
export function FAQList({ faqs, variant = "light" }: { faqs: FAQ[]; variant?: "light" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="flex flex-col gap-3.5">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/[0.08] bg-navy-panel p-6 transition-colors duration-250 hover:border-green/50"
          >
            <div className="mb-2.5 text-[17px] leading-snug font-bold text-white">{faq.q}</div>
            <div className="text-base leading-relaxed text-[#b6c0cc]">{faq.a}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col border-t border-[#d7ded9]">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-[#d7ded9] py-[22px]">
          <div className="mb-2.5 text-base leading-snug font-extrabold text-navy">{faq.q}</div>
          <p className="m-0 text-base leading-relaxed text-body-alt">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
