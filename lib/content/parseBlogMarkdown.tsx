import type { ReactNode } from "react";
import { renderInline } from "./inline";

type ParagraphBlock = { type: "p"; key: string; content: ReactNode[] };
type HeadingBlock = { type: "h2"; key: string; text: string };
type ListBlock = { type: "ul"; key: string; items: ReactNode[][] };
type OrderedListBlock = { type: "ol"; key: string; items: { n: string; content: ReactNode[] }[] };
type TableBlock = {
  type: "table";
  key: string;
  headers: string[];
  rows: { a: string; b: ReactNode[] }[];
};
export type Block = ParagraphBlock | HeadingBlock | ListBlock | OrderedListBlock | TableBlock;

export type ParsedPost = {
  lead: ReactNode[];
  blocks: Block[];
  faqs: { q: string; a: ReactNode[] }[];
  related: ReactNode[][];
};

/**
 * Ports BlogPost.dc.html's parse(md) function — same line-by-line grammar
 * (H1 skipped, H2 starts a new block or switches into 'faq'/'related' mode,
 * `-` / `1.` lists, `|`-delimited tables, first paragraph becomes the lead),
 * producing typed blocks of real React nodes instead of HTML strings.
 */
export function parseBlogMarkdown(md: string): ParsedPost {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  const faqs: { q: string; a: ReactNode[] }[] = [];
  const related: ReactNode[][] = [];
  let lead: ReactNode[] = [];
  let mode: "main" | "faq" | "related" = "main";
  let buf: string[] = [];
  let list: ListBlock | OrderedListBlock | TableBlock | null = null;
  let blockIndex = 0;
  let listItemCounter = 0;

  function flushBuf() {
    if (!buf.length) return;
    const text = buf.join(" ").trim();
    buf = [];
    if (!text) return;
    if (mode === "related") {
      related.push(renderInline(text, `related-${related.length}`));
      return;
    }
    if (mode === "faq") {
      const m = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      if (m) faqs.push({ q: m[1]!.trim(), a: renderInline(m[2]!.trim(), `faq-${faqs.length}`) });
      return;
    }
    if (!lead.length) {
      lead = renderInline(text, "lead");
      return;
    }
    blocks.push({ type: "p", key: `p-${blockIndex++}`, content: renderInline(text, `p-${blockIndex}`) });
  }

  function flushList() {
    if (list) {
      blocks.push(list);
      list = null;
    }
  }

  for (const raw of lines) {
    const line = raw.trim();

    if (/^#\s/.test(line)) continue;

    if (/^##\s/.test(line)) {
      flushBuf();
      flushList();
      const t = line.replace(/^##\s+/, "").trim();
      if (/^frequently asked/i.test(t)) {
        mode = "faq";
        continue;
      }
      if (/^related services/i.test(t)) {
        mode = "related";
        continue;
      }
      mode = "main";
      blocks.push({ type: "h2", key: `h2-${blockIndex++}`, text: t });
      continue;
    }

    if (line === "") {
      flushBuf();
      flushList();
      continue;
    }

    if (mode === "main" && /^\|/.test(line)) {
      flushBuf();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
      if (!list || list.type !== "table") {
        flushList();
        list = { type: "table", key: `table-${blockIndex++}`, headers: cells.map((c) => c.toUpperCase()), rows: [] };
      } else {
        list.rows.push({ a: cells[0]!, b: renderInline(cells[1] ?? "", `table-cell-${listItemCounter++}`) });
      }
      continue;
    }

    if (mode === "main" && /^-\s/.test(line)) {
      flushBuf();
      const txt = line.replace(/^-\s+/, "");
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", key: `ul-${blockIndex++}`, items: [] };
      }
      list.items.push(renderInline(txt, `ul-item-${listItemCounter++}`));
      continue;
    }

    if (mode === "main" && /^\d+\.\s/.test(line)) {
      flushBuf();
      const txt = line.replace(/^\d+\.\s+/, "");
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", key: `ol-${blockIndex++}`, items: [] };
      }
      list.items.push({
        n: String(list.items.length + 1).padStart(2, "0"),
        content: renderInline(txt, `ol-item-${listItemCounter++}`),
      });
      continue;
    }

    if (list && list.type === "ul" && list.items.length) {
      const continuation = renderInline(line, `cont-${listItemCounter++}`);
      const lastIndex = list.items.length - 1;
      list.items[lastIndex] = [...list.items[lastIndex]!, " ", ...continuation];
      continue;
    }
    if (list && list.type === "ol" && list.items.length) {
      const continuation = renderInline(line, `cont-${listItemCounter++}`);
      const lastItem = list.items[list.items.length - 1]!;
      lastItem.content = [...lastItem.content, " ", ...continuation];
      continue;
    }
    buf.push(line);
  }
  flushBuf();
  flushList();

  return { lead, blocks, faqs, related };
}
