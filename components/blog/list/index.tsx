import { getBlogs } from "@/services/api/blog.service";
import { BlogItem as BlogItemType } from "@/shared/types/blog";
import { BlogItem } from "./item";

export const BlogList = async () => {
  const data = await getBlogs();

  return (
    <>
      {data.map((item: BlogItemType) => (
        <BlogItem key={item.slug} item={item} />
      ))}
    </>
  );
};
