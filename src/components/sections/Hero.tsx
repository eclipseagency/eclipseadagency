"use client";

import Image from "next/image";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

/* ═══════════════════════════════════════════════════════
   Star field — randomly placed twinkle particles
   ═══════════════════════════════════════════════════════ */
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.8 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white hero-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Light rays — emanating upward from below the astronaut
   ═══════════════════════════════════════════════════════ */
function LightRays() {
  const rays = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = -55 + (i * 110) / 11;
        return {
          id: i,
          angle,
          width: 1 + Math.random() * 2.5,
          opacity: 0.04 + Math.random() * 0.08,
          delay: Math.random() * 4,
          duration: 4 + Math.random() * 3,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2">
        {rays.map((r) => (
          <div
            key={r.id}
            className="absolute origin-bottom hero-ray"
            style={{
              width: `${r.width}px`,
              height: "60vh",
              bottom: 0,
              left: 0,
              background: `linear-gradient(to top, rgba(255,107,53,${r.opacity * 2.5}), rgba(247,147,30,${r.opacity}), transparent 70%)`,
              transform: `rotate(${r.angle}deg)`,
              animationDelay: `${r.delay}s`,
              animationDuration: `${r.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   useMouseParallax — smooth mouse-tracking offset
   ═══════════════════════════════════════════════════════ */
function useMouseParallax(strength: number = 25) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * 0.06;
    current.current.y += (target.current.y - current.current.y) * 0.06;
    setOffset({ x: current.current.x, y: current.current.y });
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      target.current = { x: cx * strength, y: cy * strength };
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [strength, animate]);

  return offset;
}

/* ═══════════════════════════════════════════════════════
   Main hero — cinematic astronaut space composition
   ═══════════════════════════════════════════════════════ */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(30);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textTopY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // textBotY kept for potential future parallax layers
  const eclipseArcY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const raysOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
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
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Deep space radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,107,53,0.06) 0%, rgba(247,147,30,0.02) 30%, transparent 70%)",
        }}
      />

      {/* Star field */}
      <StarField />

      {/* Film grain */}
      <div className="page-hero-noise absolute inset-0" />

      {/* ── Eclipse arc at top ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ y: eclipseArcY, top: "-42vw" }}
      >
        <div
          className="hero-eclipse-arc"
          style={{
            width: "90vw",
            height: "90vw",
            maxWidth: "900px",
            maxHeight: "900px",
            borderRadius: "50%",
            border: "1.5px solid transparent",
            borderBottomColor: "rgba(255,107,53,0.35)",
            boxShadow:
              "0 20px 60px rgba(255,107,53,0.15), 0 8px 30px rgba(247,147,30,0.1), inset 0 -20px 60px rgba(255,107,53,0.05)",
          }}
        />
        {/* Glow behind the arc */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            width: "60%",
            height: "30%",
            background:
              "radial-gradient(ellipse at center, rgba(255,107,53,0.2) 0%, rgba(247,147,30,0.08) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>

      {/* ── Light rays from below astronaut ── */}
      <motion.div style={{ opacity: raysOpacity }}>
        <LightRays />
      </motion.div>

      {/* ── Center composition ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* ─── Background text: ECLIPSE AGENCY ─── */}
        <motion.div
          className="absolute w-full text-center pointer-events-none select-none z-[1] flex flex-col items-center"
          style={{ y: textTopY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="font-heading font-black uppercase"
            style={{
              fontSize: "clamp(36px, 7vw, 100px)",
              lineHeight: 1.1,
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, rgba(255,107,53,0.25) 0%, rgba(247,147,30,0.15) 50%, rgba(255,255,255,0.08) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitTextStroke: "1px rgba(255,107,53,0.15)",
              filter: "drop-shadow(0 0 40px rgba(255,107,53,0.06))",
            }}
          >
            ECLIPSE
            <span
              style={{
                display: "block",
                fontSize: "0.55em",
                letterSpacing: "0.35em",
                marginTop: "0.15em",
                background: "linear-gradient(135deg, rgba(255,107,53,0.18) 0%, rgba(255,255,255,0.1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitTextStroke: "0.5px rgba(255,255,255,0.08)",
              }}
            >
              AGENCY
            </span>
          </h1>
        </motion.div>

        {/* ─── Overlay text (in front of astronaut edges) ─── */}
        <motion.div
          className="absolute w-full text-center pointer-events-none select-none z-[3] flex flex-col items-center"
          style={{ y: textTopY, mixBlendMode: "screen" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        >
          <span
            className="font-heading font-black uppercase"
            style={{
              fontSize: "clamp(36px, 7vw, 100px)",
              lineHeight: 1.1,
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, rgba(255,107,53,0.18) 0%, rgba(247,147,30,0.1) 50%, rgba(255,255,255,0.06) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            ECLIPSE
            <span
              style={{
                display: "block",
                fontSize: "0.55em",
                letterSpacing: "0.35em",
                marginTop: "0.15em",
                background: "linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(255,255,255,0.06) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AGENCY
            </span>
          </span>
        </motion.div>

        {/* ─── Orbital ring ─── */}
        <motion.div
          className="absolute z-[2] pointer-events-none"
          style={{ y: astroY, scale: astroScale }}
        >
          <div
            className="animate-spin-slow rounded-full"
            style={{
              width: "min(72vw, 520px)",
              height: "min(72vw, 520px)",
              border: "1px solid rgba(255,107,53,0.1)",
              boxShadow:
                "0 0 30px rgba(255,107,53,0.03), inset 0 0 30px rgba(255,107,53,0.02)",
            }}
          >
            {/* Orbiting dots */}
            <div
              className="absolute rounded-full bg-primary"
              style={{
                width: 6,
                height: 6,
                top: -3,
                left: "50%",
                marginLeft: -3,
                boxShadow: "0 0 12px rgba(255,107,53,0.6)",
              }}
            />
            <div
              className="absolute rounded-full bg-primary-light"
              style={{
                width: 4,
                height: 4,
                bottom: -2,
                left: "50%",
                marginLeft: -2,
                boxShadow: "0 0 10px rgba(247,147,30,0.5)",
              }}
            />
          </div>
        </motion.div>

        {/* ─── Astronaut image — floating in space + mouse tracking ─── */}
        <motion.div
          className="relative z-[2] hero-space-float"
          style={{
            y: astroY,
            scale: astroScale,
            x: mouse.x,
            rotateY: mouse.x * 0.3,
            rotateX: -mouse.y * 0.3,
          }}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
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
              width: "min(65vw, 480px)",
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

        <motion.div variants={fadeUp} className="mt-6 flex gap-4">
          <Button href="/about" variant="primary" size="lg">
            Get to Know Us
          </Button>
          <Button href="/portfolio" variant="outline" size="lg">
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
