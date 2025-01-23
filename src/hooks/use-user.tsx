"use client";

import { createContext, useContext, useState, useCallback } from "react";

import { getCollaborator as getCollaboratorInfo } from "@/services/user.API";

import { Collaborator, User } from "@/types/models/user";
import { ApiRes } from "@/types/api-res";
import Cookies from "js-cookie";

interface contextType {
  collaborator: Collaborator | null;
  loading: boolean;
  errorMessage: string | null;
  getCollaborator: (id: string) => Promise<void>;
}

const userContext = createContext({} as contextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<Collaborator | null>(() => {
    const info = Cookies.get("collaborator");
    return info ? JSON.parse(info) : null;
  });

  useCallback(() => {
    const userItem = Cookies.get("user");

    if (!collaborator || userItem) {
      const user: User = JSON.parse(userItem ?? "");
      getCollaborator(user.id);
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
    <userContext.Provider
      value={{
        collaborator,
        loading,
        errorMessage,
        getCollaborator,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

const useUser = () => useContext(userContext);

export { UserProvider, useUser };
