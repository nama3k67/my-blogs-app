import { Suspense } from "react";

import { BlogList } from "@/components/blog/list";
import { SimpleLayout } from "@/components/layout/shared/simple";
import Loading from "./loading";
import { Locale } from "@/i18n-config";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function Blogs({ params }: Props) {
  const { lang } = await params;

  return (
    <SimpleLayout
      title="Blogs về thể thao, sức khỏe và công nghệ"
      intro="Là một lập trình viên đam mê thể thao sức bền, mình muốn chia sẻ những kiến thức của mình về dinh dưỡng, phương pháp tập luyện và công nghệ"
    >
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
