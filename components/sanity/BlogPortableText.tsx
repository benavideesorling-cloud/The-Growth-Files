import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

type TableBlockValue = {
  rows: { cells: string[] }[];
};

/**
 * Renders a blog post's Portable Text body, matching BlogPostBody.tsx's
 * per-block-type styling exactly (h2/paragraph/bullet-dot list/numbered-
 * card list/table), so switching from the markdown parser to Portable Text
 * produces the same page.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-11 mb-[18px] text-[27px] leading-tight font-extrabold tracking-tight text-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3.5 text-[21px] leading-tight font-extrabold tracking-tight text-navy">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 mb-3 text-[18px] leading-tight font-bold tracking-tight text-navy">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-2 border-green pl-[22px] text-[17px] leading-[1.78] text-body-alt italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-5 text-[17px] leading-[1.78] text-body-alt">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <div className="mt-1 mb-[26px] flex flex-col gap-3">{children}</div>,
    number: ({ children }) => <div className="mt-1 mb-[26px] flex flex-col gap-3.5">{children}</div>,
  },
  listItem: {
    bullet: ({ children }) => (
      <div className="grid grid-cols-[14px_1fr] items-start gap-3.5">
        <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-green" />
        <div className="text-[17px] leading-relaxed text-body-alt">{children}</div>
      </div>
    ),
    number: ({ children, index }) => (
      <div className="grid grid-cols-[32px_1fr] items-start gap-3.5 rounded-lg border border-[#e2e6e2] bg-white px-[22px] py-5">
        <div className="mt-1 font-mono text-[13px] font-bold text-green-dark">{String(index + 1).padStart(2, "0")}</div>
        <div className="text-[17px] leading-[1.72] text-body-alt">{children}</div>
      </div>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-navy">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <span className="font-mono text-[15px]">{children}</span>,
    link: ({ value, children }) => {
      const href: string = value?.href || "";
      const isExternal = /^https?:/.test(href);
      const linkClassName = "text-green-dark no-underline border-b border-green-dark/35";
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener" className={linkClassName}>
          {children}
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {children}
        </Link>
      );
    },
  },
  types: {
    tableBlock: ({ value }: { value: TableBlockValue }) => {
      const [header, ...rows] = value.rows;
      if (!header) return null;
      return (
        <div className="mt-1 mb-[30px] overflow-hidden rounded-lg border border-[#e2e6e2]">
          <div className="grid bg-navy" style={{ gridTemplateColumns: `repeat(${header.cells.length}, 1fr)` }}>
            {header.cells.map((cell, i) => (
              <div key={i} className="px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.06em] text-green">
                {cell.toUpperCase()}
              </div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid border-t border-[#eef1ee]"
              style={{ gridTemplateColumns: `repeat(${row.cells.length}, 1fr)` }}
            >
              {row.cells.map((cell, j) => (
                <div
                  key={j}
                  className={
                    j === 0
                      ? "px-5 py-4 text-[15px] font-bold text-navy"
                      : "px-5 py-4 text-[15px] leading-relaxed text-body-alt"
                  }
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: React.ComponentProps<typeof PortableText>["value"] }) {
  return <PortableText value={value} components={components} />;
}
