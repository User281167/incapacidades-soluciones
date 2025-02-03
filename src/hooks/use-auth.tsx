"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  LoginForm,
  SignUpCompanyForm,
  SignUpEmployeeForm,
} from "@/types/forms/sign-up";
import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import { User } from "@/types/models/user";
import { COOKIES_ITEM, CookiesApp } from "@/types/cookies-item";

import { loginUser, signUpCompany, signUpEmployee } from "@/services/login.API";

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
  setUser: Dispatch<SetStateAction<User>>;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({
  children,
  initToken,
  initUser,
  initIsLogin,
}: {
  children: React.ReactNode;
  initToken?: string;
  initUser?: User;
  initIsLogin?: boolean;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return (
      initIsLogin ?? CookiesApp.get<string>(COOKIES_ITEM.ACCESS_TOKEN) !== null
    );
  });

  const [user, setUser] = useState<User>(() => {
    return initUser ?? CookiesApp.get<User>(COOKIES_ITEM.USER) ?? ({} as User);
  });

  const [token, setToken] = useState<string>(() => {
    const jwt =
      initToken ?? CookiesApp.get<string>(COOKIES_ITEM.ACCESS_TOKEN) ?? "";
    setLoading(false);
    return jwt;
  });

  useEffect(() => {
    if (user) {
      CookiesApp.set(COOKIES_ITEM.USER, user);
    }
  }, [user]);

  const apiCheckAuth = async (res: ApiRes<AuthRes>) => {
    // Check if the response is successful and set user data
    // API response always returns an APIRes object

    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);

      CookiesApp.set(COOKIES_ITEM.ACCESS_TOKEN, res.data.token);
      CookiesApp.set(COOKIES_ITEM.USER, res.data.user);
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
    setToken("");
    setUser({} as User);
    setErrorMessage(null);
    setIsLogin(false);
    setLoading(false);
    CookiesApp.clearAuth();
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
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
