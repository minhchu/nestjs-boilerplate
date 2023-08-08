import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DatabaseModuleOptions } from './database.interface';

/**
 * @see [DynamicModule](https://docs.nestjs.com/fundamentals/dynamic-modules#configurable-module-builder)
 */
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DatabaseModuleOptions>({ moduleName: 'DB' })
  .setExtras({ global: false })
  .setClassMethodName('register')
  .setFactoryMethodName('create')
  .build();
