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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

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
  }, []);

  const lineProgress =
    activeIndex < 0 ? 0 : ((activeIndex + 0.5) / processSteps.length) * 100;

  return (
    <SectionWrapper dark>
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
