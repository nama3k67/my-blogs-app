import { LoginForm } from "@/components/auth/login-form";
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
    title: dictionary.log_in.title,
    description: dictionary.log_in.description,
  };
}

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
