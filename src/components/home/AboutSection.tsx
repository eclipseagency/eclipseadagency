"use client";

import { useLocale } from "@/i18n/LocaleContext";

/* ═══════════════════════════════════════════════════════════
   SECTION: About - Rocket reveal, space-themed intro
   ═══════════════════════════════════════════════════════════ */
export function AboutSection() {
  const { t, locale } = useLocale();
  return (
    <section id="about" className="relative z-10 bg-[#0a0a0a] pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Subtle nebula glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none opacity-30" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)",
      }} />


      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        {/* Big statement */}
        <h2 className="font-heading text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-tight max-w-4xl" data-reveal>
          <span className="text-white">{t("about.title")}</span>
        </h2>

        <div className="mt-6 h-px w-full origin-left bg-gradient-to-r from-[#ff6b35]/20 to-transparent" data-line />

        {/* Story text */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          {(["about.story1", "about.story2"] as const).map((key, i) => (
            <p key={key} className="text-sm leading-[1.8] text-white/50" data-fade={i * 0.15}>
              {t(key)}
            </p>
          ))}
        </div>

        {/* Stats - floating cards with glow */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {[
            { value: "200+", labelKey: "about.stat.projects", icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            ) },
            { value: "50+", labelKey: "about.stat.clients", icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>
            ) },
            { value: "8+", labelKey: "about.stat.years", icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 L14.09 8.26 L21 9.27 L16 14.14 L17.18 21.02 L12 17.77 L6.82 21.02 L8 14.14 L3 9.27 L9.91 8.26 Z"/></svg>
            ) },
            { value: "15+", labelKey: "about.stat.team", icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            ) },
          ].map((stat, i) => (
            <div
              key={stat.labelKey}
              data-fade={i * 0.12}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[#ff6b35]/[0.03] md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,107,53,0.06) 0%, transparent 70%)",
              }} />
              <div className="text-[#ff6b35]/40">{stat.icon}</div>
              <p className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
