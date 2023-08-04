import { Global, Module } from '@nestjs/common';
import { CacheModule as DefaultCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Global()
@Module({
  imports: [
    DefaultCacheModule.registerAsync({
      imports: [ConfigModule],
      // @ts-ignore
      useFactory: async (config: ConfigService) => {
        if (config.get('cache.default') === 'memory') {
          return {
            isGlobal: true,
          };
        }
        if (config.get('cache.default') === 'redis') {
          return {
            isGlobal: true,
            store: redisStore,
            host: config.get('database.redis.host'),
            port: config.get('database.redis.port'),
          };
        }
        return {};
      },
      inject: [ConfigService],
    }),
  ],
  exports: [DefaultCacheModule],
})
export class CacheModule {}
