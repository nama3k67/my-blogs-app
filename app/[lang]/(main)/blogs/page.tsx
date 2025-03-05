import { Suspense } from "react";

import { BlogList } from "@/components/blog/list";
import { SimpleLayout } from "@/components/layout/shared/simple";
import Loading from "./loading";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const { metadata, blogs } = await getDictionary(lang);

  return {
    title: `${blogs.title} - ${metadata.author}`,
    description: metadata.description,
  };
}

export default async function Blogs({ params }: Props) {
  const { lang } = await params;
  const { blogs } = await getDictionary(lang);

  return (
    <SimpleLayout title={blogs.information} intro={blogs.introduction}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          <Suspense fallback={<Loading />}>
            <BlogList lang={lang} />
          </Suspense>
        </div>
      </div>
    </SimpleLayout>
  );
}
