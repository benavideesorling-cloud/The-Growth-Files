import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] bg-navy px-5 py-7 sm:px-8 md:px-12">
      <div className="text-[15px] font-extrabold text-white">{siteConfig.name}</div>
      <nav className="flex flex-wrap gap-5">
        {footerNav.map((item) => (
          <Link key={item.key} href={item.href} className="text-[13px] text-muted">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="text-[13px] text-muted">© 2026 {siteConfig.name}</div>
    </footer>
  );
}
