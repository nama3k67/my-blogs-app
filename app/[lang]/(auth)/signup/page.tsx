import { SignupForm } from "@/components/auth/signup-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.sign_up.title} | ${dictionary.metadata.author}`,
    description: dictionary.sign_up.description,
  };
}

export default function Page() {
  return (
    <div className="flex min-h-svh w-full h-svh items-center justify-center p-0 md:p-10">
      <div className="w-full sm:max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
