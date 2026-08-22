import { defineCliConfig } from "sanity/cli";

// Standard companion config for the `sanity` CLI (schema validation,
// standalone `sanity build`, etc.) — the running app doesn't use this;
// Studio itself is embedded in Next.js (sanity.config.ts, mounted at
// /studio) and reads its project/dataset from NEXT_PUBLIC_SANITY_* env
// vars, not from here.
export default defineCliConfig({
  api: {
    projectId: "vw55vecs",
    dataset: "production",
  },
});
