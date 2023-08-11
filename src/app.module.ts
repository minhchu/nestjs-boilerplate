import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import appConfig from "./config/app";
import cacheConfig from "./config/cache";
import databaseConfig from "./config/database";
import { AuthModule } from "./core/auth-passport-jwt/auth.module";
import { CacheModule } from "./core/cache";
import { ConfigModule as CoreConfigModule } from "./core/config";
import { DatabaseModule } from "./core/database-drizzle";
import { UserModule } from "./core/user-drizzle/user.module";
import { FeatureModule } from "./feature/feature.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [databaseConfig, cacheConfig, appConfig],
    }),
    CoreConfigModule.register(),
    CacheModule,
    DatabaseModule,
    FeatureModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
