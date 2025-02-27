import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { getDictionary } from "@/get-dictionary";
import { ROUTES } from "@/shared/constants";
import MobileNavbarItem from "./item";

import LocaleSwitcher from "@/components/shared/local-switcher";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MobileNavbar({
  dictionary,
  ...props
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
} & React.ComponentPropsWithoutRef<"div">) {
  const navigation = dictionary.navigation;
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Menu <ChevronDown />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="!bg-zinc-800/40 backdrop-blur-sm" />

          <DialogContent className="sm:max-w-[425px] gap-0">
            <DialogHeader className="text-start mb-4">
              <DialogTitle className="text-zinc-600 font-medium text-base">
                Navigation
              </DialogTitle>
            </DialogHeader>

            <nav>
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavbarItem href={ROUTES.PUBLIC.HOME} setOpen={setOpen}>
                  {navigation.home}
                </MobileNavbarItem>
                <MobileNavbarItem
                  href={ROUTES.PUBLIC.BLOG_LIST}
                  setOpen={setOpen}
                >
                  {navigation.blogs}
                </MobileNavbarItem>
                <MobileNavbarItem href={ROUTES.PUBLIC.ABOUT} setOpen={setOpen}>
                  {navigation.about}
                </MobileNavbarItem>
                <MobileNavbarItem
                  href={ROUTES.PUBLIC.CONTACT}
                  setOpen={setOpen}
                >
                  {navigation.contact}
                </MobileNavbarItem>
              </ul>
            </nav>

            <div className="flex justify-end mt-1">
              <LocaleSwitcher />
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
