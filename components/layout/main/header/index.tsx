"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import BlogCreate from "@/components/blog/create";
import { Container } from "@/components/shared/container";
import LocaleSwitcher from "@/components/shared/local-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { handleLogout } from "@/actions/auth";
import { getDictionary } from "@/get-dictionary";
import { useAuth } from "@/providers/auth.provider";
import useHeader from "@/shared/hooks/useHeader";

import DesktopNavbar from "../navbar/desktop";
import MobileNavbar from "../navbar/mobile";
import ThemeToggle from "../themToggle";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...props}
    />
  );
}

const Header: React.FC<Props> = ({ dictionary }: Props) => {
  const { isHomePage, avatarRef, headerRef } = useHeader();
  const { user } = useAuth();

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  >
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4 items-center">
              <div className="flex flex-1">
                {!isHomePage && (
                  <Avatar>
                    <AvatarImage src="/avatar1.jpg" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex justify-end md:justify-center">
                <MobileNavbar
                  dictionary={dictionary}
                  className="pointer-events-auto md:hidden"
                />
                <DesktopNavbar
                  dictionary={dictionary}
                  className="pointer-events-auto hidden md:block"
                />
              </div>
              <div className="flex justify-end items-center gap-1 md:flex-1">
                <div className="pointer-events-auto hidden md:block">
                  <LocaleSwitcher />
                </div>

                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>

              {user ? (
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

                  <DropdownMenuContent
                    className="pointer-events-auto"
                    align="end"
                  >
                    <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
                    <DropdownMenuItem>
                      <BlogCreate />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // <Button
                //   variant="outline"
                //   asChild
                //   className="pointer-events-auto"
                // >
                //   <Link href={ROUTES.PUBLIC.LOGIN}>
                //     {dictionary.log_in.title}
                //   </Link>
                // </Button>
                <></>
              )}
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      )}
    </>
  );
};

export default Header;
