import { defineField, defineType } from "sanity";

/**
 * Reusable author entity — referenced from posts/case studies rather than
 * duplicated per-document, and structured to later back Person structured
 * data (Phase 7). Only one author exists today (Orling Benavides); bio
 * copy must come from already-approved source text (About/Header/Footer/
 * Contact), never newly composed.
 */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", title: "Role / title", type: "string" }),
    defineField({ name: "shortBio", title: "Short bio", type: "text", rows: 3 }),
    defineField({ name: "longBio", title: "Long bio", type: "text", rows: 8 }),
    defineField({ name: "image", title: "Profile image", type: "image", options: { hotspot: true } }),
    defineField({ name: "websiteUrl", title: "Website / profile URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({
      name: "expertise",
      title: "Expertise / topics",
      type: "array",
      of: [{ type: "string" }],
      description: "Relevant topics/disciplines, for Person structured data.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
