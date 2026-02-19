"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { MobileCarousel } from "@/components/ui/MobileCarousel";

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

function ServiceCard({ service, index }: { service: (typeof servicesOverview)[number]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link
        href={`/solutions/${service.id}`}
        className="glass-card group block h-full p-8"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary transition-all duration-300 group-hover:bg-primary/[0.15] group-hover:shadow-[0_0_20px_rgba(255,107,53,0.15)]">
          <ServiceIcon icon={service.icon} size={24} />
        </div>
        <h3 className="mb-3 font-heading text-xl font-bold">{service.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">{service.description}</p>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          Learn More <ArrowRightIcon size={14} />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesGrid() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        badge="What We Do"
        title="Solutions That Drive Growth"
        subtitle="We combine creativity with strategy to deliver comprehensive services that transform brands and accelerate business growth."
      />

      <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-5">
        {servicesOverview.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </MobileCarousel>
    </SectionWrapper>
  );
}
