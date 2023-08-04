import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  // imports: [CacheModule.register()],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
