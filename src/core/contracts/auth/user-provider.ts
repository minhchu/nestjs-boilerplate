import type { Authenticable } from "./authenticable";

type Credentials = Record<string, string>;

export interface UserProvider {
  retrieveByCredentials<T>(credentials: Credentials): Promise<T> | T | null;

  validateCredentials(
    user: Authenticable,
    credentials: Credentials
  ): Promise<boolean> | boolean;
}

export const IUserProvider = Symbol("UserProvider");
