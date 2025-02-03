import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { mockAxios } from "../mocks/axios-mock";

import {
  AuthContext,
  AuthContextType,
  AuthProvider,
  useAuth,
} from "@/hooks/use-auth";

import { CompanyInfoForm } from "@/types/forms/company-info";
import { CookiesApp } from "@/types/cookies-item";
import { USER_ROLE } from "@/types/role";
import { Company } from "@/types/models/company";
import { ApiRes } from "@/types/api-res";
import { User } from "@/types/models/user";

import { companySector, companyType } from "@/utils/select-items";

import { UpdateCompanyForm } from "@/app/dashboard/leader/company-info/form";
import LeaderCompanyInfoPage from "@/app/dashboard/leader/company-info/page";

import {
  CompanyContext,
  CompanyContextType,
  CompanyProvider,
  useCompany,
} from "@/hooks/use-company";

describe("Render Company Information", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    mockAxios.put.mockClear();
    CookiesApp.clearAuth();
    cleanup();
  });

  const user = {
    id: "1",
    companyNIT: "nit123",
    name: "Juan",
    lastName: "Perez",
    cedula: "12345678",
    email: "john.doe@example.com",
    phone: "+57 123456789",
    role: USER_ROLE.LEADER,
    joinDate: "2023-01-01",
  } as User;

  const company: Company = {
    id: "1",
    name: "Company Name",
    nit: "nit123",
    description: "Company Description",
    type: companyType[0],
    sector: companySector[0],
    address: "Address",
    email: "email@example.com",
    founded: "2023-01-01",
  };

  test("Render company data", () => {
    act(() => {
      render(<UpdateCompanyForm />, {
        wrapper: ({ children }) => {
          return (
            <CompanyContext.Provider
              value={{ company: company } as CompanyContextType}
            >
              {children}
            </CompanyContext.Provider>
          );
        },
      });
    });

    expect(screen.getByDisplayValue(company.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(company.nit)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(company.description || "")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(company.type)).toBeInTheDocument();
    expect(screen.getByDisplayValue(company.sector)).toBeInTheDocument();
    expect(screen.getByDisplayValue(company.address || "")).toBeInTheDocument();
    expect(screen.getByDisplayValue(company.email)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(company.founded as string)
    ).toBeInTheDocument();
  });

  test("Api getCompany", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        data: company,
        success: true,
        message: null,
      } as ApiRes<Company>,
    });

    act(() => {
      render(<LeaderCompanyInfoPage />, {
        wrapper: ({ children }) => {
          return (
            <AuthContext.Provider
              value={{ isLogin: true, user: user } as AuthContextType}
            >
              <CompanyProvider>{children}</CompanyProvider>
            </AuthContext.Provider>
          );
        },
      });
    });

    await act(async () => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith("/get-company", {
        params: { nit: user.companyNIT },
      });
    });
  });

  test("Update company nit", async () => {
    mockAxios.put.mockResolvedValueOnce({ status: 200 });

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <AuthProvider initIsLogin={true} initUser={user}>
          <CompanyProvider initialCompany={company}>{children}</CompanyProvider>
        </AuthProvider>
      );
    };

    const { result: companyResult } = renderHook(useCompany, {
      wrapper: Wrapper,
    });

    const form = {
      ...company,
      nit: "new-nit",
    } as CompanyInfoForm;

    await act(async () => {
      await companyResult.current.updateCompany(form);
    });

    act(() => {
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      expect(companyResult.current.company?.nit).toBe(form.nit);
    });
  });

  test("Update nit in company and user nit", async () => {
    mockAxios.put.mockResolvedValueOnce({ status: 200 });

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <AuthProvider initIsLogin={true} initUser={user}>
          <CompanyProvider initialCompany={company}>{children}</CompanyProvider>
        </AuthProvider>
      );
    };

    // cannot use renderHook because creates an isolated instance for each hook
    // fot avoid that we use a component that uses both hook
    const TestComponent = () => {
      const { updateCompany } = useCompany();
      const { user: hookUser } = useAuth();

      const handleUpdate = async (form: CompanyInfoForm) => {
        await updateCompany(form);
      };

      return (
        <div>
          <p>UserNit {hookUser?.companyNIT}</p>

          <button
            onClick={() =>
              handleUpdate({
                ...company,
                nit: "new-nit",
              } as CompanyInfoForm)
            }
          >
            Update
          </button>
        </div>
      );
    };

    render(<TestComponent />, {
      wrapper: Wrapper,
    });

    await act(async () => {
      screen.getByText("UserNit nit123");
      screen.getByText("Update").click();
    });

    act(() => {
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      expect(screen.getByText("UserNit new-nit")).toBeInTheDocument();
    });
  });
});
