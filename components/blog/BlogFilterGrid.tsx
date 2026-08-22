"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type Post = { num: string; slug: string; tag: string; title: string; desc: string; date: string };

const FILTERS = [
  { key: "all", label: "ALL NOTES" },
  { key: "ai search", label: "AI SEARCH" },
  { key: "aeo & geo", label: "AEO & GEO" },
  { key: "technical", label: "TECHNICAL" },
  { key: "measurement", label: "MEASUREMENT" },
  { key: "working with me", label: "WORKING WITH ME" },
];

/**
 * Ports Blog.dc.html's filter chips + featured note + post grid. In the
 * prototype these are three separate <section>s that all share the same
 * #f8f9f8 background and one `activeFilter` state (read by both the chip
 * row and the grid within a single render pass) — merged into one
 * continuous block here so the state can actually be shared; visually
 * identical since the background never changes between them.
 */
export function BlogFilterGrid({
  posts,
  featuredSlot,
}: {
  posts: Post[];
  featuredSlot: ReactNode;
}) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? posts : posts.filter((p) => p.tag.toLowerCase() === active);

  return (
    <div className="bg-[#f8f9f8] px-5 sm:px-8 md:px-12">
      <div className="mx-auto max-w-[1280px] py-7">
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-mono text-xs tracking-[0.06em] text-body">FILTER</div>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`rounded-md border px-[18px] py-2.5 text-[13px] font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5 ${
                active === f.key ? "border-green bg-green text-navy" : "border-navy/[0.12] bg-white text-navy"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] pt-8 pb-16 md:pt-[50px] md:pb-[70px]">{featuredSlot}</div>

      <div className="mx-auto max-w-[1280px] pb-16 md:pb-[90px]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-lg border border-transparent bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-out hover:-translate-y-1 hover:border-green hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="h-[140px] bg-navy p-5 font-mono text-[38px] font-bold text-[#243a56] transition-colors duration-250 ease-out group-hover:text-green">
                {post.num}
              </div>
              <div className="p-[22px]">
                <div className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-green-dark">{post.tag}</div>
                <div className="mb-2.5 text-[17px] leading-snug font-bold text-navy">{post.title}</div>
                <div className="mb-3.5 text-[13px] leading-relaxed text-body">{post.desc}</div>
                <div className="text-xs text-muted">{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
