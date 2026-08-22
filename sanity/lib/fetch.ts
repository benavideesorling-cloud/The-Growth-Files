import { draftMode } from "next/headers";
import { client, getPreviewClient } from "./client";
import type { QueryParams } from "next-sanity";

/**
 * Server-only fetch helper: uses the published, CDN-backed client normally,
 * and transparently switches to the token-authenticated drafts client when
 * Next's draft mode is on (Studio preview only) — callers never branch on
 * this themselves, and production requests can never see draft content
 * since draftMode().isEnabled is only ever true behind the preview cookie
 * set by app/api/draft-mode/enable.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!token) {
      throw new Error("SANITY_API_READ_TOKEN is required to preview draft content.");
    }
    return getPreviewClient(token).fetch<T>(query, params, { cache: "no-store" });
  }

  return client.fetch<T>(query, params);
}
