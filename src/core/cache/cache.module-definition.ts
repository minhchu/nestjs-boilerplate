import { ConfigurableModuleBuilder } from "@nestjs/common";
import { CacheModuleOptions } from "./cache.interface";

/**
 * @deprecated For testing purpose
 * @see [DynamicModule](https://docs.nestjs.com/fundamentals/dynamic-modules#configurable-module-builder)
 */
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<CacheModuleOptions>()
  .setExtras({ global: false })
  .setClassMethodName("register")
  .setFactoryMethodName("createCacheConfigOptions")
  .build();
