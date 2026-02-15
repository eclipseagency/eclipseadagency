"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  heroContent,
  servicesOverview,
  portfolioItems,
  processSteps,
} from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, ChevronDownIcon } from "@/components/ui/Icons";

/* ── SSR-safe seeded random ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: `${seededRandom(i * 3 + 1) * 100}%`,
  y: `${seededRandom(i * 3 + 2) * 100}%`,
  r: 0.5 + seededRandom(i * 3 + 3) * 1.5,
  opacity: 0.2 + seededRandom(i * 3 + 4) * 0.6,
  delay: seededRandom(i * 3 + 5) * 5,
}));

const particles = [
  { x: "12%", y: "28%", size: 3, dur: 4.2, delay: 0 },
  { x: "82%", y: "22%", size: 2, dur: 3.8, delay: 1 },
  { x: "22%", y: "72%", size: 2.5, dur: 5, delay: 0.5 },
  { x: "78%", y: "68%", size: 2, dur: 4.5, delay: 2 },
  { x: "48%", y: "12%", size: 1.5, dur: 3.2, delay: 1.5 },
  { x: "8%", y: "52%", size: 2, dur: 4, delay: 3 },
  { x: "92%", y: "48%", size: 1.5, dur: 3.5, delay: 0.8 },
  { x: "38%", y: "82%", size: 2, dur: 4.4, delay: 2.5 },
];

/*
 * ─── SCROLL STAGE ───────────────────────────────────────────────────
 *
 * 500vh scroll container → sticky 100vh viewport.
 * The astronaut stays pinned and transforms through 5 cinematic scenes:
 *
 *   Scene 0 — Hero        (progress 0.00 → 0.20)
 *   Scene 1 — Services    (progress 0.20 → 0.40)
 *   Scene 2 — Portfolio   (progress 0.40 → 0.60)
 *   Scene 3 — Process     (progress 0.60 → 0.80)
 *   Scene 4 — Exit        (progress 0.80 → 1.00)
 *
 * After the stage ends, normal scroll resumes for remaining sections.
 */

export function ScrollStage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Astronaut position keyframes ──────────────────────────────── *
   * kf = [hero-start, hero-hold, srv-in, srv-hold, port-in, port-hold,
   *        proc-in, proc-hold, exit-start, exit-end]                  */
  const kf = [0, 0.14, 0.22, 0.34, 0.42, 0.54, 0.62, 0.74, 0.85, 1.0];

  // Position — percentage-based for natural responsiveness
  const astroLeft = useTransform(scrollYProgress, kf, [
    "50%", "50%", "72%", "72%", "26%", "26%", "50%", "50%", "50%", "50%",
  ]);
  const astroTop = useTransform(scrollYProgress, kf, [
    "48%", "48%", "46%", "46%", "46%", "46%", "26%", "26%", "8%", "-12%",
  ]);
  const astroScale = useTransform(scrollYProgress, kf, [
    1, 1, 0.52, 0.52, 0.52, 0.52, 0.32, 0.32, 0.15, 0,
  ]);
  const astroRotate = useTransform(scrollYProgress, kf, [
    0, 0, -5, -5, 5, 5, 0, 0, 0, 0,
  ]);
  const astroOpacity = useTransform(
    scrollYProgress, [0, 0.82, 1.0], [1, 1, 0]
  );

  /* ── Glow orb ── */
  const glowLeft = useTransform(scrollYProgress, kf, [
    "50%", "50%", "72%", "72%", "26%", "26%", "50%", "50%", "50%", "50%",
  ]);
  const glowTop = useTransform(scrollYProgress, kf, [
    "48%", "48%", "46%", "46%", "46%", "46%", "26%", "26%", "8%", "-12%",
  ]);
  const glowScale = useTransform(scrollYProgress, kf, [
    1, 1, 0.55, 0.55, 0.55, 0.55, 0.35, 0.35, 0.15, 0,
  ]);

  /* ── Eclipse ring (hero only) ── */
  const ringScale = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1.2, 1.6]);
  const ringOp = useTransform(scrollYProgress, [0, 0.12, 0.22], [0.2, 0.12, 0]);

  /* ── Star parallax ── */
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  /* ── Particle parallax ── */
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  /* ── Scene content opacities & Y offsets ── */
  // Scene 0: Hero
  const heroOp = useTransform(scrollYProgress, [0, 0.12, 0.17, 0.21], [1, 1, 0.3, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.21], [0, -100]);
  const statsOp = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0.4, 0]);
  const statsY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Scene 1: Services
  const servOp = useTransform(scrollYProgress, [0.18, 0.23, 0.34, 0.39], [0, 1, 1, 0]);
  const servY = useTransform(scrollYProgress, [0.18, 0.23, 0.34, 0.39], [60, 0, 0, -60]);

  // Scene 2: Portfolio
  const portOp = useTransform(scrollYProgress, [0.38, 0.43, 0.54, 0.59], [0, 1, 1, 0]);
  const portY = useTransform(scrollYProgress, [0.38, 0.43, 0.54, 0.59], [60, 0, 0, -60]);

  // Scene 3: Process
  const procOp = useTransform(scrollYProgress, [0.58, 0.63, 0.74, 0.79], [0, 1, 1, 0]);
  const procY = useTransform(scrollYProgress, [0.58, 0.63, 0.74, 0.79], [60, 0, 0, -60]);

  // Scroll indicator
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ── BG: Deep space gradient ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a0a] to-[#0a0a0a]" />

        {/* ── Stars ── */}
        <motion.div className="absolute inset-0" style={{ y: starsY }}>
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {stars.map((s) => (
              <circle
                key={s.id}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="white"
                opacity={s.opacity}
              >
                <animate
                  attributeName="opacity"
                  values={`${s.opacity};${s.opacity * 0.3};${s.opacity}`}
                  dur={`${3 + s.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </motion.div>

        {/* ── Ambient glows ── */}
        <div className="absolute -left-[10%] top-[12%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[100px]" />
        <div className="absolute -right-[10%] bottom-[18%] h-[350px] w-[350px] rounded-full bg-purple-500/[0.015] blur-[80px]" />

        {/* ── Glow orb — follows astronaut ── */}
        <motion.div
          className="absolute z-0 -translate-x-1/2 -translate-y-1/2"
          style={{ left: glowLeft, top: glowTop, scale: glowScale }}
        >
          <div className="h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[140px]" />
        </motion.div>

        {/* ── Eclipse ring (hero scene only) ── */}
        <motion.div
          className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2"
          style={{ scale: ringScale, opacity: ringOp }}
        >
          <div className="h-[420px] w-[420px] animate-spin-slow rounded-full border border-primary/20 md:h-[540px] md:w-[540px]">
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-primary" />
            <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 rounded-full bg-primary-light" />
            <div className="absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-primary/50" />
          </div>
        </motion.div>

        {/* ── Floating particles ── */}
        <motion.div className="absolute inset-0" style={{ y: particleY }}>
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/40"
              style={{
                left: p.x,
                top: p.y,
                width: p.size * 2,
                height: p.size * 2,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            THE ASTRONAUT — pinned visual that evolves through scenes
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: astroLeft,
            top: astroTop,
            scale: astroScale,
            rotate: astroRotate,
            opacity: astroOpacity,
          }}
        >
          {/* Entrance animation wrapper (plays once on mount) */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Globe glow behind hands */}
            <div className="absolute bottom-[18%] left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full bg-primary/20 blur-[50px] md:h-[180px] md:w-[180px]" />

            <Image
              src="/images/hero-graphic.png"
              alt="Eclipse astronaut holding Earth"
              width={520}
              height={520}
              priority
              className="relative z-10 h-auto w-[320px] drop-shadow-[0_0_80px_rgba(255,107,53,0.15)] sm:w-[380px] md:w-[480px] lg:w-[520px]"
            />
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 0 — HERO
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5"
          style={{ opacity: heroOp, y: heroY }}
        >
          <div className="flex w-full max-w-[1400px] flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary backdrop-blur-sm"
            >
              {heroContent.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl"
            >
              {heroContent.heading[0]}{" "}
              <span className="gradient-text">{heroContent.heading[1]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary/80 md:text-lg"
            >
              {heroContent.subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button href={heroContent.cta.href} size="lg">
                {heroContent.cta.label}
              </Button>
              <Button href={heroContent.secondaryCta.href} variant="outline" size="lg">
                {heroContent.secondaryCta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero stats bar */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 z-20 px-5 md:bottom-24"
          style={{ opacity: statsOp, y: statsY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mx-auto grid max-w-3xl grid-cols-2 gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 backdrop-blur-md sm:grid-cols-4 md:px-10"
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-xl font-bold text-primary md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 1 — SERVICES
            Astronaut drifts right → content appears on the left
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center px-5 md:px-12 lg:px-16"
          style={{ opacity: servOp, y: servY }}
        >
          <div className="w-full md:max-w-[50%]">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What We Do
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              Solutions That
              <br />
              Drive <span className="gradient-text">Growth</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary/70 md:text-base">
              We combine creativity with strategy to deliver comprehensive
              services that transform brands and accelerate business growth.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
              {servicesOverview.slice(0, 6).map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.05] md:p-4"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary md:h-10 md:w-10">
                    <ServiceIcon icon={s.icon} size={18} />
                  </div>
                  <p className="text-xs font-semibold md:text-sm">{s.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 2 — PORTFOLIO
            Astronaut drifts left → content appears on the right
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center px-5 md:justify-end md:px-12 lg:px-16"
          style={{ opacity: portOp, y: portY }}
        >
          <div className="w-full md:max-w-[50%]">
            <div className="md:text-right">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Work
              </span>
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
                Projects That
                <br />
                <span className="gradient-text">Speak</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary/70 md:ml-auto md:text-base">
                A selection of our recent work across branding, digital, web
                development, and creative production.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {portfolioItems.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="group overflow-hidden rounded-xl border border-white/[0.06]"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={400}
                    height={300}
                    unoptimized
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 md:text-right">
              <Button href="/portfolio" variant="outline" size="lg">
                View All Projects
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 3 — PROCESS
            Astronaut rises to top → process steps fill the bottom
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end justify-center px-5 pb-12 md:pb-16"
          style={{ opacity: procOp, y: procY }}
        >
          <div className="w-full max-w-[1000px]">
            <div className="mb-8 text-center">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Process
              </span>
              <h2 className="font-heading text-2xl font-bold md:text-4xl">
                How We <span className="gradient-text">Create</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center backdrop-blur-sm md:p-4"
                >
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 text-sm font-bold text-primary">
                    {step.number}
                  </div>
                  <p className="text-[11px] font-semibold leading-tight md:text-sm">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: scrollIndOp }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDownIcon size={16} className="text-text-muted" />
          </motion.div>
        </motion.div>

        {/* ── Film grain ── */}
        <div className="page-hero-noise absolute inset-0 z-[5]" />

        {/* ── Bottom fade to page bg ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[6] h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>
    </div>
  );
}
