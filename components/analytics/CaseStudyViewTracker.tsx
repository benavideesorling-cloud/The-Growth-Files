"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Fires `case_study_view` into GTM's dataLayer once per case-study page
 * view — slug/name only, no body content. Rendered invisibly inside the
 * (server-rendered) case study detail page, since dataLayer only exists
 * client-side. The effect's dependency array is the whole mechanism: on a
 * fresh page load it runs once on mount; on a client-side navigation
 * between two case studies (App Router can reuse this component's
 * instance across the route change rather than remounting it) it re-fires
 * because `slug`/`name` actually changed, not because of an unrelated
 * re-render — so it can't double-fire from routine re-rendering, and it
 * can't fail to fire when the slug changes underneath it.
 */
export function CaseStudyViewTracker({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    sendGTMEvent({ event: "case_study_view", case_study_slug: slug, case_study_name: name });
  }, [slug, name]);

  return null;
}
