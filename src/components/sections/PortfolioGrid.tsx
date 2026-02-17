"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { portfolioItems } from "@/data/site";
import { Button } from "@/components/ui/Button";

type Item = (typeof portfolioItems)[number];

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

/* ═══════════════════════════════════════════════════════
   Atmospheric particles drifting through the tunnel
   ═══════════════════════════════════════════════════════ */
function TunnelParticles({ progress }: { progress: number }) {
  const specs = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        z: Math.random(),
        size: 1 + Math.random() * 2.5,
        speed: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {specs.map((p) => {
        const z = ((p.z + progress * p.speed) % 1);
        const depth = 1 - z;
        const scale = 0.2 + depth * 1.2;
        const opacity = depth > 0.8 ? (1 - depth) * 5 : depth > 0.15 ? 0.15 : depth;

        return (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#c28a14]"
            style={{
              width: p.size * scale,
              height: p.size * scale,
              left: `${p.x + (p.x - 50) * depth * 0.6}%`,
              top: `${p.y + (p.y - 50) * depth * 0.6}%`,
              opacity,
              transition: "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Single tunnel card
   ═══════════════════════════════════════════════════════ */
function TunnelCard({
  item,
  depth,
  isFocused,
}: {
  item: Item;
  depth: number; // -1 (behind) → 0 (focused) → 1 (passed viewer)
  isFocused: boolean;
}) {
  const [hover, setHover] = useState(false);

  const absDepth = Math.abs(depth);
  const behind = depth > 0;

  // Z position — cards in front are closer, behind are further
  const z = -absDepth * 1200;
  // Scale — focused is largest
  const scale = Math.max(0.3, 1 - absDepth * 0.7);
  // Opacity — focused is full, others fade
  const opacity = behind
    ? Math.max(0, 1 - absDepth * 3)
    : Math.max(0.08, 1 - absDepth * 1.2);
  // Blur — distance creates depth-of-field
  const blur = isFocused ? 0 : Math.min(absDepth * 10, 8);
  // Vertical offset — cards drift up/down as they approach
  const yOff = depth * -40;

  // Don't render cards too far away
  if (opacity < 0.05) return null;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      animate={{
        x: "-50%",
        y: `calc(-50% + ${yOff}px)`,
        scale: hover && isFocused ? scale * 1.04 : scale,
        opacity,
        rotateY: depth * 3,
      }}
      transition={{ type: "tween", duration: 0.15, ease: "linear" }}
      style={{
        translateZ: z,
        width: "min(85vw, 720px)",
        filter: `blur(${blur}px)`,
        zIndex: Math.round((1 - absDepth) * 100),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: isFocused
            ? "1px solid rgba(194,138,20,0.2)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: isFocused
            ? "0 0 60px rgba(194,138,20,0.08), 0 20px 60px rgba(0,0,0,0.5)"
            : `0 4px ${20 + absDepth * 20}px rgba(0,0,0,0.3)`,
          transition: "border-color 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Top-edge glass reflection */}
        {isFocused && (
          <div
            className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.1) 60%, transparent 90%)",
            }}
          />
        )}

        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={675}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hover && isFocused ? "scale(1.06)" : "scale(1)",
            }}
          />

          {/* Gradient overlay — deeper when not focused */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isFocused
                ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)"
                : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          {/* Soft glow on edges when focused */}
          {isFocused && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                boxShadow: "inset 0 0 60px rgba(194,138,20,0.05)",
              }}
            />
          )}

          {/* Content — only visible when approaching focus */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 md:p-9">
            {/* Category badge */}
            <motion.span
              className="mb-auto self-start rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm"
              animate={{ opacity: absDepth < 0.35 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.category}
            </motion.span>

            {/* Title */}
            <motion.h3
              className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
              animate={{
                opacity: absDepth < 0.5 ? 1 : 0,
                y: absDepth < 0.5 ? 0 : 15,
              }}
              transition={{ duration: 0.35 }}
            >
              {item.title}
            </motion.h3>

            {/* Description — only when focused */}
            <motion.p
              className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 md:text-base"
              animate={{
                opacity: isFocused ? 1 : 0,
                y: isFocused ? 0 : 10,
              }}
              transition={{ duration: 0.35, delay: isFocused ? 0.05 : 0 }}
            >
              {item.description}
            </motion.p>

            {/* Tags — only when focused + hovering */}
            <motion.div
              className="mt-3 flex flex-wrap gap-2"
              animate={{
                opacity: hover && isFocused ? 1 : 0,
                y: hover && isFocused ? 0 : 6,
              }}
              transition={{ duration: 0.3, delay: 0.04 }}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider text-white/35"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Progress indicator
   ═══════════════════════════════════════════════════════ */
function TunnelProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="absolute right-6 top-1/2 z-30 -translate-y-1/2 flex flex-col items-center gap-2 md:right-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative">
          <div
            className="h-6 w-[2px] rounded-full transition-all duration-500"
            style={{
              background:
                i === current
                  ? "#c28a14"
                  : i < current
                    ? "rgba(194,138,20,0.3)"
                    : "rgba(255,255,255,0.08)",
              boxShadow:
                i === current ? "0 0 8px rgba(194,138,20,0.5)" : "none",
              transform: i === current ? "scaleY(1.4)" : "scaleY(1)",
            }}
          />
        </div>
      ))}
      <span className="mt-2 font-heading text-[10px] tracking-[0.2em] text-white/25">
        {String(current + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main — 3D tunnel driven by scroll
   ═══════════════════════════════════════════════════════ */
export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;
  const total = items.length;
  const containerRef = useRef<HTMLElement>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Header fade
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.06], [0, -40]);

  // Track progress for particles and focus index
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSmoothProgress(v);
    const idx = Math.min(Math.round(v * (total - 1)), total - 1);
    setFocusIdx(idx);
  });

  // Compute depth for each card relative to current scroll position
  const cardDepths = useMemo(() => {
    return items.map((_, i) => {
      const cardPosition = i / (total - 1 || 1);
      return cardPosition - smoothProgress;
    });
  }, [items, total, smoothProgress]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Tunnel perspective container */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Tunnel ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 40% 35% at 50% 50%, rgba(194,138,20,0.04) 0%, transparent 70%),
                radial-gradient(ellipse 80% 50% at 50% 100%, rgba(194,138,20,0.03) 0%, transparent 60%)
              `,
            }}
          />

          {/* Tunnel convergence lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              background: `
                linear-gradient(to bottom right, transparent 49.5%, rgba(194,138,20,0.5) 49.5%, rgba(194,138,20,0.5) 50.5%, transparent 50.5%),
                linear-gradient(to bottom left, transparent 49.5%, rgba(194,138,20,0.5) 49.5%, rgba(194,138,20,0.5) 50.5%, transparent 50.5%)
              `,
            }}
          />

          {/* Particles */}
          <TunnelParticles progress={smoothProgress * 3} />

          {/* Noise */}
          <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.025 }} />

          {/* Cards — render furthest first for proper layering */}
          <div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items
              .map((item, i) => ({ item, i, absDepth: Math.abs(cardDepths[i]) }))
              .sort((a, b) => b.absDepth - a.absDepth)
              .map(({ item, i }) => (
                <TunnelCard
                  key={item.id}
                  item={item}
                  depth={cardDepths[i]}
                  isFocused={i === focusIdx}
                />
              ))}
          </div>
        </div>

        {/* Section header — fades out */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-5 pointer-events-none"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="mb-4 inline-block rounded-full border border-[#c28a14]/25 bg-[#c28a14]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#c28a14]">
            Our Work
          </span>
          <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[48px]">
            Journey Through{" "}
            <span className="bg-gradient-to-r from-[#c28a14] to-[#e8b94a] bg-clip-text text-transparent">
              Our Projects
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/30 md:text-lg">
            Scroll to travel through our work
          </p>
          <motion.div
            className="mt-8 text-white/20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            boxShadow: "inset 0 0 150px 40px rgba(0,0,0,0.6)",
          }}
        />

        {/* Progress */}
        <TunnelProgress current={focusIdx} total={total} />

        {/* Top / bottom lines */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent z-20" />
      </div>

      {/* CTA after tunnel */}
      {showCta && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-[12vh]">
          <Button href="/portfolio" variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      )}
    </section>
  );
}
