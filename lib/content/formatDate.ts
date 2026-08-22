/** Matches the prototype's hand-authored date strings, e.g. "Aug 18, 2026". */
export function formatDisplayDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
}
