"use client";

import {
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import LoginModal from "./login-modal";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <NextUINavbar
      aria-label="Incapacidades y Soluciones Navbar"
      className="bg-main-blue xl:bg-main-blue-80 backdrop-blur-sm dark:bg-main-dark-blue"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link href="/">
            <img alt="" className="w-12 h-12 rounded-full" src="/icon.jpeg" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          {location.pathname !== siteConfig.links.login.href && <LoginModal />}
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
