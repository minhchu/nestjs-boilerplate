import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './cache.module-definition';
import { cacheProvider } from './cache.provider';

@Module({})
export class CacheModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: 'CACHE_MODULE_OPTIONS',
          useValue: options,
        },
        cacheProvider(),
      ],
      exports: ['cache'],
    };
  }
}
