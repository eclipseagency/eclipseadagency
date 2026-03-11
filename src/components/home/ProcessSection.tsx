"use client";

import { processSteps } from "@/data/site";

/* ═══════════════════════════════════════════════════════════
   SECTION: Process - Rocket flight path timeline
   ═══════════════════════════════════════════════════════════ */
export function ProcessSection() {
  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden">

      {/* Center nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none opacity-15" style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 50%)",
      }} />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>How We Work</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>Our Process</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#ff6b35]/15 to-transparent" />

          {processSteps.map((step, i) => (
            <div
              key={step.number}
              data-fade={i * 0.12}
              className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-8 last:mb-0 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content card */}
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[rgba(255,107,53,0.02)]">
                  <span className="font-heading text-4xl font-bold text-[#ff6b35]/10 md:text-5xl">{step.number}</span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/30">{step.description}</p>
                </div>
              </div>

              {/* Center node - desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 h-4 w-4 items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-[#ff6b35]/40 ring-4 ring-[#ff6b35]/10" />
              </div>

              {/* Empty spacer for other side */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
