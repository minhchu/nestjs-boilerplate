import { UserService } from "@/core/user-drizzle";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      return null;
    }

    const compared = await bcrypt.compare(password, user.password);

    if (!compared) {
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
