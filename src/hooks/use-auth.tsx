"use client";

import { createContext, useContext, useState } from "react";

import {
  LoginForm,
  SignUpCompanyForm,
  SignUpEmployeeForm,
} from "@/types/forms/sign-up";
import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import { User } from "@/types/models/user";

import { loginUser, signUpCompany, signUpEmployee } from "@/services/login.API";
import Cookies from "js-cookie";

export interface AuthContextType {
  token: string;
  user: User;
  errorMessage: string | null;
  isLogin: boolean;
  loading: boolean;
  signUpLeader: (data: SignUpCompanyForm) => Promise<void>;
  signUp: (data: SignUpEmployeeForm) => Promise<void>;
  login: (credentials: LoginForm) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

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
    // Check if the response is successful and set user data
    // API response always returns an APIRes object

    if (!res.success) {
      setErrorMessage(res.errorMessage);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);

      Cookies.set("token", res.data.token);
      Cookies.set("user", JSON.stringify(res.data.user));
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

  const login = async (credentials: LoginForm) => {
    if (isLogin) return;

    setErrorMessage(null);
    setLoading(true);
    const res: ApiRes<AuthRes> = await loginUser(credentials);
    apiCheckAuth(res);
  };

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
