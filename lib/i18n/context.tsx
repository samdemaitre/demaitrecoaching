"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, nl, es, fr, de, type Language, type Translations } from "./index";

const TRANSLATIONS: Record<Language, Translations> = { en, nl, es, fr, de };
const STORAGE_KEY = "demaitre-lang";
const DEFAULT_LANG: Language = "es";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && stored in TRANSLATIONS) setLangState(stored);
    } catch {}
  }, []);

  function setLang(next: Language) {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
