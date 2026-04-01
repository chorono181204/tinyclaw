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
          <Button onClick={onToggleSidebar} size="icon" variant="outline">
            <MenuIcon />
          </Button>
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

          <Button onClick={onNewTask}>{t("shell.actions.newTask")}</Button>
        </div>
      </div>
    </header>
  );
}
