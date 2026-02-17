"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
];

export function AboutUsHome() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Astronaut enters from above, rotating and drifting down as user scrolls
  const astroY = useTransform(scrollYProgress, [0, 0.5, 1], [-120, 0, 80]);
  const astroRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 10]);
  const astroScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.85, 1, 0.95]);
  const astroRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -15]);

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  return (
    <SectionWrapper id="about">
      <div ref={sectionRef} className="grid items-center gap-12 md:gap-16 lg:grid-cols-2">
        {/* ── Astronaut visual — 3D scroll entrance ── */}
        <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>
          {/* Ambient glow behind astronaut */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "80%",
              height: "80%",
              background:
                "radial-gradient(circle, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.04) 40%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />

          {/* Decorative orbital ring */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full pointer-events-none"
            style={{
              width: "85%",
              height: "85%",
              border: "1px solid rgba(255,107,53,0.08)",
            }}
          />

          <motion.div
            style={{
              y: astroY,
              rotate: astroRotate,
              scale: astroScale,
              rotateY: astroRotateY,
            }}
            className="relative z-10"
          >
            <Image
              src="/images/hero-astronaut-new.png"
              alt="Eclipse astronaut — About Eclipse Agency"
              width={560}
              height={560}
              className="relative h-auto drop-shadow-[0_0_60px_rgba(255,107,53,0.15)]"
              style={{
                width: "min(55vw, 420px)",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </div>

        {/* ── Text content ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={fadeIn}
            className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            About Us
          </motion.span>

          <motion.h2
            variants={fadeIn}
            className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]"
          >
            From Shadow{" "}
            <span className="gradient-text">to Spotlight</span>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            Eclipse is a trusted Marketing Agency, helping businesses across Saudi Arabia
            grow with SEO, advertising, branding, and creative campaigns.
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted"
          >
            We blend data-driven strategy with bold creative thinking to craft campaigns
            that don&apos;t just look good — they deliver real, measurable results. From
            building powerful brand identities to running high-converting ad campaigns,
            we&apos;re your full-spectrum growth partner.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            className="mt-8 flex flex-wrap gap-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8">
            <Button href="/about" variant="outline" size="lg">
              Learn More About Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
