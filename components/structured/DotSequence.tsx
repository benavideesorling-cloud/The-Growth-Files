/**
 * Ports DotSequence.dc.html — a horizontal step-progress dot sequence, the
 * active dot larger and solid green, others smaller and faded. Not
 * referenced by any current page in the prototype; ported from the
 * component file's own default preview props.
 */
export function DotSequence({
  count = 5,
  activeIndex,
}: {
  count?: number;
  activeIndex?: number;
}) {
  const active = activeIndex ?? count - 1;

  return (
    <div className="flex w-full items-center">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active;
        const isLast = i === count - 1;
        const size = isActive ? 8 : 6;
        return (
          <div key={i} className="flex items-center" style={{ flex: isLast ? "0 0 auto" : "1 1 auto" }}>
            <div
              className="shrink-0 rounded-full"
              style={{
                width: size,
                height: size,
                background: isActive ? "var(--color-green)" : "rgba(0,192,76,0.3)",
              }}
            />
            {!isLast ? <div className="mx-1.5 h-px flex-1 bg-slate-400/35" /> : null}
          </div>
        );
      })}
    </div>
  );
}
