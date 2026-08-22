import { siteConfig } from "@/lib/config/site";

/**
 * The single source of truth for every SEO field's fallback rule — used
 * by both the production frontend (generateMetadata in
 * app/blog/[slug]/page.tsx and app/case-studies/[slug]/page.tsx) and the
 * Sanity Studio editorial previews (sanity/components/SeoPreviewPanel).
 * Neither side re-implements these rules independently: the Studio
 * preview must show exactly what the rendered site will produce, and the
 * only way to guarantee that is for both to call the same functions.
 *
 * Each function takes the raw override value (possibly empty/whitespace)
 * and the natural fallback, and returns what will actually be used.
 */

function trimmedOrUndefined(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * The page <title>. When no metaTitle override exists, this mirrors the
 * root layout's title template (`%s | ${siteConfig.name}`) — migrated
 * content's metaTitle values already bake in that suffix themselves, by
 * editorial convention, which is why an explicit override is used
 * "as-is" rather than having the suffix appended a second time.
 */
export function resolveDisplayTitle(metaTitleOverride: string | null | undefined, documentTitle: string): string {
  return trimmedOrUndefined(metaTitleOverride) ?? `${documentTitle} | ${siteConfig.name}`;
}

export function resolveMetaDescription(override: string | null | undefined, fallback: string): string {
  return trimmedOrUndefined(override) ?? fallback;
}

export function resolveSocialTitle(override: string | null | undefined, resolvedDisplayTitle: string): string {
  return trimmedOrUndefined(override) ?? resolvedDisplayTitle;
}

export function resolveSocialDescription(override: string | null | undefined, resolvedMetaDescription: string): string {
  return trimmedOrUndefined(override) ?? resolvedMetaDescription;
}

export function resolveCanonicalPath(override: string | null | undefined, naturalPath: string): string {
  return trimmedOrUndefined(override) ?? naturalPath;
}

export type SeoFieldSource = "manual" | "fallback" | "missing";

/**
 * For the Studio "which values are manual vs. fallback vs. missing"
 * status display — not used by the frontend, which only needs the
 * resolved value, not how it got there.
 */
export function seoFieldSource(override: string | null | undefined, hasFallback: boolean): SeoFieldSource {
  if (trimmedOrUndefined(override)) return "manual";
  return hasFallback ? "fallback" : "missing";
}
