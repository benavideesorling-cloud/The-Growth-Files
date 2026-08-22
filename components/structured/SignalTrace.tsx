/**
 * Ports SignalTrace.dc.html — a small illustrative line-trace with a draw-in
 * animation, used inside the Home hero's growth-ledger.json panel. Purely
 * decorative (labeled as such via aria-label), so it's a Server Component:
 * the draw-in animation runs via the CSS keyframes in globals.css, and
 * prefers-reduced-motion is handled by the project's global CSS override
 * rather than a client-side matchMedia check.
 */
export function SignalTrace({
  points,
  width = 220,
  height = 72,
}: {
  points: number[];
  width?: number;
  height?: number;
}) {
  const pad = 6;
  const n = points.length;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const xs = points.map((_, i) => pad + (i / (n - 1)) * (width - pad * 2));
  const ys = points.map((v) => height - pad - ((v - min) / range) * (height - pad * 2));
  const polylinePoints = xs.map((x, i) => `${x.toFixed(1)},${ys[i]!.toFixed(1)}`).join(" ");

  const dots = points.map((_, i) => {
    const isLast = i === n - 1;
    return {
      cx: xs[i]!.toFixed(1),
      cy: ys[i]!.toFixed(1),
      r: isLast ? 3.2 : 2.4,
      fill: isLast ? "var(--color-green)" : "none",
      stroke: isLast ? "var(--color-green)" : "rgba(0,192,76,0.35)",
      strokeWidth: isLast ? 0 : 1,
      isLast,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      style={{ display: "block", overflow: "visible" }}
      aria-label="Illustrative signal, not measured data"
    >
      <polyline
        points={polylinePoints}
        fill="none"
        stroke="var(--color-green)"
        strokeWidth={1.2}
        pathLength={100}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: 100,
          strokeOpacity: 0.3,
          animation: "signal-draw 0.8s ease forwards",
        }}
      />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill={d.fill}
          stroke={d.stroke}
          strokeWidth={d.strokeWidth}
          style={
            d.isLast
              ? { opacity: 0, animation: "signal-dot-fade 0.4s ease 0.75s forwards" }
              : { opacity: 0.7 }
          }
        />
      ))}
    </svg>
  );
}
