import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { DatabaseModuleOptions } from './database.interface';
import { MODULE_OPTIONS_TOKEN } from './database.module-definition';
import * as path from 'path';

export function databaseProvider(): Provider {
  return {
    provide: 'db',
    useFactory: async (
      options: DatabaseModuleOptions,
      config: ConfigService,
    ) => {
      const defaultConnection = config.get<string>('database.default');

      if (
        !options.connection &&
        ['mysql', 'pgsql', 'sqlite'].indexOf(defaultConnection) === -1
      ) {
        throw new Error('Invalid configuartion for database connection');
      }

      if (options.connection === 'sqlite' || defaultConnection === 'sqlite') {
        const dbName = config.get<string>(
          'database.connections.sqlite.database',
        );

        const storagePath = path.join('./', 'storage', `${dbName}.sqlite`);

        const sqlite = require('better-sqlite3')(storagePath);

        const db = drizzle(sqlite);

        return db;
      }

      return {};
    },
    inject: [MODULE_OPTIONS_TOKEN, ConfigService],
  };
}
