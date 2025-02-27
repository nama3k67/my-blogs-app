import { Locale } from "@/i18n-config";

type FormatDateOptions = {
  locale?: Locale;
};

export function formatDate(
  dateString: string | Date,
  option?: FormatDateOptions
): string {
  const date = new Date(dateString);
  let locale;

  switch (option?.locale) {
    case "en":
      locale = "en-US";
      break;
    case "vi":
      locale = "vi-VN";
      break;
    default:
      locale = "vi-VN";
  }

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
