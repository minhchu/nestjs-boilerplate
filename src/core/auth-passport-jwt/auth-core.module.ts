import { DynamicModule, Module } from "@nestjs/common";
import { AUTH_MODULE_OPTIONS } from "./auth.interface";

@Module({})
export class AuthCoreModule {
  static register(options: any): DynamicModule {
    return {
      module: AuthCoreModule,
      providers: [
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: ["auth"],
    };
  }
}
