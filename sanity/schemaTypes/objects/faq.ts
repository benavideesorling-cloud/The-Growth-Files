import { defineField, defineType } from "sanity";

/**
 * A single FAQ pair. Used as an array field directly on post/caseStudy
 * rather than a standalone referenced document — nothing in the current
 * content reuses the same Q&A across multiple posts or case studies, so a
 * reference relationship would be structure without a purpose.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "question" },
  },
});
