import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

type BadgeVariant = "default" | "secondary" | "outline" | "subtle";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-muted text-foreground",
  outline: "border-border bg-transparent text-muted-foreground",
  subtle: "border-transparent bg-muted/60 text-muted-foreground"
};

export function Badge({
  className,
  variant = "default",
  ...props
}: ComponentProps<"span"> & {
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-[calc(var(--radius)*0.6)] border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
