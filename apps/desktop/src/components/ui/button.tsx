import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "default" | "outline" | "secondary" | "ghost";
export type ButtonSize = "default" | "sm" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/95",
  outline:
    "border border-border/70 bg-background text-foreground shadow-xs hover:bg-muted/35",
  secondary: "bg-muted text-foreground hover:bg-muted/90",
  ghost: "bg-transparent text-muted-foreground hover:bg-muted/35 hover:text-foreground"
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
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
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
