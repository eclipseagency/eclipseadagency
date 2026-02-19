"use client";

import { MobileCarousel } from "@/components/ui/MobileCarousel";

interface Value {
  title: string;
  description: string;
}

export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-4" gap="gap-6" cardWidth="min-w-[75%]">
      {values.map((value) => (
        <div
          key={value.title}
          className="rounded-2xl border border-border bg-bg-card p-7 text-center h-full"
        >
          <h3 className="mb-3 font-heading text-xl font-bold">
            {value.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {value.description}
          </p>
        </div>
      ))}
    </MobileCarousel>
  );
}
