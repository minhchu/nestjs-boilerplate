import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    /**
     * @see [Options](https://github.com/jaredhanson/passport-local#available-options)
     */
    super({
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: false,
    });
  }

  async validate(username: string, password: string) {
    const user = await this.auth.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
