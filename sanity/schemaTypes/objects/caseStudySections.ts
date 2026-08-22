import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Case study section bodies are not uniform prose — the real content (see
 * lib/data/case-studies.tsx) mixes plain paragraphs, an arrow-bullet list,
 * labeled step sequences (StepList), and card grids (InfoCard), sometimes
 * within the same case study. Rather than flatten this into rich text
 * (losing the distinct visual treatments) or over-build a full custom
 * Portable Text setup, each block type below maps 1:1 to an existing React
 * component. Text fields use the same bold/link markdown syntax already
 * parsed by lib/content/inline.tsx, reusing that renderer instead of
 * building a second one.
 */

export const sectionParagraph = defineType({
  name: "sectionParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      description: "Supports **bold** and [link text](/path) inline formatting.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "text" },
  },
});

export const sectionArrowList = defineType({
  name: "sectionArrowList",
  title: "Arrow list",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return { title: `Arrow list (${items?.length ?? 0} items)` };
    },
  },
});

export const sectionStep = defineType({
  name: "sectionStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "INSIGHT"', validation: (Rule) => Rule.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "text" },
  },
});

export const sectionStepList = defineType({
  name: "sectionStepList",
  title: "Step list",
  type: "object",
  fields: [
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "sectionStep" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { steps: "steps" },
    prepare({ steps }) {
      return { title: `Step list (${steps?.length ?? 0} steps)` };
    },
  },
});

export const sectionCard = defineType({
  name: "sectionCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "leading", title: "Leading number", type: "string", description: 'Optional, e.g. "1" for a numbered card.' }),
    defineField({ name: "title", title: "Title", type: "string", description: "Bold card title, or the small mono label above a stat (when Stat value is set)." }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, description: "Supports **bold**, [link](url), and `code` inline formatting." }),
    defineField({
      name: "subItems",
      title: "Sub-items",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional short dot-bullet list nested inside this card, below the body text.",
    }),
    defineField({ name: "stat", title: "Stat value", type: "string", description: 'For small stat cards, e.g. "~6,200".' }),
    defineField({ name: "statLabel", title: "Stat label", type: "string", description: 'e.g. "impressions per new follower".' }),
  ],
  preview: {
    select: { title: "title", subtitle: "stat" },
  },
});

export const sectionCardGrid = defineType({
  name: "sectionCardGrid",
  title: "Card grid",
  type: "object",
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [1, 2] },
      initialValue: 2,
      description: "1 = stacked single column, 2 = responsive two-column grid.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "sectionCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { cards: "cards" },
    prepare({ cards }) {
      return { title: `Card grid (${cards?.length ?? 0} cards)` };
    },
  },
});

export const caseStudySection = defineType({
  name: "caseStudySection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      description: 'Small mono label above the heading, e.g. "THE SITUATION".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "sectionParagraph" }),
        defineArrayMember({ type: "sectionArrowList" }),
        defineArrayMember({ type: "sectionStepList" }),
        defineArrayMember({ type: "sectionCardGrid" }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
  },
});
