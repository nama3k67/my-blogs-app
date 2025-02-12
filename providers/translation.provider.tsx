"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

type TranslationContextType = {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// For easier debugging
TranslationContext.displayName = "TranslationContext";

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}

export function TranslationProvider({
  children,
  lang,
  dictionary,
}: TranslationContextType & { children: ReactNode }) {
  const value = useMemo(() => ({ lang, dictionary }), [lang, dictionary]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
