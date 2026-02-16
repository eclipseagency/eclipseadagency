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
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "rounded-xl bg-primary text-black hover:bg-primary-light hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105",
    outline:
      "rounded-xl border border-white/20 text-white hover:bg-white/5 hover:border-primary/50",
    ghost:
      "text-text-secondary hover:text-primary bg-transparent",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-sm",
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
