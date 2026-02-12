"use client";

import Image from "next/image";
import { clientLogos } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ClientLogos() {
  return (
    <SectionWrapper className="py-14 md:py-20">
      <p className="mb-10 text-center text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
        Trusted by Leading Brands
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
        {clientLogos.map((client) => (
          <div
            key={client.name}
            className="flex h-10 items-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={client.image}
              alt={client.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain md:h-10"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
