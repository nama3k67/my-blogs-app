import Link from "next/link";

interface IProps {
  href: string;
  children: React.ReactNode;
}

export default function MobileNavbar({ href, children }: IProps) {
  return (
    <li>
      <Link
        href={href}
        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
      >
        {children}
      </Link>
    </li>
  );
}
