"use client";

import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function CtaBanner() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Background — flat dark, no glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-elevated/30 to-transparent" />

      <div className="relative text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Ready to Step Into the{" "}
          <span className="gradient-text">Spotlight?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary md:text-lg">
          Let&apos;s collaborate to build something extraordinary. Tell us about your project
          and we&apos;ll show you what&apos;s possible.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg">
            Start a Project
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            See Our Work
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
