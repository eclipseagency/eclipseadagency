"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import dynamic from "next/dynamic";
import {
  siteConfig,
  heroContent,
  servicesOverview,
  processSteps,
  portfolioItems,
  testimonials,
  aboutContent,
} from "@/data/site";

const EclipseScene = dynamic(() => import("@/components/v2/EclipseScene"), {
  ssr: false,
  loading: () => null,
});

/* ═══════════════════════════════════════════════════════════
   Utilities
   ═══════════════════════════════════════════════════════════ */

/* Split text into words for staggered reveals */
function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Magnetic hover effect */
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, style: { x: sx, y: sy }, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* 3D tilt card */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 200, damping: 15 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 15 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotX.set(-py * 12);
      rotY.set(px * 12);
    },
    [rotX, rotY]
  );

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Scroll-triggered reveal */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Hero
   Full-screen 3D eclipse + text reveal
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const astroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />
      <EclipseScene />

      {/* Astronaut */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <motion.div
          style={{ y: astroY, scale: astroScale }}
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "130%", height: "130%",
              background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <Image
            src="/images/hero-astronaut-new.png"
            alt="Eclipse astronaut"
            width={740} height={740} priority
            className="relative h-auto drop-shadow-[0_0_80px_rgba(255,107,53,0.25)]"
            style={{ width: "min(50vw, 400px)", objectFit: "contain" }}
          />
        </motion.div>
      </div>

      {/* Hero text */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center text-center px-5 pb-12 md:pb-16"
        style={{ opacity: fade, y: textY }}
      >
        <motion.h1
          className="font-heading text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <SplitText
            text="From Shadow"
            className="text-white justify-center"
            delay={0.9}
          />
          <br />
          <SplitText
            text="to Spotlight"
            className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent justify-center"
            delay={1.2}
          />
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-sm leading-relaxed text-white/40 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {heroContent.subheading}
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          <MagneticButton href="/contact" primary>Get Started</MagneticButton>
          <MagneticButton href="/portfolio">View Our Work</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: fade }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Vignette + bottom gradient */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.7)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

/* Magnetic button */
function MagneticButton({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const mag = useMagnetic(0.25);
  return (
    <motion.div {...mag} style={{ ...mag.style, display: "inline-flex" }}>
      <Link
        href={href}
        className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
          primary
            ? "bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
            : "border border-white/10 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/[0.04]"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — About (scroll-revealed)
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Parallax glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-8">
        <Reveal>
          <span className="inline-block rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ff6b35] mb-6">
            About Eclipse
          </span>
        </Reveal>

        <h2 className="font-heading text-3xl font-bold md:text-5xl lg:text-6xl leading-[1.1]">
          <SplitText text="We craft bold brands" className="text-white" />
          <br />
          <SplitText text="and immersive experiences" className="text-white/40" delay={0.15} />
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal delay={0.1}>
            <p className="text-[15px] leading-relaxed text-white/50">{aboutContent.story[0]}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50">{aboutContent.story[1]}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[15px] leading-relaxed text-white/50">{aboutContent.story[2]}</p>
            {/* Animated counter stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {heroContent.stats.map((stat, i) => (
                <CounterStat key={stat.label} value={stat.value} label={stat.label} delay={0.3 + i * 0.1} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CounterStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value);
  const suffix = value.replace(/\d/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const timer = setTimeout(() => {
      function tick(now: number) {
        const elapsed = now - start - delay * 1000;
        if (elapsed < 0) { requestAnimationFrame(tick); return; }
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(num * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, 0);
    return () => clearTimeout(timer);
  }, [inView, num, delay]);

  return (
    <div ref={ref}>
      <p className="font-heading text-2xl font-bold text-[#ff6b35] md:text-3xl">
        {inView ? count : 0}{suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/25">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — Services (3D tilt cards + hover glow)
   ═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ff6b35] mb-6">
              Our Solutions
            </span>
          </Reveal>
          <h2 className="font-heading text-3xl font-bold md:text-5xl lg:text-6xl leading-[1.1]">
            <SplitText text="What We Do Best" className="text-white justify-center" />
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicesOverview.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof servicesOverview)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.5);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      glowX.set((e.clientX - rect.left) / rect.width);
      glowY.set((e.clientY - rect.top) / rect.height);
    },
    [glowX, glowY]
  );

  const icons = ["M12 2L2 22h20L12 2z", "M2 12l10-10 10 10-10 10-10-10z", "M12 2v20M2 12h20", "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z", "M15 10l-4 4-2-2", "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"];

  return (
    <TiltCard>
      <Link href={`/solutions/${service.slug}`}>
        <motion.div
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] p-7 md:p-8 h-full cursor-pointer"
          style={{ background: "rgba(255,255,255,0.02)" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={onMove}
          whileHover={{ borderColor: "rgba(255,107,53,0.15)" }}
        >
          {/* Mouse-following glow */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              left: glowX.get() * 100 + "%",
              top: glowY.get() * 100 + "%",
              x: "-50%", y: "-50%",
              background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          />

          {/* Icon */}
          <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-500 group-hover:border-[#ff6b35]/20 group-hover:bg-[#ff6b35]/[0.06]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:scale-110">
              <path d={icons[index % icons.length]} />
            </svg>
          </div>

          <h3 className="relative font-heading text-lg font-bold text-white mb-2 transition-colors group-hover:text-[#ff6b35]">
            {service.title}
          </h3>
          <p className="relative text-sm leading-relaxed text-white/40 mb-5">
            {service.description}
          </p>

          {/* Feature tags */}
          <div className="relative flex flex-wrap gap-1.5">
            {service.features.slice(0, 3).map((f) => (
              <span key={f} className="rounded-full border border-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/30 uppercase tracking-wider">
                {f}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <motion.div
            className="absolute top-7 right-7 text-white/10 transition-colors group-hover:text-[#ff6b35]/60"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </Link>
    </TiltCard>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — Portfolio (horizontal scroll showcase)
   ═══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(portfolioItems.length - 1) * 85}%`]);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 mb-16 text-center">
        <Reveal>
          <span className="inline-block rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ff6b35] mb-6">
            Our Work
          </span>
        </Reveal>
        <h2 className="font-heading text-3xl font-bold md:text-5xl lg:text-6xl leading-[1.1]">
          <SplitText text="Featured Projects" className="text-white justify-center" />
        </h2>
      </div>

      {/* Horizontal scroll wrapper */}
      <div ref={containerRef} style={{ height: `${portfolioItems.length * 80}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex gap-6 pl-8 md:pl-16"
            style={{ x }}
          >
            {portfolioItems.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 group"
      style={{ width: "min(80vw, 700px)" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={item.href || "#"} target={item.target}>
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[0.06] cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={1200}
              height={750}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
              }}
            />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
            <motion.span
              className="mb-auto self-start rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50"
              animate={{ opacity: hovered ? 1 : 0.6 }}
            >
              {item.category}
            </motion.span>

            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl group-hover:text-[#ff6b35] transition-colors duration-300">
              {item.title}
            </h3>
            <motion.p
              className="mt-2 max-w-md text-sm text-white/40 leading-relaxed"
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="mt-3 flex flex-wrap gap-2"
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hover border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: hovered
                ? "inset 0 0 0 1px rgba(255,107,53,0.2), 0 0 40px rgba(255,107,53,0.06)"
                : "inset 0 0 0 1px transparent",
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — Process (scroll-driven timeline)
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section ref={containerRef} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[900px] px-5 md:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <span className="inline-block rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ff6b35] mb-6">
              Our Process
            </span>
          </Reveal>
          <h2 className="font-heading text-3xl font-bold md:text-5xl leading-[1.1]">
            <SplitText text="How We Bring Ideas to Life" className="text-white justify-center" />
          </h2>
        </div>

        <div className="relative">
          {/* Animated progress line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.04] md:left-1/2 md:-translate-x-px" />
          <motion.div
            className="absolute left-5 top-0 w-px origin-top md:left-1/2 md:-translate-x-px"
            style={{
              scaleY: scrollYProgress,
              height: "100%",
              background: "linear-gradient(to bottom, #ff6b35, rgba(255,107,53,0.15))",
            }}
          />

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  progress,
}: {
  step: (typeof processSteps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const isEven = index % 2 === 0;
  const stepProgress = useTransform(progress, [index / 5, (index + 1) / 5], [0, 1]);
  const opacity = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.15, 1, 1, 0.4]);
  const scale = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.97]);

  return (
    <motion.div
      className={`relative flex flex-col gap-4 pl-12 md:pl-0 md:flex-row md:items-center md:gap-16 ${!isEven ? "md:flex-row-reverse" : ""}`}
      style={{ opacity, scale }}
    >
      {/* Dot on timeline */}
      <motion.div
        className="absolute left-[14px] top-1 h-3 w-3 rounded-full border-2 border-[#ff6b35] bg-[#0a0a0a] md:left-1/2 md:-translate-x-1/2"
        style={{
          boxShadow: useTransform(stepProgress, [0, 0.3], ["0 0 0 rgba(255,107,53,0)", "0 0 12px rgba(255,107,53,0.5)"]),
        }}
      />

      {/* Content */}
      <div className={`flex-1 ${!isEven ? "md:text-right" : ""}`}>
        <span className="text-xs font-bold text-[#ff6b35]/40 uppercase tracking-[0.2em]">Step {step.number}</span>
        <h3 className="font-heading text-xl font-bold text-white mt-1 md:text-2xl">{step.title}</h3>
        <p className={`text-sm leading-relaxed text-white/40 mt-2 max-w-sm ${!isEven ? "md:ml-auto" : ""}`}>{step.description}</p>
      </div>
      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — Testimonials (carousel + reveal)
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[900px] px-5 md:px-8 text-center">
        <Reveal>
          <span className="inline-block rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ff6b35] mb-6">
            Testimonials
          </span>
        </Reveal>
        <h2 className="font-heading text-3xl font-bold md:text-5xl leading-[1.1] mb-16">
          <SplitText text="What Our Clients Say" className="text-white justify-center" />
        </h2>

        {/* Quote display */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-lg leading-relaxed text-white/60 md:text-xl italic">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-heading font-bold text-white">{testimonials[active].name}</p>
                <p className="text-sm text-white/30">{testimonials[active].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative h-2 rounded-full transition-all duration-500"
              style={{
                width: i === active ? 32 : 8,
                background: i === active ? "#ff6b35" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — CTA (interactive gradient + magnetic button)
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[900px] px-5 md:px-8">
        <Reveal>
          <div
            ref={ref}
            onMouseMove={onMove}
            className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-12 md:p-20 text-center"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {/* Interactive gradient that follows cursor */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,107,53,0.08) 0%, transparent 50%)`,
              }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold md:text-5xl leading-[1.1]">
                <SplitText text="Ready to Eclipse" className="text-white justify-center" />
                <br />
                <SplitText text="Your Competition?" className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent justify-center" delay={0.1} />
              </h2>
              <p className="mt-5 text-sm text-white/40 max-w-md mx-auto md:text-base">
                Let&apos;s create something extraordinary together. Get in touch and let&apos;s bring your vision to life.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <MagneticButton href="/contact" primary>Start a Project</MagneticButton>
                <MagneticButton href="/about">Learn More</MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════════════ */
export default function V2Page() {
  return (
    <main className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
