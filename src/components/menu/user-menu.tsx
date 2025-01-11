"use client";

import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

import { IconUserCog, IconArrowAutofitLeft } from "@tabler/icons-react";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

import { DASHBOARD_MENU } from "@/components/menu/dashboard-menu";
import { USER_ROLE } from "@/types/role";
import { ThemeSwitch } from "../theme-switch";

export default function UserMenu() {
  const { user } = useAuth();

  return (
    <nav className="flex flex-col gap-2 w-fit">
      <Card className="w-full md:max-w-[400px] h-screen bg-main-light-blue dark:bg-main-dark-blue">
        <CardHeader className="flex justify-between items-center">
          <Avatar name={user.name} size="lg" />

          <div className="flex gap-2 items-center">
            <ThemeSwitch />
            <IconArrowAutofitLeft size={32} />
          </div>
        </CardHeader>

        <Divider className="bg-main-white" />

        <CardBody>
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="flex justify-between items-center gap-2 bg-main-diamond p-6 rounded-md hover:translate-x-1.5 dark:bg-main-blue"
            >
              <IconUserCog size={48} stroke={1.5} />
              Información Personal
            </Link>

            {DASHBOARD_MENU[user.role ?? USER_ROLE.NOT_FOUND].map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex justify-between items-center gap-2 bg-main-diamond p-6 rounded-md hover:translate-x-1.5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </CardBody>

        <Divider className="bg-main-white" />

        <CardFooter className="flex gap-2 bg-main-light-diamond">
          <Image
            alt="Incapacidades y Soluciones"
            className="rounded-full w-16 h-16"
            src="/icon.jpeg"
          />

          <h3 className="text-2xl font-bold">Incapacidades y Soluciones</h3>
        </CardFooter>
      </Card>
    </nav>
  );
}
