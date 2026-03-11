"use client";

/* ═══════════════════════════════════════════════════════════
   SECTION: Partners - Certified partner badges
   ═══════════════════════════════════════════════════════════ */
export function PartnersSection() {
  const partners = [
    { name: "HubSpot", label: "Certified Partner" },
    { name: "Google", label: "Partner" },
    { name: "Semrush", label: "Certified Agency" },
    { name: "Adjust", label: "Solutions Partner" },
  ];

  return (
    <section id="partners" className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-white/20 mb-8 md:text-xs" data-fade>
          Trusted Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((p, i) => (
            <div
              key={p.name}
              data-fade={i * 0.1}
              className="group flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 md:px-5 md:py-2.5 min-h-[44px] transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[#ff6b35]/[0.03]"
            >
              <span className="text-xs md:text-sm font-bold text-white/50 group-hover:text-[#ff6b35] transition-colors">{p.name}</span>
              <span className="text-[11px] uppercase tracking-wider text-white/20">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
