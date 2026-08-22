import type { Block } from "@/lib/content/parseBlogMarkdown";

/** Renders the typed block list from parseBlogMarkdown, matching BlogPost.dc.html's per-block-type styling. */
export function BlogPostBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={block.key} className="mt-11 mb-[18px] text-[27px] leading-tight font-extrabold tracking-tight text-navy">
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={block.key} className="mb-5 text-[17px] leading-[1.78] text-body-alt">
                {block.content}
              </p>
            );
          case "ul":
            return (
              <div key={block.key} className="mt-1 mb-[26px] flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <div key={i} className="grid grid-cols-[14px_1fr] items-start gap-3.5">
                    <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-green" />
                    <div className="text-[17px] leading-relaxed text-body-alt">{item}</div>
                  </div>
                ))}
              </div>
            );
          case "ol":
            return (
              <div key={block.key} className="mt-1 mb-[26px] flex flex-col gap-3.5">
                {block.items.map((item) => (
                  <div
                    key={item.n}
                    className="grid grid-cols-[32px_1fr] items-start gap-3.5 rounded-lg border border-[#e2e6e2] bg-white px-[22px] py-5"
                  >
                    <div className="mt-1 font-mono text-[13px] font-bold text-green-dark">{item.n}</div>
                    <div className="text-[17px] leading-[1.72] text-body-alt">{item.content}</div>
                  </div>
                ))}
              </div>
            );
          case "table":
            return (
              <div key={block.key} className="mt-1 mb-[30px] overflow-hidden rounded-lg border border-[#e2e6e2]">
                <div className="grid bg-navy" style={{ gridTemplateColumns: "1fr 2fr" }}>
                  {block.headers.map((h, i) => (
                    <div key={i} className="px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.06em] text-green">
                      {h}
                    </div>
                  ))}
                </div>
                {block.rows.map((row, i) => (
                  <div key={i} className="grid border-t border-[#eef1ee]" style={{ gridTemplateColumns: "1fr 2fr" }}>
                    <div className="px-5 py-4 text-[15px] font-bold text-navy">{row.a}</div>
                    <div className="px-5 py-4 text-[15px] leading-relaxed text-body-alt">{row.b}</div>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
