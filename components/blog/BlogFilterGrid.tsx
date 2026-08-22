"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type Post = { num: string; slug: string; categories: string[]; title: string; desc: string; date: string };
type Category = { title: string; slug: string };

/**
 * Ports Blog.dc.html's filter chips + featured note + post grid. In the
 * prototype these are three separate <section>s that all share the same
 * #f8f9f8 background and one `activeFilter` state (read by both the chip
 * row and the grid within a single render pass) — merged into one
 * continuous block here so the state can actually be shared; visually
 * identical since the background never changes between them.
 *
 * Filtering is by category *title* (matching Sanity's `category.title`,
 * already sentence case) rather than a hardcoded key list, since a post
 * can now carry multiple categories — a post shows up under every filter
 * chip matching any of its assigned categories, with no duplicate cards,
 * since each post still renders exactly once per filter pass.
 */
export function BlogFilterGrid({
  posts,
  categories,
  featuredSlot,
}: {
  posts: Post[];
  categories: Category[];
  featuredSlot: ReactNode;
}) {
  const [active, setActive] = useState("All notes");
  const visible = active === "All notes" ? posts : posts.filter((p) => p.categories.includes(active));

  return (
    <div className="bg-[#f8f9f8] px-5 sm:px-8 md:px-12">
      <div className="mx-auto max-w-[1280px] py-7">
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-mono text-xs tracking-[0.06em] text-body">Filter</div>
          <button
            type="button"
            onClick={() => setActive("All notes")}
            aria-pressed={active === "All notes"}
            className={`rounded-md border px-[18px] py-2.5 text-[13px] font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5 ${
              active === "All notes" ? "border-green bg-green text-navy" : "border-navy/[0.12] bg-white text-navy"
            }`}
          >
            All notes
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.title)}
              aria-pressed={active === c.title}
              className={`rounded-md border px-[18px] py-2.5 text-[13px] font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5 ${
                active === c.title ? "border-green bg-green text-navy" : "border-navy/[0.12] bg-white text-navy"
              }`}
            >
              {c.title}
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
                <div className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-green-dark">
                  {post.categories.join(" · ")}
                </div>
                <h3 className="mb-2.5 text-[17px] leading-snug font-bold text-navy">{post.title}</h3>
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
