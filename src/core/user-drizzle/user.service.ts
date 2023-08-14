import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { UserProvider } from "../contracts/auth/user-provider";
import { DB } from "../database-drizzle";
import { User, users } from "./schemas/users.schema";

@Injectable()
export class UserService implements UserProvider {
  constructor(@Inject("db") private db: DB["sqlite"]) {}

  async retrieveByCredentials<User>(credentials: {}): Promise<User> {
    const keys = Object.keys(credentials).filter((key) => key !== "password");

    let query = this.db.select().from(users);

    keys.forEach((key) => {
      query = query.where(eq(users[key], credentials[key]));
    });

    const result = query.get();

    // @ts-ignore
    return result;
  }

  async validateCredentials(user: User, credentials: Record<string, string>) {
    return await bcrypt.compare(credentials.password, user.password);
  }
}
