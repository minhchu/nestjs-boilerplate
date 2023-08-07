import { Module } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './database.module-definition';
import { databaseProvider } from './database.provider';

@Module({
  providers: [databaseProvider()],
  exports: ['db'],
})
export class DatabaseModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE) {
    return {
      global: options.global,
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      global: options.global,
      ...super.registerAsync(options),
    };
  }
}
