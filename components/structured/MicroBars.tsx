/**
 * Ports MicroBars.dc.html — a small bar chart, the highlighted bar solid
 * green, others translucent green. Not referenced by any current page in
 * the prototype; ported from the component file's own default preview
 * props.
 */
export function MicroBars({
  values = [40, 55, 48, 62, 50],
  highlightIndex,
  height = 40,
  barWidth = 8,
  gap = 6,
}: {
  values?: number[];
  highlightIndex?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
}) {
  const highlight = highlightIndex ?? values.length - 1;
  const max = Math.max(...values) || 1;

  return (
    <div className="flex items-end" style={{ gap, height }}>
      {values.map((v, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            width: barWidth,
            height: Math.max(6, (v / max) * height),
            background: i === highlight ? "var(--color-green)" : "rgba(0,192,76,0.22)",
          }}
        />
      ))}
    </div>
  );
}
