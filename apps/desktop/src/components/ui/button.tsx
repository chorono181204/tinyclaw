import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
  outline:
    "border border-border/60 bg-background text-foreground hover:bg-muted/40",
  secondary: "bg-muted text-foreground hover:bg-muted/80",
  ghost: "bg-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4",
  sm: "h-8 px-3 text-[13px]",
  icon: "size-9 px-0"
};

export function Button({
  children,
  className,
  size = "default",
  type = "button",
  variant = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
