import { useEffect, useState } from "react";

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
import { OnboardingScreen } from "./features/onboarding/onboarding-screen";
import { ProviderSettingsScreen } from "./features/settings/provider-settings-screen";
import { useI18n } from "./i18n/provider";
import { getAppSettings } from "./lib/api";

export function App() {
  const { locale, setLocale, setTheme, t, theme } = useI18n();
  const [activeRoute, setActiveRoute] = useState<AppRouteKey>("chat");
  const [appReady, setAppReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    void getAppSettings()
      .then((settings) => {
        if (!alive) {
          return;
        }
        setNeedsOnboarding(!settings.onboarding.complete);
        if (!settings.onboarding.complete) {
          setActiveRoute("config");
        }
      })
      .finally(() => {
        if (alive) {
          setAppReady(true);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const content =
    needsOnboarding
      ? (
          <OnboardingScreen
            onComplete={() => {
              setNeedsOnboarding(false);
              setActiveRoute("chat");
            }}
            onOpenConfig={() => {
              setNeedsOnboarding(false);
              setActiveRoute("config");
            }}
            t={t}
          />
        )
      : activeRoute === "chat"
      ? <ChatScreen t={t} />
      : activeRoute === "config"
        ? <ProviderSettingsScreen t={t} />
        : <OverviewContent t={t} />;

  if (!appReady) {
    return (
      <AppShell>
        <AppShellSurface>
          <AppHeader
            locale={locale}
            onLocaleChange={setLocale}
            onThemeChange={setTheme}
            onToggleSidebar={() => {}}
            showNewTask={false}
            showSidebarToggle={false}
            t={t}
            theme={theme}
          />
          <AppShellContent>
            <div className="rounded-[calc(var(--radius)+4px)] bg-card px-6 py-5 text-sm text-muted-foreground">
              {t("onboarding.loading")}
            </div>
          </AppShellContent>
        </AppShellSurface>
      </AppShell>
    );
  }

  return (
    <AppShell
      sidebar={needsOnboarding ? undefined : (
        <AppSidebar
          activeKey={activeRoute}
          onNavigate={setActiveRoute}
          open={sidebarOpen}
          t={t}
        />
      )}
    >
      <AppShellSurface>
        <AppHeader
          locale={locale}
          onLocaleChange={setLocale}
          onNewTask={() => setTaskDialogOpen(true)}
          onThemeChange={setTheme}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
          showNewTask={!needsOnboarding}
          showSidebarToggle={!needsOnboarding}
          t={t}
          theme={theme}
        />

        <AppShellContent
          className={needsOnboarding || activeRoute === "chat" ? "overflow-hidden px-0 py-0" : undefined}
          containerClassName={needsOnboarding || activeRoute === "chat" ? "h-full max-w-none gap-0" : undefined}
        >
          {content}
        </AppShellContent>
      </AppShellSurface>

      {!needsOnboarding ? (
        <NewTaskDialog
          onOpenChange={setTaskDialogOpen}
          open={taskDialogOpen}
          t={t}
        />
      ) : null}
    </AppShell>
  );
}
