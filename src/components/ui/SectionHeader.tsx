import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ badge, title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-14 md:mb-20", centered && "text-center", className)}>
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
