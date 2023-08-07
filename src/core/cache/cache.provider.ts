import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { caching } from 'cache-manager';
import { redisInsStore, redisStore } from 'cache-manager-ioredis-yet';
import Redis, { RedisOptions } from 'ioredis';
import { CacheModuleOptions, CACHE_OPTIONS } from './cache.interface';

export function cacheProvider(): Provider {
  return {
    provide: 'cache',
    useFactory: async (options: CacheModuleOptions, config: ConfigService) => {
      const defaultCacheDriver = config.get<string>('cache.default');

      if (defaultCacheDriver === 'memory') {
        return await caching('memory', {
          max: options.max ?? 100,
          ttl: options.ttl ?? 60000,
        });
      }

      if (defaultCacheDriver === 'redis') {
        const redisUrl = config.get<string>(
          'database.connections.redis.cache.url',
        );

        if (redisUrl !== undefined && redisUrl !== '') {
          const redis = new Redis(redisUrl);

          return await caching((c) => redisInsStore(redis, c));
        }

        // TODO: add password. maybe should add a redis.service
        const redisConfig: RedisOptions = {
          host: config.get<string>('database.connections.redis.cache.host'),
          port: config.get<number>('database.connections.redis.cache.port'),
          db: config.get<number>('database.connections.redis.cache.database'),
        };

        return await caching(redisStore, redisConfig);
      }
    },
    inject: [CACHE_OPTIONS, ConfigService],
  };
}
