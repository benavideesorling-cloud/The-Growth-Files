import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

type Stat = { value: string; label: string };

/**
 * Two visual treatments exist in the prototype for a row of proof stats:
 * "bar" — a flex row with a thin green left accent, used identically on
 * Home and About (5 stats); "card" — a 4-column grid of bordered panels,
 * used on case study detail pages. Both include their own section wrapper
 * since each variant's surrounding section is consistent everywhere it's
 * used in the prototype.
 */
export function StatsStrip({
  stats,
  variant = "bar",
}: {
  stats: Stat[];
  variant?: "bar" | "card";
}) {
  if (variant === "card") {
    return (
      <section className="bg-navy px-5 pb-[70px] sm:px-8 md:px-12">
        <Container>
          {/* The prototype's 4-col grid has no defined mobile treatment;
              2 cols on mobile is a minimal responsive adaptation, not a
              redesign. */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                index={i}
                className="rounded-lg border border-white/[0.08] bg-navy-panel p-7"
              >
                <div className="mb-2 text-[32px] font-extrabold text-green">
                  <CountUp text={stat.value} />
                </div>
                <div className="text-xs font-bold leading-relaxed tracking-[0.04em] text-white">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-y border-white/[0.06] bg-navy-deep px-5 py-10 sm:px-8 md:px-12">
      <Container>
        <div className="flex flex-wrap gap-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} index={i} className="flex gap-4">
              <div className="w-0.5 bg-green" />
              <div>
                <div className="text-[30px] font-extrabold text-green">
                  <CountUp text={stat.value} />
                </div>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.05em] text-muted">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
