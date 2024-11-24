import { beforeEach, describe, expect, test } from "vitest";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { act, renderHook } from "@testing-library/react";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";
import { User } from "@/types/models/user";
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
      data: { token: "token", user: { name: "test" } as User },
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

describe("Auth context signUp", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
  });

  const formData = {
    accessCode: "string",
    name: "string",
    lastName: "string",
    cedula: "12345678",
    phone: "string",
    email: "test@mail.com",
    password: "string",
  };

  test("Is login false", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("signUp inputs empty", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUp({} as SignUpEmployeeForm);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Form data error", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const form = { ...formData, email: "test" };

    await act(async () => {
      await result.current.signUp(form);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Error with request", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUp(formData);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Is login success signUp", async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: { token: "token", user: { name: "test" } as User },
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUp(formData);
    });

    await act(async () => {
      expect(result.current.errorMessage).toBe(null);
      expect(result.current.isLogin).toBe(true);
      expect(result.current.user.name).toBe("test");
    });
  });
});

describe("Auth context login", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
  });

  const formData = {
    cedula: "12345678",
    password: "string",
  };

  test("Is login false", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("login inputs empty", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signUp({} as SignUpEmployeeForm);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Form data error", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const form = { ...formData, email: "test" };

    await act(async () => {
      await result.current.login(form.cedula, form.password);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Error with request", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login(formData.cedula, formData.password);
    });

    await act(async () => {
      expect(result.current.errorMessage).not.toBe(null);
      expect(result.current.isLogin).toBe(false);
    });
  });

  test("Is login success", async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: { token: "token", user: { name: "test" } as User },
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login(formData.cedula, formData.password);
    });

    await act(async () => {
      expect(result.current.errorMessage).toBe(null);
      expect(result.current.isLogin).toBe(true);
      expect(result.current.user.name).toBe("test");
    });
  });
});
