"use client";

import { getCompanyInfo, updateCompanyInfo } from "@/services/company.API";
import { ApiRes } from "@/types/api-res";
import { Company } from "@/types/models/company";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./use-auth";
import { CompanyInfoForm } from "@/types/forms/company-info";
import { COOKIES_ITEM, CookiesApp } from "@/types/cookies-item";

export interface CompanyContextType {
  company: Company | null;
  errorMessage: string | null;
  getUserCompany: () => Promise<void>;
  updateCompany: (companyForm: CompanyInfoForm) => Promise<void>;
}

const CompanyContext = createContext({} as CompanyContextType);

function CompanyProvider({
  children,
  initialCompany,
}: {
  children: React.ReactNode;
  initialCompany?: Company;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [company, setCompany] = useState<Company | null>(() => {
    return initialCompany ?? CookiesApp.get<Company>(COOKIES_ITEM.COMPANY);
  });

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (company) CookiesApp.set(COOKIES_ITEM.COMPANY, company);
  }, [company]);

  const getUserCompany = useCallback(async () => {
    if (company) return;

    setErrorMessage(null);
    const res: ApiRes<Company> = await getCompanyInfo(user.companyNIT);

    if (res.success) setCompany(res.data);
    else setErrorMessage(res.message);
  }, [user.companyNIT, company]);

  const updateCompany = async (companyForm: CompanyInfoForm) => {
    if (!company || company?.id === undefined) {
      setErrorMessage("No se puede actualizar los datos de la empresa.");
      return;
    }

    setErrorMessage(null);

    const res: ApiRes<string> = await updateCompanyInfo(
      companyForm,
      company.id || "",
      user.id
    );

    if (res.success) {
      setCompany({ ...company, ...companyForm } as Company);
      setUser({ ...user, companyNIT: companyForm.nit });
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <CompanyContext.Provider
      value={{ company, errorMessage, getUserCompany, updateCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

const useCompany = () => useContext(CompanyContext);

export { CompanyProvider, CompanyContext, useCompany };
