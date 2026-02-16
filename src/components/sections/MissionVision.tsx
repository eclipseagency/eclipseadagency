"use client";

import { motion } from "framer-motion";

interface MissionVisionProps {
  mission: string;
  vision: string;
}

export function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orbiting ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[500px] w-[500px] rounded-full border border-primary/[0.06] md:h-[700px] md:w-[700px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Orbiting dot */}
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
          </motion.div>
        </div>

        {/* Second ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-[350px] w-[350px] rounded-full border border-primary/[0.04] md:h-[500px] md:w-[500px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/30 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
          </motion.div>
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute left-[8%] top-[15%] h-16 w-16 rotate-45 rounded-sm border border-primary/[0.08]"
          animate={{ y: [-10, 10, -10], rotate: [45, 50, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[10%] top-[20%] h-10 w-10 rounded-full border border-primary/[0.06]"
          animate={{ y: [8, -12, 8], x: [-4, 4, -4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[15%] left-[15%] h-8 w-8 rotate-12 border border-primary/[0.07]"
          animate={{ y: [5, -15, 5], rotate: [12, -12, 12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[8%] h-12 w-12 rotate-[30deg] rounded-sm border border-primary/[0.06]"
          animate={{ y: [-8, 8, -8], rotate: [30, 35, 30] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Radial glow behind cards */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      {/* Section header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span className="mb-4 inline-block text-primary text-sm font-semibold uppercase tracking-wider">
          Who We Are
        </span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Mission & Vision
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="relative grid gap-8 md:grid-cols-2">
        {/* Mission card */}
        <motion.div
          className="group relative"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Animated gradient border */}
          <div className="mission-glow-border absolute -inset-px overflow-hidden rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-primary-light/20 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
            {/* Icon */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center">
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-primary/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2L12 6" />
                    <path d="M12 18L12 22" />
                    <path d="M4.93 4.93L7.76 7.76" />
                    <path d="M16.24 16.24L19.07 19.07" />
                    <path d="M2 12L6 12" />
                    <path d="M18 12L22 12" />
                    <path d="M4.93 19.07L7.76 16.24" />
                    <path d="M16.24 7.76L19.07 4.93" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Our Mission
              </span>
            </div>

            <p className="text-lg leading-relaxed text-text-secondary">
              {mission}
            </p>

            {/* Bottom accent line */}
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Vision card */}
        <motion.div
          className="group relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-px overflow-hidden rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-primary-light/30 via-transparent to-primary/20 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
            {/* Icon */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center">
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-primary-light/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-primary-light/20 bg-primary-light/[0.08]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 5V3" />
                    <path d="M17.5 6.5l1.5-1.5" />
                    <path d="M20 12h2" />
                    <path d="M6.5 6.5L5 5" />
                    <path d="M4 12H2" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-light">
                Our Vision
              </span>
            </div>

            <p className="text-lg leading-relaxed text-text-secondary">
              {vision}
            </p>

            {/* Bottom accent line */}
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-primary-light/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ transformOrigin: "right" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
