"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * AstroFloat — a fixed background astronaut that provides subtle visual
 * continuity as the user scrolls through the homepage.
 *
 * - Does NOT affect layout (fixed + pointer-events: none)
 * - Sits behind all section content (z-index: 1)
 * - Hidden during the hero (hero has its own prominent astronaut)
 * - Gently fades in once the user scrolls past the hero
 * - Shifts position, scale, and rotation based on page scroll
 * - Fades out near the bottom of the page
 */
export function AstroFloat() {
  const { scrollYProgress } = useScroll();

  // Opacity: hidden during hero → appears after hero → fades out near bottom
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.2, 0.75, 0.9],
    [0, 0, 0.045, 0.035, 0]
  );

  // Subtle vertical drift as user scrolls
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -40, 20, -60]);

  // Drift horizontally between sections
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 80, -60, 40, 0]);

  // Subtle scale breathing
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0.5, 0.55, 0.48, 0.42]);

  // Gentle rotation sway
  const rotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, -4, 5, -2]);

  // Glow intensity
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.75, 0.9],
    [0, 0, 0.06, 0.04, 0]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Primary glow behind astronaut */}
      <motion.div
        className="absolute rounded-full bg-primary blur-[120px]"
        style={{
          width: 500,
          height: 500,
          opacity: glowOpacity,
          x,
          y,
          scale,
        }}
      />

      {/* The astronaut silhouette */}
      <motion.div style={{ x, y, scale, rotate }}>
        <Image
          src="/images/hero-graphic.png"
          alt=""
          width={520}
          height={520}
          className="h-auto w-[480px] drop-shadow-[0_0_100px_rgba(255,107,53,0.1)]"
        />
      </motion.div>
    </motion.div>
  );
}
