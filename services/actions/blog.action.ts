import prisma from "@/shared/libs/prisma";
import { BlogItem } from "@/shared/types/blog";
import { slugify } from "@/shared/libs/utils";

import { BlogRecreateRequest } from "../type/blog.type";

export async function getBlogs() {
  const data = await prisma.blogs.findMany();
  const blogs: BlogItem[] = data.map((blog) => {
    return {
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      createdat: blog.createdat ? blog.createdat.toISOString() : "",
      updatedat: blog.updatedat ? blog.updatedat.toISOString() : "",
    };
  });

  return blogs;
}

export async function getBlogDetails(slug: string) {
  const data = await prisma.blogs.findUnique({
    where: {
      slug,
    },
  });
  return data;
}

export async function createBlog(data: BlogRecreateRequest) {
  const slug = slugify(data.title);

  const blog = await prisma.blogs.create({
    data: {
      title: data.title,
      content: data.content,
      userid: data.userId,
      slug,
    },
  });

  return blog;
}
