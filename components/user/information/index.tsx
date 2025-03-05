import { ChevronDown, Settings } from "lucide-react";

import { handleLogout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { UserDetails } from "@/shared/types/user";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  user: UserDetails;
};

export default function UserInfoDialog({ dictionary, user }: Props) {
  const { user_dialog } = dictionary;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="pointer-events-auto rounded-full shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        >
          <Button variant="ghost" className="border-none">
            <div>{user.username}</div>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="pointer-events-auto" align="end">
          <DropdownMenuItem>
            <DialogTrigger>{user_dialog.user_info}</DialogTrigger>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <BlogCreate />
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleLogout}>
            {user_dialog.logout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogPortal>
        <DialogOverlay className="!bg-zinc-800/40 backdrop-blur-sm" />

        <DialogContent className="sm:max-w-[625px] gap-0">
          <DialogHeader className="text-start mb-4">
            <DialogTitle className="text-zinc-700 dark:text-zinc-300 font-medium text-base">
              <div className="flex items-center gap-1">
                <Settings size={20} /> {user_dialog.acc_setting}
              </div>
            </DialogTitle>
            <DialogDescription>
              {user_dialog.acc_setting_desc}
            </DialogDescription>
            <Separator />
          </DialogHeader>

          <div>
            <Tabs
              defaultValue="account"
              orientation="vertical"
              className="flex gap-4"
            >
              <TabsList className="flex-col gap-2 h-fit">
                <TabsTrigger value="account">
                  {user_dialog.information}
                </TabsTrigger>
                <TabsTrigger value="password">
                  {user_dialog.change_password}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <div>{user_dialog.information}</div>
              </TabsContent>
              <TabsContent value="password">
                <div>{user_dialog.change_password}</div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
