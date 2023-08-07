import { DynamicModule, Module } from '@nestjs/common';
import { CacheModuleOptions, CACHE_OPTIONS } from './cache.interface';
import { cacheProvider } from './cache.provider';

@Module({})
export class CacheCoreModule {
  static register(options: CacheModuleOptions): DynamicModule {
    const provider = cacheProvider();

    return {
      global: options.global,
      providers: [
        {
          provide: CACHE_OPTIONS,
          useValue: options,
        },
        provider,
      ],
      module: CacheCoreModule,
      exports: [provider],
    };
  }
}
