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

export async function getBlogs(requestData?: { lang: Locale }) {
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
}

export async function getBlogDetails({
  slug,
  lang,
}: {
  slug: string;
  lang: Locale;
}) {
  const langId = await getLanguageId(lang);

  const data = await prisma.blog_translations.findUnique({
    where: {
      slug,
      languageid: langId,
    },
  });

  return data;
}

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
