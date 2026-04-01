import type { ReactNode } from "react";

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
  CheckIcon,
  ChevronDownIcon,
  EnglishFlagIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  SystemIcon,
  VietnameseFlagIcon
} from "./icons";
import type { Locale, ThemeMode, Translator } from "../../i18n/provider";

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

function HeaderSelectButton({
  icon,
  label
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <Button className="h-9 gap-2.5 rounded-lg px-3 text-sm" variant="outline">
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
      <span className="text-muted-foreground">
        <ChevronDownIcon />
      </span>
    </Button>
  );
}

export function AppHeader({
  locale,
  onLocaleChange,
  onNewTask,
  onToggleSidebar,
  onThemeChange,
  theme,
  t
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onNewTask: () => void;
  onToggleSidebar: () => void;
  onThemeChange: (theme: ThemeMode) => void;
  theme: ThemeMode;
  t: Translator;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center">
          <Button className="rounded-lg" onClick={onToggleSidebar} size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 rounded-xl border border-border/70 bg-muted/30 p-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HeaderSelectButton icon={getLocaleIcon(locale)} label={t(`theme.locale.${locale}`)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("theme.locale.label")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-between"
                onClick={() => onLocaleChange("en")}
              >
                <span className="flex items-center gap-2">
                  <EnglishFlagIcon />
                  {t("theme.locale.en")}
                </span>
                <span className={locale === "en" ? "text-foreground" : "text-transparent"}>
                  <CheckIcon />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between"
                onClick={() => onLocaleChange("vi")}
              >
                <span className="flex items-center gap-2">
                  <VietnameseFlagIcon />
                  {t("theme.locale.vi")}
                </span>
                <span className={locale === "vi" ? "text-foreground" : "text-transparent"}>
                  <CheckIcon />
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HeaderSelectButton icon={getThemeIcon(theme)} label={t(`theme.mode.${theme}`)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("theme.mode.label")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-between"
                onClick={() => onThemeChange("light")}
              >
                <span className="flex items-center gap-2">
                  <SunIcon />
                  {t("theme.mode.light")}
                </span>
                <span className={theme === "light" ? "text-foreground" : "text-transparent"}>
                  <CheckIcon />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between"
                onClick={() => onThemeChange("dark")}
              >
                <span className="flex items-center gap-2">
                  <MoonIcon />
                  {t("theme.mode.dark")}
                </span>
                <span className={theme === "dark" ? "text-foreground" : "text-transparent"}>
                  <CheckIcon />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between"
                onClick={() => onThemeChange("system")}
              >
                <span className="flex items-center gap-2">
                  <SystemIcon />
                  {t("theme.mode.system")}
                </span>
                <span className={theme === "system" ? "text-foreground" : "text-transparent"}>
                  <CheckIcon />
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="rounded-lg px-4" onClick={onNewTask}>
            {t("shell.actions.newTask")}
          </Button>
        </div>
      </div>
    </header>
  );
}
