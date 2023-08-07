import { Module } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './cache.module-definition';
import { cacheProvider } from './cache.provider';

@Module({
  providers: [cacheProvider()],
  exports: ['cache'],
})
export class CacheModule extends ConfigurableModuleClass {
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
