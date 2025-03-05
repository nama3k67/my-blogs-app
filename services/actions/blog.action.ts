import { cache } from "react";

import { Locale } from "@/i18n-config";
import prisma from "@/shared/libs/prisma";
import { slugify } from "@/shared/libs/utils";
import { BlogItem } from "@/shared/types/blog";

import { BlogRecreateRequest } from "../type/blog.type";
import { getLanguage } from "./lang.action";

async function getLanguageId(code: Locale) {
  const language = await getLanguage({ code });

  if (!language) {
    throw new Error("Language not found");
  }
  return language.id;
}

export const getBlogs = cache(async (requestData?: { lang: Locale }) => {
  let langId;
  if (requestData) {
    langId = await getLanguageId(requestData.lang);
  }

  const data = await prisma.blog_translations.findMany({
    where: { languageid: langId },
    include: { blogs: true },
  });

  const blogs: BlogItem[] = data.map((blog) => {
    return {
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      description: blog.description,
      createdat: blog.blogs.createdat ? blog.blogs.createdat.toISOString() : "",
      updatedat: blog.blogs.updatedat ? blog.blogs.updatedat.toISOString() : "",
    };
  });

  return blogs;
});

export const getBlogDetails = cache(
  async ({ slug, lang }: { slug: string; lang: Locale }) => {
    // First find the original blog translation to get the blog ID
    const originalTranslation = await prisma.blog_translations.findUnique({
      where: { slug },
      select: { blogid: true },
    });

    if (!originalTranslation) {
      return null; // Blog not found with this slug
    }

    // Get the language ID for the target language
    const langId = await getLanguageId(lang);

    // Find the translation in the requested language using the blog ID
    const translation = await prisma.blog_translations.findUnique({
      where: {
        blogid_languageid: {
          blogid: originalTranslation.blogid,
          languageid: langId,
        },
      },
      include: {
        blogs: true,
      },
    });

    // If no translation exists in the requested language, return null
    if (!translation) {
      return null;
    }

    return translation;
  }
);

export async function createBlog(data: BlogRecreateRequest) {
  const langId = await getLanguageId(data.lang);
  const slug = slugify(data.title);

  const blog = await prisma.blogs.create({ data: { userid: data.userId } });
  const blogTranslation = await prisma.blog_translations.create({
    data: {
      blogid: blog.id,
      languageid: langId,
      title: data.title,
      content: data.content,
      description: data.description,
      slug,
    },
  });

  return blogTranslation;
}
