"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRightIcon, QuoteIcon } from "@/components/ui/Icons";

const services = [
  {
    number: "01",
    title: "Branding",
    subtitle: "CRAFTING STELLAR IDENTITIES",
    image: "/images/services/branding.png",
  },
  {
    number: "02",
    title: "Animation & Production",
    subtitle: "BRINGING IMAGINATION TO LIFE",
    image: "/images/services/animation.png",
  },
  {
    number: "03",
    title: "Web & Apps Development",
    subtitle: "BUILDING TOMORROW'S DIGITAL LANDSCAPES",
    image: "/images/services/web-dev.png",
  },
  {
    number: "04",
    title: "Digital Marketing",
    subtitle: "ACCELERATING YOUR BRAND TO NEW HEIGHTS",
    image: "/images/services/digital-marketing.png",
  },
];

export function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState(0);

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
        <div className="mt-6 flex max-w-2xl items-start gap-3">
          <QuoteIcon size={24} className="mt-0.5 shrink-0 text-primary/40" />
          <p className="text-base leading-relaxed italic text-text-secondary md:text-lg">
            Eclipsing the competition, one campaign at a time—where bold ideas meet cosmic results.
          </p>
        </div>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden h-[520px] overflow-hidden rounded-2xl lg:flex">
        {services.map((service, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={service.number}
              className="relative cursor-pointer overflow-hidden"
              onMouseEnter={() => setActiveIndex(i)}
              animate={{ flex: isActive ? 4 : 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />

              {/* Dark Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
                animate={{ opacity: isActive ? 1 : 0.85 }}
                transition={{ duration: 0.5 }}
              />

              {/* Collapsed: vertical number + title */}
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-8"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-heading text-4xl font-bold text-white/15">
                  {service.number}
                </span>
                <h3
                  className="mt-4 whitespace-nowrap font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/60"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {service.title}
                </h3>
              </motion.div>

              {/* Expanded: full content */}
              <motion.div
                className="absolute inset-0 z-10 flex flex-col justify-between p-8"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
              >
                {/* Number top-left */}
                <span className="font-heading text-7xl font-bold text-white/10">
                  {service.number}
                </span>

                {/* Content bottom */}
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:bg-primary/20 hover:text-primary">
                    <ArrowRightIcon size={16} />
                  </div>
                </div>
              </motion.div>

              {/* Divider line between cards */}
              {i < services.length - 1 && (
                <div className="absolute right-0 top-0 z-20 h-full w-px bg-white/10" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((service) => (
          <div
            key={service.number}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute left-5 top-5 z-10">
              <span className="font-heading text-5xl font-bold text-white/10">
                {service.number}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <h3 className="font-heading text-xl font-bold text-primary">
                {service.title}
              </h3>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                {service.subtitle}
              </p>
            </div>
            <div className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 backdrop-blur-sm">
              <ArrowRightIcon size={16} />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
