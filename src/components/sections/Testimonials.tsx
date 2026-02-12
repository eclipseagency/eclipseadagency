"use client";

import Image from "next/image";
import { testimonials } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuoteIcon } from "@/components/ui/Icons";

export function Testimonials() {
  return (
    <SectionWrapper dark>
      <SectionHeader
        badge="Testimonials"
        title="What Our Clients Say"
        subtitle="Hear from the brands we've partnered with to create meaningful impact and lasting growth."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-bg-card p-8 md:p-10"
          >
            <QuoteIcon size={36} className="mb-5 text-primary/30" />
            <p className="mb-8 text-base leading-relaxed text-text-secondary">{t.quote}</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-glass-border">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-heading text-sm font-bold">{t.name}</p>
                <p className="text-xs text-text-muted">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
