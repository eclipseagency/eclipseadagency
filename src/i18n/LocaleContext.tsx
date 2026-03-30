"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Locale } from "./locales";
import { defaultLocale } from "./locales";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

// Lazy-load translations
let translationsCache: Record<string, Record<string, string>> = {};

async function loadTranslations(locale: Locale) {
  if (translationsCache[locale]) return translationsCache[locale];
  const mod = await import(`./translations/${locale}.json`);
  translationsCache[locale] = mod.default;
  return mod.default;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Priority: URL param > localStorage > browser language > default
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang") as Locale | null;
    const stored = localStorage.getItem("locale") as Locale | null;
    const browserLang = navigator.language?.startsWith("ar") ? "ar" as Locale : null;
    const initial = urlLang || stored || browserLang || defaultLocale;
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    if (locale === "ar") {
      document.documentElement.classList.add("ar");
    } else {
      document.documentElement.classList.remove("ar");
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string) => translations[key] || key,
    [translations]
  );

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}
