"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { i18n, Locale } from "@/i18n-config";
import { useTranslation } from "@/providers/translation.provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const { dictionary, lang } = useTranslation();
  const router = useRouter();

  const onLocaleChange = (locale: Locale) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = locale;

    router.push(segments.join("/"));
  };

  return (
    <Select defaultValue={lang} onValueChange={onLocaleChange}>
      <SelectTrigger
        showIcon={false}
        className="border-none shadow-none w-fit hover:bg-accent hover:text-accent-foreground rounded-full px-2"
      >
        <Globe
          strokeWidth={1.5}
          className="!size-6 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:stroke-white/90 [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
        />
      </SelectTrigger>

      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value={i18n.locales[0]}>
            {dictionary.locale_switcher.en}
          </SelectItem>
          <SelectItem value={i18n.locales[1]}>
            {dictionary.locale_switcher.vi}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
