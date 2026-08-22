import { Box, Card, Flex, Stack, Text } from "@sanity/ui";
import { useFormValue, type ObjectInputProps } from "sanity";
import { urlFor } from "../lib/image";
import { siteConfig } from "@/lib/config/site";
import {
  resolveCanonicalPath,
  resolveDisplayTitle,
  resolveMetaDescription,
  resolveSocialDescription,
  resolveSocialTitle,
} from "@/lib/seo/resolve";
import { containsKeyphrase, evaluateLength, extractBodyHeadings, extractSectionHeadings } from "./seoChecks";

type SanityImageRef = { asset?: { _ref?: string }; alt?: string } | undefined;

type SeoValue = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyphrase?: string;
  socialTitle?: string;
  socialDescription?: string;
  ogImage?: SanityImageRef;
  noindex?: boolean;
  nofollow?: boolean;
};

/**
 * The Studio editorial view for a post/case study's SEO fields: a
 * Google-style search preview, a social-share preview, a plain-language
 * status of every field (manual / falling back to X / missing), focus-
 * keyphrase checks, and a consolidated non-blocking warnings list —
 * rendered above the normal `seo` object fields (via renderDefault).
 *
 * Every resolved value comes from lib/seo/resolve.ts, the exact same
 * functions app/blog/[slug]/page.tsx and app/case-studies/[slug]/page.tsx
 * call in generateMetadata — this preview cannot drift from what the
 * live site actually renders, by construction, not by convention.
 */
export function SeoPreviewPanel(props: ObjectInputProps) {
  const seo = (props.value ?? {}) as SeoValue;

  const docType = useFormValue(["_type"]) as string | undefined;
  const isPost = docType === "post";

  const title = ((useFormValue([isPost ? "title" : "h1"]) as string | undefined) ?? "").trim();
  const summary = ((useFormValue([isPost ? "excerpt" : "subtitle"]) as string | undefined) ?? "").trim();
  const slugCurrent = (useFormValue(["slug", "current"]) as string | undefined) ?? "";
  const featuredImage = useFormValue(["featuredImage"]) as SanityImageRef;
  const categories = useFormValue(["categories"]) as unknown[] | undefined;
  const author = useFormValue(["author"]) as { _ref?: string } | undefined;
  const body = useFormValue(["body"]);
  const sections = useFormValue(["sections"]);

  const basePath = isPost ? "/blog" : "/case-studies";
  const naturalPath = slugCurrent ? `${basePath}/${slugCurrent}` : `${basePath}/(slug not set)`;

  const resolvedTitle = resolveDisplayTitle(seo.metaTitle, title || "(untitled)");
  const resolvedDescription = resolveMetaDescription(seo.metaDescription, summary);
  const resolvedSocialTitle = resolveSocialTitle(seo.socialTitle, resolvedTitle);
  const resolvedSocialDescription = resolveSocialDescription(seo.socialDescription, resolvedDescription);
  const resolvedCanonical = resolveCanonicalPath(seo.canonicalUrl, naturalPath);

  const socialImage = seo.ogImage?.asset ? seo.ogImage : featuredImage?.asset ? featuredImage : undefined;
  const socialImageIsOverride = Boolean(seo.ogImage?.asset);
  const socialImageUrl = socialImage?.asset ? urlFor(socialImage as never).width(480).height(252).url() : undefined;

  const headings = isPost ? extractBodyHeadings(body) : extractSectionHeadings(sections);

  const titleLen = evaluateLength(seo.metaTitle, { target: [50, 60] });
  const descLen = evaluateLength(seo.metaDescription, { target: [140, 160], warnBelow: 70 });

  const warnings: string[] = [];
  if (seo.noindex) warnings.push("This page is set to noindex — it will be excluded from search results and the sitemap.");
  if (seo.nofollow) warnings.push("This page is set to nofollow — search engines won't follow links from it.");
  if (!seo.focusKeyphrase?.trim()) warnings.push("No focus keyphrase set. Optional, but needed for the checks below.");
  if (isPost && (!categories || categories.length === 0)) warnings.push("No categories assigned — this post won't appear under any Blog filter.");
  if (!author) warnings.push("No author set.");
  if (socialImage?.asset && !socialImage.alt?.trim()) warnings.push("The social/featured image has no alt text.");
  if (titleLen.status === "long") warnings.push("SEO title is longer than the recommended ~60 characters.");
  if (descLen.status === "long") warnings.push("Meta description is longer than the recommended ~160 characters.");
  if (descLen.status === "short") warnings.push("Meta description is shorter than usual — consider expanding it.");

  const keyphrase = seo.focusKeyphrase?.trim();
  const keyphraseChecks = keyphrase
    ? [
        { label: "Appears in the SEO title", pass: containsKeyphrase(resolvedTitle, keyphrase) },
        { label: "Appears in the meta description", pass: containsKeyphrase(resolvedDescription, keyphrase) },
        { label: `Appears in the ${isPost ? "title" : "H1"}`, pass: containsKeyphrase(title, keyphrase) },
        { label: "Appears in a heading (H2/H3)", pass: headings.some((h) => containsKeyphrase(h, keyphrase)) },
      ]
    : [];

  const fieldRows: { label: string; status: string }[] = [
    { label: "SEO title", status: seo.metaTitle?.trim() ? "Manual" : `Fallback: "${resolvedTitle}"` },
    { label: "Meta description", status: seo.metaDescription?.trim() ? "Manual" : `Fallback: excerpt/subtitle` },
    { label: "Canonical URL", status: seo.canonicalUrl?.trim() ? "Manual override" : `Auto-generated: ${resolvedCanonical}` },
    { label: "Social title", status: seo.socialTitle?.trim() ? "Manual" : "Fallback: SEO title" },
    { label: "Social description", status: seo.socialDescription?.trim() ? "Manual" : "Fallback: meta description" },
    {
      label: "OG image",
      status: socialImage?.asset
        ? socialImageIsOverride
          ? "Manual"
          : "Fallback: featured image"
        : "Missing — site default OG image will be used",
    },
  ];

  return (
    <Stack gap={4}>
      <Card padding={3} radius={2} border>
        <Stack gap={2}>
          <Text size={0} weight="semibold" muted>
            SEARCH PREVIEW
          </Text>
          <Text size={1} style={{ color: "#1a0dab" }}>
            {resolvedTitle}
          </Text>
          <Text size={0} muted>
            {siteConfig.url}
            {resolvedCanonical}
          </Text>
          <Text size={1} muted>
            {resolvedDescription}
          </Text>
        </Stack>
      </Card>

      <Card padding={3} radius={2} border>
        <Stack gap={3}>
          <Text size={0} weight="semibold" muted>
            SOCIAL PREVIEW
          </Text>
          <Flex gap={3} align="flex-start">
            {socialImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Studio-only preview thumbnail, not the production frontend.
              <img
                src={socialImageUrl}
                alt=""
                width={160}
                height={84}
                style={{ objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
              />
            ) : (
              <Box style={{ width: 160, height: 84, borderRadius: 4, background: "#e6e6e6", flexShrink: 0 }} />
            )}
            <Stack gap={2} flex={1}>
              <Text size={0} muted>
                {siteConfig.name}
              </Text>
              <Text size={1} weight="semibold">
                {resolvedSocialTitle}
              </Text>
              <Text size={1} muted>
                {resolvedSocialDescription}
              </Text>
            </Stack>
          </Flex>
          {!socialImageUrl ? (
            <Text size={0} muted>
              No specific image set — the site&apos;s default OG image will be used.
            </Text>
          ) : null}
        </Stack>
      </Card>

      <Card padding={3} radius={2} border>
        <Stack gap={2}>
          <Text size={0} weight="semibold" muted>
            FIELD STATUS
          </Text>
          {fieldRows.map((row) => (
            <Flex key={row.label} justify="space-between" gap={3}>
              <Text size={1}>{row.label}</Text>
              <Text size={1} muted>
                {row.status}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Card>

      {keyphraseChecks.length > 0 ? (
        <Card padding={3} radius={2} border>
          <Stack gap={2}>
            <Text size={0} weight="semibold" muted>
              KEYPHRASE CHECKS — &ldquo;{keyphrase}&rdquo;
            </Text>
            {keyphraseChecks.map((check) => (
              <Text key={check.label} size={1}>
                {check.pass ? "✓" : "–"} {check.label}
              </Text>
            ))}
          </Stack>
        </Card>
      ) : null}

      {warnings.length > 0 ? (
        <Card padding={3} radius={2} tone="caution" border>
          <Stack gap={2}>
            <Text size={0} weight="semibold">
              THINGS TO CHECK
            </Text>
            {warnings.map((warning) => (
              <Text key={warning} size={1}>
                • {warning}
              </Text>
            ))}
          </Stack>
        </Card>
      ) : null}

      <Card padding={3} radius={2} border>
        <Stack gap={2}>
          <Text size={0} weight="semibold" muted>
            SLUG
          </Text>
          <Text size={1}>{slugCurrent || "(not set)"}</Text>
          <Text size={0} muted>
            Changing the slug of an already-published document will break its existing URL — there&apos;s no
            automatic redirect yet. Only change it if you know that&apos;s intended.
          </Text>
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  );
}
