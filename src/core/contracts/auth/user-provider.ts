import type { Authenticable } from "./authenticable";

type Credentials = Record<string, string>;

export interface UserProvider {
  retrieveByCredentials<T = Authenticable>(
    credentials: Credentials
  ): Promise<T> | Promise<null>;

  validateCredentials(
    user: Authenticable,
    credentials: Credentials
  ): Promise<boolean>;
}

export const IUserProvider = Symbol("UserProvider");
