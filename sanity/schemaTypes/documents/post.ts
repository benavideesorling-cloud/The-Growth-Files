import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Blog post. Maps onto lib/data/blog-posts.ts's BlogPost shape, with `md`
 * converted to structured fields matching how app/blog/[slug]/page.tsx
 * actually renders it: the first paragraph is pulled out as a distinct
 * lead (green-border blockquote treatment), the "## Frequently asked
 * questions" and "## Related services" sections render in their own
 * page sections (dark FAQ cards, gray related-services block) rather than
 * inline in the body — so `lead`/`faqs`/`relatedServices` are separate
 * fields here too, not folded into `body`.
 *
 * `categories` is an array of references (not a single reference) — a post
 * can genuinely belong to more than one of the five fixed categories
 * (e.g. a technical piece about structured data that also serves AI
 * Search and AEO & GEO), and the blog index's filter grid shows a post
 * under every category it's assigned, not just one.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "num",
      title: "Display number",
      type: "string",
      description: 'Two-digit editorial number shown on index cards and the post hero, e.g. "07". Not auto-computed — set explicitly so reordering/inserting posts never renumbers existing ones.',
      validation: (Rule) => Rule.required().regex(/^\d{2}$/, { name: "two digits" }),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Shown as the sub-headline on the post's own page, and used as the meta description fallback.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teaser",
      title: "Index card teaser",
      type: "text",
      rows: 2,
      description: "Shorter blurb shown only on the blog index list card. Falls back to the excerpt if left blank.",
    }),
    defineField({
      name: "lead",
      title: "Lead paragraph",
      type: "text",
      rows: 3,
      description: "The intro paragraph shown in the green-border blockquote style. Supports **bold** and [link](url).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Main article content — headings, paragraphs, lists, tables. Excludes the lead paragraph and any FAQ/related-services sections.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faq" })],
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [{ type: "string" }],
      description: "One item per paragraph. Supports [link text](/path) inline links.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "One or more categories describing this post's subject matter. A post appears under every category assigned here.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image if it conveys meaning relevant to the article. Leave blank if purely decorative.",
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({ name: "publishedAt", title: "Publication date", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "updatedAt", title: "Last modified date", type: "datetime" }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      description: 'As displayed, e.g. "7 min read".',
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      description: "Optional. Other blog posts genuinely relevant to this one — internal-linking prep for Phase 7, not required reading for editors today.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related case studies",
      description: "Optional. Case studies that back up or demonstrate claims in this post.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "featuredImage" },
  },
});
