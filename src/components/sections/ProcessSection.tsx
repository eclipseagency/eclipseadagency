"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

function ProcessStep({
  step,
  index,
  state,
}: {
  step: (typeof processSteps)[number];
  index: number;
  state: "dimmed" | "active" | "visited";
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "group flex flex-col gap-4 md:flex-row md:items-center md:gap-16",
        "transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        !isEven && "md:flex-row-reverse"
      )}
      style={{
        opacity: state === "active" ? 1 : state === "visited" ? 0.45 : 0.12,
        transform:
          state === "dimmed" ? "translateY(12px)" : "translateY(0px)",
      }}
    >
      {/* Content */}
      <div className={cn("flex-1 space-y-2", !isEven && "md:text-right")}>
        <h3
          className={cn(
            "font-heading text-2xl font-bold md:text-3xl",
            "transition-colors duration-[800ms]",
            state === "active" ? "text-white" : "text-white/50"
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            "max-w-md leading-relaxed text-[15px]",
            "transition-colors duration-[800ms]",
            !isEven && "md:ml-auto",
            state === "active" ? "text-[#999]" : "text-white/20"
          )}
        >
          {step.description}
        </p>
      </div>

      {/* Desktop dot node */}
      <div className="relative hidden md:flex items-center justify-center">
        <div
          className={cn(
            "relative z-10 flex h-3 w-3 items-center justify-center rounded-full",
            "transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            state === "active"
              ? "bg-primary shadow-[0_0_12px_rgba(255,107,53,0.5)] scale-125"
              : state === "visited"
                ? "bg-primary/40 scale-100"
                : "bg-white/10 scale-75"
          )}
        />
      </div>

      {/* Spacer */}
      <div className="hidden flex-1 md:block" />
    </div>
  );
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  // Measure dot Y positions relative to the container
  const measureDots = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsets = stepRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      // Center of the step element relative to the container top
      return rect.top + rect.height / 2 - containerRect.top;
    });
    setDotOffsets(offsets);
  }, []);

  useEffect(() => {
    function updateActiveStep() {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - viewportCenter);

        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
      measureDots();
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveStep);
    }

    updateActiveStep();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measureDots]);

  const lineProgress =
    activeIndex < 0 ? 0 : ((activeIndex + 0.5) / processSteps.length) * 100;

  const astronautY =
    activeIndex >= 0 && dotOffsets[activeIndex] !== undefined
      ? dotOffsets[activeIndex]
      : 0;

  return (
    <SectionWrapper>
      <SectionHeader
        badge="Our Process"
        title="How We Bring Ideas to Life"
        subtitle="A proven five-step process that ensures every project moves from concept to launch with precision and creative excellence."
      />

      <div className="relative" ref={containerRef}>
        {/* Timeline track */}
        <div className="absolute left-[6px] top-0 hidden h-full w-px bg-white/[0.04] md:left-1/2 md:-translate-x-px md:block" />

        {/* Animated fill line */}
        <div
          className="absolute left-[6px] top-0 hidden w-px md:left-1/2 md:-translate-x-px md:block"
          style={{
            height: `${lineProgress}%`,
            background:
              "linear-gradient(to bottom, rgba(255,107,53,0.6), rgba(255,107,53,0.15))",
            transition: "height 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Floating astronaut on timeline */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-20 hidden md:block"
          style={{
            transform: `translate(-50%, ${astronautY - 28}px)`,
            transition:
              "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(255,107,53,0.5)]">
            <circle cx="20" cy="20" r="20" fill="rgba(255,107,53,0.08)"/>
            <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,107,53,0.2)" strokeWidth="1"/>
            {/* Rocket body */}
            <path d="M20 8 C20 8 27 13 27 21 L27 26 L20 30 L13 26 L13 21 C13 13 20 8 20 8Z" fill="rgba(255,107,53,0.12)" stroke="#ff6b35" strokeWidth="1.2"/>
            {/* Rocket tip */}
            <path d="M20 8 L16 16 L24 16 Z" fill="#ff6b35" fillOpacity="0.5"/>
            {/* Window */}
            <circle cx="20" cy="20" r="3.5" fill="none" stroke="#ff8c42" strokeWidth="1" opacity="0.7"/>
            {/* Exhaust */}
            <path d="M16 26 L20 33 L24 26" fill="none" stroke="#ff8c42" strokeWidth="1.2" opacity="0.6"/>
          </svg>
        </div>

        <div className="space-y-14 md:space-y-20">
          {processSteps.map((step, i) => (
            <div key={step.number} ref={setStepRef(i)}>
              <ProcessStep
                step={step}
                index={i}
                state={
                  i === activeIndex
                    ? "active"
                    : activeIndex >= 0 && i < activeIndex
                      ? "visited"
                      : "dimmed"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
