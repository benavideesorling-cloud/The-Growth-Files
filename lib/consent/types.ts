/**
 * Two user-facing categories beyond Necessary (which is always on and has
 * no toggle) — matches Google Consent Mode v2's two consent groupings:
 * analytics maps to analytics_storage; marketing maps to the three ad_*
 * signals together, since this site has no reason to grant them
 * separately.
 */
export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentState & {
  v: typeof CONSENT_SCHEMA_VERSION;
  ts: string;
};

export const CONSENT_COOKIE_NAME = "tgf_consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months
export const CONSENT_SCHEMA_VERSION = 1;
