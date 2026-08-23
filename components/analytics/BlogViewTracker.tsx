"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Fires `blog_view` into GTM's dataLayer once per blog post page view —
 * slug/title only, no author/body content. Same architecture as
 * CaseStudyViewTracker: rendered invisibly inside the (server-rendered)
 * post detail page, effect keyed on [slug, name] so it re-fires on a
 * client-side navigation between two posts even if App Router reuses this
 * component's instance across the route change, without double-firing on
 * unrelated re-renders.
 */
export function BlogViewTracker({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    sendGTMEvent({ event: "blog_view", blog_slug: slug, blog_name: name });
  }, [slug, name]);

  return null;
}
