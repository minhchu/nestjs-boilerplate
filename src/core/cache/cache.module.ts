import { Module } from '@nestjs/common';
import { CacheModule as DefaultCacheModule } from './cache.default-module';

@Module({
  imports: [
    DefaultCacheModule.register({
      global: true,
      store: 'redis',
    }),
  ],
  exports: [DefaultCacheModule],
})
export class CacheModule {}
