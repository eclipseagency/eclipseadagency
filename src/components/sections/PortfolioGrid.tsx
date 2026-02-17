"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioItems } from "@/data/site";
import { Button } from "@/components/ui/Button";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

/* ── Staggered entrance ── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/* ── Project card ── */
function ProjectCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  const glareX = mousePos.x * 100;
  const glareY = mousePos.y * 100;

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        animate={{
          y: hover ? -6 : 0,
          scale: hover ? 1.015 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        style={{
          background: "rgba(255,255,255,0.02)",
          border: hover
            ? "1px solid rgba(194,138,20,0.2)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: hover
            ? "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(194,138,20,0.06)"
            : "0 2px 12px rgba(0,0,0,0.2)",
          transition: "border-color 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Cursor-tracked glow */}
        <div
          className="absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${glareX}% ${glareY}%, rgba(194,138,20,0.08), transparent 40%)`,
          }}
        />

        {/* Glass top-edge reflection */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 60%, transparent 90%)",
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
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          />

          {/* Default bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Hover overlay — darker + golden accent */}
          <div
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
            }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
            {/* Category — always visible */}
            <span className="mb-auto self-start rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm">
              {item.category}
            </span>

            {/* Title — always visible */}
            <h3 className="font-heading text-lg font-bold leading-tight text-white md:text-xl">
              {item.title}
            </h3>

            {/* Description — hover reveal */}
            <motion.p
              className="mt-2 text-[13px] leading-relaxed text-white/50"
              initial={false}
              animate={{
                opacity: hover ? 1 : 0,
                y: hover ? 0 : 8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {item.description}
            </motion.p>

            {/* Tags — hover reveal */}
            <motion.div
              className="mt-3 flex flex-wrap gap-1.5"
              initial={false}
              animate={{
                opacity: hover ? 1 : 0,
                y: hover ? 0 : 6,
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.04 }}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-white/35"
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

/* ── Main section ── */
export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  return (
    <section className="relative py-24 px-5 md:py-32 md:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 40% at 50% 55%, rgba(194,138,20,0.035) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture */}
      <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.025 }} />

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
            Selected{" "}
            <span className="bg-gradient-to-r from-[#c28a14] to-[#e8b94a] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/35 md:text-lg">
            A curated selection of our recent work across branding, digital, and creative production.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
          {items.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
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
  );
}
