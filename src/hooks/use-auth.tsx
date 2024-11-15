"use client";

import { createContext, useContext, useState } from "react";

import { user } from "@/types/models/user";
import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { signUpCompany } from "@/services/login.API";

interface contextType {
  token: string;
  user: user;
  errorMessage: string | null;
  isLogin: boolean;
  signUpLeader: (data: SignUpCompanyForm) => Promise<void>;
}

const userContext = createContext({} as contextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<user>({} as user);
  const [token, setToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const signUpLeader = async (data: SignUpCompanyForm) => {
    setErrorMessage(null);
    const res = await signUpCompany(data);

    if (!res.success) {
      setErrorMessage(res.errorMessage);
    } else {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogin(true);
    }
  };

  return (
    <userContext.Provider
      value={{ token, user, errorMessage, signUpLeader, isLogin }}
    >
      {children}
    </userContext.Provider>
  );
}

const useAuth = () => useContext(userContext);

export { AuthProvider, useAuth };
