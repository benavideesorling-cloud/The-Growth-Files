import Link from "next/link";
import type { ReactNode } from "react";

const INLINE_RE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Ports BlogPost.dc.html's inline(text) helper — parses **bold** and
 * [label](href) markdown syntax — but returns real React nodes instead of
 * an HTML string for dangerouslySetInnerHTML. The prototype also ran hrefs
 * through a mapHref() that rewrote clean paths (/blog/x, /services#y, ...)
 * into its own ?query-based routing; the source markdown already uses the
 * real site's clean paths, so no rewriting is needed here — internal links
 * are used as-is, external (https:) links open in a new tab.
 */
export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;

  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      const label = match[1];
      const href = match[2]!.trim();
      const isExternal = /^https?:/.test(href);
      const linkClassName = "text-green-dark no-underline border-b border-green-dark/35";
      nodes.push(
        isExternal ? (
          <a key={`${keyPrefix}-l-${i++}`} href={href} target="_blank" rel="noopener" className={linkClassName}>
            {label}
          </a>
        ) : (
          <Link key={`${keyPrefix}-l-${i++}`} href={href} className={linkClassName}>
            {label}
          </Link>
        ),
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-bold text-navy">
          {match[3]}
        </strong>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
