"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { processSteps } from "@/data/site";

type MV = MotionValue<number>;

/* ── Step icon SVGs ── */
const stepIcons: Record<string, React.ReactNode> = {
  "01": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="10" />
      <path d="M24 14v-4M24 38v-4M14 24h-4M38 24h-4" />
      <path d="M17 17l-2.8-2.8M33.8 33.8L31 31M17 31l-2.8 2.8M33.8 14.2L31 17" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "02": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 38V20l16-10 16 10v18" />
      <path d="M18 38V28h12v10" />
      <path d="M24 10v-2" />
      <rect x="20" y="20" width="8" height="4" rx="1" opacity="0.3" fill="currentColor" />
    </svg>
  ),
  "03": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 36l6-6 6 4 6-8 6 4" />
      <rect x="8" y="8" width="32" height="32" rx="4" />
      <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "04": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8v8l6 4" />
      <path d="M24 40V32" />
      <path d="M10 24H18" />
      <path d="M30 24h8" />
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "05": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 30 18 24 24 28 30 18 36 22" />
      <polyline points="30 18 36 18 36 22" />
      <rect x="8" y="12" width="32" height="28" rx="3" />
      <path d="M8 18h32" opacity="0.3" />
    </svg>
  ),
};

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = processSteps.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // We need to read the motion value reactively. Use a state approach via useTransform.
  // Create a derived value for rendering.
  const progressValue = useTransform(scrollYProgress, (v) => v);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-bg" />

        {/* Animated glow orbs that shift per step */}
        <GlowOrbs progress={progressValue} total={total} />

        {/* Film grain */}
        <div className="page-hero-noise absolute inset-0" />

        {/* ── Section header (fades out as scrolling begins) ── */}
        <HeaderOverlay progress={progressValue} />

        {/* ── Step scenes ── */}
        <StepScenes progress={progressValue} total={total} />

        {/* ── Progress indicator ── */}
        <ProgressDots progress={progressValue} total={total} />

        {/* ── Horizontal accent lines ── */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
    </section>
  );
}

/* ── Sub-components that read the motion value ── */

function GlowOrbs({
  progress,
  total,
}: {
  progress: MV;
  total: number;
}) {
  // Use individual transforms for each orb
  const orb1X = useTransform(progress, [0, 1], ["15%", "30%"]);
  const orb1Y = useTransform(progress, [0, 1], ["25%", "70%"]);
  const orb2X = useTransform(progress, [0, 1], ["70%", "50%"]);
  const orb2Y = useTransform(progress, [0, 1], ["20%", "60%"]);
  const orb1Opacity = useTransform(progress, [0, 0.5, 1], [0.06, 0.1, 0.06]);
  const orb2Opacity = useTransform(progress, [0, 0.5, 1], [0.04, 0.08, 0.04]);

  return (
    <>
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full blur-[80px] md:h-[550px] md:w-[550px]"
        style={{
          left: orb1X,
          top: orb1Y,
          opacity: orb1Opacity,
          background: "radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute h-[350px] w-[350px] rounded-full blur-[60px] md:h-[450px] md:w-[450px]"
        style={{
          left: orb2X,
          top: orb2Y,
          opacity: orb2Opacity,
          background: "radial-gradient(circle, rgba(247,147,30,0.25) 0%, transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </>
  );
}

function HeaderOverlay({
  progress,
}: {
  progress: MV;
}) {
  const headerOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const headerY = useTransform(progress, [0, 0.08], [0, -40]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
      style={{ opacity: headerOpacity, y: headerY }}
    >
      <span className="mb-4 inline-block rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
        Our Process
      </span>
      <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[48px]">
        How We Bring Ideas to Life
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base text-white/50 md:text-lg">
        A proven five-step process that ensures every project moves from concept to launch with precision and creative excellence.
      </p>
      <div className="mt-8 flex items-center gap-2 text-white/25">
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
  );
}

function StepScenes({
  progress,
  total,
}: {
  progress: MV;
  total: number;
}) {
  // Create individual progress values for each step to avoid using useMotionValueEvent
  // Instead we'll use a trick: render all steps and let each read the raw progress
  return (
    <StepScenesInner progress={progress} total={total} />
  );
}

function StepScenesInner({
  progress,
  total,
}: {
  progress: MV;
  total: number;
}) {
  // We need to subscribe to the motion value. Use a state + useTransform approach.
  const progressNumber = useTransform(progress, (v) => v);

  // To get the numeric value for rendering, we use multiple useTransform calls
  // that produce opacity/transform for each step, avoiding reading .get() in render.
  return (
    <div className="absolute inset-0">
      {processSteps.map((step, i) => (
        <StepSceneMotion
          key={step.number}
          step={step}
          index={i}
          total={total}
          progress={progressNumber}
        />
      ))}
    </div>
  );
}

function StepSceneMotion({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof processSteps)[number];
  index: number;
  total: number;
  progress: MV;
}) {
  const segmentSize = 1 / total;
  const segStart = index * segmentSize;

  // After the header fades (0-0.08), distribute steps across 0.1-0.95
  const stepsStart = 0.1;
  const stepsEnd = 0.95;
  const stepRange = stepsEnd - stepsStart;
  const stepSegSize = stepRange / total;

  const myStart = stepsStart + index * stepSegSize;
  const myEnd = myStart + stepSegSize;
  const enterEnd = myStart + stepSegSize * 0.15;
  const exitStart = myEnd - stepSegSize * 0.15;

  // Opacity: 0 -> 1 (enter) -> 1 (hold) -> 0 (exit)
  const opacity = useTransform(progress,
    [myStart - 0.001, enterEnd, exitStart, myEnd],
    [0, 1, 1, 0]
  );

  // Y offset: 40 -> 0 (enter) -> 0 (hold) -> -30 (exit)
  const y = useTransform(progress,
    [myStart - 0.001, enterEnd, exitStart, myEnd],
    [40, 0, 0, -30]
  );

  // Scale: 0.96 -> 1 (enter) -> 1 (hold) -> 0.97 (exit)
  const scale = useTransform(progress,
    [myStart - 0.001, enterEnd, exitStart, myEnd],
    [0.96, 1, 1, 0.97]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y, scale }}
    >
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        {/* Step icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/[0.06] text-primary">
          {stepIcons[step.number] || null}
        </div>

        {/* Step label */}
        <span className="mb-3 inline-block font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary/80">
          Step {step.number}
        </span>

        {/* Title */}
        <h3 className="mb-4 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {step.title}
        </h3>

        {/* Description */}
        <p className="mx-auto max-w-lg text-base leading-relaxed text-white/50 md:text-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function ProgressDots({
  progress,
  total,
}: {
  progress: MV;
  total: number;
}) {
  const stepsStart = 0.1;
  const stepsEnd = 0.95;
  const stepSegSize = (stepsEnd - stepsStart) / total;

  // Overall progress bar
  const barWidth = useTransform(progress, [stepsStart, stepsEnd], ["0%", "100%"]);

  // Opacity — visible during step area
  const dotsOpacity = useTransform(progress, [0.06, 0.12, 0.92, 0.98], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
      style={{ opacity: dotsOpacity }}
    >
      <div className="flex items-center gap-6">
        {processSteps.map((step, i) => (
          <DotItem
            key={step.number}
            index={i}
            total={total}
            step={step}
            progress={progress}
            stepsStart={stepsStart}
            stepSegSize={stepSegSize}
          />
        ))}
      </div>

      {/* Progress bar below dots */}
      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
          style={{ width: barWidth }}
        />
      </div>
    </motion.div>
  );
}

function DotItem({
  index,
  total,
  step,
  progress,
  stepsStart,
  stepSegSize,
}: {
  index: number;
  total: number;
  step: (typeof processSteps)[number];
  progress: MV;
  stepsStart: number;
  stepSegSize: number;
}) {
  const myStart = stepsStart + index * stepSegSize;
  const myMid = myStart + stepSegSize * 0.5;
  const myEnd = myStart + stepSegSize;

  // Dot scale: larger when active
  const dotScale = useTransform(progress,
    [myStart - 0.01, myStart + stepSegSize * 0.1, myEnd - stepSegSize * 0.1, myEnd + 0.01],
    [0.7, 1.3, 1.3, 0.7]
  );

  // Dot opacity
  const dotOpacity = useTransform(progress,
    [myStart - 0.01, myStart + stepSegSize * 0.1, myEnd - stepSegSize * 0.1, myEnd + 0.01],
    [0.3, 1, 1, 0.3]
  );

  // Border color interpolation via opacity of the colored ring
  const ringOpacity = useTransform(progress,
    [myStart - 0.01, myStart + stepSegSize * 0.1, myEnd - stepSegSize * 0.1, myEnd + 0.01],
    [0, 1, 1, 0]
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="relative flex h-3 w-3 items-center justify-center"
        style={{ scale: dotScale, opacity: dotOpacity }}
      >
        {/* Glow ring when active */}
        <motion.div
          className="absolute inset-[-4px] rounded-full border border-primary/60"
          style={{ opacity: ringOpacity }}
        />
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </motion.div>
      <motion.span
        className="text-[9px] font-semibold uppercase tracking-wider text-white/40 hidden sm:block"
        style={{ opacity: dotOpacity }}
      >
        {step.title}
      </motion.span>
    </div>
  );
}
