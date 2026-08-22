"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { newsletterFormSchema } from "@/lib/validation/newsletter";

type Status = "idle" | "submitting" | "success" | "error";

/** Ports Blog.dc.html's newsletter signup with real client + server validation and submission. */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = newsletterFormSchema.safeParse({
      email,
      website: new FormData(e.currentTarget).get("website"),
      elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
    });
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      // Hook for future newsletter_subscribe_success tracking (GA4/GTM),
      // added once analytics is wired up post-launch. Stays inline — no
      // redirect for newsletter signups.
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="text-sm font-semibold text-green">
        Subscribed. Watch your inbox for the next field note.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="newsletter-website">Website</label>
          <input type="text" id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="w-full rounded-md border border-white/[0.15] bg-navy-panel-alt px-4 py-[13px] text-sm text-white placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-green sm:w-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cursor-pointer rounded-md bg-green px-6 py-[13px] text-sm font-bold whitespace-nowrap text-navy transition-transform duration-200 ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" role="alert" className="text-xs font-semibold text-red-400">
          {error}
        </p>
      ) : null}
    </form>
  );
}
