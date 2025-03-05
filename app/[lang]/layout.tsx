import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";

import "../globals.css";

import { getAuth } from "@/actions/user";
import TokenRefresher from "@/components/shared/tokenRefresher";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { AuthProvider } from "@/providers/auth.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { TranslationProvider } from "@/providers/translation.provider";
import { TOKEN } from "@/shared/constants";
import { UserDetails } from "@/shared/types/user";
import { verify } from "@/shared/utils/dal";

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

  const authResult = await verify();
  let user: UserDetails | null | undefined = null;

  // For token refresh
  let needsRefresh = false;
  let refreshToken = "";

  if (authResult.userId) {
    user = (await getAuth(authResult.userId)).data;

    // Just check if refresh is needed, but don't refresh here
    if (authResult.needsRefresh && authResult.email) {
      needsRefresh = true;
      const cookieStore = await cookies();
      const refreshCookie = cookieStore.get(TOKEN.REFRESH);
      if (refreshCookie) {
        refreshToken = refreshCookie.value;
      }
    }
  }

  return (
    <html lang={lang} className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased flex h-full bg-zinc-50 dark:bg-black`}
      >
        {/* Add the TokenRefresher component if refresh is needed */}
        {needsRefresh && authResult.email && (
          <TokenRefresher
            needsRefresh={needsRefresh}
            userId={authResult.userId as number}
            email={authResult.email}
            refreshToken={refreshToken}
          />
        )}

        <ThemeProvider>
          <TranslationProvider lang={lang} dictionary={dictionary}>
            <AuthProvider isAuthenticated={authResult.isAuth} user={user}>
              {children}
            </AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
