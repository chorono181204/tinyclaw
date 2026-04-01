import { useState } from "react";

import { AppHeader } from "./components/shell/app-header";
import {
  AppShell,
  AppShellContent,
  AppShellSurface,
} from "./components/shell/app-shell";
import { AppSidebar } from "./components/shell/app-sidebar";
import { NewTaskDialog } from "./components/shell/new-task-dialog";
import { OverviewContent } from "./components/shell/overview-content";
import { useI18n } from "./i18n/provider";

export function App() {
  const { locale, setLocale, setTheme, t, theme } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  return (
    <AppShell sidebar={<AppSidebar open={sidebarOpen} t={t} />}>
      <AppShellSurface>
          <AppHeader
            locale={locale}
            onLocaleChange={setLocale}
            onNewTask={() => setTaskDialogOpen(true)}
            onThemeChange={setTheme}
            onToggleSidebar={() => setSidebarOpen((value) => !value)}
            t={t}
            theme={theme}
          />

        <AppShellContent>
            <OverviewContent t={t} />
        </AppShellContent>
      </AppShellSurface>

      <NewTaskDialog
        onOpenChange={setTaskDialogOpen}
        open={taskDialogOpen}
        t={t}
      />
    </AppShell>
  );
}
