import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

type CaseStudyIndexEntry = {
  tag: string;
  title: string;
  desc: string;
  meta: string;
  stat: string;
  statLabel: string;
  statSub: string;
  href: string;
};

/** Ports CaseStudies.dc.html's index list card. */
export function CaseStudyCard({ entry, index }: { entry: CaseStudyIndexEntry; index: number }) {
  return (
    <Reveal index={index} offset={20}>
      <div className="grid grid-cols-1 gap-8 rounded-lg border-l-[3px] border-green bg-navy-panel p-9 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.25)] md:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="mb-3 font-mono text-xs text-green">{entry.tag}</div>
          <div className="mb-3 text-2xl font-bold text-white">{entry.title}</div>
          <div className="mb-[18px] text-[15px] leading-relaxed text-muted">{entry.desc}</div>
          <div className="mb-[18px] font-mono text-xs text-muted-alt">{entry.meta}</div>
          <Link href={entry.href} className="text-[13px] font-bold tracking-[0.04em] text-green">
            OPEN CASE STUDY →
          </Link>
        </div>
        <div className="rounded-lg bg-navy-panel-alt p-7">
          <div className="mb-2 text-[38px] font-extrabold text-green">
            <CountUp text={entry.stat} />
          </div>
          <div className="mb-3.5 text-xs font-bold tracking-[0.04em] text-white">{entry.statLabel}</div>
          <div className="mb-3.5 h-px bg-white/10" />
          <div className="text-[13px] leading-relaxed text-muted">{entry.statSub}</div>
        </div>
      </div>
    </Reveal>
  );
}
