// Pure helper functions for the Studio SEO preview/warnings panel — no
// React here, just logic, so the same evaluation is used consistently by
// both the inline character counters and the consolidated warnings list.

export type LengthStatus = "empty" | "short" | "ok" | "long";

export function evaluateLength(
  text: string | undefined,
  { target, warnBelow }: { target: [number, number]; warnBelow?: number },
): { length: number; status: LengthStatus } {
  const length = (text ?? "").length;
  const [, max] = target;
  if (length === 0) return { length, status: "empty" };
  if (warnBelow !== undefined && length < warnBelow) return { length, status: "short" };
  if (length > max) return { length, status: "long" };
  return { length, status: "ok" };
}

export function containsKeyphrase(haystack: string | undefined, keyphrase: string | undefined): boolean {
  const needle = keyphrase?.trim().toLowerCase();
  if (!needle) return false;
  return (haystack ?? "").toLowerCase().includes(needle);
}

type PortableTextSpan = { _type?: string; text?: string };
type PortableTextBlockLike = { _type?: string; style?: string; children?: PortableTextSpan[] };

function plainTextOf(block: PortableTextBlockLike): string {
  return (block.children ?? [])
    .filter((child) => child._type === "span")
    .map((child) => child.text ?? "")
    .join("");
}

/** H2/H3/H4 heading text from a post's Portable Text body. */
export function extractBodyHeadings(body: unknown): string[] {
  if (!Array.isArray(body)) return [];
  return (body as PortableTextBlockLike[])
    .filter((block) => block._type === "block" && ["h2", "h3", "h4"].includes(block.style ?? ""))
    .map(plainTextOf)
    .filter(Boolean);
}

/** Section headings from a case study's `sections` array. */
export function extractSectionHeadings(sections: unknown): string[] {
  if (!Array.isArray(sections)) return [];
  return (sections as { heading?: string }[]).map((s) => s.heading ?? "").filter(Boolean);
}
