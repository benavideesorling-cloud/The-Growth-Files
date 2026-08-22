import { Reveal } from "@/components/motion/Reveal";

type Service = { num: string; slug: string; title: string; desc: string; output: string };

/** Ports Services.dc.html's numbered white service cards, 3-up on desktop. */
export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.num} index={i}>
          <div
            id={service.slug}
            className="group h-full scroll-mt-24 rounded-lg border border-navy/[0.08] bg-white p-8 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-green hover:bg-[#f5fbf6] hover:shadow-[0_12px_28px_rgba(13,24,38,0.1)]"
          >

            <div className="mb-4 font-mono text-[13px] text-green-dark">{service.num}</div>
            <div className="mb-3 text-xl font-extrabold tracking-tight text-navy">{service.title}</div>
            <div className="mb-5 text-sm leading-relaxed text-body">{service.desc}</div>
            <div className="font-mono text-[11px] tracking-[0.06em] text-muted">OUTPUT · {service.output}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
