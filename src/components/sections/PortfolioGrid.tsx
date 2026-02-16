"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioItems } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function PortfolioGrid({ limit, showCta = true }: PortfolioGridProps) {
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  return (
    <SectionWrapper>
      <SectionHeader
        badge="Our Work"
        title="Projects That Speak for Themselves"
        subtitle="A selection of our recent work across branding, digital, web development, production, and more."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card group relative overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.25rem]">
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
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                {item.category}
              </span>
              <h3 className="font-heading text-lg font-bold">{item.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.06] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showCta && (
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button href="/portfolio" variant="outline" size="lg">
            View All Projects
          </Button>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
