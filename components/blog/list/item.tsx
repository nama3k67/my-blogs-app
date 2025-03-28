import { Card } from "@/components/shared/card";
import { formatDate } from "@/shared/utils/date";
import { ROUTES } from "@/shared/constants";
import { BlogItem as BlogItemType } from "@/shared/types/blog";
import { Locale } from "@/i18n-config";

type Props = {
  item: BlogItemType;
  lang: Locale;
};

export const BlogItem = ({ item, lang }: Props) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`${ROUTES.PUBLIC.BLOG_LIST}/${item.slug}`}>
          {item.title}
        </Card.Title>

        <Card.Eyebrow
          as="time"
          dateTime={item.createdat}
          className="md:hidden"
          decorate
        >
          {formatDate(item.createdat, { locale: lang })}
        </Card.Eyebrow>

        <Card.Description>{item.description}</Card.Description>

        <Card.Cta>Đọc thêm</Card.Cta>
      </Card>

      <Card.Eyebrow
        as="time"
        dateTime={item.createdat}
        className="mt-1 hidden md:block"
      >
        {formatDate(item.createdat)}
      </Card.Eyebrow>
    </article>
  );
};
