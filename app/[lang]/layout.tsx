import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import { getAuth } from "@/actions/user";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { verify } from "@/shared/utils/dal";
import { AuthProvider } from "@/providers/auth.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { TranslationProvider } from "@/providers/translation.provider";
import { UserDetails } from "@/shared/types/user";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["vietnamese", "latin-ext"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { metadata } = await getDictionary(lang);

  return {
    title: metadata.title,
    description: metadata.description,
    authors: { name: metadata.author },
    keywords: metadata.keywords.split(","),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const { isAuth, userId } = await verify();
  let user: UserDetails | null | undefined = null;

  if (userId) {
    user = (await getAuth(userId)).data;
  }

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased flex h-full bg-zinc-50 dark:bg-black`}
      >
        <ThemeProvider>
          <TranslationProvider lang={lang} dictionary={dictionary}>
            <AuthProvider isAuthenticated={isAuth} user={user}>
              {children}
            </AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
