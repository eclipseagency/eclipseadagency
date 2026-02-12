"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MenuIcon, XIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl py-3 border-b border-white/10"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={220}
            height={56}
            className={cn("transition-all duration-300", scrolled ? "h-12 w-auto" : "h-14 w-auto")}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] transition-colors",
                    pathname.startsWith("/services")
                      ? "text-primary"
                      : "text-text-secondary hover:text-text"
                  )}
                >
                  {item.label}
                  <ChevronDownIcon
                    size={14}
                    className={cn("transition-transform", dropdownOpen && "rotate-180")}
                  />
                </button>
                {dropdownOpen && (
                  <div className="glass absolute left-0 top-full mt-1 min-w-[200px] rounded-xl p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-text-secondary hover:text-text"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Button href="/contact" size="sm" className="hidden lg:inline-flex">
            Get Started
          </Button>
          <button
            className="relative z-10 text-text lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="glass fixed inset-0 top-0 flex flex-col items-center justify-center gap-6 lg:hidden">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <span className="text-lg font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="text-sm text-text-muted transition-colors hover:text-primary"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-lg font-bold uppercase tracking-[0.1em] transition-colors",
                  pathname === item.href ? "text-primary" : "text-text-secondary hover:text-text"
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <Button href="/contact" size="md" className="mt-4">
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
}
