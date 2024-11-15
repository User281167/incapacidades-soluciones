import { beforeEach, describe, expect, test } from "vitest";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { act, renderHook } from "@testing-library/react";
import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { user } from "@/types/models/user";
import { mockAxios } from "../mocks/axios-mock";

describe("Auth context signUpCompany", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
  });

  const formData = {
    nit: "string",
    name: "string",
    description: "string",
    type: "Mediana",
    sector: "Primario",
    address: "string",
    email: "test@mail.com",
    founded: "01/01/2000",
    leaderName: "string",
    leaderLastName: "string",
    leaderCedula: "12345678",
    leaderPhone: "string",
    leaderEmail: "test@mail.com",
    leaderPassword: "string",
  };

  test("Is login false", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("signUpLeader inputs empty", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUpLeader({} as SignUpCompanyForm);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Form data error", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const form = { ...formData, nit: "" };

    await act(async () => {
      await result.current.signUpLeader(form);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Error with request", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUpLeader(formData);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Is login success signUpLeader", async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: { token: "token", user: { name: "test" } as user },
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUpLeader(formData);
    });

    await act(async () => {
      expect(result.current.errorMessage).toBe(null);
      expect(result.current.isLogin).toBe(true);
      expect(result.current.user.name).toBe("test");
    });
  });
});
