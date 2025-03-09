import { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/shared/container";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

import AboutContent from "@/components/about";
import { getAboutContent } from "@/services/actions/about.action";

import avatar from "@/shared/images/photos/trekking_avatar.jpeg";
import AboutSocials from "@/components/about/socials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { about, metadata } = await getDictionary(lang);

  return {
    title: `${about.title} - ${metadata.author}`,
    description: about.description,
  };
}

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const data = await getAboutContent(lang);
  const dictionary = await getDictionary(lang);

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-12 lg:grid-rows-[auto_1fr]">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={avatar}
              alt="Noah's avatar"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              priority
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <AboutContent content={data.content} />
        </div>

        <div className="lg:pl-20">
          <AboutSocials dictionary={dictionary} />
        </div>
      </div>
    </Container>
  );
}
