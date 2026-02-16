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
        <span className="mb-4 inline-block text-primary text-sm font-semibold uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
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
