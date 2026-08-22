import Link from "next/link";
import { mainNav, siteConfig, type NavKey } from "@/lib/config/site";
import { MobileNav } from "./MobileNav";

export function Header({ active }: { active?: NavKey }) {
  return (
    <header className="relative flex items-center justify-between gap-6 bg-navy px-5 py-[22px] sm:px-8 md:px-12">
      <Link href="/" className="shrink-0">
        <div className="text-xl font-extrabold tracking-tight text-white">{siteConfig.name}</div>
      </Link>

      <nav className="hidden items-center gap-7 md:flex">
        {mainNav.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
            className={`text-sm font-semibold ${active === item.key ? "text-green" : "text-[#e2e8f0]"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className="hidden whitespace-nowrap rounded-md bg-green px-[22px] py-[11px] text-sm font-bold text-navy transition-transform duration-200 ease-out hover:-translate-y-0.5 md:inline-block"
      >
        Work with me
      </Link>

      <MobileNav active={active} />
    </header>
  );
}
