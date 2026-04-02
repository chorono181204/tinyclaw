import { useState } from "react";

import { AppHeader } from "./components/shell/app-header";
import {
  AppShell,
  AppShellContent,
  AppShellSurface,
} from "./components/shell/app-shell";
import { AppSidebar, type AppRouteKey } from "./components/shell/app-sidebar";
import { NewTaskDialog } from "./components/shell/new-task-dialog";
import { OverviewContent } from "./components/shell/overview-content";
import { ChatScreen } from "./features/chat/chat-screen";
import { ProviderSettingsScreen } from "./features/settings/provider-settings-screen";
import { useI18n } from "./i18n/provider";

export function App() {
  const { locale, setLocale, setTheme, t, theme } = useI18n();
  const [activeRoute, setActiveRoute] = useState<AppRouteKey>("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const content =
    activeRoute === "chat"
      ? <ChatScreen t={t} />
      : activeRoute === "config"
        ? <ProviderSettingsScreen t={t} />
        : <OverviewContent t={t} />;

  return (
    <AppShell
      sidebar={
        <AppSidebar
          activeKey={activeRoute}
          onNavigate={setActiveRoute}
          open={sidebarOpen}
          t={t}
        />
      }
    >
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

        <AppShellContent
          className={activeRoute === "chat" ? "overflow-hidden px-0 py-0" : undefined}
          containerClassName={activeRoute === "chat" ? "h-full max-w-none gap-0" : undefined}
        >
          {content}
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
