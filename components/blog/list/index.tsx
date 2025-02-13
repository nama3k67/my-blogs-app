import { BlogItem as BlogItemType } from "@/shared/types/blog";
import { BlogItem } from "./item";
import { getBlogs } from "@/services/actions/blog.action";

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
