import { BlogItem } from "@/shared/types/blog";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBlogs() {
  const data = await prisma.blogs.findMany();
  const blogs : BlogItem[] = data.map((blog) => {
    return {
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      createdat: blog.createdat ? blog.createdat.toISOString() : "",
      updatedat: blog.updatedat ? blog.updatedat.toISOString() : "",
    };
  });

  return blogs;;
}

export async function getBlogDetails(slug: string) {
  const data = await prisma.blogs.findUnique({
    where: {
      slug,
    },
  });
  return data;
}
