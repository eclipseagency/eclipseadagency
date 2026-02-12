"use client";

import Link from "next/link";
import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceIcon, ArrowRightIcon } from "@/components/ui/Icons";

export function ServicesGrid() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        badge="What We Do"
        title="Solutions That Drive Growth"
        subtitle="We combine creativity with strategy to deliver comprehensive services that transform brands and accelerate business growth."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesOverview.map((service) => (
          <Link
            key={service.id}
            href={`/services#${service.id}`}
            className="group rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-border-hover hover:bg-white/[0.06]"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all group-hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]">
              <ServiceIcon icon={service.icon} size={26} />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold">{service.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-secondary">{service.description}</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary opacity-0 transition-all group-hover:opacity-100">
              Learn More <ArrowRightIcon size={14} />
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
