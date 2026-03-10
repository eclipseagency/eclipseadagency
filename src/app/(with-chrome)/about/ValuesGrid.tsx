"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const icons: Record<string, ReactNode> = {
  Innovation: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  Excellence: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Collaboration: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Impact: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

interface Value {
  title: string;
  description: string;
}

export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value, i) => (
        <motion.div
          key={value.title}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -8, transition: { duration: 0.35 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,107,53,0.08)]"
        >
          {/* Glow behind on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255,107,53,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Icon */}
          <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary transition-all duration-500 group-hover:bg-primary/[0.15] group-hover:shadow-[0_0_24px_rgba(255,107,53,0.2)]">
            {icons[value.title] || icons.Innovation}
          </div>

          <h3 className="relative mb-3 font-heading text-xl font-bold transition-colors duration-300 group-hover:text-primary">
            {value.title}
          </h3>
          <p className="relative text-sm leading-relaxed text-text-secondary">
            {value.description}
          </p>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 group-hover:w-3/4" />
        </motion.div>
      ))}
    </div>
  );
}
