import "server-only";

import type { Locale } from "./i18n-config";

const dictionaries = {
  en: () => import("./shared/dictionaries/en.json").then((mod) => mod.default),
  vi: () => import("./shared/dictionaries/vi.json").then((mod) => mod.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.vi();
}
