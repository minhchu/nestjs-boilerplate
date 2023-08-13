import { Config } from "@/core/config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject("config") private config: Config) {
    /**
     * @see [options](https://github.com/mikenicholson/passport-jwt#configure-strategy)
     */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("app.key"),
    });
  }

  /**
   * Passport will build a user object based on the return value of our validate() method,
   * and attach it as `user` property on the Request object.
   * Example: payload = { iat: ,exp: ,sub: ,name: ,email: ,password: ,...userProperties}
   */
  async validate(payload: any) {
    const { iat, exp, sub, ...user } = payload;

    return user;
  }
}
