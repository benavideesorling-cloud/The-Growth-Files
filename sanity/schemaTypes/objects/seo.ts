import { defineField, defineType } from "sanity";
import { withCharCounter } from "../../components/CharCounter";
import { SeoPreviewPanel } from "../../components/SeoPreviewPanel";

/**
 * Reusable SEO object embedded on post/caseStudy — the CMS-side foundation
 * for Phase 7's technical SEO work, now paired (Phase 7.5) with an
 * editorial interface on top of it: a search-result preview, a social
 * preview, live character counters, per-field manual/fallback/missing
 * status, focus-keyphrase checks, and a consolidated warnings list — all
 * rendered by SeoPreviewPanel above the fields themselves. Fields stay
 * grouped (Search, Keyphrases, Social, Indexing) so the raw form is still
 * usable on its own. Everything here is optional and additive: the
 * frontend already falls back to the page's own title/excerpt/subtitle
 * when a field is blank, so filling these in is only necessary when an
 * editor wants something different from the on-page content.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  components: { input: SeoPreviewPanel },
  fieldsets: [
    { name: "keyphrases", title: "Keyphrases", options: { collapsible: true, collapsed: true } },
    { name: "social", title: "Social sharing", options: { collapsible: true, collapsed: true } },
    { name: "indexing", title: "Indexing", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO title",
      type: "string",
      description: "Overrides the page <title>. Falls back to the document title if left blank. Aim for roughly 50–60 characters — longer titles are often truncated in search results, but this is a soft guideline, not a hard limit.",
      validation: (Rule) => Rule.max(60).warning("Titles over ~60 characters are often truncated in search results — consider trimming, but this isn't a hard limit."),
      components: { input: withCharCounter({ target: [50, 60], warnBelow: 30 }) },
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Falls back to the excerpt/subtitle if left blank. Aim for roughly 150–160 characters.",
      validation: (Rule) =>
        Rule.max(160).warning("Descriptions over ~160 characters are often truncated in search results — consider trimming, but this isn't a hard limit."),
      components: { input: withCharCounter({ target: [140, 160], warnBelow: 70 }) },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "The app generates the canonical URL automatically from the slug. Only set this for the rare case where the canonical page actually lives somewhere else.",
    }),
    defineField({
      name: "focusKeyphrase",
      title: "Focus keyphrase",
      type: "string",
      fieldset: "keyphrases",
      description: "The main term this piece is written to answer. Editorial guidance only — check it appears naturally in the title, intro, and a heading or two. Never auto-inserted into content, and repeating it mechanically isn't the goal.",
    }),
    defineField({
      name: "secondaryKeyphrases",
      title: "Secondary keyphrases",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "keyphrases",
      description: "Optional related terms worth being aware of while writing/editing. Same rule: guidance, not something to stuff into copy.",
    }),
    defineField({
      name: "socialTitle",
      title: "Social title",
      type: "string",
      fieldset: "social",
      description: "Overrides the Open Graph/share title. Falls back to the SEO title, then the document title, if left blank.",
      components: { input: withCharCounter({ target: [50, 60], warnBelow: 30 }) },
    }),
    defineField({
      name: "socialDescription",
      title: "Social description",
      type: "text",
      rows: 3,
      fieldset: "social",
      description: "Overrides the Open Graph/share description. Falls back to the meta description, then the excerpt/subtitle, if left blank.",
      components: { input: withCharCounter({ target: [140, 160], warnBelow: 70 }) },
    }),
    defineField({
      name: "ogImage",
      title: "Social / Open Graph image",
      type: "image",
      options: { hotspot: true },
      fieldset: "social",
      description: "Falls back to the featured image if left blank.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image if it conveys meaning. Leave blank for a purely decorative share image.",
        }),
      ],
    }),
    defineField({
      name: "noindex",
      title: "Hide from search results (noindex)",
      type: "boolean",
      fieldset: "indexing",
      initialValue: false,
      description: "Default is indexed. Turn this on only for the rare page that genuinely shouldn't appear in search results.",
    }),
    defineField({
      name: "nofollow",
      title: "Don't follow links from this page (nofollow)",
      type: "boolean",
      fieldset: "indexing",
      initialValue: false,
      description: "Default is follow. Turn this on only when there's a specific reason search engines shouldn't crawl onward from this page's links.",
    }),
  ],
});
