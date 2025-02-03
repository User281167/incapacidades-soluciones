"use client";

import { createContext, useContext, useState, useEffect } from "react";

import {
  getCollaborator as getCollaboratorInfo,
  updateAvatar,
} from "@/services/user.API";

import { ApiRes } from "@/types/api-res";
import { USER_ROLE } from "@/types/role";
import { COOKIES_ITEM } from "@/types/cookies-item";
import { Collaborator, User } from "@/types/models/user";

import Cookies from "js-cookie";

import { useAuth } from "./use-auth";

export interface UserContextType {
  collaborator: Collaborator | null;
  loading: boolean;
  errorMessage: string | null;
  getCollaborator: (id: string) => Promise<void>;
  uploadPhoto: (id: string, image: File) => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

  const { user, setUser, isLogin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !isLogin) return;

    const info = Cookies.get(COOKIES_ITEM.COLLABORATOR);

    if (!info && user !== null && user.role === USER_ROLE.COLLABORATOR) {
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
      setErrorMessage(res.message);
    }
  };

  const uploadPhoto = async (id: string, image: File) => {
    setErrorMessage(null);

    const res: ApiRes<string> = await updateAvatar(id, image);

    if (res.success) {
      const newUser: User = {
        ...user,
        photo: res.data + "?refresh=" + Math.random(), // add random to refresh image, to avoid caching the same image
      };

      setUser(newUser);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        collaborator,
        loading,
        errorMessage,
        getCollaborator,
        uploadPhoto,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserProvider, UserContext, useUser };
