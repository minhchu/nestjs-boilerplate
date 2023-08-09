import { Module } from '@nestjs/common';
import { DatabaseModule as DefaultDatabaseModule } from './database-core.module';

@Module({
  imports: [
    DefaultDatabaseModule.register({
      global: true,
      connection: 'db:mysql',
    }),
  ],
  exports: [DefaultDatabaseModule],
})
export class DatabaseModule {}
