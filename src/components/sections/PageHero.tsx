"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-transparent px-5 pb-16 pt-32 md:px-8 md:pt-40">
      {/* Background — flat dark gradient + geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/50 via-transparent to-transparent" />

        {/* Subtle geometric wireframe shapes */}
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
            {/* Left angular mesh */}
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

            {/* Left diamond accents */}
            <path d="M100 60 L130 80 L100 100 L70 80 Z" opacity="0.06" />
            <path d="M30 350 L55 370 L30 390 L5 370 Z" opacity="0.05" />

            {/* Right angular mesh */}
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

            {/* Right diamond accents */}
            <path d="M1340 60 L1370 80 L1340 100 L1310 80 Z" opacity="0.06" />
            <path d="M1410 350 L1435 370 L1410 390 L1385 370 Z" opacity="0.05" />

            {/* Top edge connectors */}
            <path d="M300 0 L240 130 L400 80" opacity="0.04" />
            <path d="M400 80 L520 0 L480 100" opacity="0.04" />
            <path d="M1140 0 L1200 130 L1040 80" opacity="0.04" />
            <path d="M1040 80 L920 0 L960 100" opacity="0.04" />

            {/* Bottom edge connectors */}
            <path d="M180 600 L260 500 L360 600" opacity="0.04" />
            <path d="M1260 600 L1180 500 L1080 600" opacity="0.04" />

            {/* Sparse center hints (very faint) */}
            <path d="M480 100 L600 40 L580 160" opacity="0.025" />
            <path d="M960 100 L840 40 L860 160" opacity="0.025" />
            <path d="M580 160 L720 100 L860 160" opacity="0.02" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
        >
          {badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-[56px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base text-text-secondary md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
