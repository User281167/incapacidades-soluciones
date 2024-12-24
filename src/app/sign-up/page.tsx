"use client";

import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import MainLayout from "@/layouts/main-layout";
import { SignUpForm } from "./form";

export default function Page() {
  return (
    <MainLayout>
      <section className="flex flex-col p-8 md:p-0 md:w-1/2 gap-4 mx-auto my-20 lg:my-32">
        <h1 className={title()}>Crea tu cuenta</h1>

        <SignUpForm />

        <div className="flex flex-col gap-2 mt-10 max-w-lg mx-auto">
          <p>
            Si previamente has creado una cuenta, inicia sesión con tus
            credenciales
          </p>

          <Link href={siteConfig.links.login.href}>Iniciar sesión</Link>
        </div>
      </section>
    </MainLayout>
  );
}
