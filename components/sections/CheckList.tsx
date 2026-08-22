import type { ReactNode } from "react";

/** Green-checkmark results list, used in every case study's Results section. */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 text-base leading-snug text-body-alt">
          <span className="font-bold text-green">✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
