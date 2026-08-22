import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Case study. Maps onto lib/data/case-studies.tsx's CaseStudy shape.
 * metaTitle/metaDescription live inside `seo` (as an override, falling
 * back to h1/subtitle) rather than as separate top-level fields, matching
 * how `seo` already works on `post` — no duplicate fields for the same
 * purpose. `category`/discipline (from the `eyebrow`/index.tag values) is
 * a plain string, not a reference: each case study's category text is
 * unique to that case study, so a reference relationship would add
 * structure without reuse.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: 'e.g. "CASE 001 · MOBILITY MARKETPLACE".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "h1", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "h1", title: "H1", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "metaLine",
      title: "Meta line",
      type: "string",
      description: 'e.g. "ROLE: PERFORMANCE MARKETING  |  CHANNELS: GOOGLE ADS · SEARCH · DISPLAY".',
    }),
    defineField({
      name: "stats",
      title: "Headline stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [defineArrayMember({ type: "caseStudySection" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "resultsLabel", title: "Results label", type: "string" }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [{ type: "string" }],
      description: "One item per result. Supports **bold** inline formatting.",
    }),
    defineField({ name: "proofLabel", title: "Proof label", type: "string" }),
    defineField({ name: "proofHeading", title: "Proof heading", type: "string" }),
    defineField({
      name: "proof",
      title: "Proof",
      type: "array",
      of: [{ type: "string" }],
      description: "One item per paragraph. Supports **bold** and [link](url).",
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [{ type: "string" }],
      description: "One item per paragraph. Supports [link text](/path) inline links.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faq" })],
    }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string" }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      description: "Optional. None of the 5 migrated case studies currently use one — added for parity with blog posts if a future case study needs a hero image.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      description: "Optional. Blog posts that discuss this case study or its underlying discipline.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Controls position on the case studies index page (ascending). The source content has no publication date to sort by, so order is manual.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "index",
      title: "Index card",
      description: "Content for this case study's card on the case studies index page.",
      type: "object",
      fields: [
        { name: "tag", title: "Tag", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "desc", title: "Description", type: "text", rows: 3 },
        { name: "meta", title: "Meta", type: "string" },
        { name: "stat", title: "Stat", type: "string" },
        { name: "statLabel", title: "Stat label", type: "string" },
        { name: "statSub", title: "Stat sub-line", type: "string" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      description: "Not present in the source content — left unset by migration. Set this once the real date is known.",
    }),
    defineField({ name: "updatedAt", title: "Last updated date", type: "datetime" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "h1", subtitle: "eyebrow" },
  },
});
