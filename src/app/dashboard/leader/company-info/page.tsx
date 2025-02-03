"use client";

import { container, sectionTitle } from "@/components/primitives";
import { Toaster, toast } from "sonner";

import { useEffect, useState } from "react";
import { useCompany } from "@/hooks/use-company";

import { UpdateCompanyForm } from "./form";
import { CompanyInfoSkeleton } from "./skeleton";

export default function LeaderCompanyInfoPage() {
  const [loading, setLoading] = useState(true);
  const { getUserCompany, errorMessage } = useCompany();

  useEffect(() => {
    if (getUserCompany) getUserCompany().finally(() => setLoading(false));
  }, [getUserCompany]);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  return (
    <section className={container()}>
      <h2 className={sectionTitle()}>Datos Empresariales</h2>

      {loading && <CompanyInfoSkeleton />}
      {!loading && <UpdateCompanyForm />}
      <Toaster richColors />
    </section>
  );
}
