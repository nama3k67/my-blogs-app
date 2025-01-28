"use client";

import { Container } from "@/components/shared/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useHeader from "@/shared/hooks/useHeader";
import DesktopNavbar from "./navbar/desktop";
import MobileNavbar from "./navbar/mobile";
import ThemeToggle from "./themToggle";

const Header: React.FC = () => {
  const { isHomePage, avatarRef, headerRef } = useHeader();

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
                  <Avatar>
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                  {/* <AvatarContainer
                          className="absolute left-0 top-3 origin-left transition-opacity"
                          style={{
                            opacity: "var(--avatar-border-opacity, 0)",
                            transform: "var(--avatar-border-transform)",
                          }}
                        />
                        <Avatar
                          large
                          className="block h-16 w-16 origin-left"
                          style={{ transform: "var(--avatar-image-transform)" }}
                        /> */}
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
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <Avatar>
                    <AvatarImage src="/avatar1.jpg" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                  // <AvatarContainer>
                  //   <Avatar />
                  // </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavbar className="pointer-events-auto md:hidden" />
                <DesktopNavbar className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
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
