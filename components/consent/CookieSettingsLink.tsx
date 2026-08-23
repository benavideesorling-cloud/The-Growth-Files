"use client";

import { useConsent } from "./ConsentProvider";

/**
 * The one interactive piece the footer needs — kept as its own small
 * client component so Footer itself can stay a Server Component, same
 * pattern as the other analytics client islands in this codebase.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie settings
    </button>
  );
}
