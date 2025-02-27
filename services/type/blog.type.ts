import { Locale } from "@/i18n-config";

export type BlogRecreateRequest = {
  userId: number;
  title: string;
  content: string;
  description: string;
  lang: Locale;
};
