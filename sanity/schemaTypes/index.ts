import type { SchemaTypeDefinition } from "sanity";

import { author } from "./documents/author";
import { caseStudy } from "./documents/caseStudy";
import { category } from "./documents/category";
import { post } from "./documents/post";
import { blockContent } from "./objects/blockContent";
import {
  caseStudySection,
  sectionArrowList,
  sectionCard,
  sectionCardGrid,
  sectionParagraph,
  sectionStep,
  sectionStepList,
} from "./objects/caseStudySections";
import { faq } from "./objects/faq";
import { seo } from "./objects/seo";
import { tableBlock, tableRow } from "./objects/tableBlock";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    post,
    caseStudy,
    author,
    category,
    // Shared objects
    seo,
    faq,
    blockContent,
    tableBlock,
    tableRow,
    // Case study section objects
    caseStudySection,
    sectionParagraph,
    sectionArrowList,
    sectionStep,
    sectionStepList,
    sectionCard,
    sectionCardGrid,
  ],
};
