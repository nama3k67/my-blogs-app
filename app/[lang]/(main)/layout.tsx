import Footer from "@/components/layout/main/footer";
import Header from "@/components/layout/main/header";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

interface IProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainLayout({ params, children }: IProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>

      <div className="relative flex w-full flex-col">
        <Header dictionary={dictionary} />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
