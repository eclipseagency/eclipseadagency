import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const isGhost = variant === "ghost";

  const baseClasses = isGhost
    ? "inline-flex items-center justify-center font-bold uppercase tracking-[0.15em] transition-colors duration-300"
    : "btn-hud inline-flex items-center justify-center font-bold uppercase tracking-[0.15em] transition-all duration-300";

  const variants = {
    primary: "btn-hud-primary",
    outline: "btn-hud-outline",
    ghost: "text-text-secondary hover:text-primary bg-transparent",
  };

  const sizes = {
    sm: "px-5 py-2 text-[10px] gap-2 md:px-6 md:py-2.5 md:text-[11px] md:gap-2.5",
    md: "px-6 py-2.5 text-[11px] gap-2.5 md:px-8 md:py-3 md:text-xs md:gap-3",
    lg: "px-6 py-2.5 text-[11px] gap-2.5 md:px-10 md:py-3.5 md:text-[13px] md:gap-3.5",
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = isGhost ? (
    children
  ) : (
    <>
      <span className="btn-hud-chevron btn-hud-chevron-l" aria-hidden>
        &#x2039;&#x2039;
      </span>
      <span className="relative z-10">{children}</span>
      <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
        &#x203A;&#x203A;
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
