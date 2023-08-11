import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /**
     * @see [options](https://github.com/mikenicholson/passport-jwt#configure-strategy)
     */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "supersecret",
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
