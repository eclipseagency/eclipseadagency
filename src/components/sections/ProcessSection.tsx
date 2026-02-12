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
  state: "inactive" | "active" | "past";
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-center md:gap-16 transition-all duration-700 ease-out",
        !isEven && "md:flex-row-reverse",
        state === "inactive" && "opacity-[0.15] translate-y-6",
        state === "active" && "opacity-100 translate-y-0",
        state === "past" && "opacity-50 translate-y-0"
      )}
    >
      {/* Content */}
      <div className={cn("flex-1", !isEven && "md:text-right")}>
        <span
          className={cn(
            "mb-2 block font-heading text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-700",
            state === "active" ? "text-primary" : "text-primary/50"
          )}
        >
          Step {step.number}
        </span>
        <h3
          className={cn(
            "mb-3 font-heading text-2xl font-bold md:text-3xl transition-colors duration-700",
            state === "active" ? "text-text" : "text-text/60"
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            "leading-relaxed transition-colors duration-700",
            state === "active" ? "text-text-secondary" : "text-text-muted/60"
          )}
        >
          {step.description}
        </p>
      </div>

      {/* Node circle — desktop */}
      <div className="relative hidden md:flex items-center justify-center">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full font-heading text-lg font-bold transition-all duration-700 ease-out",
            state === "active"
              ? "border-2 border-primary bg-primary/15 text-primary scale-110 shadow-[0_0_24px_rgba(255,107,53,0.35)]"
              : state === "past"
                ? "border-2 border-primary/40 bg-bg-elevated text-primary/60 scale-100"
                : "border border-white/10 bg-bg-elevated text-text-muted/40 scale-90"
          )}
        >
          {step.number}
        </div>
      </div>

      {/* Mobile circle — shown inline on small screens */}
      <div
        className={cn(
          "flex md:hidden h-12 w-12 items-center justify-center rounded-full font-heading text-base font-bold transition-all duration-700 ease-out order-first",
          state === "active"
            ? "border-2 border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(255,107,53,0.3)]"
            : state === "past"
              ? "border-2 border-primary/40 bg-bg-elevated text-primary/60"
              : "border border-white/10 bg-bg-elevated text-text-muted/40"
        )}
      >
        {step.number}
      </div>

      {/* Spacer for alignment */}
      <div className="hidden flex-1 md:block" />
    </div>
  );
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, index));
          }
        },
        {
          threshold: 0.4,
          rootMargin: "-10% 0px -30% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Animate the vertical connecting line based on progress
  const lineProgress =
    activeIndex < 0 ? 0 : ((activeIndex + 1) / processSteps.length) * 100;

  return (
    <SectionWrapper dark>
      <SectionHeader
        badge="Our Process"
        title="How We Bring Ideas to Life"
        subtitle="A proven five-step process that ensures every project moves from concept to launch with precision and creative excellence."
      />

      <div className="relative">
        {/* Connecting line — background track */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-white/[0.06] md:left-1/2 md:block" />

        {/* Connecting line — animated orange fill */}
        <div
          className="absolute left-6 top-0 hidden w-px md:left-1/2 md:block transition-all duration-1000 ease-out"
          style={{
            height: `${lineProgress}%`,
            background:
              "linear-gradient(to bottom, #ff6b35, rgba(255, 107, 53, 0.3))",
          }}
        />

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, i) => (
            <div key={step.number} ref={setStepRef(i)}>
              <ProcessStep
                step={step}
                index={i}
                state={
                  i === activeIndex
                    ? "active"
                    : i < activeIndex
                      ? "past"
                      : "inactive"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
