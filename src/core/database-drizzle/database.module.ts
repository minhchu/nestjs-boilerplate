import { Module } from '@nestjs/common';
import { DatabaseModule as DatabaseCoreModule } from './database-core.module';

@Module({
  imports: [
    DatabaseCoreModule.register({
      global: true,
      connection: 'db',
    }),
  ],
  exports: [DatabaseCoreModule],
})
export class DatabaseModule {}
