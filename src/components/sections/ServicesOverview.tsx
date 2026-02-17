"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRightIcon, QuoteIcon } from "@/components/ui/Icons";

const services = [
  {
    number: "01",
    title: "Branding",
    subtitle: "CRAFTING STELLAR IDENTITIES",
    image: "/images/services/branding.svg",
  },
  {
    number: "02",
    title: "Animation & Production",
    subtitle: "BRINGING IMAGINATION TO LIFE",
    image: "/images/services/animation.svg",
  },
  {
    number: "03",
    title: "Web & Apps Development",
    subtitle: "BUILDING TOMORROW'S DIGITAL LANDSCAPES",
    image: "/images/services/web-dev.svg",
  },
  {
    number: "04",
    title: "Digital Marketing",
    subtitle: "ACCELERATING YOUR BRAND TO NEW HEIGHTS",
    image: "/images/services/digital-marketing.svg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function ServicesOverview() {
  return (
    <SectionWrapper id="services-overview">
      {/* Header */}
      <div className="mb-14 md:mb-20">
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Services Overview
        </span>
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]">
          Comprehensive Marketing Solutions
        </h2>
        <div className="mt-6 flex items-start gap-3 max-w-2xl">
          <QuoteIcon size={24} className="mt-0.5 shrink-0 text-primary/40" />
          <p className="text-base leading-relaxed text-text-secondary italic md:text-lg">
            Eclipsing the competition, one campaign at a time—where bold ideas meet cosmic results.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer">
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500" />

              {/* Number */}
              <div className="absolute left-5 top-5 z-10">
                <span className="font-heading text-5xl font-bold text-white/10 lg:text-6xl">
                  {service.number}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 lg:p-6">
                <h3 className="font-heading text-xl font-bold text-primary lg:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {service.subtitle}
                </p>
              </div>

              {/* Arrow Button */}
              <div className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:text-primary lg:bottom-6 lg:right-6">
                <ArrowRightIcon size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
