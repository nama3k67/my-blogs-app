import { ROUTES } from "@/shared/constants";

type NavbarItem = {
  name: string;
  href: string;
};

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    name: "home",
    href: ROUTES.PUBLIC.HOME,
  },
  {
    name: "projects",
    href: ROUTES.PUBLIC.PROJECTS,
  },
  {
    name: "blogs",
    href: ROUTES.PUBLIC.BLOG_LIST,
  },
  {
    name: "about",
    href: ROUTES.PUBLIC.ABOUT,
  },
];
