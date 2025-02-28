import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

import { ROUTES } from "@/shared/constants";
import { BlogItem } from "@/shared/types/blog";
import { formatDate } from "@/shared/utils/date";
import { Card } from "../shared/card";

type Props = {
  item: BlogItem;
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

export const HomeBlogItem = ({ item, lang, dictionary }: Props) => {
  return (
    <Card as="article">
      <Card.Title href={`${ROUTES.PUBLIC.BLOG_LIST}/${item.slug}`}>{item.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={item.createdat} decorate>
        {formatDate(item.createdat, { locale: lang })}
      </Card.Eyebrow>
      <Card.Description>{item.description}</Card.Description>
      <Card.Cta>{dictionary.home.read_article}</Card.Cta>
    </Card>
  );
};
