import Script from "next/script";
import { getConsentDefaultScript } from "@/lib/consent/defaultScript";

/**
 * Establishes Google Consent Mode v2's default state before GTM executes.
 * `beforeInteractive` is Next's own documented mechanism for exactly this
 * — "cookie consent managers" is one of the two examples in Next's script
 * guide — and guarantees this runs before GoogleTagManager's own script
 * (which uses the default `afterInteractive` strategy, only running after
 * hydration begins) regardless of where either is placed in the tree:
 * `beforeInteractive` scripts are injected into the initial server HTML
 * and executed during document parsing, strictly before any
 * `afterInteractive` script exists at all.
 */
export function ConsentDefaultScript() {
  return (
    <Script id="consent-default" strategy="beforeInteractive">
      {getConsentDefaultScript()}
    </Script>
  );
}
