import { act, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { mockAxios } from "../mocks/axios-mock";

import { AuthContextType } from "@/hooks/use-auth";
import { UserProvider } from "@/hooks/use-user";

import DashboardPage from "@/app/dashboard/page";
import { Collaborator, User } from "@/types/models/user";
import { COOKIES_ITEM } from "@/types/cookies-item";
import { USER_ROLE } from "@/types/role";

import Cookie from "js-cookie";
import { ApiRes } from "@/types/api-res";
import { RenderAuthContext } from "./render-auth";

describe("Dashboard", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    Cookie.remove(COOKIES_ITEM.COLLABORATOR);
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

  test("Render user data", () => {
    act(() => {
      RenderAuthContext({
        ui: (
          <UserProvider>
            <DashboardPage />
          </UserProvider>
        ),
        value: { isLogin: true, user: user } as AuthContextType,
      });
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
    act(() => {
      RenderAuthContext({
        ui: (
          <UserProvider>
            <DashboardPage />
          </UserProvider>
        ),
        value: { isLogin: false, user: user } as AuthContextType,
      });
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });

  test("Collaborator data render", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        data: collaborator,
        success: true,
        message: null,
      } as ApiRes<Collaborator>,
    });

    await act(async () => {
      RenderAuthContext({
        ui: (
          <UserProvider>
            <DashboardPage />
          </UserProvider>
        ),
        value: { isLogin: true, user: user } as AuthContextType,
      });
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(
      screen.getByText("Incapacitado", { exact: false })
    ).toBeInTheDocument();
  });
});
