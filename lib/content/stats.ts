/**
 * The five headline stats — single source shared by the homepage and
 * About page StatsStrip (previously duplicated verbatim in both files)
 * and llms.txt (lib/content/llms.ts).
 */
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "6+", label: "YEARS EXPERIENCE" },
  { value: "€1.3M+", label: "AD SPEND MANAGED" },
  { value: "€6.9M+", label: "REVENUE GENERATED" },
  { value: "554%", label: "PEAK ROAS" },
  { value: "500+", label: "MONTHLY AI CITATIONS" },
];
