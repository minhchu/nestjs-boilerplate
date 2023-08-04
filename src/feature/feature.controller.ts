import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { FeatureService } from './feature.service';

@Controller()
export class FeatureController {
  constructor(
    private readonly service: FeatureService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Get('/feature')
  index(): string {
    return this.service.getConfig();
  }

  @Get('/cache')
  async fromCache() {
    const value = await this.cache.get('cache_key');

    return value || 'default';
  }

  @Get('/setCache')
  async setCache() {
    await this.cache.set('cache_key', 'redis', 10000);

    return 'done';
  }
}
