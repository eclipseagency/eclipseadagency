"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Text: rises fast + fades ── */
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ── Astronaut: rises slower (parallax depth) ── */
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const astroRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  /* ── Eclipse ring ── */
  const ringOpacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 0]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  /* ── Scroll indicator ── */
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden px-5 pt-32 pb-16 md:px-8 md:pt-36 md:pb-20"
    >
      {/* ── BG ── */}
      <div className="absolute inset-0 bg-bg" />

      {/* ── Ambient glow blobs ── */}
      <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px] opacity-30" />
      <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[140px] opacity-20" />

      {/* ── Film grain ── */}
      <div className="page-hero-noise absolute inset-0" />

      {/* ── Two-column grid ── */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:min-h-[calc(100vh-10rem)]">
        {/* ─── Left: Text ─── */}
        <motion.div
          className="text-center lg:text-left"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            {heroContent.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-heading text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[60px]"
          >
            {heroContent.heading[0]}
            <br />
            <span className="gradient-text-animated">{heroContent.heading[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg lg:mx-0"
          >
            {heroContent.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <Button href={heroContent.cta.href} size="lg">
              {heroContent.cta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} variant="outline" size="lg">
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Stats — inline below CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
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
            <div className="h-[280px] w-[280px] animate-spin-slow rounded-full border border-primary/20 sm:h-[340px] sm:w-[340px] md:h-[440px] md:w-[440px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 rounded-full bg-primary" />
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-primary-light" />
            </div>
          </motion.div>

          {/* Globe glow */}
          <div className="absolute bottom-[15%] left-1/2 h-[80px] w-[80px] -translate-x-1/2 rounded-full bg-primary/15 blur-[40px] md:h-[140px] md:w-[140px]" />

          {/* Astronaut image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/images/hero-graphic.png"
              alt="Eclipse astronaut holding Earth — From Shadow to Spotlight"
              width={520}
              height={520}
              priority
              className="relative z-10 h-auto w-[240px] drop-shadow-[0_0_50px_rgba(6,182,212,0.15)] sm:w-[300px] md:w-[380px] lg:w-[460px]"
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
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDownIcon size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
