// Twitter Cards don't automatically reuse opengraph-image.tsx — Next.js
// treats them as separate file conventions — so this re-exports the exact
// same generated image rather than duplicating the design in two places.
export { default, size, contentType, alt } from "./opengraph-image";
