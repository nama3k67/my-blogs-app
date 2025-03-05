import { List } from "lucide-react";
import React, { useState } from "react";

import { NAVBAR_ITEMS } from "../constant";
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
import { useTranslation } from "@/providers/translation.provider";
import ThemeToggle from "../../themToggle";

export default function MobileNavbar({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { dictionary, lang } = useTranslation();

  const navigation = dictionary.navigation;
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full">
            <List />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="!bg-zinc-800/40 backdrop-blur-sm" />

          <DialogContent className="sm:max-w-[425px] gap-0">
            <DialogHeader className="text-start mb-4">
              <DialogTitle className="text-zinc-600 font-medium text-base">
                <div className="flex">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </DialogTitle>
            </DialogHeader>

            <nav>
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {NAVBAR_ITEMS.map((item, index) => (
                  <MobileNavbarItem
                    key={index}
                    href={`/${lang}${item.href}`}
                    setOpen={setOpen}
                  >
                    {navigation[item.name as keyof typeof navigation]}
                  </MobileNavbarItem>
                ))}
              </ul>
            </nav>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
