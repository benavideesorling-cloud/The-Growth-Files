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
 * Pushes a Consent Mode "update" command. What GTM/gtag actually reads is
 * the raw dataLayer array shape (`['consent', 'update', {...}]`) — the
 * same thing the standard `gtag()` shim produces internally — so this
 * pushes that shape directly rather than depending on `window.gtag`
 * (defined by the beforeInteractive default script) still being the
 * expected function by the time this runs.
 */
export function pushConsentUpdate(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", toGtagConsentPayload(state)]);
}
