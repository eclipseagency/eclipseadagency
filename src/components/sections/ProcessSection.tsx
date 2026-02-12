"use client";

import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSection() {
  return (
    <SectionWrapper dark>
      <SectionHeader
        badge="Our Process"
        title="How We Bring Ideas to Life"
        subtitle="A proven five-step process that ensures every project moves from concept to launch with precision and creative excellence."
      />

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:left-1/2 md:block" />

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col gap-6 md:flex-row md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                <span className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  Step {step.number}
                </span>
                <h3 className="mb-3 font-heading text-2xl font-bold md:text-3xl">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </div>

              {/* Node */}
              <div className="relative hidden md:flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-bg-elevated font-heading text-lg font-bold text-primary">
                  {step.number}
                </div>
              </div>

              {/* Spacer for alignment */}
              <div className="hidden flex-1 md:block" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
