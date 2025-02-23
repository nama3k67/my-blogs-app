import { getDictionary } from "@/get-dictionary";
import NavItem from "./item";
import { ROUTES } from "@/shared/constants";

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
        <NavItem href={ROUTES.PUBLIC.HOME}>{navigation.home}</NavItem>
        <NavItem href={ROUTES.PUBLIC.BLOG_LIST}>{navigation.blogs}</NavItem>
        <NavItem href={ROUTES.PUBLIC.ABOUT}>{navigation.about}</NavItem>
        <NavItem href={ROUTES.PUBLIC.CONTACT}>{navigation.contact}</NavItem>
      </ul>
    </nav>
  );
}
