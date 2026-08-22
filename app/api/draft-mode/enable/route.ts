import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

/**
 * Enables preview mode from Sanity Studio's "Open preview" action. Requires
 * SANITY_API_READ_TOKEN (server-only, never exposed client-side) and the
 * project's viewer/preview secret configured in the Studio's presentation
 * URL — draft content is otherwise never reachable from the public site.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
