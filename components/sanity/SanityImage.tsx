import Image from "next/image";
import type { Image as SanityImageValue } from "sanity";
import { urlFor } from "@/sanity/lib/image";

/**
 * Wraps next/image for Sanity-managed images. Reads the source image's
 * real aspect ratio from its metadata (Sanity's image pipeline always
 * includes dimensions) so `fill`+`sizes` never shifts layout, matching the
 * fill-based pattern already used for static assets elsewhere on the site.
 *
 * `alt` defaults to the image's own `alt` field from Sanity (populated by
 * the editor on featuredImage/ogImage) so a caller doesn't have to
 * remember to thread it through separately — pass an explicit `alt` prop
 * only to override that. An empty string renders `alt=""`, correctly
 * marking the image decorative rather than falling back to nothing.
 */
export function SanityImage({
  image,
  alt,
  sizes,
  className,
  priority,
}: {
  image: SanityImageValue & { aspectRatio?: number; alt?: string };
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!image?.asset) return null;

  const aspectRatio = image.aspectRatio || 16 / 9;
  const url = urlFor(image).auto("format").fit("max").url();
  const resolvedAlt = alt ?? image.alt ?? "";

  return (
    <div className={className} style={{ position: "relative", aspectRatio }}>
      <Image src={url} alt={resolvedAlt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
