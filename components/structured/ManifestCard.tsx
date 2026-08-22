import { SignalTrace } from "./SignalTrace";

type ManifestRow = {
  /** Optional leading id, e.g. "01" (used by Home's growth-ledger.json rows). */
  id?: string;
  /** Pre-formatted key text exactly as authored, e.g. `"visibility"`. */
  label: string;
  /** Pre-formatted value text exactly as authored, e.g. `"AI Search + SEO"`. */
  value: string;
};

/**
 * Ports the structured JSON-panel pattern used for Home's growth-ledger.json
 * and Contact's contact-manifest.json. The two real usages differ (id
 * prefix vs. none, trailing SignalTrace vs. none, a trailing unbordered
 * "status" line vs. none, two different panel background shades) — all
 * covered here via props rather than picking one and dropping the rest.
 */
export function ManifestCard({
  filename,
  rows,
  dots = false,
  trace,
  statusLine,
  variant = "panel",
  className = "",
}: {
  filename: string;
  rows: ManifestRow[];
  dots?: boolean;
  trace?: number[];
  statusLine?: { label: string; value: string };
  variant?: "panel" | "panel-alt";
  className?: string;
}) {
  const bgClass = variant === "panel-alt" ? "bg-navy-panel-alt" : "bg-navy-panel";

  return (
    <div
      className={`rounded-lg border border-white/[0.08] ${bgClass} p-8 font-mono text-[13px] ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted-alt">{filename}</span>
        {dots ? (
          <span className="flex" style={{ gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="rounded-full bg-[#3a4c66]" style={{ width: 5, height: 5 }} />
            ))}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <div
            key={`${row.label}-${i}`}
            className={`flex justify-between gap-4 ${
              i < rows.length - 1 ? "border-b border-white/[0.06] pb-2.5" : ""
            }`}
          >
            <span>
              {row.id ? <span className="text-muted-alt">{row.id} </span> : null}
              <span className="text-green">{row.label}</span>
            </span>
            <span className="text-[#e2e8f0]">{row.value}</span>
          </div>
        ))}
      </div>

      {statusLine ? (
        <div className="text-green">
          {statusLine.label}: <span className="text-[#e2e8f0]">{statusLine.value}</span>
        </div>
      ) : null}

      {trace ? (
        <div className="mt-[30px] pt-1">
          <SignalTrace points={trace} width={300} height={68} />
        </div>
      ) : null}
    </div>
  );
}
