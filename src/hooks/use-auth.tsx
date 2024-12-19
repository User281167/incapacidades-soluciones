"use client";

import { createContext, useContext, useState } from "react";

import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";
import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import { User } from "@/types/models/user";

import {
  loginByCedula,
  signUpCompany,
  signUpEmployee,
} from "@/services/login.API";

import Cookies from "js-cookie";

interface contextType {
  token: string;
  user: User;
  errorMessage: string | null;
  isLogin: boolean;
  loading: boolean;
  signUpLeader: (data: SignUpCompanyForm) => Promise<void>;
  signUp: (data: SignUpEmployeeForm) => Promise<void>;
  login: (cedula: string | number, password: string) => Promise<void>;
}

const userContext = createContext({} as contextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return Cookies.get("token") !== undefined;
  });

  const [user, setUser] = useState<User>(() => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : ({} as User);
  });

  const [token, setToken] = useState<string>(() => {
    return Cookies.get("token") ?? "";
  });

  const apiCheckAuth = async (res: ApiRes<AuthRes>) => {
    if (!res.success) {
      setErrorMessage(res.errorMessage);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);
    }

    setLoading(false);
  };

  const signUpLeader = async (data: SignUpCompanyForm) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res: ApiRes<AuthRes> = await signUpCompany(data);
    apiCheckAuth(res);
  };

  const signUp = async (data: SignUpEmployeeForm) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res: ApiRes<AuthRes> = await signUpEmployee(data);
    apiCheckAuth(res);
  };

  const login = async (cedula: string | number, password: string) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res: ApiRes<AuthRes> = await loginByCedula(cedula, password);
    apiCheckAuth(res);
  };

  return (
    <userContext.Provider
      value={{
        token,
        user,
        errorMessage,
        signUpLeader,
        isLogin,
        loading,
        signUp,
        login,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

const useAuth = () => useContext(userContext);

export { AuthProvider, useAuth };
