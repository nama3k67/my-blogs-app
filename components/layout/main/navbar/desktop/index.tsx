import { getDictionary } from "@/get-dictionary";
import NavItem from "./item";

export default function DesktopNavbar(
  props: React.ComponentPropsWithoutRef<"nav">,
  dictionary: Awaited<ReturnType<typeof getDictionary>>
) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href={dictionary.navigation.home}>Home</NavItem>
        <NavItem href={dictionary.navigation.blogs}>Blogs</NavItem>
        <NavItem href={dictionary.navigation.about}>About</NavItem>
        <NavItem href={dictionary.navigation.contact}>Contact</NavItem>
      </ul>
    </nav>
  );
}
