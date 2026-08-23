"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Site-wide outbound-link tracking via a single delegated click listener
 * on `document` — mounted once in the root layout, not per-link or
 * per-page, so it automatically covers every link anywhere (nav, footer,
 * blog body content, FAQ citation links) without touching those
 * components individually and without a hardcoded list of platforms.
 *
 * `closest("a[href]")` resolves a click to its enclosing anchor no matter
 * how deeply nested the actual click target is (an icon, a span inside
 * the link), so exactly one event fires per click regardless of the
 * link's internal markup — there's nothing to double-fire, since only one
 * listener exists for the whole page rather than one per link.
 *
 * "External" is decided purely by comparing the resolved link's hostname
 * against the current page's actual hostname at click time — not against
 * a configured site URL — so it works correctly in any environment (dev,
 * preview, production) and naturally treats an absolute
 * https://thegrowthfiles.io/... link as internal, same as a relative one.
 *
 * Never calls preventDefault/stopPropagation, so normal link behavior
 * (including opening in a new tab, modified clicks) is untouched — this
 * only observes, it never alters navigation.
 */
export function OutboundLinkTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      let url: URL;
      try {
        // anchor.href (the DOM property, not getAttribute) is always the
        // browser-resolved absolute URL, even for a relative href in markup.
        url = new URL(anchor.href);
      } catch {
        return;
      }

      // Excludes mailto:, tel:, and any other non-web protocol. A
      // same-page hash link (href="#section") resolves to the current
      // page's own hostname below, so it's already excluded there too.
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (url.hostname === window.location.hostname) return;

      const linkText = (anchor.getAttribute("aria-label") ?? anchor.textContent ?? "").replace(/\s+/g, " ").trim();

      sendGTMEvent({
        event: "outbound_click",
        link_url: url.href,
        link_domain: url.hostname,
        link_text: linkText,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
