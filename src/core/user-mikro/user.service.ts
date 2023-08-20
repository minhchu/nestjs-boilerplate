import { UserProvider } from "@/core/contracts/auth/user-provider";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";

@Injectable()
export class UserService implements UserProvider {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>
  ) {}

  async retrieveByCredentials<User>(credentials: {}): Promise<User> {
    const keys = Object.keys(credentials).filter((key) => key !== "password");

    const conditions = Object.fromEntries(
      keys.map((key) => [key, credentials[key]])
    );

    const user = await this.userRepository.findOne(conditions);

    return user as User;
  }

  async validateCredentials(user: User, credentials: Record<string, string>) {
    return await bcrypt.compare(credentials.password, user.password);
  }
}
