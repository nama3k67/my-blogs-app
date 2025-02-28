import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { getDictionary } from "@/get-dictionary";
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
                {NAVBAR_ITEMS.map((item, index) => (
                  <MobileNavbarItem
                    key={index}
                    href={item.href}
                    setOpen={setOpen}
                  >
                    {navigation[item.name as keyof typeof navigation]}
                  </MobileNavbarItem>
                ))}
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
