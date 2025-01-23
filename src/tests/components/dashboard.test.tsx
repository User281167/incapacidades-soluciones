import DashboardPage from "@/app/dashboard/page";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { mockAxios } from "../mocks/axios-mock";
import { AuthContext, AuthContextType } from "@/hooks/use-auth";
import { USER_ROLE } from "@/types/role";
import { Collaborator, User } from "@/types/models/user";
import { UserProvider } from "@/hooks/use-user";
import Cookie from "js-cookie";

describe("Dashboard", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    Cookie.remove("collaborator");
  });

  const collaborator = {
    position: "Project Manager",
    healthEntity: "Centro de Salud",
    inability: true,
    hasReplacement: false,
    isReplacing: false,
    bankingEntity: "Banco",
    bankAccount: "123456789",
  } as Collaborator;

  const user = {
    id: "1",
    companyNIT: "nit123",
    name: "Juan",
    lastName: "Perez",
    cedula: "12345678",
    email: "john.doe@example.com",
    phone: "+57 123456789",
    role: USER_ROLE.COLLABORATOR,
    joinDate: "2023-01-01",
  } as User;

  const renderAuthContext = (
    ui: React.ReactElement,
    prompts: AuthContextType = { isLogin: true, user: user } as AuthContextType
  ) => {
    return render(
      <AuthContext.Provider value={prompts}>{ui}</AuthContext.Provider>
    );
  };

  test("Render user data", () => {
    act(() => {
      renderAuthContext(<DashboardPage />);
    });

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(
      screen.getByText(user.lastName, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(user.cedula)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.phone)).toBeInTheDocument();
    expect(screen.getByText(user.joinDate)).toBeInTheDocument();
  });

  test("Collaborator data null", () => {
    mockAxios.get.mockResolvedValueOnce({
      data: collaborator,
    });

    act(() => {
      renderAuthContext(
        <UserProvider>
          <DashboardPage />
        </UserProvider>,
        { isLogin: false, user: user } as AuthContextType
      );
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });

  test("Collaborator data Cookies", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: collaborator,
    });

    await act(async () => {
      renderAuthContext(
        <UserProvider>
          <DashboardPage />
        </UserProvider>
      );
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(
      screen.getByText("Incapacitado", { exact: false })
    ).toBeInTheDocument();
  });
});
