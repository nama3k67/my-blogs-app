import Link from "next/link";

export function SocialLink({
  href,
  icon: Icon,
  children,
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className: string }>;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center mt-2 text-sm font-medium text-zinc-800 space-x-4 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
    >
      <Icon className="w-6 h-6 flex flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      <span>{children}</span>
    </Link>
  );
}
