import { Config } from "@/core/config";
import { UserModule } from "@/core/user-drizzle/user.module";
// import { UserModule } from "@/core/user-mikro/user.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: Config) => {
        return {
          secret: config.get("app.key"),
          signOptions: {
            expiresIn: "1h",
          },
        };
      },
      inject: ["config"],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
