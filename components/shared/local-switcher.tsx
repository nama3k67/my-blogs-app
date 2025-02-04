"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n, Locale } from "@/i18n-config";

export default function LocaleSwitcher() {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) {
      return "/";
    }

    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <p>Locale Switcher</p>

      <ul>
        {i18n.locales.map((locale) => (
          <li key={locale}>
            <Link href={redirectedPathname(locale)}>{locale}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
