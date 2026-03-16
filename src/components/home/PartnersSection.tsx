"use client";

import { useLocale } from "@/i18n/LocaleContext";

/* ═══════════════════════════════════════════════════════════
   SECTION: Partners - Certified partner logos
   ═══════════════════════════════════════════════════════════ */

const partners = [
  {
    name: "Google",
    label: "Partner",
    logo: "/images/partners/google.svg",
  },
  {
    name: "HubSpot",
    label: "Certified Partner",
    logo: "/images/partners/hubspot.svg",
  },
  {
    name: "Semrush",
    label: "Certified Agency",
    logo: "/images/partners/semrush.svg",
  },
  {
    name: "Adjust",
    label: "Solutions Partner",
    logo: "/images/partners/adjust.svg",
  },
];

export function PartnersSection() {
  const { t } = useLocale();
  return (
    <section id="partners" className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-white/20 mb-8 md:text-xs" data-fade>
          {t("partners.badge")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {partners.map((p, i) => (
            <div
              key={p.name}
              data-fade={i * 0.1}
              className="group flex flex-col items-center gap-2 transition-all duration-500"
            >
              <div className="flex h-12 md:h-14 items-center justify-center opacity-40 grayscale transition-all duration-500 group-hover:opacity-80 group-hover:grayscale-0">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-8 md:h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/15 group-hover:text-white/30 transition-colors duration-500">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
