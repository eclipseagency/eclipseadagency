"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { testimonials } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SunlightGlow } from "@/components/ui/SunlightGlow";
import { QuoteIcon } from "@/components/ui/Icons";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { cn } from "@/lib/utils";

/* ── Star SVG ── */
function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7l.94-5.49-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

/* ── Stars row ── */
function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          filled={i < count}
          className={cn(
            "text-primary",
            size === "lg" ? "h-6 w-6" : "h-4 w-4"
          )}
        />
      ))}
    </div>
  );
}

/* ── Single testimonial card ── */
function TestimonialCard({
  t,
  visible,
  index,
}: {
  t: (typeof testimonials)[number];
  visible: boolean;
  index: number;
}) {
  return (
    <div
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Quote icon */}
      <QuoteIcon size={32} className="mb-6 text-primary/20" />

      {/* Quote text */}
      <p className="mb-8 text-[15px] leading-[1.8] text-white/70">
        {t.quote}
      </p>

      {/* Star rating */}
      <div className="mb-6">
        <Stars count={t.rating} />
      </div>

      {/* Divider */}
      <div className="mb-6 h-px w-full bg-white/[0.06]" />

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/[0.08]">
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
          <p className="font-heading text-sm font-bold text-white">{t.name}</p>
          <p className="text-xs text-white/40">{t.title}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ── */
export function Testimonials() {
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => {
              if (prev.has(index)) return prev;
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Compute aggregate rating
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <SectionWrapper dark>
      <SunlightGlow />
      {/* ── Header ── */}
      <div className="mb-16 text-center md:mb-20">
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Testimonials
        </span>
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
          Hear from the brands we&apos;ve partnered with to create meaningful impact and lasting growth.
        </p>

        {/* Aggregate rating row */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Stars count={5} size="lg" />
          <span className="text-lg font-bold text-white">{avgRating}/5</span>
          <span className="text-sm text-white/40">
            based on {testimonials.length}+ reviews
          </span>
        </div>
      </div>

      {/* ── Grid / Carousel ── */}
      <MobileCarousel desktopGrid="md:grid-cols-2" breakpoint="md" gap="gap-6 lg:gap-8">
        {testimonials.map((t, i) => (
          <div key={i} ref={setCardRef(i)}>
            <TestimonialCard
              t={t}
              visible={visibleSet.has(i)}
              index={i}
            />
          </div>
        ))}
      </MobileCarousel>
    </SectionWrapper>
  );
}
