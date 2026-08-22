"use client";

import { useState } from "react";

/**
 * Ports Blog.dc.html's newsletter signup. The prototype only ever flips a
 * local "subscribed" flag with no real submission — matches its own
 * unfinished state, but per the production brief a form must never fake a
 * successful submission. Kept disabled with a clear label until Phase 5
 * wires real delivery, rather than porting the prototype's fake-success
 * behavior into production.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2.5">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-white/[0.15] bg-navy-panel-alt px-4 py-[13px] text-sm text-white placeholder:text-muted sm:w-60"
      />
      <button
        type="button"
        disabled
        title="Coming soon"
        className="cursor-not-allowed rounded-md bg-green/50 px-6 py-[13px] text-sm font-bold whitespace-nowrap text-navy/70"
      >
        Subscribe
      </button>
    </div>
  );
}
