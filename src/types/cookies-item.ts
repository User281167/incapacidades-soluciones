import Cookies from "js-cookie";

export enum COOKIES_ITEM {
  ACCESS_TOKEN = "access_token",
  USER = "user",
  COLLABORATOR = "collaborator",
  COMPANY = "company",
}

export class CookiesApp {
  public static clearAuth() {
    Cookies.remove(COOKIES_ITEM.ACCESS_TOKEN);
    Cookies.remove(COOKIES_ITEM.USER);
    Cookies.remove(COOKIES_ITEM.COLLABORATOR);
    Cookies.remove(COOKIES_ITEM.COMPANY);
  }

  public static get<T>(key: COOKIES_ITEM): T | null {
    const value = Cookies.get(key);

    // problems with JSON.parse
    if (key === COOKIES_ITEM.ACCESS_TOKEN) return value ? (value as T) : null;

    return value ? (JSON.parse(value) as T) : null;
  }
  public static set<T>(key: COOKIES_ITEM, value: T) {
    if (typeof value === "string") Cookies.set(key, value);
    else Cookies.set(key, JSON.stringify(value));
  }
}
