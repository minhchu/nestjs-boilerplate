import { UserProvider } from "@/core/contracts/auth/user-provider";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "../user-drizzle/schemas/users.schema";

@Injectable()
export class UserService implements UserProvider {
  constructor() {}

  async retrieveByCredentials<User>(credentials): Promise<User> {
    return {
      id: 2,
      created_at: Date.now().toString(),
      name: "minh",
      email: "minh@m.me",
      password: "$2b$10$/bu3E4GRvVuyPMbwdWHHbeSk7tEdoBd5I9YPTCcGfyro3QboAO.Oa",
    } as User;
  }

  async validateCredentials(user: User, credentials: Record<string, string>) {
    return await bcrypt.compare(credentials.password, user.password);
  }
}
