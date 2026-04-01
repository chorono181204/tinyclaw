import type { InputHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[calc(var(--radius)*0.8)] border border-input bg-transparent px-3 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      type={type}
      {...props}
    />
  );
}
