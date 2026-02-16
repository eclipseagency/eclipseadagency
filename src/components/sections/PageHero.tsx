"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageHero({ badge, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pt-40">
      {/* ── Layer 0: Background image ── */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Layer 1: Dark overlays for depth & contrast ── */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />

      {/* ── Layer 2: Ambient glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[10%] -top-[20%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px] md:h-[700px] md:w-[700px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.09, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[15%] -right-[8%] h-[400px] w-[400px] rounded-full bg-secondary/[0.04] blur-[100px] md:h-[600px] md:w-[600px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* ── Grid pattern ── */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* ── Film grain / noise texture ── */}
      <div className="page-hero-noise absolute inset-0" />

      {/* ── Bottom vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-[1400px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
        >
          {badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[56px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base text-text-secondary md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
