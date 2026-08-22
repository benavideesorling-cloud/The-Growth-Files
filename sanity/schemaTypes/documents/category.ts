import { defineField, defineType } from "sanity";

/**
 * Blog post categories — a small fixed set (AI Search, AEO & GEO,
 * Technical, Measurement, Working with me — sentence case, acronyms kept
 * as-is) referenced from posts' `categories` array, so a real reference
 * relationship earns its keep here (unlike case-study "category/
 * discipline" values, which are unique per case study and stay plain
 * strings). A post can carry more than one category.
 */
export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Exactly as displayed, sentence case with acronyms preserved, e.g. "AEO & GEO" or "Working with me".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Filter order",
      type: "number",
      description: "Controls left-to-right position in the blog's filter chip row (ascending). \"All notes\" always comes first regardless of this value.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "order" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle !== undefined ? `Order: ${subtitle}` : undefined };
    },
  },
});
