"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { portfolioItems } from "@/data/site";
import { Button } from "@/components/ui/Button";

/* ════════════════════════════════════════════════════════════
   Types
   ════════════════════════════════════════════════════════════ */
type Item = (typeof portfolioItems)[number];

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

/* ════════════════════════════════════════════════════════════
   Letter-by-letter title reveal
   ════════════════════════════════════════════════════════════ */
function AnimatedTitle({ text, active }: { text: string; active: boolean }) {
  return (
    <span className="inline-flex flex-wrap" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          initial={false}
          animate={{
            opacity: active ? 1 : 0.15,
            y: active ? 0 : 12,
            filter: active ? "blur(0px)" : "blur(4px)",
          }}
          transition={{
            duration: 0.4,
            delay: active ? i * 0.025 : 0,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   Magnetic hover wrapper
   ════════════════════════════════════════════════════════════ */
function MagneticWrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.15,
      y: (e.clientY - cy) * 0.15,
    });
  }, []);

  const handleLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   Single immersive panel
   ════════════════════════════════════════════════════════════ */
function Panel({
  item,
  index,
  total,
  scrollX,
  panelWidth,
}: {
  item: Item;
  index: number;
  total: number;
  scrollX: MotionValue<string>;
  panelWidth: number;
}) {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Track which panel is closest to center viewport */
  useEffect(() => {
    function check() {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const viewCenter = window.innerWidth / 2;
      setIsActive(Math.abs(center - viewCenter) < rect.width * 0.45);
    }
    const id = setInterval(check, 80);
    check();
    return () => clearInterval(id);
  }, []);

  /* Parallax depth — image shifts slightly behind the panel frame */
  const imgOffset = useTransform(
    scrollX,
    (val) => {
      // scrollX is a percentage like "-150%"
      const pct = parseFloat(val);
      // Each panel occupies ~(100/total)% of the horizontal band
      const panelCenter = index * (100 / total) + 100 / total / 2;
      const delta = -pct - panelCenter + 50;
      return delta * 0.6; // parallax multiplier
    }
  );

  return (
    <div
      ref={panelRef}
      className="relative flex h-full shrink-0 items-center justify-center px-4 md:px-8"
      style={{ width: `${panelWidth}px` }}
    >
      <MagneticWrap className="relative w-full max-w-[900px]">
        <motion.div
          className="group relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          animate={{
            scale: isActive ? 1 : 0.88,
            opacity: isActive ? 1 : 0.4,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: isHover
              ? "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(194,138,20,0.1)"
              : "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* ── Ambient glow behind image ── */}
          <div
            className="absolute inset-0 z-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 70%, rgba(194,138,20,${isActive ? 0.08 : 0.02}) 0%, transparent 70%)`,
            }}
          />

          {/* ── Image with parallax ── */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.div
              className="absolute inset-[-15%]"
              style={{ x: imgOffset }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={675}
                unoptimized
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Motion blur edge effect */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.7), transparent)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-24 pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(0,0,0,0.7), transparent)",
              }}
            />

            {/* ── Content overlay ── */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10">
              {/* Category */}
              <motion.span
                className="mb-4 self-start rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {item.category}
              </motion.span>

              {/* Letter-by-letter title */}
              <AnimatedTitle text={item.title} active={isActive} />

              {/* Description — reveals on hover */}
              <motion.p
                className="mt-3 max-w-md text-sm leading-relaxed text-white/45 md:text-base"
                initial={false}
                animate={{
                  opacity: isHover && isActive ? 1 : 0,
                  y: isHover && isActive ? 0 : 12,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {item.description}
              </motion.p>

              {/* Tags — reveal on hover */}
              <motion.div
                className="mt-3 flex flex-wrap gap-2"
                initial={false}
                animate={{
                  opacity: isHover && isActive ? 1 : 0,
                  y: isHover && isActive ? 0 : 8,
                }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
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

              {/* Index number */}
              <div className="absolute right-8 top-8 font-heading text-7xl font-bold leading-none text-white/[0.04] md:right-10 md:top-10 md:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        </motion.div>
      </MagneticWrap>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Progress bar + dots
   ════════════════════════════════════════════════════════════ */
function ProgressBar({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setActiveIdx(Math.min(Math.round(v * (total - 1)), total - 1));
  });

  return (
    <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-4 md:bottom-12">
      {/* Dots */}
      <div className="flex items-center gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center"
          >
            <div
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                background:
                  i === activeIdx
                    ? "#c28a14"
                    : i < activeIdx
                      ? "rgba(194,138,20,0.4)"
                      : "rgba(255,255,255,0.12)",
                boxShadow:
                  i === activeIdx
                    ? "0 0 12px rgba(194,138,20,0.5)"
                    : "none",
                transform: i === activeIdx ? "scale(1.4)" : "scale(1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/[0.06] md:w-64">
        <motion.div
          className="h-full rounded-full"
          style={{
            width,
            background: "linear-gradient(90deg, #c28a14, #e8b94a)",
          }}
        />
      </div>

      {/* Counter */}
      <span className="font-heading text-xs tracking-[0.2em] text-white/30">
        {String(activeIdx + 1).padStart(2, "0")}
        <span className="mx-1 text-white/15">/</span>
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Main section — vertical scroll → horizontal motion
   ════════════════════════════════════════════════════════════ */
export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;
  const total = items.length;
  const containerRef = useRef<HTMLElement>(null);
  const [panelWidth, setPanelWidth] = useState(900);

  /* Responsive panel width */
  useEffect(() => {
    function calc() {
      const vw = window.innerWidth;
      setPanelWidth(vw < 640 ? vw - 32 : vw < 1024 ? vw * 0.75 : 900);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* Scroll tracking */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Map vertical scroll → horizontal translate */
  const scrollX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(total - 1) * 100}%`]
  );

  /* Section header parallax */
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Ambient background glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(194,138,20,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── Section header — fades out as scrolling starts ── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-5 pointer-events-none"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="mb-4 inline-block rounded-full border border-[#c28a14]/25 bg-[#c28a14]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#c28a14]">
            Our Work
          </span>
          <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[48px]">
            Projects That Speak
            <br />
            <span className="bg-gradient-to-r from-[#c28a14] to-[#e8b94a] bg-clip-text text-transparent">
              for Themselves
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/40 md:text-lg">
            A selection of our recent work across branding, digital, web development, production, and more.
          </p>
          <div className="mt-8 flex items-center gap-2 text-white/20">
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to explore</span>
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </motion.svg>
          </div>
        </motion.div>

        {/* ── Horizontal track ── */}
        <motion.div
          className="flex h-full items-center"
          style={{
            width: `${total * panelWidth}px`,
            x: scrollX,
          }}
        >
          {items.map((item, i) => (
            <Panel
              key={item.id}
              item={item}
              index={i}
              total={total}
              scrollX={scrollX}
              panelWidth={panelWidth}
            />
          ))}
        </motion.div>

        {/* ── Progress ── */}
        <ProgressBar progress={scrollYProgress} total={total} />

        {/* ── Top / bottom subtle lines ── */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* ── CTA after scroll completes ── */}
      {showCta && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-[15vh]">
          <Button href="/portfolio" variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      )}
    </section>
  );
}
