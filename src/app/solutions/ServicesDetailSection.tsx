"use client";

import Link from "next/link";
import Image from "next/image";
import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function ServicesDetailSection() {
  return (
    <>
      {servicesOverview.map((service, i) => (
        <SectionWrapper key={service.id} id={service.id} dark={i % 2 === 1}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                {service.title}
              </h2>
              <p className="mb-8 text-text-secondary leading-relaxed">
                {service.description}
              </p>
              <ul className="mb-8 grid grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/solutions/${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/50"
              >
                Learn More <ArrowRightIcon size={14} />
              </Link>
            </div>

            {/* Service image */}
            <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Link
                href={`/solutions/${service.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      ))}
    </>
  );
}
