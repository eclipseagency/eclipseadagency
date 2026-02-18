"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3"
          : "py-5"
      )}
    >
      {/* Glassmorphism background */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          scrolled
            ? "bg-[rgba(10,10,10,0.7)] border-b border-white/[0.06]"
            : "bg-transparent"
        )}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={220}
            height={56}
            className={cn(
              "transition-all duration-500",
              scrolled ? "h-12 w-auto" : "h-16 w-auto"
            )}
            priority
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:flex">
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
                    "flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                    pathname.startsWith("/services")
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {item.label}
                  <ChevronDownIcon
                    size={13}
                    className={cn(
                      "transition-transform duration-300",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-white/[0.06] p-1.5"
                      style={{
                        background: "rgba(15,15,15,0.9)",
                        backdropFilter: "blur(24px) saturate(1.5)",
                        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-[13px] text-white/60 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                  pathname === item.href
                    ? "text-white bg-white/[0.08]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.35)] lg:inline-flex"
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <button
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:bg-white/[0.08] lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav — frosted glass overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 flex flex-col items-center justify-center gap-6 lg:hidden"
            style={{
              background: "rgba(10,10,10,0.92)",
              backdropFilter: "blur(30px) saturate(1.5)",
              WebkitBackdropFilter: "blur(30px) saturate(1.5)",
            }}
          >
            {siteConfig.nav.map((item, i) =>
              item.children ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="text-lg font-semibold text-white/50">
                    {item.label}
                  </span>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="text-sm text-white/40 transition-colors hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-lg font-semibold transition-colors",
                      pathname === item.href
                        ? "text-primary"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-8 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
