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
    "inline-flex items-center justify-center font-bold uppercase tracking-[0.1em] transition-all duration-200 rounded-full";

  const variants = {
    primary: "btn-gradient text-white",
    outline:
      "border border-glass-border text-text hover:border-primary hover:text-primary bg-transparent",
    ghost: "text-text-secondary hover:text-primary bg-transparent",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-sm",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

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
