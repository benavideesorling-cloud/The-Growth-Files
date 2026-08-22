import type { StructureResolver } from "sanity/structure";

/**
 * Minimal custom desk structure: just groups documents by type with
 * friendlier titles than Sanity's default alphabetical list. Nothing
 * fancier than that — no need for it here.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("caseStudy").title("Case studies"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Blog categories"),
    ]);
