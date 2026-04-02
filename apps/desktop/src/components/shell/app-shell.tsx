import type { ReactNode } from "react";

import { cn } from "../../lib/cn";


export function AppShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full gap-2 bg-muted/20 p-2">
        {sidebar ?? null}
        {children}
      </div>
    </main>
  );
}

export function AppShellSurface({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-background shadow-xs">
      {children}
    </div>
  );
}

export function AppShellContent({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "app-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-6",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-6",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
