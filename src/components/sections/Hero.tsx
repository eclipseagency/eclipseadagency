"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bottomFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* ── 3D Interactive Canvas ── */}
      <HeroCanvas />

      {/* ── Astronaut floating in front of 3D scene ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <motion.div
          className="relative"
          style={{ y: astroY, scale: astroScale }}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Glow behind astronaut */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "120%",
              height: "120%",
              background:
                "radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(247,147,30,0.05) 40%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />

          <Image
            src="/images/hero-astronaut-new.png"
            alt="Eclipse astronaut floating in space — From Shadow to Spotlight"
            width={740}
            height={740}
            priority
            className="relative h-auto drop-shadow-[0_0_80px_rgba(255,107,53,0.2)]"
            style={{
              width: "min(55vw, 420px)",
              objectFit: "contain",
            }}
          />
        </motion.div>
      </div>

      {/* ── Bottom content — tagline + CTA ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center text-center px-5 pb-10 md:pb-14"
        style={{ opacity: bottomFade }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-xs font-semibold uppercase tracking-[0.25em] leading-relaxed text-white/40 md:text-sm md:tracking-[0.3em]"
        >
          Marketing Built on Strategy, Driven by Creativity.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <Button href="/about" variant="primary" size="lg">
            Get to Know Us
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            View Our Work
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {[
            { value: "200+", label: "Projects" },
            { value: "50+", label: "Clients" },
            { value: "8+", label: "Years" },
            { value: "15+", label: "Experts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-lg font-bold text-primary md:text-xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/25">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
        style={{ opacity: scrollIndOp }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon size={14} className="text-white/20" />
        </motion.div>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.7)",
        }}
      />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
