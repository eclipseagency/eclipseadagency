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
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-primary/50"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                unoptimized
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            </div>
            <div className="p-5">
              <span className="mb-2 inline-block text-xs font-semibold text-primary">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary"
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
