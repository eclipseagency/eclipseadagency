"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesOverview } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRightIcon, ServiceIcon } from "@/components/ui/Icons";

type Service = (typeof servicesOverview)[0];

function BentoCard({
  service,
  index,
  className = "",
  featured = false,
}: {
  service: Service;
  index: number;
  className?: string;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35) }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] ${className}`}
    >
      {/* Clickable overlay */}
      <Link
        href={`/solutions/${service.slug}`}
        className="absolute inset-0 z-10"
        aria-label={service.title}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

      {/* Bottom orange radial glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, #ff6b35 0%, transparent 65%)",
        }}
      />

      {/* Decorative number */}
      <div className="absolute right-4 top-3 select-none font-heading text-8xl font-black leading-none text-white/[0.04]">
        {num}
      </div>

      {/* Content */}
      <div className="relative z-[1] flex h-full flex-col justify-end p-5 lg:p-6">
        {/* Service icon */}
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary backdrop-blur-sm">
          <ServiceIcon icon={service.icon} size={16} />
        </div>

        {/* Title */}
        <h3
          className={`font-heading font-bold text-white ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        {featured ? (
          <p className="mt-2 text-sm leading-relaxed text-white/55 line-clamp-2">
            {service.description}
          </p>
        ) : (
          <p className="mt-1 line-clamp-1 text-xs text-white/40">
            {service.description.split(".")[0]}
          </p>
        )}

        {/* Explore CTA */}
        <div className="mt-3 flex translate-y-1 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Explore <ArrowRightIcon size={11} />
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesGrid() {
  const services = servicesOverview;

  return (
    <SectionWrapper id="services">
      <SectionHeader
        badge="What We Do"
        title="Solutions That Drive Growth"
        subtitle="We combine creativity with strategy to deliver comprehensive services that transform brands and accelerate business growth."
      />

      {/* Mobile & tablet: 2-column uniform grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s, i) => (
          <div key={s.id} className="aspect-[4/3]">
            <BentoCard service={s} index={i} className="h-full" />
          </div>
        ))}
      </div>

      {/* Desktop: bento grid
          Layout:
          [ Branding (2×2) ] [ Digital Marketing ]
          [               ] [ Web & Apps         ]
          [ Animation ] [ Production ] [ 3D Creations ]
      */}
      <div
        className="hidden lg:grid lg:grid-cols-3 lg:gap-4"
        style={{ gridAutoRows: "220px" }}
      >
        {/* Featured large card */}
        <BentoCard
          service={services[0]}
          index={0}
          className="col-span-2 row-span-2"
          featured
        />
        {/* Right column – stacked */}
        <BentoCard service={services[1]} index={1} />
        <BentoCard service={services[2]} index={2} />
        {/* Bottom row – 3 equal */}
        <BentoCard service={services[3]} index={3} />
        <BentoCard service={services[4]} index={4} />
        <BentoCard service={services[5]} index={5} />
      </div>
    </SectionWrapper>
  );
}
