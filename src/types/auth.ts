import { User } from "./models/user";

export type AuthRes = {
  token: string;
  user: User;
};
