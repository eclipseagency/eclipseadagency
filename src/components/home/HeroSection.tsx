"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLocale } from "@/i18n/LocaleContext";

export function HeroSection() {
  const { t } = useLocale();
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      "[data-hero-label]",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        "[data-hero-title]",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        "[data-hero-sub]",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo(
        "[data-hero-cta]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        "[data-hero-video]",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-scroll]",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      data-hero
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pt-36"
    >
      {/* ── Ambient background glow — CSS only ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(255,107,53,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 80%, rgba(255,107,53,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center text-center"
      >
        {/* Label */}
        <p
          data-hero-label
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/30 md:text-xs"
        >
          Eclipse Agency
        </p>

        {/* Headline — oversized */}
        <h1
          data-hero-title
          className="font-heading font-extrabold leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
        >
          <span className="bg-gradient-to-r from-white via-white/90 to-[#ff6b35] bg-clip-text text-transparent">
            {t("hero.tagline")}
          </span>
        </h1>

        {/* Subheading */}
        <p
          data-hero-sub
          className="mx-auto mt-5 max-w-[520px] text-sm leading-relaxed text-white/35 md:mt-6 md:text-base"
        >
          {t("hero.subheading")}
        </p>

        {/* CTA Buttons */}
        <div
          data-hero-cta
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/contact"
            className="group relative rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.35)]"
          >
            {t("hero.cta1")}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/45 transition-all duration-300 hover:border-[#ff6b35]/25 hover:text-white/70"
          >
            {t("hero.cta2")}
          </Link>
        </div>

        {/* Video Showreel */}
        <div
          data-hero-video
          data-parallax="25"
          className="mt-14 w-full max-w-[900px] md:mt-20"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
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
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          className="animate-[bounce_2s_ease-in-out_infinite]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
    </section>
  );
}
