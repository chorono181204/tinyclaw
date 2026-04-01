import {
  createContext,
  type ReactNode,
  useEffect,
  useContext,
  useMemo,
  useState
} from "react";

import { en } from "./en";
import { vi } from "./vi";

const dictionaries = {
  en,
  vi
} as const;

export type Locale = keyof typeof dictionaries;
export type ThemeMode = "light" | "dark" | "system";
type MessageTree = typeof en;
type DotPath<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${DotPath<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type Translator = (path: DotPath<MessageTree>) => string;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  t: Translator;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getValue(obj: unknown, path: string): string {
  return path
    .split(".")
    .reduce<unknown>((acc, key) => (acc as Record<string, unknown>)[key], obj) as string;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = window.localStorage.getItem("tinyclaw-locale");
    return stored === "vi" ? "vi" : "en";
  });
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem("tinyclaw-theme");
    return stored === "dark" || stored === "system" ? stored : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("tinyclaw-locale", locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem("tinyclaw-theme", theme);

    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", shouldUseDark);
  }, [theme]);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = dictionaries[locale];

    return {
      locale,
      setLocale,
      theme,
      setTheme,
      t: (path) => getValue(dictionary, path)
    };
  }, [locale, theme]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
