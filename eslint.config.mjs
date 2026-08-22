import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    // Prototype reference files — generated runtime / prototype-only JS, not app source.
    ignores: ["support.js", "motion.js", "blog-posts.js"],
  },
  ...nextConfig,
];

export default eslintConfig;
