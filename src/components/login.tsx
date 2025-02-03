"use client";

import { Button, Input, Link, CircularProgress } from "@nextui-org/react";
import { IconEye, IconLock, IconMail } from "@tabler/icons-react";
import { Toaster, toast } from "sonner";

import { siteConfig } from "@/config/site";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { LoginSchema } from "@/types/schemas/sign-up";
import { LoginForm } from "@/types/forms/sign-up";
import ShowPassword from "./show-password";

export default function Login() {
  const { login, errorMessage, loading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const onSubmit = async (data: LoginForm) => {
    if (!loading) {
      await login(data);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form
      className="flex flex-col p-8 md:p-0 md:w-1/2 max-w-sm justify-center items-center gap-4 mx-auto lg:my-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold">Inicia sesión</h2>

      <Input
        required
        endContent={
          <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        errorMessage={errors.email?.message}
        isInvalid={errors.email && true}
        placeholder="Email"
        type="email"
        variant="bordered"
        {...register("email")}
      />

      <Input
        required
        endContent={ShowPassword({ showPassword, setShowPassword })}
        errorMessage={errors.password?.message}
        isInvalid={errors.password && true}
        placeholder="Contraseña"
        type={showPassword ? "text" : "password"}
        variant="bordered"
        {...register("password")}
      />

      <Link className="w-full text-sm" href="#">
        ¿Olvidaste tu contraseña?
      </Link>

      <Button disabled={loading} type="submit" variant="bordered">
        {loading ? <CircularProgress size="sm" /> : "Iniciar sesión"}
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
