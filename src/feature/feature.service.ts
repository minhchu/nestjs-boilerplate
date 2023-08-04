import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureService {
  constructor(private config: ConfigService) {}

  getConfig() {
    return this.config.get('database.port');
  }
}
