"use client";

import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ServiceIcon } from "@/components/ui/Icons";

export function ServicesDetailSection() {
  return (
    <>
      {servicesOverview.map((service, i) => (
        <SectionWrapper key={service.id} id={service.id} dark={i % 2 === 1}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <ServiceIcon icon={service.icon} size={32} />
              </div>
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">{service.title}</h2>
              <p className="mb-8 text-text-secondary leading-relaxed">{service.description}</p>
              <ul className="grid grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative visual */}
            <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="aspect-[4/3] rounded-2xl border border-border bg-bg-card p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/20 text-primary">
                    <ServiceIcon icon={service.icon} size={56} className="opacity-40" />
                  </div>
                  <div className="absolute -inset-8 rounded-full border border-primary/10 animate-spin-slow" />
                  <div className="absolute -inset-16 rounded-full border border-primary/5" />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}
    </>
  );
}
