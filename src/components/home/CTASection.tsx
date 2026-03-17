"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

/* ═══════════════════════════════════════════════════════════
   SECTION: CTA - Eclipse-themed call to action
   ═══════════════════════════════════════════════════════════ */
export function CTASection() {
  const { t } = useLocale();
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">


      {/* Central eclipse glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 30%, transparent 60%)",
      }} />

      {/* Orbital ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,500px)] h-[min(90vw,500px)] rounded-full border border-white/[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,380px)] h-[min(70vw,380px)] rounded-full border border-[#ff6b35]/[0.06] pointer-events-none" />

      <div className="relative mx-auto max-w-[800px] px-5 md:px-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-4 md:text-xs" data-fade>{t("nav.getStarted")}</p>
        <h2 className="font-heading text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-white via-white to-[#ff6b35] bg-clip-text text-transparent" data-reveal>
          {t("cta.title")}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-white/30 md:text-base" data-fade="0.2">
          {t("cta.subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-fade="0.4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-6 py-3 md:px-8 md:py-3.5 min-h-[44px] text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,107,53,0.35)] hover:translate-y-[-2px]">
            {t("cta.button")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 md:px-8 md:py-3.5 min-h-[44px] text-sm font-semibold text-white/50 transition-all duration-300 hover:border-[#25D366]/30 hover:text-[#25D366]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {t("cta.whatsapp")}
          </a>
        </div>
        <p className="text-xs text-white/40 mt-6">{t("cta.trust")}</p>
      </div>
    </section>
  );
}
