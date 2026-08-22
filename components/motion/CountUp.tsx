"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(text: string) {
  const match = text.match(/[\d.]+/);
  if (!match || match.index === undefined) return null;
  return {
    target: parseFloat(match[0]),
    decimals: (match[0].split(".")[1] || "").length,
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + match[0].length),
  };
}

/**
 * Ports motion.js's initCounters() to React. Takes the exact stat string as
 * authored (e.g. "€6.9M+", "554%") and animates the first numeric token from
 * 0 to its value over 2s (cubic ease-out) once it's 40% visible, preserving
 * any prefix/suffix text and decimal precision — same regex-based parse as
 * the original, just typed and componentized.
 *
 * Unlike the original (which has no reduced-motion guard on the count-up),
 * this respects prefers-reduced-motion by jumping straight to the final
 * value — a deliberate accessibility fix, since this is a rAF-driven text
 * change the project's global CSS transition-duration override can't reach.
 */
export function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    const parsed = parseStat(text);
    return parsed ? parsed.prefix + (0).toFixed(parsed.decimals) + parsed.suffix : text;
  });

  useEffect(() => {
    const el = ref.current;
    const parsed = parseStat(text);
    if (!el || !parsed) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);

          const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
          if (reduceMotion) {
            setDisplay(text);
            return;
          }

          const duration = 2000;
          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(parsed.prefix + (parsed.target * eased).toFixed(parsed.decimals) + parsed.suffix);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return <span ref={ref}>{display}</span>;
}
