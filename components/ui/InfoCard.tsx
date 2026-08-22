import type { ReactNode } from "react";

/**
 * White bordered card with a hover lift, used throughout case study detail
 * pages for tool lists, campaign-type breakdowns, execution items and
 * small stat pairs. `leading` renders an optional number/index prefix
 * column (e.g. "1", "2") for the numbered variants.
 */
export function InfoCard({ children, leading, className = "" }: { children: ReactNode; leading?: ReactNode; className?: string }) {
  if (leading !== undefined) {
    return (
      <div
        className={`flex gap-[18px] rounded-lg border border-[#e2e6e2] bg-white p-[22px] transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(13,24,38,0.09)] ${className}`}
      >
        <div className="font-mono text-[15px] font-bold text-green-dark">{leading}</div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-[#e2e6e2] bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(13,24,38,0.09)] ${className}`}
    >
      {children}
    </div>
  );
}
