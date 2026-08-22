/**
 * Ports DataTicks.dc.html — a decorative row of vertical tick bars along a
 * bottom border. Not referenced by any current page in the prototype; ported
 * from the component file's own default preview props, which is the only
 * visual source of truth available for it.
 */
export function DataTicks({
  count = 10,
  height = 24,
  tickWidth = 2,
  gap = 5,
  heights,
}: {
  count?: number;
  height?: number;
  tickWidth?: number;
  gap?: number;
  heights?: number[];
}) {
  const ticks = Array.from({ length: count }, (_, i) => {
    const v = heights?.length ? heights[i % heights.length]! : 0.4 + ((i * 37) % 60) / 100;
    const h = Math.max(4, Math.min(1, v) * height);
    return h.toFixed(1);
  });

  return (
    <div
      className="flex items-end border-b border-slate-400/30"
      style={{ gap, height }}
    >
      {ticks.map((h, i) => (
        <div key={i} className="bg-slate-500/40" style={{ width: tickWidth, height: `${h}px` }} />
      ))}
    </div>
  );
}
