import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Public, read-only client for published content — safe to use in Server
 * Components. No token attached, so it can never fetch drafts.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Server-only client for draft-mode preview. Only ever instantiated inside
 * a request that already confirmed draftMode().isEnabled — never imported
 * by a client component. Requires SANITY_API_READ_TOKEN.
 */
export function getPreviewClient(token: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "drafts",
    token,
  });
}
