import { Injectable } from "@nestjs/common";
import { UserService } from "@/core/user-drizzle";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user-drizzle/schemas/users.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validate(email: string, password: string) {
    const user = this.userService.findOne(email);

    console.log(email, password);

    if (!user) {
      return null;
    }

    if (password !== user.password) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const { password, ...result } = user;

    const payload = {
      ...result,
      sub: user.id,
    };

    return {
      user: {
        ...result,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
