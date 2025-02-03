"use client";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
  CircularProgress,
} from "@nextui-org/react";

import {
  companySector,
  companyType,
  getCompanySector,
  getCompanyType,
} from "@/utils/select-items";

import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";

import { Toaster, toast } from "sonner";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompany } from "@/hooks/use-company";
import { useForm } from "react-hook-form";

import { CompanyInfoSchema } from "@/types/schemas/company";
import { CompanyInfoForm } from "@/types/forms/company-info";

export function UpdateCompanyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyInfoForm>({
    resolver: zodResolver(CompanyInfoSchema),
  });

  const { company, updateCompany, errorMessage } = useCompany();

  const [loading, setLoading] = useState(false);
  const [founded, setFounded] = useState<DateValue | null | undefined>(null);

  useEffect(() => {
    // Set the founded date to the company founded date cannot use Date or string in DatePicker
    if (company && company.founded) {
      setFounded(parseDate(company.founded as string));
      setValue("founded", company.founded);
    }
  }, [company, setValue]);

  useEffect(() => {
    // Set the founded date, Date cannot use Date or string in DatePicker
    if (founded) {
      setValue("founded", founded.toString());
    }
  }, [founded, setValue]);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  const onSubmit = async (data: CompanyInfoForm) => {
    setLoading(true);
    await updateCompany(data);
    setLoading(false);
  };

  return (
    <>
      <Toaster richColors />

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          defaultValue={company?.nit}
          disabled={loading}
          errorMessage={errors?.nit?.message}
          isInvalid={errors.nit && true}
          label="NIT"
          labelPlacement="outside"
          {...register("nit")}
        />
        <Input
          defaultValue={company?.name}
          disabled={loading}
          errorMessage={errors?.name?.message}
          isInvalid={errors.name && true}
          label="Nombre"
          labelPlacement="outside"
          {...register("name")}
        />

        <Select
          disabled={loading}
          errorMessage={errors?.type?.message}
          isInvalid={errors.type && true}
          label="Tipo de empresa"
          labelPlacement="outside"
          defaultSelectedKeys={[getCompanyType(company?.type || "")]}
          {...register("type")}
        >
          {companyType.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </Select>

        <Select
          disabled={loading}
          errorMessage={errors?.sector?.message}
          isInvalid={errors.sector && true}
          label="Sector o industria"
          labelPlacement="outside"
          defaultSelectedKeys={[getCompanySector(company?.sector || "")]}
          {...register("sector")}
        >
          {companySector.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </Select>

        <Input
          defaultValue={company?.address || ""}
          disabled={loading}
          errorMessage={errors?.address?.message}
          isInvalid={errors.address && true}
          label="Dirección"
          labelPlacement="outside"
          {...register("address")}
        />

        <Input
          defaultValue={company?.email}
          disabled={loading}
          errorMessage={errors.email?.message}
          isInvalid={errors.email && true}
          label="Correo electrónico corporativo"
          labelPlacement="outside"
          type="email"
          {...register("email")}
        />

        <DatePicker
          showMonthAndYearPickers
          value={founded}
          disabled={loading}
          errorMessage={errors.founded?.message}
          isInvalid={errors?.founded && true}
          label="Fecha de fundación"
          maxValue={today(getLocalTimeZone())}
          onChange={setFounded}
        />

        <Textarea
          defaultValue={company?.description}
          disabled={loading}
          label="Descripción de la empresa"
          {...register("description")}
        />

        <Button
          className="mx-auto inline col-span-2"
          color="primary"
          disabled={loading}
          type="submit"
        >
          {loading ? <CircularProgress size="sm" /> : "Actualizar"}
        </Button>
      </form>
    </>
  );
}
