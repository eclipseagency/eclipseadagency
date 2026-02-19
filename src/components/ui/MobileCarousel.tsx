"use client";

import { useRef, useState, useEffect, Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  children: ReactNode;
  /** Grid classes for desktop, e.g. "sm:grid-cols-2 lg:grid-cols-3" */
  desktopGrid?: string;
  /** Breakpoint at which to switch to grid: "sm" | "md" | "lg" (default "sm") */
  breakpoint?: "sm" | "md" | "lg";
  /** Extra gap class */
  gap?: string;
  /** Mobile card width */
  cardWidth?: string;
}

const bpMap = {
  sm: { flex: "sm:grid sm:overflow-visible sm:snap-none sm:pb-0", item: "sm:min-w-0 sm:shrink", dots: "sm:hidden" },
  md: { flex: "md:grid md:overflow-visible md:snap-none md:pb-0", item: "md:min-w-0 md:shrink", dots: "md:hidden" },
  lg: { flex: "lg:grid lg:overflow-visible lg:snap-none lg:pb-0", item: "lg:min-w-0 lg:shrink", dots: "lg:hidden" },
};

export function MobileCarousel({
  children,
  desktopGrid = "sm:grid-cols-2",
  breakpoint = "sm",
  gap = "gap-4",
  cardWidth = "min-w-[82%]",
}: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);
  const count = items.length;
  const bp = bpMap[breakpoint];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const itemW = first.offsetWidth;
      const gapPx = parseFloat(getComputedStyle(el).gap) || 16;
      setActive(Math.round(el.scrollLeft / (itemW + gapPx)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.children[i] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar",
          gap,
          bp.flex,
          desktopGrid
        )}
      >
        {items.map((child, i) => (
          <div key={i} className={cn("snap-center shrink-0", cardWidth, bp.item)}>
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className={cn("mt-5 flex justify-center gap-1.5", bp.dots)}>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-primary" : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
