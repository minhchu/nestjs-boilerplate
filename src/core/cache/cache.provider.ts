import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { caching } from 'cache-manager';
import { redisInsStore, redisStore } from 'cache-manager-ioredis-yet';
import Redis, { RedisOptions } from 'ioredis';
import { CacheModuleOptions, CacheStore } from './cache.interface';

export function cacheProvider(): Provider {
  return {
    provide: 'cache',
    useFactory: async (options: CacheModuleOptions, config: ConfigService) => {
      if (options.store === CacheStore.Memory) {
        return await caching('memory', {
          max: options.max,
          ttl: options.ttl,
        });
      }

      if (options.store === CacheStore.Redis) {
        const redisUrl = config.get<string>(
          'database.connections.redis.cache.url',
        );

        if (redisUrl !== '') {
          const redis = new Redis(redisUrl);

          return await caching((c) => redisInsStore(redis, c));
        }

        const redisConfig: RedisOptions = {
          host: config.get<string>('database.connections.redis.cache.host'),
          port: config.get<number>('database.connections.redis.cache.port'),
          db: config.get<number>('database.connections.redis.cache.database'),
        };

        return await caching(redisStore, redisConfig);
      }
    },
    inject: ['CACHE_MODULE_OPTIONS', ConfigService],
  };
}
