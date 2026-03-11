"use client";

import { aboutContent } from "@/data/site";

/* ═══════════════════════════════════════════════════════════
   SECTION: About - Rocket reveal, space-themed intro
   ═══════════════════════════════════════════════════════════ */
export function AboutSection() {
  return (
    <section id="about" className="relative z-0 pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Subtle nebula glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none opacity-30" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)",
      }} />


      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        {/* Big statement */}
        <h2 className="font-heading text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-tight max-w-4xl" data-reveal>
          <span className="text-white">We bring visions to life through </span>
          <span className="text-[#ff6b35]">strategy, design, </span>
          <span className="text-white/40">and relentless creativity.</span>
        </h2>

        <div className="mt-6 h-px w-full origin-left bg-gradient-to-r from-[#ff6b35]/20 to-transparent" data-line />

        {/* Story text */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          {aboutContent.story.map((p, i) => (
            <p key={i} className="text-sm leading-[1.8] text-white/35" data-fade={i * 0.15}>
              {p}
            </p>
          ))}
        </div>

        {/* Stats - floating cards with glow */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {[
            { value: "200+", label: "Projects", icon: "🚀" },
            { value: "50+", label: "Clients", icon: "🌍" },
            { value: "8+", label: "Years", icon: "⭐" },
            { value: "15+", label: "Experts", icon: "👨‍🚀" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              data-fade={i * 0.12}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[#ff6b35]/[0.03] md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,107,53,0.06) 0%, transparent 70%)",
              }} />
              <span className="text-2xl">{stat.icon}</span>
              <p className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/25">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
