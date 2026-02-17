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
    <SectionWrapper>
      {/* ── Center-radiating glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Core radial burst from dead center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(255,130,60,0.12) 0%, rgba(255,107,53,0.05) 35%, transparent 70%)",
            filter: "blur(40px)",
            animation: "sunray-ambient 12s ease-in-out infinite",
          }}
        />

        {/* Rays fanning out from center in all directions */}
        {[
          { angle: -70, anim: "sunray-1", dur: 16, del: 0,  peak: 0.14, blur: 10, h: 55 },
          { angle: -45, anim: "sunray-2", dur: 14, del: 2,  peak: 0.18, blur: 8,  h: 60 },
          { angle: -20, anim: "sunray-3", dur: 18, del: 1,  peak: 0.2,  blur: 6,  h: 65 },
          { angle: 5,   anim: "sunray-1", dur: 15, del: 4,  peak: 0.22, blur: 7,  h: 60 },
          { angle: 30,  anim: "sunray-2", dur: 20, del: 6,  peak: 0.16, blur: 9,  h: 55 },
          { angle: 55,  anim: "sunray-3", dur: 17, del: 8,  peak: 0.12, blur: 12, h: 50 },
          { angle: 80,  anim: "sunray-1", dur: 22, del: 10, peak: 0.10, blur: 14, h: 45 },

          { angle: 110, anim: "sunray-2", dur: 16, del: 1,  peak: 0.14, blur: 10, h: 55 },
          { angle: 135, anim: "sunray-3", dur: 14, del: 3,  peak: 0.18, blur: 8,  h: 60 },
          { angle: 160, anim: "sunray-1", dur: 18, del: 5,  peak: 0.2,  blur: 6,  h: 65 },
          { angle: 185, anim: "sunray-2", dur: 15, del: 7,  peak: 0.16, blur: 9,  h: 55 },
          { angle: 210, anim: "sunray-3", dur: 20, del: 9,  peak: 0.14, blur: 11, h: 50 },
          { angle: 240, anim: "sunray-1", dur: 17, del: 11, peak: 0.12, blur: 14, h: 50 },
          { angle: 270, anim: "sunray-2", dur: 22, del: 2,  peak: 0.10, blur: 16, h: 45 },
          { angle: 300, anim: "sunray-3", dur: 19, del: 4,  peak: 0.15, blur: 10, h: 55 },
          { angle: 330, anim: "sunray-1", dur: 16, del: 6,  peak: 0.13, blur: 12, h: 50 },
        ].map((ray, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: "100px",
              height: `${ray.h}%`,
              marginLeft: "-50px",
              transformOrigin: "center top",
              transform: `rotate(${ray.angle}deg)`,
              background: `linear-gradient(180deg, rgba(255,140,60,0.9) 0%, rgba(255,107,53,0.4) 25%, rgba(255,107,53,0.08) 60%, transparent 85%)`,
              filter: `blur(${ray.blur}px)`,
              ["--ray-angle" as string]: `${ray.angle}deg`,
              ["--ray-peak" as string]: ray.peak,
              animation: `${ray.anim} ${ray.dur}s ease-in-out ${ray.del}s infinite`,
              opacity: 0,
            }}
          />
        ))}

        {/* Soft ambient haze across entire section */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,120,50,0.04) 0%, transparent 80%)",
            filter: "blur(50px)",
            animation: "sunray-ambient 16s ease-in-out 3s infinite",
          }}
        />
      </div>

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
