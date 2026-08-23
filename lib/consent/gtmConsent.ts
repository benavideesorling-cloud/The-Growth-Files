import type { ConsentState } from "./types";

type GtagConsentPayload = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

export function toGtagConsentPayload(state: ConsentState): GtagConsentPayload {
  const analytics = state.analytics ? "granted" : "denied";
  const marketing = state.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

/**
 * Pushes a Consent Mode "update" command.
 *
 * Root cause of a real production bug this fixes: GTM's consent processor
 * only recognizes genuine gtag() calls — the `arguments` object produced
 * by an actual function invocation — not a hand-built literal array, even
 * though logging both looks identical (`['consent','update',{...}]`).
 * `Array.isArray(arguments)` is false; `Array.isArray([...])` is true —
 * that's the exact, verifiable difference GTM's internal command parser
 * distinguishes on. The previous version of this function pushed a
 * literal array directly, which silently updated our own local dataLayer
 * array (so it looked correct in a JS console) but was never actually
 * interpreted as a consent command by GTM itself, so Tag Assistant kept
 * reporting the stale default.
 *
 * The fix: define a real local `gtag` function and call it, exactly
 * matching Google's own reference snippet — the same pattern
 * lib/consent/defaultScript.ts already uses for the "default" call, which
 * the user confirmed does work correctly in production.
 */
export function pushConsentUpdate(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  // Typed as variadic so TS accepts the 3-argument call below, but the
  // push still uses the real `arguments` object, not the rest-param array
  // — that's the whole point (see the note above).
  function gtag(..._args: unknown[]) {
    window.dataLayer!.push(arguments);
  }

  gtag("consent", "update", toGtagConsentPayload(state));
}
