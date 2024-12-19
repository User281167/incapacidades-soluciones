"use client";

import { container, sectionTitle } from "@/components/primitives";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

import { companySector, companyType } from "@/utils/select-items";

import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { SignUpCompanySchema } from "@/types/schemas/sign-up";

import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { Toaster, toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpCompanyForm>({
    resolver: zodResolver(SignUpCompanySchema),
  });

  const { signUpLeader, errorMessage, isLogin, loading } = useAuth();
  const [founded, setFounded] = useState<DateValue | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (founded) {
      setValue("founded", founded.toString());
    }
  }, [founded, setValue]);

  const onSubmit = async (data: SignUpCompanyForm) => {
    if (isLogin) {
      return;
    }

    await signUpLeader(data);
  };

  useEffect(() => {
    if (isLogin) {
      toast.success("Registrado exitosamente");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [isLogin, router]);

  return (
    <section className={container()}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-10 w-full">
          <h2 className={sectionTitle()}>Datos Empresariales</h2>

          <Input
            errorMessage={errors?.nit?.message}
            isInvalid={errors.nit && true}
            label="NIT"
            labelPlacement="outside"
            {...register("nit")}
          />
          <Input
            errorMessage={errors?.name?.message}
            isInvalid={errors.name && true}
            label="Nombre"
            labelPlacement="outside"
            {...register("name")}
          />

          <Select
            errorMessage={errors?.type?.message}
            isInvalid={errors.type && true}
            label="Tipo de empresa"
            labelPlacement="outside"
            {...register("type")}
          >
            {companyType.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Select
            errorMessage={errors?.sector?.message}
            isInvalid={errors.sector && true}
            label="Sector o industria"
            labelPlacement="outside"
            {...register("sector")}
          >
            {companySector.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            errorMessage={errors?.address?.message}
            isInvalid={errors.address && true}
            label="Dirección"
            labelPlacement="outside"
            {...register("address")}
          />

          <Input
            errorMessage={errors.email?.message}
            isInvalid={errors.email && true}
            label="Correo electrónico corporativo"
            labelPlacement="outside"
            type="email"
            {...register("email")}
          />

          <DatePicker
            showMonthAndYearPickers
            errorMessage={errors.founded?.message}
            isInvalid={errors?.founded && true}
            label="Fecha de fundación"
            maxValue={today(getLocalTimeZone())}
            onChange={setFounded}
          />

          <Textarea
            label="Descripción de la empresa"
            {...register("description")}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-2xl font-bold">Datos líder de colaboradores</h3>

          <Input
            errorMessage={errors.leaderName?.message}
            isInvalid={errors.leaderName && true}
            label="Nombres"
            labelPlacement="outside"
            {...register("leaderName")}
          />
          <Input
            errorMessage={errors.leaderLastName?.message}
            isInvalid={errors.leaderLastName && true}
            label="Apellidos"
            labelPlacement="outside"
            {...register("leaderLastName")}
          />
          <Input
            errorMessage={errors.leaderCedula?.message}
            isInvalid={errors.leaderCedula && true}
            label="Cédula"
            labelPlacement="outside"
            type="number"
            {...register("leaderCedula")}
          />

          <Input
            errorMessage={errors.leaderPhone?.message}
            isInvalid={errors.leaderPhone && true}
            label="Teléfono"
            labelPlacement="outside"
            type="number"
            {...register("leaderPhone")}
          />

          <Input
            errorMessage={errors.leaderEmail?.message}
            isInvalid={errors.leaderEmail && true}
            label="Correo electrónico"
            labelPlacement="outside"
            type="email"
            {...register("leaderEmail")}
          />

          <Input
            errorMessage={errors.password?.message}
            isInvalid={errors.password && true}
            label="Contraseña"
            labelPlacement="outside"
            type="password"
            {...register("password")}
          />

          <Button
            className="mx-auto inline"
            color="primary"
            disabled={loading}
            type="submit"
          >
            Crear cuenta
          </Button>
        </div>
      </form>

      <Toaster richColors />
    </section>
  );
}
