import { getDictionary } from "@/get-dictionary";
import { NAVBAR_ITEMS } from "../constant";
import NavItem from "./item";

export default function DesktopNavbar({
  dictionary,
  ...props
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
} & React.ComponentPropsWithoutRef<"nav">) {
  const navigation = dictionary.navigation;

  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {NAVBAR_ITEMS.map((item, index) => (
          <NavItem key={index} href={item.href}>
            {navigation[item.name as keyof typeof navigation]}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}
