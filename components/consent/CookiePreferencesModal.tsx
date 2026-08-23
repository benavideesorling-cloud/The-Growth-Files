"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useConsent } from "./ConsentProvider";

function ConsentToggle({
  id,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2 ${
        checked ? "bg-green" : "bg-navy/20"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/** Suppressed on /studio — see CookieBanner for the same reasoning. */
export function CookiePreferencesModal() {
  const { modalOpen } = useConsent();
  const pathname = usePathname();

  if (!modalOpen || pathname?.startsWith("/studio")) return null;

  // ModalDialog is only ever mounted while modalOpen is true, so it gets a
  // fresh instance — and fresh useState initializers seeded from the
  // current consent value — every time it opens. That's what resets any
  // stale in-progress toggle change from a previous open/close cycle,
  // with no effect needed to "sync on open."
  return <ModalDialog />;
}

function ModalDialog() {
  const { consent, closePreferences, acceptAll, savePreferences } = useConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closePreferences();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePreferences]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 px-4 py-6" onClick={closePreferences}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-lg bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-extrabold tracking-tight text-navy">
            Cookie preferences
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closePreferences}
            aria-label="Close cookie preferences"
            className="shrink-0 rounded-md p-1.5 text-muted transition-colors hover:bg-navy/5 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-green"
          >
            ✕
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-body">
          Choose which optional cookies and technologies The Growth Files can use. Necessary cookies are always
          active. See the{" "}
          <a href="/privacy" className="font-semibold text-green-dark underline underline-offset-2">
            Privacy Policy
          </a>{" "}
          for full details.
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4 border-b border-navy/[0.08] pb-5">
            <div>
              <div className="text-sm font-bold text-navy">Necessary</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Required for the site to function and to remember your cookie preference. These cannot be disabled.
              </p>
            </div>
            <span className="mt-0.5 shrink-0 rounded-full bg-navy/[0.06] px-2.5 py-1 text-[11px] font-bold tracking-[0.03em] text-muted">
              ALWAYS ACTIVE
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 border-b border-navy/[0.08] pb-5">
            <div>
              <label htmlFor="consent-analytics" className="text-sm font-bold text-navy">
                Analytics
              </label>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Helps understand how visitors use the site (e.g. Google Analytics), so content and navigation can be
                improved. Has no effect unless you turn it on.
              </p>
            </div>
            <ConsentToggle id="consent-analytics" checked={analytics} onChange={setAnalytics} />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <label htmlFor="consent-marketing" className="text-sm font-bold text-navy">
                Marketing
              </label>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Governs advertising, remarketing and ad-performance measurement. No advertising tools are currently
                active on this site &mdash; this setting exists so it&apos;s ready if that changes.
              </p>
            </div>
            <ConsentToggle id="consent-marketing" checked={marketing} onChange={setMarketing} />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <Button variant="inverse" onClick={() => savePreferences({ analytics, marketing })}>
            Save preferences
          </Button>
          <Button variant="primary" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
