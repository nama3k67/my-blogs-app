import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ROUTES } from "@/shared/constants";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
  const headersList = await headers();
  const url = headersList.get("x-current-url") || "";
  const parsedUrl = new URL(url);
  const path = parsedUrl.pathname;

  const pathParts = path.split("/");
  const langFromPath = (pathParts[1] || "en") as Locale;

  const { not_found } = await getDictionary(langFromPath);

  return (
    <Container className="flex h-full w-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {not_found.title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {not_found.description}
        </p>
        <Button variant="secondary" className="mt-4">
          <Link href={ROUTES.PUBLIC.HOME}>{not_found.back_to_home}</Link>
        </Button>
      </div>
    </Container>
  );
}
