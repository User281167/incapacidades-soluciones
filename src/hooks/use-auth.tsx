"use client";

import { createContext, useContext, useState } from "react";

import { User } from "@/types/models/user";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";
import {
  loginByCedula,
  signUpCompany,
  signUpEmployee,
} from "@/services/login.API";
import { ApiRes } from "@/types/api-res";
import { AuthRes } from "@/types/auth";

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
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    const res = await signUpCompany(data);
    apiCheckAuth(res);
  };

  const signUp = async (data: SignUpEmployeeForm) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res = await signUpEmployee(data);
    apiCheckAuth(res);
  };

  const login = async (cedula: string | number, password: string) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res = await loginByCedula(cedula, password);
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
