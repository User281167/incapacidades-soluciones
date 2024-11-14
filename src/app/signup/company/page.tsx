"use client";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { signUpCompanySchema } from "@/utils/validations/login";
import {
  backgroundGradient,
  container,
  sectionTitle,
  subtitle,
  title,
} from "@/components/primitives";
import MainLayout from "@/layouts/main-layout";
import { companySector, companyType } from "@/utils/select-items";
import { SignUpCompanyForm } from "@/types/loginForms";
import { useAuth } from "@/hooks/use-auth";

export default function SignUpCompanyPage() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignUpCompanyForm>({
  //   resolver: zodResolver(signUpCompanySchema),
  // });

  const { signUpLeader, errorMessage, isLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [founded, setFounded] = useState<DateValue | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  // useEffect(() => {
  //   if (isLogin) {
  //     toast.success("Registrado exitosamente");
  //     navigate("/");
  //   }
  // }, [isLogin]);

  const onSubmit = async (data: SignUpCompanyForm) => {
    setLoading(true);
    data.founded = founded?.toString(); // no se puede obtener la fecha de zod resolver del componente nextui
    await signUpLeader(data);
    setLoading(false);
  };

  return (
    <MainLayout>
      <header className={backgroundGradient()}>
        <div className="max-w-2xl space-y-6 block">
          <h1 className={title()}>¡Únete Hoy!</h1>

          <h2 className={subtitle()}>
            Da el primer paso hacia un futuro brillante
          </h2>

          <p>
            Únase a Incapacidades y Soluciones y transforme la forma en que su
            empresa gestiona las incapacidades laborales. Simplifique procesos,
            mejore la comunicación interna y asegure el cumplimiento normativo
            con nuestra plataforma fácil de usar. ¡Ahorre tiempo y recursos
            mientras cuida del bienestar de sus empleados!
          </p>
        </div>

        <img
          alt="Incapacidades y Soluciones"
          className="hidden md:block md:w-1/3 xl:w-auto object-cover"
          src="/juicy-patient.png"
        />
      </header>
      {/* 
      <section className={container()}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-10 w-full">
            <h2 className={sectionTitle()}>Datos Empresariales</h2>

            <Input
              // errorMessage={errors?.nit?.message}
              // isInvalid={errors.nit && true}
              label="NIT"
              labelPlacement="outside"
              // {...register("nit")}
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
              errorMessage={errors.leaderPassword?.message}
              isInvalid={errors.leaderPassword && true}
              label="Contraseña"
              labelPlacement="outside"
              type="password"
              {...register("leaderPassword")}
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
       */}
    </MainLayout>
  );
}
