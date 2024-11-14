import { user } from "./models";

export type AuthRes = {
  token: string;
  user: user;
  errorMessage: string;
};
