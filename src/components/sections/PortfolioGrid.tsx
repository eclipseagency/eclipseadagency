"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioItems } from "@/data/site";
import { Button } from "@/components/ui/Button";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

/* ── Card entrance variants — staggered cascade ── */
const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 8, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

/* ── Single Project Card ── */
function ProjectCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  // 3D tilt values based on mouse position
  const rotateY = hover ? (mousePos.x - 0.5) * 12 : 0;
  const rotateX = hover ? -(mousePos.y - 0.5) * 12 : 0;

  // Specular highlight follows the mouse
  const glareX = mousePos.x * 100;
  const glareY = mousePos.y * 100;

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        animate={{
          rotateX,
          rotateY,
          y: hover ? -8 : 0,
          scale: hover ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: hover
            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(194,138,20,0.08), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Glowing edge on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-20"
          style={{
            background: `radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(194,138,20,0.12), transparent 40%)`,
          }}
        />

        {/* Light sweep on hover */}
        <div
          className="absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: hover ? "sweepLight 1.2s ease forwards" : "none",
          }}
        />

        {/* Glass reflection top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 70%, transparent)",
          }}
        />

        {/* ── Image ── */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={800}
            height={500}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Hover detail overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
            {/* Category badge — always visible */}
            <span className="mb-auto self-start rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
              {item.category}
            </span>

            {/* Title — always visible */}
            <h3 className="mt-4 font-heading text-xl font-bold leading-tight text-white md:text-2xl">
              {item.title}
            </h3>

            {/* Description — fades in on hover */}
            <motion.p
              className="mt-2 text-sm leading-relaxed text-white/50"
              initial={false}
              animate={{
                opacity: hover ? 1 : 0,
                y: hover ? 0 : 10,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {item.description}
            </motion.p>

            {/* Tags — fade in staggered */}
            <motion.div
              className="mt-3 flex flex-wrap gap-2"
              initial={false}
              animate={{
                opacity: hover ? 1 : 0,
                y: hover ? 0 : 8,
              }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/40"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax the heading slightly
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-5 md:py-32 md:px-8 overflow-hidden"
    >
      {/* Section ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(194,138,20,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* ── Header ── */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          style={{ y: headingY, opacity: headingOpacity }}
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
        </motion.div>

        {/* ── Grid — 2 columns on tablet, 3 on desktop ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        {showCta && (
          <motion.div
            className="mt-16 text-center md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button href="/portfolio" variant="outline" size="lg">
              View All Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
