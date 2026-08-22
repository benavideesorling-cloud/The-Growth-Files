/**
 * Ports the "SYSTEM LEAK MAP" diagram from Home.dc.html's Problem section —
 * a small decorative SVG showing dashed handoffs between visibility, media,
 * data and conversion. Fixed, one-off content tied to this specific section,
 * so labels aren't parametrized.
 */
export function SystemLeakMap() {
  return (
    <div className="rounded-[10px] border border-navy/[0.08] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="mb-4 font-mono text-[11px] tracking-[0.06em] text-muted">SYSTEM LEAK MAP</div>
      <svg viewBox="0 0 400 140" className="w-full">
        <path
          d="M40,105 L140,32 L260,105 L360,32"
          fill="none"
          stroke="var(--color-green)"
          strokeWidth={2}
          strokeDasharray="4,4"
        />
        {[
          { cx: 40, cy: 105 },
          { cx: 140, cy: 32 },
          { cx: 260, cy: 105 },
          { cx: 360, cy: 32 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={17} fill="var(--color-paper)" stroke="var(--color-green)" strokeWidth={2} />
        ))}
        <text x={40} y={132} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="var(--color-body)">
          VISIBILITY
        </text>
        <text x={140} y={14} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="var(--color-body)">
          MEDIA
        </text>
        <text x={260} y={132} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="var(--color-body)">
          DATA
        </text>
        <text x={360} y={14} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="var(--color-body)">
          CONVERSION
        </text>
      </svg>
      <div className="mt-2.5 text-xs text-muted">Dashed links = handoffs, tracking gaps and fragmented ownership.</div>
    </div>
  );
}
