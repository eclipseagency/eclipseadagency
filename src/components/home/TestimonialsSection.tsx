"use client";

import { testimonials } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

/* ═══════════════════════════════════════════════════════════
   SECTION: Testimonials - Floating space cards
   ═══════════════════════════════════════════════════════════ */
export function TestimonialsSection() {
  const { t, locale } = useLocale();
  return (
    <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>{t("testimonials.badge")}</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>{t("testimonials.title")}</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Testimonial cards - scrollable on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.slice(0, 6).map((item, i) => (
            <div
              key={i}
              data-fade={i * 0.1}
              className="group shrink-0 snap-center w-[85vw] sm:w-[70vw] md:w-auto rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.015)] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/15 hover:bg-[rgba(255,107,53,0.02)]"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,107,53,0.05) 0%, transparent 50%)",
              }} />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35" stroke="none" className="opacity-60">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="relative text-sm leading-[1.8] text-white/60 italic md:text-[15px]">&ldquo;{item.quote}&rdquo;</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b35]/20 to-[#f7931e]/10 text-sm font-bold text-[#ff6b35]">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/30">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
