"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-5 pt-24 md:px-8">
      {/* Background — flat dark gradient, no glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text column */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            {heroContent.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
          >
            {heroContent.heading[0]}{" "}
            <span className="gradient-text">{heroContent.heading[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg"
          >
            {heroContent.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Eclipse ring */}
          <div className="absolute h-[420px] w-[420px] rounded-full border border-primary/20 animate-spin-slow md:h-[500px] md:w-[500px]">
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-primary" />
            <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 rounded-full bg-primary-light" />
          </div>

          {/* Hero graphic */}
          <div className="animate-float">
            <Image
              src="/images/hero-graphic.png"
              alt="Eclipse Ad Agency graphic"
              width={400}
              height={400}
              priority
              className="relative z-10"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDownIcon size={18} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
