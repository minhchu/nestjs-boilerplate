import { Controller, Get, Inject } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { Cache } from 'src/core/cache';
import { featuresTable } from './feature.schema';
import { FeatureService } from './feature.service';

@Controller()
export class FeatureController {
  constructor(
    private readonly service: FeatureService,
    @Inject('cache') private readonly cache: Cache,
    @Inject('db') private readonly db: BetterSQLite3Database,
  ) {}

  @Get('/db')
  getDB() {
    return this.db.select().from(featuresTable).all();
  }

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
