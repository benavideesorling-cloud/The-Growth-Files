import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No slug has ever changed post-launch, so this starts empty. If an
  // editor renames a published post/case-study slug in Sanity, add a
  // permanent redirect here from the old path to the new one — this is
  // the mechanism, not a promise that one is currently needed.
  async redirects() {
    return [];
  },
};

export default nextConfig;
