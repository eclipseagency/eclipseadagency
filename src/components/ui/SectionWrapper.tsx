"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({ children, className, id, dark }: SectionWrapperProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "reveal py-20 md:py-28 lg:py-32 px-5 md:px-8",
        dark && "bg-bg-elevated",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}
