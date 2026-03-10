"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  siteConfig,
  servicesOverview,
  processSteps,
  portfolioItems,
  testimonials,
  aboutContent,
} from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Smooth Scroll (Lenis)
   ═══════════════════════════════════════════════════════════ */
function useSmoothScroll() {
  useEffect(() => {
    let lenis: InstanceType<typeof import("@studio-freight/lenis").default> | undefined;
    let tickerCb: ((time: number) => void) | undefined;

    async function init() {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

      lenis.on("scroll", ScrollTrigger.update);
      tickerCb = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    init();
    return () => {
      if (lenis) lenis.destroy();
      if (tickerCb) gsap.ticker.remove(tickerCb);
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════
   Custom Cursor
   ═══════════════════════════════════════════════════════════ */
function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const label = useRef("");

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (el) {
        scale.current = 2.5;
        label.current = (el as HTMLElement).dataset.cursor || "";
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (el) { scale.current = 1; label.current = ""; }
    };

    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (outer.current) {
        outer.current.style.transform = `translate3d(${pos.current.x - 24}px, ${pos.current.y - 24}px, 0) scale(${scale.current})`;
        outer.current.textContent = label.current;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.current.x - 4}px, ${target.current.y - 4}px, 0)`;
      }
      requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={outer} className="pointer-events-none fixed top-0 left-0 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b35]/40 text-[9px] font-bold uppercase tracking-widest text-[#ff6b35] mix-blend-difference transition-[width,height,border-color] duration-300" style={{ willChange: "transform" }} />
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#ff6b35]" style={{ willChange: "transform" }} />
    </>
  );
}

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
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
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
   SECTION: Hero
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section data-hero className="relative h-[120vh] overflow-hidden bg-[#050508]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-astronaut-new.png"
          alt=""
          fill
          priority
          className="object-contain object-center opacity-20"
          style={{ transform: "scale(0.6)" }}
          data-parallax="-80"
        />
        {/* Radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,107,53,0.07) 0%, transparent 70%)",
        }} />
      </div>

      {/* Content */}
      <div data-hero-content className="relative z-10 flex h-screen flex-col items-center justify-center px-5">
        <div data-hero-text className="text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#ff6b35]/60" data-fade="0">
            Creative Agency
          </p>
          <h1 className="font-heading text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.95] tracking-tight">
            <span className="block text-white">From Shadow</span>
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
              to Spotlight
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-white/35 md:text-base" data-fade="0.4">
            We craft bold brands, digital strategies, and immersive experiences
            that transform businesses and captivate audiences.
          </p>
          <div className="mt-10 flex justify-center gap-5" data-fade="0.6">
            <MagneticLink href="/contact" cursor="Go" className="rounded-full bg-[#ff6b35] px-8 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,107,53,0.3)]">
              Start a Project
            </MagneticLink>
            <MagneticLink href="/portfolio" cursor="View" className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-white/25 hover:text-white">
              Our Work
            </MagneticLink>
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll to explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: About — Large editorial text
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section className="relative py-40 md:py-56">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        {/* Large editorial statement */}
        <h2 className="font-heading text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.15] tracking-tight" data-reveal>
          <span className="text-white">We bring visions to life through </span>
          <span className="text-[#ff6b35]">strategy, design, </span>
          <span className="text-white/40">and relentless creativity.</span>
        </h2>

        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {aboutContent.story.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/40" data-fade={i * 0.15}>
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] md:grid-cols-4">
          {[
            { value: "200+", label: "Projects" },
            { value: "50+", label: "Clients" },
            { value: "8+", label: "Years" },
            { value: "15+", label: "Experts" },
          ].map((stat, i) => (
            <div key={stat.label} className="bg-white/[0.02] p-8 text-center md:p-10" data-fade={i * 0.1}>
              <p className="font-heading text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/25">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Services — Clean numbered list
   ═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Solutions</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>What We Do</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-12">
          {servicesOverview.map((service, i) => (
            <Link href={`/solutions/${service.slug}`} key={service.id}>
              <div
                data-cursor="View"
                data-fade={i * 0.08}
                className="group relative border-b border-white/[0.06] py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02]"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="flex items-start gap-6 md:items-center md:gap-12">
                  {/* Number */}
                  <span className="shrink-0 font-heading text-sm font-bold text-white/15 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#ff6b35] md:text-3xl">
                    {service.title}
                  </h3>

                  {/* Description (shows on hover) */}
                  <p
                    className="ml-auto hidden max-w-sm text-right text-sm leading-relaxed text-white/30 transition-opacity duration-500 md:block"
                    style={{ opacity: active === i ? 1 : 0 }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="shrink-0 text-white/10 transition-all duration-300 group-hover:text-[#ff6b35] group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Portfolio — Horizontal scroll
   ═══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Selected Work</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>Featured Projects</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />
      </div>

      {/* Horizontal scroll container */}
      <div data-h-scroll className="relative h-screen">
        <div data-h-track className="flex h-full items-center gap-8 pl-8 pr-[50vw] md:pl-16 md:gap-12">
          {portfolioItems.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item }: { item: (typeof portfolioItems)[number] }) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={item.href || "#"} target={item.target} className="block shrink-0">
      <div
        data-cursor="View"
        className="group relative overflow-hidden rounded-xl"
        style={{ width: "min(75vw, 600px)" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
          <Image
            src={item.image} alt={item.title}
            width={1200} height={900} unoptimized
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: hover ? "scale(1.08)" : "scale(1)" }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {item.category}
          </span>
          <h3 className="mt-1 font-heading text-xl font-bold text-white md:text-2xl transition-colors duration-300 group-hover:text-[#ff6b35]">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Process — Minimal numbered steps
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>How We Work</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>Our Process</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-16 grid gap-0 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <div key={step.number} className="relative border-b border-white/[0.04] py-8 md:border-b-0 md:border-r md:border-white/[0.04] md:px-6 md:py-0 last:border-0" data-fade={i * 0.1}>
              <span className="font-heading text-4xl font-bold text-white/[0.04] md:text-5xl">{step.number}</span>
              <h3 className="mt-3 font-heading text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/30">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Testimonials — Editorial quotes
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Testimonials</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl mb-16" data-reveal>What They Say</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.slice(0, 4).map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-10" data-fade={i * 0.1}>
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-white/50 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6b35]/10 text-xs font-bold text-[#ff6b35]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/25">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: CTA — Full-width statement
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-40 md:py-56">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 text-center">
        <h2 className="font-heading text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.05] tracking-tight" data-reveal>
          <span className="text-white">Ready to eclipse </span>
          <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            your competition?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-white/35 md:text-base" data-fade="0.2">
          Let&apos;s create something extraordinary together.
        </p>
        <div className="mt-10" data-fade="0.4">
          <MagneticLink href="/contact" cursor="Go" className="inline-flex rounded-full bg-[#ff6b35] px-10 py-4 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(255,107,53,0.35)]">
            Start a Project
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-1 text-xs text-white/25">{siteConfig.tagline}</p>
          </div>
          <div className="flex gap-6">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-white/25 transition-colors hover:text-[#ff6b35]">
                {name}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 h-px bg-white/[0.04]" />
        <p className="mt-6 text-[11px] text-white/15">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function V2Page() {
  useSmoothScroll();
  useScrollAnimations();

  return (
    <main className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen cursor-none">
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
