import { Reveal } from "@/components/motion/Reveal";

type SchemaRow = {
  id: string;
  property: string;
  title: string;
  desc: string;
  output: string;
};

/**
 * Ports the "solution" discipline table from Home.dc.html — a header row
 * (ID / PROPERTY / DISCIPLINE / OUTPUT) followed by rows that highlight on
 * hover, sitting directly on the navy section background (no card border).
 * The prototype's fixed-width ID/PROPERTY/OUTPUT columns leave too little
 * room for the DISCIPLINE title/description on mobile (a 390px viewport
 * leaves ~60px for it), so rows stack into a simple label+content+output
 * layout below `sm`, matching the exact desktop table above it.
 */
export function SchemaTable({ rows }: { rows: SchemaRow[] }) {
  return (
    <div>
      <div className="hidden border-b border-white/10 pb-3.5 font-mono text-[11px] tracking-[0.06em] text-muted-alt sm:flex">
        <div className="w-[50px]">ID</div>
        <div className="w-[140px]">PROPERTY</div>
        <div className="flex-1">DISCIPLINE</div>
        <div className="w-[100px] text-right">OUTPUT</div>
      </div>
      {rows.map((row, i) => (
        <Reveal key={row.id} index={i} offset={18}>
          <div className="border-b border-white/[0.06] py-5 transition-colors duration-200 hover:bg-white/[0.03] sm:flex sm:items-center">
            <div className="mb-2 flex items-center gap-3 font-mono text-xs sm:mb-0 sm:w-[50px] sm:gap-0">
              <span className="text-muted-alt">{row.id}</span>
              <span className="text-green sm:hidden">{row.property}</span>
            </div>
            <div className="hidden font-mono text-xs text-green sm:block sm:w-[140px]">{row.property}</div>
            <div className="flex-1 sm:pr-5">
              <div className="mb-1 text-base font-bold text-white">{row.title}</div>
              <div className="text-[13px] text-muted">{row.desc}</div>
            </div>
            <div className="mt-2 font-mono text-[13px] text-green sm:mt-0 sm:w-[100px] sm:text-right">
              {row.output}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
