import { user } from "./models/user";

export type AuthRes = {
  token: string;
  user: user;
};
