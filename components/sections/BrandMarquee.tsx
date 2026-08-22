import Image from "next/image";

type Brand = { name: string; src: string; height?: number };

const BASE_HEIGHT = 34;

/**
 * Ports Home.dc.html's "brands I collaborated" marquee. The prototype pauses
 * on hover via motion.js's initMarqueeHover() (a JS mouseenter/mouseleave
 * listener toggling animationPlayState). Ported here as pure CSS (Tailwind's
 * named group modifier) instead — same interaction, zero client JS. Reduced
 * motion is handled by the project's global CSS override, which collapses
 * the infinite marquee to a single near-instant pass that settles on the
 * (identical, duplicated) second half of the list — no jarring motion.
 */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  const track = [...brands, ...brands];

  return (
    <div className="group/marquee overflow-hidden">
      <div className="flex w-max items-center gap-16 [animation:marquee_42s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
        {track.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            role="img"
            aria-label={brand.name}
            className="relative w-[180px] shrink-0 opacity-55 grayscale contrast-[.9] transition-opacity duration-200 hover:opacity-90"
            style={{ height: brand.height ?? BASE_HEIGHT }}
          >
            {/* `fill` (not fixed width/height props) so the image sizes
                purely from this container — mixing fixed props with the
                previous CSS override (h-full w-auto) triggered Next's
                aspect-ratio mismatch warning. */}
            <Image src={brand.src} alt={brand.name} fill sizes="180px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
