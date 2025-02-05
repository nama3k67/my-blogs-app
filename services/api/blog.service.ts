import { BlogDetails, BlogItem } from "@/shared/types/blog";

export const getBlogs = async (): Promise<BlogItem[]> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    cache: "no-store",
  }).then((res) => res.json());

  return data;
};

export const getBlogDetails = async (slug: string): Promise<BlogDetails> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
  ).then((res) => res.json());

  return data;
};
