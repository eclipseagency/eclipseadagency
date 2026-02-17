"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/data/site";
import { Button } from "@/components/ui/Button";

type Item = (typeof portfolioItems)[number];

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

/* ═══════════════════════════════════════════════════════
   Floating particles
   ═══════════════════════════════════════════════════════ */
function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        dur: 15 + Math.random() * 25,
        delay: Math.random() * -20,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-[#c28a14]"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            opacity: 0.08,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.04, 0.12, 0.04],
          }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Hidden project card — revealed by spotlight proximity
   ═══════════════════════════════════════════════════════ */
function HiddenCard({
  item,
  index,
  proximity,
  onExpand,
}: {
  item: Item;
  index: number;
  proximity: number; // 0 = far away, 1 = directly under spotlight
  onExpand: (item: Item) => void;
}) {
  const [hover, setHover] = useState(false);

  // Visibility increases with proximity
  const vis = Math.max(0, proximity);
  const opacity = 0.03 + vis * 0.97;
  const blur = (1 - vis) * 8;
  const scale = 0.94 + vis * 0.06;
  const borderGlow = vis > 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => vis > 0.4 && onExpand(item)}
        animate={{
          scale: hover && vis > 0.5 ? 1.03 : scale,
          y: hover && vis > 0.5 ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          opacity,
          filter: `blur(${blur}px)`,
          background: "rgba(255,255,255,0.02)",
          border: borderGlow
            ? "1px solid rgba(194,138,20,0.18)"
            : "1px solid rgba(255,255,255,0.03)",
          boxShadow:
            hover && vis > 0.5
              ? "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(194,138,20,0.08)"
              : vis > 0.6
                ? "0 4px 20px rgba(0,0,0,0.3), 0 0 20px rgba(194,138,20,0.04)"
                : "0 2px 8px rgba(0,0,0,0.15)",
          transition: "filter 0.4s, opacity 0.4s, border-color 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Top-edge reflection — only when revealed */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: vis > 0.5 ? 1 : 0,
            background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 60%, transparent 90%)",
          }}
        />

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={800}
            height={600}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hover && vis > 0.5 ? "scale(1.08)" : "scale(1)",
            }}
          />

          {/* Dark veil — lifts as spotlight reveals */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)",
              opacity: 1 - vis * 0.5,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
            <span
              className="mb-auto self-start rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm transition-opacity duration-400"
              style={{ opacity: vis > 0.4 ? 1 : 0 }}
            >
              {item.category}
            </span>

            <h3
              className="font-heading text-lg font-bold leading-tight text-white md:text-xl transition-opacity duration-400"
              style={{ opacity: vis > 0.3 ? 1 : 0 }}
            >
              {item.title}
            </h3>

            <p
              className="mt-2 text-[13px] leading-relaxed text-white/45 transition-all duration-400"
              style={{
                opacity: hover && vis > 0.6 ? 1 : 0,
                transform: hover && vis > 0.6 ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {item.description}
            </p>

            <div
              className="mt-2 flex flex-wrap gap-1.5 transition-all duration-400"
              style={{
                opacity: hover && vis > 0.6 ? 1 : 0,
                transform: hover && vis > 0.6 ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Expanded project detail overlay
   ═══════════════════════════════════════════════════════ */
function ExpandedProject({
  item,
  onClose,
}: {
  item: Item;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,15,15,0.95)",
          border: "1px solid rgba(194,138,20,0.15)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(194,138,20,0.06)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/50 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={675}
            unoptimized
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,15,0.95)] via-transparent to-transparent" />
        </div>

        {/* Details */}
        <div className="relative -mt-16 px-8 pb-8 md:px-10 md:pb-10">
          <motion.span
            className="mb-3 inline-block rounded-full border border-[#c28a14]/25 bg-[#c28a14]/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#c28a14]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {item.category}
          </motion.span>

          <motion.h3
            className="font-heading text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            className="mt-3 max-w-lg text-sm leading-relaxed text-white/45 md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {item.description}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
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
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main section — hidden gallery with spotlight reveal
   ═══════════════════════════════════════════════════════ */
export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [expanded, setExpanded] = useState<Item | null>(null);
  const [cardCenters, setCardCenters] = useState<{ x: number; y: number }[]>([]);
  const [isInSection, setIsInSection] = useState(false);

  /* Track mouse position relative to section */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  /* Cache card center positions */
  useEffect(() => {
    function measure() {
      if (!gridRef.current || !sectionRef.current) return;
      const sRect = sectionRef.current.getBoundingClientRect();
      const cards = gridRef.current.querySelectorAll("[data-card]");
      const centers: { x: number; y: number }[] = [];
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        centers.push({
          x: r.left + r.width / 2 - sRect.left,
          y: r.top + r.height / 2 - sRect.top,
        });
      });
      setCardCenters(centers);
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [items.length]);

  /* Compute proximity for each card (0 = hidden, 1 = fully revealed) */
  const REVEAL_RADIUS = 350;
  const proximities = cardCenters.map((center) => {
    if (!isInSection) return 0;
    const dx = mouse.x - center.x;
    const dy = mouse.y - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - dist / REVEAL_RADIUS);
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 px-5 md:py-32 md:px-8 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInSection(true)}
        onMouseLeave={() => {
          setIsInSection(false);
          setMouse({ x: -9999, y: -9999 });
        }}
      >
        {/* Noise */}
        <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.025 }} />

        {/* Floating particles */}
        <Particles />

        {/* Cursor spotlight — follows mouse */}
        <div
          className="absolute pointer-events-none z-[1] transition-opacity duration-300"
          style={{
            left: mouse.x - 300,
            top: mouse.y - 300,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194,138,20,0.07) 0%, rgba(194,138,20,0.02) 40%, transparent 70%)",
            opacity: isInSection ? 1 : 0,
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          {/* Header */}
          <motion.div
            className="mb-16 text-center md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#c28a14]/25 bg-[#c28a14]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#c28a14]">
              Our Work
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[48px]">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-[#c28a14] to-[#e8b94a] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/30 md:text-lg">
              Move your cursor to reveal our work. Each project waits to be discovered.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7"
          >
            {items.map((item, i) => (
              <div key={item.id} data-card>
                <HiddenCard
                  item={item}
                  index={i}
                  proximity={proximities[i] ?? 0}
                  onExpand={setExpanded}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          {showCta && (
            <motion.div
              className="mt-16 text-center md:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button href="/portfolio" variant="outline" size="lg">
                View All Projects
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <ExpandedProject
            item={expanded}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
