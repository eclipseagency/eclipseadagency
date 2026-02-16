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
            className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <ServiceIcon icon={service.icon} size={26} />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-secondary">{service.description}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
              Learn More <ArrowRightIcon size={14} />
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
