import { Module, DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// TODO: maybe we should move ConfigModule from @nestjs/config here
@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: ConfigModule,
      providers: [
        {
          provide: "config",
          useExisting: ConfigService,
        },
      ],
      exports: ["config"],
    };
  }
}
