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
import { COOKIES_ITEM } from "@/types/cookies-item";

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
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return Cookies.get(COOKIES_ITEM.ACCESS_TOKEN) !== undefined;
  });

  const [user, setUser] = useState<User>(() => {
    const user = Cookies.get(COOKIES_ITEM.USER);
    return user ? JSON.parse(user) : ({} as User);
  });

  const [token, setToken] = useState<string>(() => {
    const jwt = Cookies.get(COOKIES_ITEM.ACCESS_TOKEN) ?? "";
    setLoading(false);
    return jwt;
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

      Cookies.set(COOKIES_ITEM.ACCESS_TOKEN, res.data.token);
      Cookies.set(COOKIES_ITEM.USER, JSON.stringify(res.data.user));
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

  const logout = () => {
    setErrorMessage(null);
    setLoading(true);

    Cookies.remove(COOKIES_ITEM.ACCESS_TOKEN);
    Cookies.remove(COOKIES_ITEM.USER);
    Cookies.remove(COOKIES_ITEM.COLLABORATOR);

    setToken("");
    setUser({} as User);
    setErrorMessage(null);
    setIsLogin(false);
    setLoading(false);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
