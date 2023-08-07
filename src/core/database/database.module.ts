import { Module } from '@nestjs/common';
import { DatabaseModule as DefaultDatabaseModule } from './database.default-module';

@Module({
  imports: [
    DefaultDatabaseModule.register({
      global: true,
      connection: 'sqlite',
    }),
  ],
  exports: [DefaultDatabaseModule],
})
export class DatabaseModule {}
