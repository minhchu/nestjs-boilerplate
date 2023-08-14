import { Authenticable } from "@/core/contracts/auth/authenticable";
import {
  IUserProvider,
  UserProvider,
} from "@/core/contracts/auth/user-provider";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserProvider) private userService: UserProvider,
    private jwtService: JwtService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.retrieveByCredentials<Authenticable>({
      email,
      password,
    });

    if (!user) {
      return null;
    }

    const matched = await this.userService.validateCredentials(user, {
      email,
      password,
    });

    if (!matched) {
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
