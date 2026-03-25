"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLocale } from "@/i18n/LocaleContext";

export function HeroSection() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      "[data-hero-label]",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
    )
      .fromTo(
        "[data-hero-line-1]",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-line-2]",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        "[data-hero-sub]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-cta]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        "[data-hero-reel]",
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-scroll]",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-hero
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-[#050508] px-5 pt-32 md:px-8 md:pt-40 lg:pt-44"
    >
      {/* ── Ambient glow — CSS only ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,107,53,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(255,107,53,0.03) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 60%, rgba(247,147,30,0.02) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* ── Grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ── */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center"
      >
        {/* Label */}
        <p
          data-hero-label
          className="mb-8 text-[10px] font-medium uppercase tracking-[0.5em] text-white/30 md:mb-10 md:text-[11px]"
        >
          {t("hero.label")}
        </p>

        {/* Headline — split into two lines for impact */}
        <div className="overflow-hidden">
          <h1
            data-hero-line-1
            className="font-heading font-extrabold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
          >
            {t("hero.line1")}
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            data-hero-line-2
            className="font-heading font-extrabold leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
          >
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
              {t("hero.line2")}
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p
          data-hero-sub
          className="mx-auto mt-8 max-w-[450px] text-center text-sm leading-relaxed text-white/30 md:mt-10 md:text-[15px]"
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
            className="rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-9 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,53,0.35)]"
          >
            {t("hero.cta1")}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/10 px-9 py-3.5 text-[13px] font-medium text-white/40 transition-all duration-300 hover:border-white/25 hover:text-white/70"
          >
            {t("hero.cta2")}
          </Link>
        </div>

        {/* Video Showreel — cinematic contained frame */}
        <div
          data-hero-reel
          data-parallax="30"
          className="mt-16 w-full max-w-[960px] md:mt-24"
        >
          <div
            className="relative overflow-hidden rounded-xl border border-white/[0.06] shadow-2xl shadow-black/50"
            style={{ aspectRatio: "16/9" }}
          >
            <video
              src="/videos/showreel.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Subtle inner shadow */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/20">
          {t("hero.scroll")}
        </span>
        <div className="h-10 w-[1px] overflow-hidden bg-white/10">
          <div className="h-full w-full animate-[scrollLine_1.5s_ease-in-out_infinite] bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
