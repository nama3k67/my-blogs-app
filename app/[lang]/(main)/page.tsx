import { Metadata } from "next";

import { HomeBlogList } from "@/components/home/blogList";
import Photos from "@/components/home/photos";
import { Resume } from "@/components/home/resume";
import { Container } from "@/components/shared/container";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { home } = await getDictionary(lang);

  return {
    title: home.title,
    description: home.description,
  };
}

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {dictionary.home.description}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {dictionary.home.introduction}
          </p>
        </div>
      </Container>

      <Photos />

      <Container className="mt-24 md:mt28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <HomeBlogList dictionary={dictionary} lang={lang} />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume dictionary={dictionary} />
          </div>
        </div>
      </Container>
    </>
  );
}
