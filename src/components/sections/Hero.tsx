"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

/* ── Seeded pseudo-random for SSR-safe star positions ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: `${seededRandom(i * 3 + 1) * 100}%`,
  y: `${seededRandom(i * 3 + 2) * 100}%`,
  r: 0.6 + seededRandom(i * 3 + 3) * 1.4,
  opacity: 0.3 + seededRandom(i * 3 + 4) * 0.5,
  delay: seededRandom(i * 3 + 5) * 4,
}));

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Parallax transforms ── */
  // Stars — slowest layer
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Astronaut — medium parallax + subtle scale
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const astroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const astroRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  // Glow orb behind astronaut
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.3]);

  // Text — fastest layer, fades out
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Stats bar
  const statsY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Eclipse ring
  const ringScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.4]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0]);

  // Floating particles
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[110vh] flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* ── Layer 0: Deep space background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a0a] to-bg" />

      {/* ── Layer 1: Star field ── */}
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

      {/* ── Layer 2: Ambient glow orbs ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ y: glowY, scale: glowScale }}
      >
        <div className="h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[120px] md:h-[800px] md:w-[800px]" />
      </motion.div>

      {/* Subtle secondary glow */}
      <div className="absolute -left-[15%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/[0.015] blur-[80px]" />

      {/* ── Layer 3: Eclipse ring — orbiting astronaut ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]"
        style={{ scale: ringScale, opacity: ringOpacity }}
      >
        <div className="h-[420px] w-[420px] animate-spin-slow rounded-full border border-primary/20 md:h-[540px] md:w-[540px]">
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-primary" />
          <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 rounded-full bg-primary-light" />
          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-primary/60" />
        </div>
      </motion.div>

      {/* ── Layer 4: Floating particles ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: particlesY }}
      >
        {[
          { x: "15%", y: "30%", size: 3, dur: 4, delay: 0 },
          { x: "80%", y: "25%", size: 2, dur: 3.5, delay: 1 },
          { x: "25%", y: "70%", size: 2.5, dur: 5, delay: 0.5 },
          { x: "75%", y: "65%", size: 2, dur: 4.5, delay: 2 },
          { x: "50%", y: "15%", size: 1.5, dur: 3, delay: 1.5 },
          { x: "10%", y: "55%", size: 2, dur: 4, delay: 3 },
          { x: "90%", y: "45%", size: 1.5, dur: 3.5, delay: 0.8 },
          { x: "40%", y: "80%", size: 2, dur: 4.2, delay: 2.5 },
        ].map((p, i) => (
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

      {/* ── Layer 5: The Astronaut — core visual ── */}
      <motion.div
        className="relative z-10 mt-8 flex items-center justify-center md:mt-0"
        style={{
          y: astroY,
          scale: astroScale,
          rotate: astroRotate,
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Glow behind astronaut's hands (the globe) */}
        <div className="absolute bottom-[20%] left-1/2 h-[120px] w-[120px] -translate-x-1/2 rounded-full bg-primary/20 blur-[40px] md:h-[160px] md:w-[160px]" />

        <Image
          src="/images/hero-graphic.png"
          alt="Eclipse astronaut holding Earth — From Shadow to Spotlight"
          width={520}
          height={520}
          priority
          className="relative z-10 h-auto w-[320px] drop-shadow-[0_0_60px_rgba(255,107,53,0.15)] sm:w-[400px] md:w-[480px] lg:w-[520px]"
        />
      </motion.div>

      {/* ── Layer 6: Text overlay ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5"
        style={{ y: textY, opacity: textOpacity }}
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
            <Button
              href={heroContent.secondaryCta.href}
              variant="outline"
              size="lg"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Layer 7: Stats bar — bottom ── */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 z-20 px-5 md:bottom-28"
        style={{ y: statsY, opacity: statsOpacity }}
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

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
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

      {/* ── Bottom fade to page ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-bg to-transparent" />

      {/* ── Film grain ── */}
      <div className="page-hero-noise absolute inset-0 z-[5]" />
    </section>
  );
}
