"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Lenis smooth scroll removed — native CSS scroll-behavior: smooth is sufficient
   and saves ~15KB of JS + animation frame overhead on mobile */

/* ═══════════════════════════════════════════════════════════
   Dynamic imports for heavy canvas components (SSR disabled)
   ═══════════════════════════════════════════════════════════ */
const HeroSection = dynamic(
  () => import("@/components/home/HeroCanvas").then((m) => ({ default: m.HeroSection })),
  { ssr: false }
);
const ScrollRocket = dynamic(
  () => import("@/components/home/ScrollRocket").then((m) => ({ default: m.ScrollRocket })),
  { ssr: false }
);
const RocketPreloader = dynamic(
  () => import("@/components/home/RocketPreloader").then((m) => ({ default: m.RocketPreloader })),
  { ssr: false }
);
const SpaceBackground = dynamic(
  () => import("@/components/home/SpaceBackground").then((m) => ({ default: m.SpaceBackground })),
  { ssr: false }
);

/* ═══════════════════════════════════════════════════════════
   Static section imports
   ═══════════════════════════════════════════════════════════ */
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import { BackToTop } from "@/components/home/BackToTop";

/* ═══════════════════════════════════════════════════════════
   GSAP Scroll Animations Hook
   ═══════════════════════════════════════════════════════════ */
function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text reveals ──
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)",
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });

      // ── Fade ups ──
      document.querySelectorAll("[data-fade]").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, delay: Number((el as HTMLElement).dataset.fade) || i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ── Parallax elements ──
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number((el as HTMLElement).dataset.parallax) || 50;
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // ── Horizontal scroll for portfolio ──
      const hScroll = document.querySelector("[data-h-scroll]");
      const hTrack = document.querySelector("[data-h-track]");
      if (hScroll && hTrack) {
        const totalWidth = (hTrack as HTMLElement).scrollWidth - window.innerWidth;
        gsap.to(hTrack, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: hScroll,
            start: "top 10%",
            end: () => `+=${totalWidth * 1.1}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // ── Scale-in hero text ──
      const heroText = document.querySelector("[data-hero-text]");
      if (heroText) {
        gsap.fromTo(heroText,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out", delay: 0.3 }
        );
      }

      // ── Hero scroll zoom ──
      const heroSection = document.querySelector("[data-hero]");
      if (heroSection) {
        gsap.to("[data-hero-content]", {
          y: -100, opacity: 0, scale: 0.95,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // ── Line draw on scroll ──
      document.querySelectorAll("[data-line]").forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.2, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

/* ═══════════════════════════════════════════════════════════
   Magnetic Button
   ═══════════════════════════════════════════════════════════ */
function MagneticLink({
  href, children, className = "", cursor = "",
}: {
  href: string; children: React.ReactNode; className?: string; cursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <Link
      ref={ref} href={href}
      data-cursor={cursor}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const onPreloaderComplete = useCallback(() => setPreloaderDone(true), []);
  useScrollAnimations();

  return (
    <>
      <RocketPreloader onComplete={onPreloaderComplete} />
      <main id="main-content" className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen">
        <SpaceBackground />
        <ScrollRocket visible={preloaderDone} />
        <WhatsAppButton />
        <BackToTop />
        <HeroSection />
        <div className="relative z-30 hidden md:flex justify-center pointer-events-none select-none" style={{ marginBottom: "-160px" }}>
          <video
            src="https://eclipseadagency.com/wp-content/uploads/2024/08/Inflatable-Tube-Man.webm"
            autoPlay
            muted
            loop
            playsInline
            className="h-[380px] w-auto mix-blend-screen"
            style={{ transform: "translateX(20px) translateY(-40px)" }}
          />
        </div>
        <AboutSection />
        <ServicesSection />
        <PartnersSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <HomeFooter />
      </main>
    </>
  );
}
