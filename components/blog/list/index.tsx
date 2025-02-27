import { BlogItem as BlogItemType } from "@/shared/types/blog";
import { BlogItem } from "./item";
import { getBlogs } from "@/services/actions/blog.action";
import { Locale } from "@/i18n-config";

export const BlogList = async ({ lang }: { lang: Locale }) => {
  const data = await getBlogs({ lang });

  return (
    <>
      {data.map((item: BlogItemType) => (
        <BlogItem key={item.slug} item={item} lang={lang} />
      ))}
    </>
  );
};
