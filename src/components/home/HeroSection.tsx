"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLocale } from "@/i18n/LocaleContext";

export function HeroSection() {
  const { t } = useLocale();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      "[data-hero-video]",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
    )
      .fromTo(
        "[data-hero-label]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=1.0"
      )
      .fromTo(
        "[data-hero-title]",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        "[data-hero-sub]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        "[data-hero-cta]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        "[data-hero-scroll]",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      data-hero
      className="relative h-[100svh] overflow-hidden"
    >
      {/* ── Full-screen video background ── */}
      <div data-hero-video className="absolute inset-0">
        <video
          src="/videos/showreel.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Overlays for text contrast ── */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />

      {/* ── Content overlay ── */}
      <div
        data-hero-content
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 md:px-8"
      >
        {/* Label */}
        <p
          data-hero-label
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-white/50 md:mb-6 md:text-xs"
        >
          Eclipse Agency
        </p>

        {/* Headline — cinematic oversized */}
        <h1
          data-hero-title
          className="font-heading font-extrabold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            {t("hero.tagline")}
          </span>
        </h1>

        {/* Subheading */}
        <p
          data-hero-sub
          className="mx-auto mt-6 max-w-[480px] text-sm leading-relaxed text-white/45 md:mt-8 md:text-base"
        >
          {t("hero.subheading")}
        </p>

        {/* CTA Buttons */}
        <div
          data-hero-cta
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-10"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-9 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
          >
            {t("hero.cta1")}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/15 px-9 py-3.5 text-sm font-medium text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white/80"
          >
            {t("hero.cta2")}
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <div className="h-10 w-[1px] overflow-hidden bg-white/10">
          <div className="h-full w-full animate-[scrollLine_1.5s_ease-in-out_infinite] bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
