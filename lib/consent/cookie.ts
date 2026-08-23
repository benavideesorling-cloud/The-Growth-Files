import { CONSENT_COOKIE_MAX_AGE_SECONDS, CONSENT_COOKIE_NAME, CONSENT_SCHEMA_VERSION, type ConsentState, type StoredConsent } from "./types";

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

/** Returns the stored consent decision, or null if none exists (or the
 * cookie is missing/corrupt/an unrecognized schema version) — both cases
 * are treated identically: no decision on record, show the banner. */
export function readConsentCookie(): StoredConsent | null {
  const raw = getCookieValue(CONSENT_COOKIE_NAME);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.v === CONSENT_SCHEMA_VERSION &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.ts === "string"
    ) {
      return parsed as StoredConsent;
    }
  } catch {
    // Corrupt cookie value — fall through to null.
  }
  return null;
}

/** Only ever writes { v, analytics, marketing, ts } — no name, email, IP,
 * identifier, or anything else can end up in this cookie by construction,
 * since ConsentState itself has no other fields. */
export function writeConsentCookie(state: ConsentState): void {
  if (typeof document === "undefined") return;

  const payload: StoredConsent = { v: CONSENT_SCHEMA_VERSION, analytics: state.analytics, marketing: state.marketing, ts: new Date().toISOString() };
  const value = encodeURIComponent(JSON.stringify(payload));
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}
