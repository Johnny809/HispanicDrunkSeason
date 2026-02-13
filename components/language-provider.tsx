"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Lang = "en" | "es";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const dictionary: Record<Lang, Record<string, string>> = {
  en: {
    demoTitle: "AI shopping demo",
    hottest: "Hottest sells today",
    securityLock: "Security incident mode is active. Public access is temporarily locked.",
    restore: "We are restoring service shortly."
  },
  es: {
    demoTitle: "Demostración de compras con IA",
    hottest: "Ventas más calientes de hoy",
    securityLock: "El modo de incidente de seguridad está activo. El acceso público está bloqueado temporalmente.",
    restore: "Estamos restaurando el servicio en breve."
  }
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key: string) => dictionary[lang][key] ?? dictionary.en[key] ?? key
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
