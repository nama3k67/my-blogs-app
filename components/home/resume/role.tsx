import { getDictionary } from "@/get-dictionary";
import Image, { ImageProps } from "next/image";

export type Role = {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
};

export default function RoleItem({
  role,
  dictionary,
}: {
  role: Role;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  const startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  const endLabel = typeof role.end === "string" ? role.end : role.end.label;
  const endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="flex items-center gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>

      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">{dictionary.resume.company}</dt>
        <dd className="w-full flex-none text-sm leading-6 font-medium text-zinc-700 dark:text-zinc-300">
          {role.company}
        </dd>
        <dt className="sr-only">{dictionary.resume.role}</dt>
        <dd className="text-xs text-zinc-500 leading-5 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">{dictionary.resume.date}</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${role.start} ${dictionary.resume.until} ${role.end}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">-</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
}
