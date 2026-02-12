"use client";

import Image from "next/image";
import { portfolioItems } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  return (
    <SectionWrapper>
      <SectionHeader
        badge="Our Work"
        title="Projects That Speak for Themselves"
        subtitle="A selection of our recent work across branding, digital, web development, production, and more."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            </div>
            <div className="p-5">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.1em] text-primary">
                {item.category}
              </span>
              <h3 className="font-heading text-lg font-bold">{item.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-glass-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <div className="mt-14 text-center">
          <Button href="/portfolio" variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
