import path from "path";
import { cache } from "react";
import fs from "fs/promises";

import { Locale } from "@/i18n-config";
import { AboutContent } from "../type/about.type";

export const getAboutContent = cache(
  async (lang: Locale): Promise<AboutContent> => {
    try {
      const filename = lang === "vi" ? "about-vi.md" : "about-en.md";
      const filepath = path.join(process.cwd(), "app/content", filename);
      const markdownContent = await fs.readFile(filepath, "utf-8");

      return { content: markdownContent };
    } catch {
      const markdownContent = await fs.readFile(
        path.join(process.cwd(), "content", "about-vi.md"),
        "utf-8"
      );
      return { content: markdownContent };
    }
  }
);
