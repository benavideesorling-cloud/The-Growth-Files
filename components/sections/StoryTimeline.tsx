import { Reveal } from "@/components/motion/Reveal";

type StoryItem = { icon: string; title: string; desc: string };

/**
 * Ports About.dc.html's "My Story" icon list — a connecting line between
 * circular icon markers. Items fade in without a slide offset (the
 * prototype's data-reveal on these has no transform set, unlike most other
 * sections), so offset=0 here is intentional, not an oversight.
 */
export function StoryTimeline({ items }: { items: StoryItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <Reveal key={item.title} index={i} offset={0} className="flex gap-5 pb-6">
          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-soft text-[15px] text-green-dark">
              {item.icon}
            </div>
            <div className="mt-1.5 h-6 w-0.5 bg-[#d7ded9]" />
          </div>
          <div>
            <div className="mb-1.5 text-[17px] font-bold text-navy">{item.title}</div>
            <div className="text-sm leading-relaxed text-body">{item.desc}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
