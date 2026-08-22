/**
 * Renders one JSON-LD structured-data block. All input comes from typed
 * builder functions in lib/seo/schema.ts (never raw user input), so
 * JSON.stringify is a safe serialization here — nothing in the object
 * graph originates from an untrusted source.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
