"use client";

import { createContext, useContext, useState } from "react";

import { User } from "@/types/models/user";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";
import { signUpCompany, signUpEmployee } from "@/services/login.API";

interface contextType {
  token: string;
  user: User;
  errorMessage: string | null;
  isLogin: boolean;
  loading: boolean;
  signUpLeader: (data: SignUpCompanyForm) => Promise<void>;
  signUp: (data: SignUpEmployeeForm) => Promise<void>;
}

const userContext = createContext({} as contextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const signUpLeader = async (data: SignUpCompanyForm) => {
    if (isLogin) {
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    const res = await signUpCompany(data);

    if (!res.success) {
      setErrorMessage(res.errorMessage);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);
    }

    setLoading(false);
  };

  const signUp = async (data: SignUpEmployeeForm) => {
    if (isLogin) {
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    const res = await signUpEmployee(data);

    if (!res.success) {
      setErrorMessage(res.errorMessage);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);
    }

    setLoading(false);
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
      }}
    >
      {children}
    </userContext.Provider>
  );
}

const useAuth = () => useContext(userContext);

export { AuthProvider, useAuth };
