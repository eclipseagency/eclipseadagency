"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const astroRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 0]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-5 pt-32 pb-16 md:px-8 md:pt-36 md:pb-20"
    >
      {/* ── BG layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-bg to-bg" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute -left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-primary/[0.05] blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[5%] top-[30%] h-[500px] w-[500px] rounded-full bg-primary-light/[0.04] blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute left-[30%] -bottom-[10%] h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[100px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Film grain */}
      <div className="page-hero-noise absolute inset-0" />

      {/* ── Two-column grid ── */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:min-h-[calc(100vh-10rem)]">
        {/* ─── Left: Text ─── */}
        <motion.div
          className="text-center lg:text-left"
          style={{ y: textY, opacity: textOpacity }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-block rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
          >
            {heroContent.badge}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[60px]"
          >
            {heroContent.heading[0]}
            <br />
            <span className="gradient-text">{heroContent.heading[1]}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg lg:mx-0"
          >
            {heroContent.subheading}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <Button href={heroContent.cta.href} size="lg">
              {heroContent.cta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} variant="outline" size="lg">
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-heading text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Right: Astronaut ─── */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ y: astroY, scale: astroScale, rotate: astroRotate }}
        >
          {/* Eclipse ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: ringOpacity, scale: ringScale }}
          >
            <div className="h-[280px] w-[280px] animate-spin-slow rounded-full border border-primary/15 sm:h-[340px] sm:w-[340px] md:h-[440px] md:w-[440px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(255,107,53,0.4)]" />
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-primary-light shadow-[0_0_10px_rgba(247,147,30,0.3)]" />
            </div>
          </motion.div>

          {/* Globe glow */}
          <div className="absolute bottom-[15%] left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-primary/20 blur-[50px] md:h-[160px] md:w-[160px]" />

          {/* Astronaut image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
          >
            <Image
              src="/images/hero-graphic.png"
              alt="Eclipse astronaut holding Earth — From Shadow to Spotlight"
              width={520}
              height={520}
              priority
              className="relative z-10 h-auto w-[240px] drop-shadow-[0_0_60px_rgba(255,107,53,0.15)] sm:w-[300px] md:w-[380px] lg:w-[460px]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: scrollIndOp }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon size={16} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
