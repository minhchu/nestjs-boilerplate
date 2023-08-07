import { Global, Module } from '@nestjs/common';
import { CacheModule as DefaultCacheModule } from './cacheModule';

@Global()
@Module({
  imports: [
    DefaultCacheModule.register({
      store: 'redis',
    }),
  ],
  exports: [DefaultCacheModule],
})
export class CacheModule {}
