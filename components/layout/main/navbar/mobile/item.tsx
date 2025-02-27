import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  href: string;
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
}

export default function MobileNavbarItem({ href, setOpen, children }: IProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Allow the dialog animation to complete before navigating
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <li>
      <Link href={href} onClick={handleClick} className="block px-2 py-3">
        {children}
      </Link>
    </li>
  );
}
