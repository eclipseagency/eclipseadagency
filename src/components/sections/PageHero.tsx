"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  image?: string;
  illustration?: string;
}

export function PageHero({ badge, title, subtitle, image, illustration }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pt-40">
      {/* ── Layer 0a: Background photo (full-bleed) ── */}
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

      {/* ── Layer 0b: SVG Illustration (contained, dark bg fills gaps) ── */}
      {illustration && !image && (
        <div className="absolute inset-0 bg-[#0d0d0d]">
          <Image
            src={illustration}
            alt=""
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Layer 1: Dark overlays for depth & contrast ── */}
      <div className={`absolute inset-0 ${illustration && !image ? "bg-black/10" : "bg-black/60"}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />

      {/* ── Layer 2: Ambient glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[10%] -top-[20%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px] md:h-[700px] md:w-[700px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.09, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[15%] -right-[8%] h-[400px] w-[400px] rounded-full bg-primary-light/[0.04] blur-[100px] md:h-[600px] md:w-[600px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* ── Layer 3: Fine grid pattern ── */}
      <div className="absolute inset-0 opacity-[0.025]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="hero-grid-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="hero-grid-mask">
              <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
        </svg>
      </div>

      {/* ── Layer 4: Geometric wireframe shapes ── */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hero-geo-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
            <mask id="hero-geo-mask">
              <rect width="1440" height="600" fill="url(#hero-geo-fade)" />
            </mask>
          </defs>

          <g mask="url(#hero-geo-mask)" stroke="#ff6b35" fill="none" strokeWidth="0.6">
            <path d="M0 0 L80 120 L0 220" opacity="0.10" />
            <path d="M0 0 L160 50 L80 120" opacity="0.08" />
            <path d="M80 120 L200 100 L160 200" opacity="0.07" />
            <path d="M0 220 L80 120 L160 200" opacity="0.08" />
            <path d="M160 200 L60 320 L0 220" opacity="0.09" />
            <path d="M160 200 L240 130 L300 220" opacity="0.06" />
            <path d="M60 320 L160 200 L200 340" opacity="0.07" />
            <path d="M0 400 L60 320 L0 220" opacity="0.08" />
            <path d="M60 320 L200 340 L140 430" opacity="0.06" />
            <path d="M0 400 L60 320 L140 430" opacity="0.07" />
            <path d="M0 520 L140 430 L80 560" opacity="0.08" />
            <path d="M140 430 L300 220 L320 380" opacity="0.05" />
            <path d="M140 430 L320 380 L260 500" opacity="0.06" />
            <path d="M0 520 L80 560 L0 600" opacity="0.07" />
            <path d="M80 560 L260 500 L180 600" opacity="0.06" />

            <path d="M100 60 L130 80 L100 100 L70 80 Z" opacity="0.06" />
            <path d="M30 350 L55 370 L30 390 L5 370 Z" opacity="0.05" />

            <path d="M1440 0 L1360 120 L1440 220" opacity="0.10" />
            <path d="M1440 0 L1280 50 L1360 120" opacity="0.08" />
            <path d="M1360 120 L1240 100 L1280 200" opacity="0.07" />
            <path d="M1440 220 L1360 120 L1280 200" opacity="0.08" />
            <path d="M1280 200 L1380 320 L1440 220" opacity="0.09" />
            <path d="M1280 200 L1200 130 L1140 220" opacity="0.06" />
            <path d="M1380 320 L1280 200 L1240 340" opacity="0.07" />
            <path d="M1440 400 L1380 320 L1440 220" opacity="0.08" />
            <path d="M1380 320 L1240 340 L1300 430" opacity="0.06" />
            <path d="M1440 400 L1380 320 L1300 430" opacity="0.07" />
            <path d="M1440 520 L1300 430 L1360 560" opacity="0.08" />
            <path d="M1300 430 L1140 220 L1120 380" opacity="0.05" />
            <path d="M1300 430 L1120 380 L1180 500" opacity="0.06" />
            <path d="M1440 520 L1360 560 L1440 600" opacity="0.07" />
            <path d="M1360 560 L1180 500 L1260 600" opacity="0.06" />

            <path d="M1340 60 L1370 80 L1340 100 L1310 80 Z" opacity="0.06" />
            <path d="M1410 350 L1435 370 L1410 390 L1385 370 Z" opacity="0.05" />

            <path d="M300 0 L240 130 L400 80" opacity="0.04" />
            <path d="M400 80 L520 0 L480 100" opacity="0.04" />
            <path d="M1140 0 L1200 130 L1040 80" opacity="0.04" />
            <path d="M1040 80 L920 0 L960 100" opacity="0.04" />

            <path d="M180 600 L260 500 L360 600" opacity="0.04" />
            <path d="M1260 600 L1180 500 L1080 600" opacity="0.04" />

            <path d="M480 100 L600 40 L580 160" opacity="0.025" />
            <path d="M960 100 L840 40 L860 160" opacity="0.025" />
            <path d="M580 160 L720 100 L860 160" opacity="0.02" />
          </g>
        </svg>
      </div>

      {/* ── Layer 5: Horizontal accent lines ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 top-[25%] h-px bg-gradient-to-r from-transparent via-primary/[0.08] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.12] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* ── Layer 6: Film grain / noise texture ── */}
      <div className="page-hero-noise absolute inset-0" />

      {/* ── Layer 7: Bottom vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-[1400px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
        >
          {badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-[56px]"
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
