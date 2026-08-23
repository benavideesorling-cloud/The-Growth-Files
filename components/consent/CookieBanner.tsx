"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useConsent } from "./ConsentProvider";

/**
 * Suppressed on /studio — Sanity Studio is a full-viewport embedded tool
 * for the site owner, not a public page this consent policy is about, and
 * a fixed bottom banner would visually collide with its own UI.
 */
export function CookieBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, openPreferences } = useConsent();
  const pathname = usePathname();

  if (!bannerVisible || pathname?.startsWith("/studio")) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy px-5 py-6 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] sm:px-8 md:px-12"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[640px] text-sm leading-relaxed text-[#b6c0cc]">
          This site uses optional cookies for analytics — and potentially marketing in the future — to understand
          how it&apos;s used. Necessary cookies are always on. Accept all, reject non-essential cookies, or choose
          exactly what to allow. See the{" "}
          <Link href="/privacy" className="font-semibold text-green underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={openPreferences}>
            Manage preferences
          </Button>
          <Button variant="secondary" onClick={rejectNonEssential}>
            Reject non-essential
          </Button>
          <Button variant="primary" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
