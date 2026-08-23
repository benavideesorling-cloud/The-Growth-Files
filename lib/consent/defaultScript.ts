import { CONSENT_COOKIE_NAME, CONSENT_SCHEMA_VERSION } from "./types";

/**
 * Raw JS for the beforeInteractive script that establishes Google Consent
 * Mode v2's default state before GTM ever executes. Must be plain,
 * dependency-free JS — no imports, no TS — since it runs as a literal
 * inline <script> before any bundled application code exists.
 *
 * It reads the tgf_consent cookie directly, duplicating (necessarily —
 * this can't import lib/consent/cookie.ts) the same parsing logic used
 * there, so a returning visitor's actual stored choice becomes the
 * "default" immediately. That avoids a denied-then-corrected flash: since
 * the cookie read here is synchronous and happens strictly before GTM's
 * own script runs, the very first consent state GTM ever sees is already
 * the visitor's real, persisted choice — not a placeholder that gets
 * updated a moment later.
 */
export function getConsentDefaultScript(): string {
  return `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var state = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  };

  try {
    var match = document.cookie.match(/(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)/);
    if (match) {
      var stored = JSON.parse(decodeURIComponent(match[1]));
      if (stored && stored.v === ${CONSENT_SCHEMA_VERSION} && typeof stored.analytics === "boolean" && typeof stored.marketing === "boolean") {
        var a = stored.analytics ? "granted" : "denied";
        var m = stored.marketing ? "granted" : "denied";
        state = { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m };
      }
    }
  } catch (e) {}

  gtag("consent", "default", state);
})();
`.trim();
}
