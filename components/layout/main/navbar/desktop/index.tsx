import { ROUTES } from "@/shared/constants";
import NavItem from "./item";

export default function DesktopNavbar(
  props: React.ComponentPropsWithoutRef<"nav">
) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href={ROUTES.HOME}>Home</NavItem>
        <NavItem href={ROUTES.BLOGS.LIST}>Blogs</NavItem>
        <NavItem href={ROUTES.ABOUT}>About</NavItem>
        <NavItem href={ROUTES.CONTACT}>Contact</NavItem>
      </ul>
    </nav>
  );
}
