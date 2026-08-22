import { Reveal } from "@/components/motion/Reveal";

type JourneyItem = { icon: string; date: string; title: string; desc: string };

/**
 * Ports About.dc.html's "The Journey" horizontal icon timeline. The
 * prototype has no defined mobile treatment for a 7-item horizontal row
 * with an absolutely-positioned connecting line — squeezing 7 columns into
 * a mobile viewport would be illegible, so this adapts to a vertical
 * stacked timeline below the `md` breakpoint (composition adapted for
 * mobile, not just shrunk, per the brief's own responsiveness guidance).
 * Items fade in without a slide offset, matching the prototype's
 * data-reveal (no transform set) on this section.
 */
export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  return (
    <div>
      {/* Desktop / tablet: horizontal row with a connecting line */}
      <div className="relative mb-14 hidden justify-between md:flex">
        <div className="absolute top-[18px] right-0 left-0 h-0.5 bg-[#d7ded9]" />
        {items.map((item, i) => (
          <Reveal key={item.title} index={i} offset={0} className="relative flex-1 px-1.5 text-center">
            <div className="relative z-10 mx-auto mb-3.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green bg-paper text-sm text-green-dark">
              {item.icon}
            </div>
            <div className="mb-1.5 font-mono text-[10px] tracking-[0.04em] text-green-dark">{item.date}</div>
            <div className="mb-1.5 text-sm font-bold text-navy">{item.title}</div>
            <div className="text-xs leading-relaxed text-body">{item.desc}</div>
          </Reveal>
        ))}
      </div>

      {/* Mobile: vertical stacked timeline */}
      <div className="mb-4 flex flex-col md:hidden">
        {items.map((item, i) => (
          <Reveal key={item.title} index={i} offset={0} className="flex gap-4 pb-6">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-green bg-paper text-sm text-green-dark">
                {item.icon}
              </div>
              {i < items.length - 1 ? <div className="mt-1.5 w-0.5 flex-1 bg-[#d7ded9]" /> : null}
            </div>
            <div className="pb-2">
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.04em] text-green-dark">{item.date}</div>
              <div className="mb-1.5 text-sm font-bold text-navy">{item.title}</div>
              <div className="text-xs leading-relaxed text-body">{item.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
