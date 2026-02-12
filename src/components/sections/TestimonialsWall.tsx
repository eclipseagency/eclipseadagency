"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { wallCards, type TestimonialItem } from "@/data/testimonials";

/* ── Inline SVG icons (project pattern — no external icon lib) ── */

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PuzzleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7l.94-5.49-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < count} />
      ))}
    </div>
  );
}

/* ── Cards ── */

function TestimonialCard({ card }: { card: TestimonialItem }) {
  return (
    <div className="tw-card group rounded-2xl border border-white/[0.06] bg-[#111] p-6 md:p-7 transition-all duration-350">
      <h3 className="mb-3 font-heading text-[15px] font-bold leading-snug text-white">
        {card.title}
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-white/50">
        {card.body}
      </p>

      {/* Rating */}
      <div className="mb-5 flex items-center gap-2 text-primary">
        <Stars count={card.rating} />
        <span className="text-sm font-bold text-white">
          {card.rating}.0
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/[0.08]">
          <Image
            src={card.avatar}
            alt={card.name}
            width={36}
            height={36}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{card.name}</p>
          <p className="text-xs text-white/40">{card.role}</p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-white/[0.04] bg-[#0c0c0c] p-6">
      <PuzzleIcon className="mb-3 text-white/[0.07]" />
      <p className="text-xs text-white/[0.12]">Your story could be here</p>
    </div>
  );
}

/* ── Main section ── */

export function TestimonialsWall() {
  const sectionRef = useScrollReveal<HTMLElement>();

  const avatars = wallCards
    .filter((c): c is TestimonialItem => c.type === "testimonial")
    .slice(0, 5);

  return (
    <section
      ref={sectionRef}
      className="testimonials-glow-scope reveal relative overflow-hidden bg-bg-elevated px-5 py-20 md:px-8 md:py-28 lg:py-32"
    >
      {/* ── Scoped ambient glow (ONLY place glow is allowed) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "-180px",
            left: "8%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "-100px",
            right: "5%",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(247,147,30,0.05) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* ── Header ── */}
        <div className="mb-14 text-center md:mb-16">
          {/* Pill label */}
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <HeartIcon />
            Wall of Love
          </span>

          <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[44px]">
            Loved by thinkers
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base text-white/40 md:text-lg">
            Here&apos;s what people worldwide are saying about us
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {wallCards.map((card, i) =>
            card.type === "testimonial" ? (
              <TestimonialCard key={i} card={card} />
            ) : (
              <PlaceholderCard key={i} />
            )
          )}
        </div>

        {/* ── Bottom avatar row ── */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((card, i) => (
              <div
                key={i}
                className="h-7 w-7 overflow-hidden rounded-full border-2 border-bg-elevated"
              >
                <Image
                  src={card.avatar}
                  alt={card.name}
                  width={28}
                  height={28}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40">
            Join{" "}
            <span className="font-semibold text-white/70">15,725+</span>{" "}
            other loving customers
          </p>
        </div>
      </div>
    </section>
  );
}
