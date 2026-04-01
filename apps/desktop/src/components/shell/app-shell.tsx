import type { ReactNode } from "react";


export function AppShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-shell text-shell-foreground">
      <div className="flex min-h-screen gap-2 bg-shell p-2">
        {sidebar}
        {children}
      </div>
    </main>
  );
}

export function AppShellSurface({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface text-surface-foreground shadow-xs">
      {children}
    </div>
  );
}

export function AppShellContent({ children }: { children: ReactNode }) {
  return (
    <section className="flex-1 overflow-y-auto px-6 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
    </section>
  );
}
