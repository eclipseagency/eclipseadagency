"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Section imports
   ═══════════════════════════════════════════════════════════ */
import { HeroSection } from "@/components/home/HeroSection";
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
import { Header } from "@/components/layout/Header";

/* ═══════════════════════════════════════════════════════════
   GSAP Scroll Animations Hook
   ═══════════════════════════════════════════════════════════ */
function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text reveals ──
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.0, ease: "power3.out",
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
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 },
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
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // ── Hero scroll fade ──
      const heroSection = document.querySelector("[data-hero]");
      if (heroSection) {
        gsap.to("[data-hero-content]", {
          y: -80, opacity: 0, scale: 0.97,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1 },
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
  useScrollAnimations();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
        <WhatsAppButton />
        <BackToTop />
        <HeroSection />
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
