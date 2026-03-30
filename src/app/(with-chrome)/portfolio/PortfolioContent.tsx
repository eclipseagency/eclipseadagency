"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function PortfolioContent() {
  const { t } = useLocale();

  return (
    <>
      {/* Slim bold hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-8 md:px-8 md:pt-40 md:pb-12">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,107,53,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50">
                {t("portfolio.page.badge")}
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                Our{" "}
                <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                  Work
                </span>
              </h1>
              <p className="mt-3 max-w-md text-base text-white/30 md:text-lg">
                {t("portfolio.page.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-6 text-white/20 text-sm">
              <div className="text-right">
                <span className="block font-heading text-2xl font-bold text-white">50+</span>
                <span className="text-xs text-white/30">Projects</span>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div className="text-right">
                <span className="block font-heading text-2xl font-bold text-white">6+</span>
                <span className="text-xs text-white/30">Services</span>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div className="text-right">
                <span className="block font-heading text-2xl font-bold text-white">30+</span>
                <span className="text-xs text-white/30">Clients</span>
              </div>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-[#ff6b35]/20 via-white/[0.04] to-transparent" />
        </div>
      </section>

      <PortfolioGrid showCta={false} />
      <CtaBanner />
    </>
  );
}
