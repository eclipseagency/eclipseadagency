"use client";

import { useRef, useState, useEffect } from "react";
import { processSteps } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

/* ═══════════════════════════════════════════════════════════
   SECTION: Process - Interactive step-by-step flow
   ═══════════════════════════════════════════════════════════ */

const icons: Record<string, React.ReactNode> = {
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  pen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  ),
  rocket: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
};

export function ProcessSection() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Auto-cycle through steps
  useEffect(() => {
    if (!revealed) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [revealed, active]);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-16 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20" style={{
        background: `radial-gradient(circle, ${processSteps[active]?.accent ?? "#ff6b35"}15 0%, transparent 60%)`,
        transition: "background 1s ease",
      }} />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>{t("process.badge")}</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>{t("process.title")}</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Desktop: Horizontal step bar + detail card */}
        <div className="hidden md:block">
          {/* Step selector bar */}
          <div className="relative flex items-center justify-between mb-16">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.06]" />
            {/* Progress line */}
            <div
              className="absolute top-1/2 left-0 h-px bg-[#ff6b35]/40 transition-all duration-700 ease-out"
              style={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
            />

            {processSteps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActive(i)}
                aria-label={t(`process.step${i + 1}.title`)}
                className="relative z-10 flex flex-col items-center gap-3 group"
              >
                {/* Node */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    i === active
                      ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35] scale-110 shadow-[0_0_30px_rgba(255,107,53,0.2)]"
                      : i < active
                        ? "border-[#ff6b35]/30 bg-[#ff6b35]/5 text-[#ff6b35]/50"
                        : "border-white/10 bg-white/[0.02] text-white/20 hover:border-white/20 hover:text-white/40"
                  }`}
                >
                  {icons[step.icon] ?? step.number}
                </div>
                {/* Label */}
                <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-500 ${
                  i === active ? "text-[#ff6b35]" : "text-white/40 group-hover:text-white/50"
                }`}>
                  {t(`process.step${i + 1}.title`)}
                </span>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="relative mx-auto max-w-2xl">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-10 text-center transition-all duration-500 hover:border-[#ff6b35]/15">
              <span className="inline-block font-heading text-6xl font-bold text-[#ff6b35]/[0.07] mb-2">
                {processSteps[active]?.number}
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                {t(`process.step${active + 1}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-white/40 max-w-md mx-auto">
                {t(`process.step${active + 1}.desc`)}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical cards */}
        <div className="md:hidden flex flex-col gap-3">
          {processSteps.map((step, i) => (
            <button
              key={step.number}
              onClick={() => setActive(i)}
              aria-label={t(`process.step${i + 1}.title`)}
              className="text-left w-full"
            >
              <div
                className={`rounded-xl border p-4 transition-all duration-500 ${
                  i === active
                    ? "border-[#ff6b35]/25 bg-[#ff6b35]/[0.03]"
                    : "border-white/[0.06] bg-white/[0.01]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      i === active
                        ? "border-[#ff6b35]/40 bg-[#ff6b35]/10 text-[#ff6b35]"
                        : "border-white/10 bg-white/[0.02] text-white/20"
                    }`}
                  >
                    <div className="scale-75">{icons[step.icon] ?? step.number}</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold transition-colors duration-500 ${
                        i === active ? "text-[#ff6b35]/50" : "text-white/15"
                      }`}>
                        {step.number}
                      </span>
                      <h3 className={`text-sm font-bold transition-colors duration-500 ${
                        i === active ? "text-white" : "text-white/40"
                      }`}>
                        {t(`process.step${i + 1}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Expand chevron */}
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 transition-all duration-300 ${
                      i === active ? "rotate-180 text-[#ff6b35]/50" : "text-white/15"
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* Expandable description */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: i === active ? "120px" : "0px",
                    opacity: i === active ? 1 : 0,
                    marginTop: i === active ? "12px" : "0px",
                  }}
                >
                  <p className="text-xs leading-relaxed text-white/35 pl-[52px]">
                    {t(`process.step${i + 1}.desc`)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
