"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav, type NavKey } from "@/lib/config/site";

export function MobileNav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green"
      >
        <span
          className={`h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full flex flex-col gap-1 bg-navy px-5 pb-6 pt-2 shadow-lg"
        >
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-3 text-base font-semibold ${
                active === item.key ? "text-green" : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-green px-4 py-3 text-center text-sm font-bold text-navy"
          >
            Work with me
          </Link>
        </div>
      ) : null}
    </div>
  );
}
