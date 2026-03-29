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
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* ── Fullscreen background video ── */}
      <video
        src="/videos/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── Bottom gradient fade to next section ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

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
    </section>
  );
}
