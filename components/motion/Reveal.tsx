"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ports motion.js's initReveal() to React. Elements already in view on
 * mount appear instantly (no slide/fade) to avoid a harsh jump on landing;
 * elements below the fold fade + slide in once they cross the viewport,
 * staggered by `index`. prefers-reduced-motion is handled globally in
 * globals.css (transition durations collapse to ~0).
 */
export function Reveal({
  children,
  index = 0,
  offset = 20,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  /** Initial translateY offset in px before reveal. The prototype uses
   * different values per section (18/20/24, or 0 for fade-only) — pass the
   * exact value from the source section rather than relying on the default. */
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = `${(index % 6) * 0.07}s`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        // Once revealed, leave `transform` unset (rather than "none") so a
        // hover:-translate-y-* utility on this same element isn't permanently
        // overridden by a higher-specificity inline style.
        transform: visible ? undefined : offset ? `translateY(${offset}px)` : undefined,
        transition: visible
          ? `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
