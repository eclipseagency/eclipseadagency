"use client";

import Link from "next/link";
import { servicesOverview } from "@/data/site";

/* ═══════════════════════════════════════════════════════════
   SECTION: Services - Space cards with orbital connectors
   ═══════════════════════════════════════════════════════════ */
export function ServicesSection() {
  return (
    <section id="services" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Left nebula */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40%] h-[80%] pointer-events-none opacity-20" style={{
        background: "radial-gradient(ellipse at 10% 50%, rgba(255,107,53,0.1) 0%, transparent 60%)",
      }} />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>Our Solutions</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>What We Do</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Service cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {servicesOverview.map((service, i) => (
            <Link href={`/solutions/${service.slug}`} key={service.id} className="block">
              <div
                data-fade={i * 0.1}
                className="group relative h-full rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.015)] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/25 hover:bg-[rgba(255,107,53,0.03)] hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(255,107,53,0.08)]"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)",
                }} />

                {/* Number badge */}
                <div className="relative flex items-center justify-between mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b35]/10 font-heading text-sm font-bold text-[#ff6b35] transition-colors group-hover:bg-[#ff6b35]/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white/10 transition-all duration-300 group-hover:text-[#ff6b35] group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="relative font-heading text-lg font-bold text-white transition-colors group-hover:text-[#ff6b35] md:text-xl">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/40 group-hover:text-white/50 transition-colors">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] transition-all duration-700 group-hover:w-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
