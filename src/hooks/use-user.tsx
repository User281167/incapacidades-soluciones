"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { getCollaborator as getCollaboratorInfo } from "@/services/user.API";
import { COOKIES_ITEM } from "@/types/cookies-item";
import { Collaborator } from "@/types/models/user";
import { ApiRes } from "@/types/api-res";
import { useAuth } from "./use-auth";

import Cookies from "js-cookie";

export interface UserContextType {
  collaborator: Collaborator | null;
  loading: boolean;
  errorMessage: string | null;
  getCollaborator: (id: string) => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

  const { user, isLogin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !isLogin) return;

    const info = Cookies.get(COOKIES_ITEM.COLLABORATOR);

    if (!info && user !== null) {
      getCollaborator(user.id);
    } else if (info) {
      setCollaborator(JSON.parse(info) as Collaborator);
    }
  }, [isLogin, user, authLoading]);

  useEffect(() => {
    if (collaborator) {
      Cookies.set(COOKIES_ITEM.COLLABORATOR, JSON.stringify(collaborator));
    }
  }, [collaborator]);

  const getCollaborator = async (id: string) => {
    setErrorMessage(null);
    setLoading(true);
    const res: ApiRes<Collaborator> = await getCollaboratorInfo(id);
    setLoading(false);

    if (res.success) {
      setCollaborator(res.data);
    } else {
      setErrorMessage(res.errorMessage);
    }
  };

  return (
    <UserContext.Provider
      value={{
        collaborator,
        loading,
        errorMessage,
        getCollaborator,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserProvider, UserContext, useUser };
