"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { IconLock, IconMail } from "@tabler/icons-react";
import { Toaster, toast } from "sonner";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

export default function Login() {
  const { login, errorMessage, loading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      e.preventDefault();
      await login(email, password);
    }
  };

  return (
    <form
      className="flex flex-col p-8 md:p-0 md:w-1/2 max-w-sm justify-center items-center gap-4 mx-auto lg:my-32"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold">Inicia sesión</h2>

      <Input
        required
        endContent={
          <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        variant="bordered"
      />

      <Input
        required
        endContent={
          <IconLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        type="password"
        variant="bordered"
      />

      <Link className="w-full text-sm" href="#">
        ¿Olvidaste tu contraseña?
      </Link>

      <Button disabled={loading} type="submit" variant="bordered">
        Iniciar sesión
      </Button>

      <div className="flex flex-col gap-2 mt-10 text-sm">
        <p>
          Si aún no cuentas con un usuario en la plataforma ponte en contacto
          con el encargado de gestionar las incapacidades para obtener acceso a
          la plataforma.
        </p>

        <Link className="w-full text-sm" href={siteConfig.links.signUp.href}>
          Crea tu cuenta
        </Link>
      </div>

      <Toaster richColors />
    </form>
  );
}
