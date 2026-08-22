import { Reveal } from "@/components/motion/Reveal";

type Discipline = { icon: string; title: string; desc: string };

/** Ports About.dc.html's "How I Work" dark discipline cards, 3-up on desktop. */
export function DisciplineGrid({ disciplines }: { disciplines: Discipline[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {disciplines.map((d, i) => (
        <Reveal key={d.title} index={i}>
          <div className="h-full rounded-lg border border-white/[0.08] bg-navy-panel-alt p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-green hover:bg-[#16281f]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green/[0.12] text-lg text-green">
              {d.icon}
            </div>
            <div className="mb-2 text-base font-bold text-white">{d.title}</div>
            <div className="text-sm leading-relaxed text-muted">{d.desc}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
