import { BlogItem as BlogItemType } from "@/shared/types/blog";
import { getBlogs } from "@/services/actions/blog.action";
import { HomeBlogItem } from "./blogItem";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

type Props = {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

export const HomeBlogList = async ({ dictionary, lang }: Props) => {
  const data = await getBlogs({ lang });

  return (
    <>
      {data.map((item: BlogItemType) => (
        <HomeBlogItem
          key={item.slug}
          item={item}
          dictionary={dictionary}
          lang={lang}
        />
      ))}
    </>
  );
};
