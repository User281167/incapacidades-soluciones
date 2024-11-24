"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { IconAccessible, IconLock } from "@tabler/icons-react";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import MainLayout from "@/layouts/main-layout";

export default function Page() {
  return (
    <MainLayout>
      <section className="flex flex-col p-8 md:p-0 md:w-1/2 gap-4 mx-auto my-20 lg:my-32">
        <h1 className={title()}>Crea tu cuenta</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center">
          <div className="space-y-10 w-full">
            <Input
              endContent={
                <IconAccessible className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Código de acceso"
              type="number"
              variant="bordered"
            />

            <Input required label="Nombres" labelPlacement="outside" />
            <Input required label="Apellidos" labelPlacement="outside" />
            <Input required label="Cédula" labelPlacement="outside" />
          </div>

          <div className="space-y-10 w-full">
            <Input required label="Teléfono" labelPlacement="outside" />

            <Input
              required
              label="Correo electrónico"
              labelPlacement="outside"
            />

            <Input
              required
              endContent={
                <IconLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Contraseña"
              labelPlacement="outside"
              type="password"
            />
          </div>
        </div>

        <Button className="mx-auto" variant="bordered">
          Crear cuenta
        </Button>

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
