"use client";

import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";

import { Container } from "@/components/shared/container";
import LocaleSwitcher from "@/components/shared/local-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserInfoDialog from "@/components/user/information";

import { getDictionary } from "@/get-dictionary";
import { useAuth } from "@/providers/auth.provider";
import { ROUTES } from "@/shared/constants";
import useHeader from "@/shared/hooks/useHeader";
import { convertUsername } from "@/shared/utils/common";

import DesktopNavbar from "../navbar/desktop";
import MobileNavbar from "../navbar/mobile";
import ThemeToggle from "../themToggle";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

function AvatarContainer({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
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

const Header: FC<Props> = ({ dictionary }: Props) => {
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
                position: "var(--header-position)" as CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as CSSProperties["position"],
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
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>
                      {user && convertUsername(user?.username)}
                    </AvatarFallback>
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
            position: "var(--header-position)" as CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4 items-center">
              <div className="flex flex-1">
                {!isHomePage && (
                  <Avatar>
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>
                      {user && convertUsername(user.username)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex justify-end md:justify-center">
                <MobileNavbar className="pointer-events-auto md:hidden" />
                <DesktopNavbar className="pointer-events-auto hidden md:block" />
              </div>

              <div className="flex justify-end items-center gap-1 md:flex-1">
                <div className="pointer-events-auto hidden md:block">
                  <LocaleSwitcher />
                </div>

                <div className="pointer-events-auto hidden md:block">
                  <ThemeToggle />
                </div>

                {user ? (
                  <UserInfoDialog user={user} dictionary={dictionary} />
                ) : (
                  <Button variant="outline" className="rounded-full">
                    <Link
                      href={ROUTES.PUBLIC.LOGIN}
                      className="pointer-events-auto text-zinc-800 dark:text-zinc-100 font-medium"
                    >
                      {dictionary.log_in.title}
                    </Link>
                  </Button>
                )}
              </div>
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
