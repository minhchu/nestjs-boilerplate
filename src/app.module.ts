import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import cacheConfig from './config/cache';
import databaseConfig from './config/database';
import { CacheModule } from './core/cache';
import { DatabaseModule } from './core/database';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [databaseConfig, cacheConfig],
    }),
    CacheModule,
    DatabaseModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
