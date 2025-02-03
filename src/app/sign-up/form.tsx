"use client";

import { Button, Input, CircularProgress } from "@nextui-org/react";
import { IconAccessible } from "@tabler/icons-react";
import ShowPassword from "@/components/show-password";

import { SignUpEmployeeForm } from "@/types/forms/sign-up";
import { SignUpEmployeeSchema } from "@/types/schemas/sign-up";

import { Toaster, toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpEmployeeForm>({
    resolver: zodResolver(SignUpEmployeeSchema),
  });

  const { signUp, errorMessage, isLogin, loading } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isLogin) {
      toast.success("Registrado exitosamente");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [isLogin, router]);

  const onSubmit = async (data: SignUpEmployeeForm) => {
    if (!isLogin) {
      await signUp(data);
    }
  };

  return (
    <>
      <Toaster richColors />

      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-10 w-full">
          <Input
            required
            endContent={
              <IconAccessible className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            errorMessage={errors.accessCode?.message}
            isInvalid={errors.accessCode && true}
            label="Código de acceso"
            variant="bordered"
            {...register("accessCode")}
          />

          <Input
            required
            errorMessage={errors.name?.message}
            isInvalid={errors.name && true}
            label="Nombres"
            labelPlacement="outside"
            {...register("name")}
          />

          <Input
            required
            errorMessage={errors.lastName?.message}
            isInvalid={errors.lastName && true}
            label="Apellidos"
            labelPlacement="outside"
            {...register("lastName")}
          />

          <Input
            required
            errorMessage={errors.cedula?.message}
            isInvalid={errors.cedula && true}
            label="Cédula"
            labelPlacement="outside"
            {...register("cedula")}
          />
        </div>

        <div className="space-y-10 w-full">
          <Input
            errorMessage={errors.phone?.message}
            isInvalid={errors.phone && true}
            label="Teléfono"
            labelPlacement="outside"
            {...register("phone")}
          />

          <Input
            required
            errorMessage={errors.email?.message}
            isInvalid={errors.email && true}
            label="Correo electrónico"
            labelPlacement="outside"
            {...register("email")}
          />

          <Input
            required
            errorMessage={errors.password?.message}
            isInvalid={errors.password && true}
            endContent={ShowPassword({ showPassword, setShowPassword })}
            label="Contraseña"
            labelPlacement="outside"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
        </div>

        <Button
          className="mx-auto lg:col-span-2"
          disabled={loading}
          type="submit"
          variant="bordered"
        >
          {loading ? <CircularProgress size="sm" /> : "Crear cuenta"}
        </Button>
      </form>
    </>
  );
}
