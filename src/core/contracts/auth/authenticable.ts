export interface Authenticable {
  password: string;
}

export const IAuthenticable = Symbol("Authenticable");
