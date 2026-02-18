"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRightIcon } from "@/components/ui/Icons";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function SolutionsGrid() {
  return (
    <SectionWrapper>
      <SectionHeader
        badge="What We Do"
        title="Solutions That Drive Growth"
        subtitle="We combine creativity with strategy to deliver comprehensive services that transform brands and accelerate business growth."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {servicesOverview.map((service, i) => (
          <motion.div
            key={service.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Link
              href={`/solutions/${service.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:border-border-hover"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary transition-transform duration-300 group-hover:translate-x-1">
                  Explore Service <ArrowRightIcon size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
