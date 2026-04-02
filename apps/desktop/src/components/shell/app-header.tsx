import { getCurrentWindow } from "@tauri-apps/api/window";
import type { MouseEvent } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
  ChevronDownIcon,
  CloseWindowIcon,
  EnglishFlagIcon,
  MaximizeIcon,
  MenuIcon,
  MinimizeIcon,
  MoonIcon,
  SunIcon,
  SystemIcon,
  VietnameseFlagIcon
} from "./icons";
import type { Locale, ThemeMode, Translator } from "../../i18n/provider";

const isTauriWindow = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

function getLocaleIcon(locale: Locale) {
  return locale === "vi" ? <VietnameseFlagIcon /> : <EnglishFlagIcon />;
}

function getThemeIcon(theme: ThemeMode) {
  if (theme === "dark") {
    return <MoonIcon />;
  }

  if (theme === "system") {
    return <SystemIcon />;
  }

  return <SunIcon />;
}

export function AppHeader({
  locale,
  onLocaleChange,
  onNewTask,
  onToggleSidebar,
  onThemeChange,
  showNewTask = true,
  showSidebarToggle = true,
  theme,
  t
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onNewTask?: () => void;
  onToggleSidebar: () => void;
  onThemeChange: (theme: ThemeMode) => void;
  showNewTask?: boolean;
  showSidebarToggle?: boolean;
  theme: ThemeMode;
  t: Translator;
}) {
  const appWindow = isTauriWindow ? getCurrentWindow() : null;
  const handleDragStart = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    void appWindow?.startDragging();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background">
      {isTauriWindow ? (
        <div className="flex h-11 items-center border-b border-border/60 px-3">
          <div
            className="h-full min-w-0 flex-1"
            onMouseDown={handleDragStart}
          />

          <div className="ml-3 flex items-center gap-1">
            <button
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              onClick={() => void appWindow?.minimize()}
              type="button"
            >
              <MinimizeIcon />
            </button>
            <button
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              onClick={() => void appWindow?.toggleMaximize()}
              type="button"
            >
              <MaximizeIcon />
            </button>
            <button
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/14 hover:text-destructive"
              onClick={() => void appWindow?.close()}
              type="button"
            >
              <CloseWindowIcon />
            </button>
          </div>
        </div>
      ) : null}

      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center">
            {showSidebarToggle ? (
              <Button onClick={onToggleSidebar} size="icon" variant="outline">
                <MenuIcon />
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {getLocaleIcon(locale)}
                  {t(`theme.locale.${locale}`)}
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("theme.locale.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onLocaleChange("en")}>
                  <EnglishFlagIcon />
                  {t("theme.locale.en")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLocaleChange("vi")}>
                  <VietnameseFlagIcon />
                  {t("theme.locale.vi")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {getThemeIcon(theme)}
                  {t(`theme.mode.${theme}`)}
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("theme.mode.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onThemeChange("light")}>
                  <SunIcon />
                  {t("theme.mode.light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onThemeChange("dark")}>
                  <MoonIcon />
                  {t("theme.mode.dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onThemeChange("system")}>
                  <SystemIcon />
                  {t("theme.mode.system")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {showNewTask && onNewTask ? (
              <Button onClick={onNewTask}>{t("shell.actions.newTask")}</Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
