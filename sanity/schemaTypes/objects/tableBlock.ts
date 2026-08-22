import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Standard Portable Text has no table block. One blog post ("SEO vs AEO vs
 * GEO") contains a real markdown table in the source content, so a minimal
 * table block is needed inside blockContent. Rows are modeled as an array
 * of cell arrays (first row = header) rather than a rigid column schema,
 * matching how the source markdown table is shaped.
 */
export const tableRow = defineType({
  name: "tableRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      title: "Cells",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { cells: "cells" },
    prepare({ cells }) {
      return { title: (cells || []).join(" | ") };
    },
  },
});

export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      description: "First row is treated as the header row.",
      type: "array",
      of: [defineArrayMember({ type: "tableRow" })],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }) {
      return { title: `Table (${rows?.length ?? 0} rows)` };
    },
  },
});
