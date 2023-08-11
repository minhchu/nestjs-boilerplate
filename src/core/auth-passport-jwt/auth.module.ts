import { Module } from "@nestjs/common";
import { UserModule } from "@/core/user-drizzle/user.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
      secret: "supersecret",
      signOptions: {
        expiresIn: "1h",
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
