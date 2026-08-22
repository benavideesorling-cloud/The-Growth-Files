import { defineArrayMember, defineType } from "sanity";

/**
 * Blog post body. Unlike case studies, the source markdown
 * (lib/data/blog-posts.ts) is genuinely long-form prose with real heading
 * structure (H2 sections), paragraphs, bullet/numbered lists, and one
 * markdown table — so standard Portable Text fits directly, plus the
 * custom tableBlock object for the table case.
 *
 * There is deliberately no "H1" style option: the post document's `title`
 * field is the page's single H1, so editors physically cannot author a
 * second one inside the body. H2/H3/H4 are available for real document
 * structure (all 12 migrated articles currently only use H2 — flat
 * sections, no subsections — H3/H4 exist for future articles that need
 * deeper nesting, not because current content needs them).
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.required().uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "tableBlock" }),
  ],
});
