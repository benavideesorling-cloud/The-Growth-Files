import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

type Record = { tag: string; title: string; stat: string; sub: string; href: string };

/** Ports Home.dc.html's "Real campaigns. Documented outcomes." list. */
export function CaseRecords({ records }: { records: Record[] }) {
  return (
    <div>
      {records.map((record, i) => (
        <Reveal key={record.tag} index={i} offset={18}>
          <div className="flex items-center justify-between gap-6 border-t border-navy/[0.08] py-[22px] transition-colors duration-200 hover:bg-navy/[0.02]">
            <div>
              <div className="mb-1.5 font-mono text-[11px] tracking-[0.04em] text-muted">{record.tag}</div>
              <div className="text-[17px] font-bold text-navy">{record.title}</div>
            </div>
            <div className="min-w-[180px] text-right">
              <div className="text-xl font-extrabold text-green-dark">{record.stat}</div>
              <div className="text-xs text-body">{record.sub}</div>
            </div>
            <Link
              href={record.href}
              className="inline-block whitespace-nowrap text-[13px] font-bold tracking-[0.03em] text-green-dark transition-transform duration-200 hover:translate-x-1"
            >
              OPEN FILE →
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
