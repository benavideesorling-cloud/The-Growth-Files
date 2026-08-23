"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readConsentCookie, writeConsentCookie } from "@/lib/consent/cookie";
import { pushConsentUpdate } from "@/lib/consent/gtmConsent";
import type { ConsentState } from "@/lib/consent/types";

type ConsentContextValue = {
  /** null = no decision recorded yet (distinct from having chosen "off" for both). */
  consent: ConsentState | null;
  bannerVisible: boolean;
  modalOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (state: ConsentState) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

/**
 * Single source of truth for consent state, shared by the banner, the
 * preferences modal, and the footer's "Cookie settings" link (which lives
 * in a separate part of the tree and has no other way to reach the modal's
 * open state). Every path that changes consent — accept all, reject,
 * saved custom preferences — funnels through applyAndPersist, so the
 * cookie write and the Consent Mode update can never drift apart.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Reading document.cookie can only happen client-side — the server
    // render (and the client's first hydration pass, which must match it)
    // has no cookie access at all, so this genuinely can't be computed
    // during render without a server/client mismatch. This is exactly the
    // "synchronize with an external platform API" case the lint rule's own
    // description carves out, not a redundant derived-state effect.
    const stored = readConsentCookie();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent({ analytics: stored.analytics, marketing: stored.marketing });
    } else {
      setBannerVisible(true);
    }
  }, []);

  const applyAndPersist = useCallback((state: ConsentState) => {
    setConsent(state);
    writeConsentCookie(state);
    pushConsentUpdate(state);
    setBannerVisible(false);
    setModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => applyAndPersist({ analytics: true, marketing: true }), [applyAndPersist]);
  const rejectNonEssential = useCallback(() => applyAndPersist({ analytics: false, marketing: false }), [applyAndPersist]);
  const savePreferences = useCallback((state: ConsentState) => applyAndPersist(state), [applyAndPersist]);
  const openPreferences = useCallback(() => setModalOpen(true), []);
  const closePreferences = useCallback(() => setModalOpen(false), []);

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, bannerVisible, modalOpen, openPreferences, closePreferences, acceptAll, rejectNonEssential, savePreferences }),
    [consent, bannerVisible, modalOpen, openPreferences, closePreferences, acceptAll, rejectNonEssential, savePreferences],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
