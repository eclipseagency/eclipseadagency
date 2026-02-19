"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
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

      {/* ── Mobile: carousel ── */}
      <div className="md:hidden">
        <MobileCarousel breakpoint="md" cardWidth="min-w-[82%]" gap="gap-4">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <span className="font-heading text-5xl font-bold text-primary/15">
                {step.number}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </div>
          ))}
        </MobileCarousel>
      </div>

      {/* ── Desktop: timeline ── */}
      <div className="relative hidden md:block" ref={containerRef}>
        {/* Timeline track */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-px bg-white/[0.04]" />

        {/* Animated fill line */}
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-px"
          style={{
            height: `${lineProgress}%`,
            background:
              "linear-gradient(to bottom, rgba(255,107,53,0.6), rgba(255,107,53,0.15))",
            transition: "height 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Floating astronaut on timeline */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-20"
          style={{
            transform: `translate(-50%, ${astronautY - 28}px)`,
            transition:
              "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
        >
          <Image
            src="/images/hero-astronaut-space.png"
            alt="Astronaut"
            width={56}
            height={56}
            className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(255,107,53,0.3)]"
          />
        </div>

        <div className="space-y-20">
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
