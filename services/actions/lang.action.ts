import prisma from "@/shared/libs/prisma";
import { LanguageRequest } from "../type/language.type";

export async function getLanguage({ code }: LanguageRequest) {
  const data = await prisma.languages.findUnique({
    where: { code },
  });
  return data;
}
