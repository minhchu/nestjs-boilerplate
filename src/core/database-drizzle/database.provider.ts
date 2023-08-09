import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DatabaseModuleOptions,
  DEFAULT_DATABASE_TOKEN,
} from './database.interface';
import { MODULE_OPTIONS_TOKEN } from './database.module-definition';
import * as path from 'path';
import * as mysql from 'mysql2/promise';
import postgres from 'postgres';

export function databaseProvider(): Provider {
  return {
    provide: DEFAULT_DATABASE_TOKEN,
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

      if (defaultConnection === 'sqlite') {
        return await createSQLiteClient(config);
      }

      if (defaultConnection === 'mysql') {
        return await createMySQLClient(config);
      }

      if (defaultConnection === 'pgsql') {
        return await createPgSQLClient(config);
      }

      return {};
    },
    inject: [MODULE_OPTIONS_TOKEN, ConfigService],
  };
}

type Dialect = 'db:sqlite' | 'db:mysql' | 'db:pgsql' | string;

export function dynamicDatabaseProvider(dialect: Dialect): Provider {
  return {
    provide: dialect,
    useFactory: async (
      options: DatabaseModuleOptions,
      config: ConfigService,
    ) => {
      const connection = dialect.split(':')[1];

      if (['sqlite', 'mysql', 'pgsql'].indexOf(connection) === -1) {
        throw new Error('Invalid configuartion for database connection');
      }

      if (connection === 'sqlite') {
        return await createSQLiteClient(config);
      }

      if (connection === 'mysql') {
        return await createMySQLClient(config);
      }

      if (connection === 'pgsql') {
        return await createPgSQLClient(config);
      }

      return {};
    },
    inject: [MODULE_OPTIONS_TOKEN, ConfigService],
  };
}

async function createSQLiteClient(config: ConfigService) {
  let dbName = config.get<string>('database.connections.sqlite.database');

  dbName = dbName.replace('.sqlite', '');

  const storagePath = path.join('storage', `${dbName}.sqlite`);

  const sqlite = require('better-sqlite3')(storagePath);

  const { drizzle } = await import('drizzle-orm/better-sqlite3');

  return drizzle(sqlite);
}

async function createMySQLClient(config: ConfigService) {
  const { drizzle } = await import('drizzle-orm/mysql2');

  const connectionString = config.get<string>(
    'database.connections.mysql.url',
    '',
  );

  if (connectionString !== '') {
    const connection = await mysql.createConnection(connectionString);

    return drizzle(connection);
  }

  const host = config.get<string>('database.connections.mysql.host');
  const port = config.get<number>('database.connections.mysql.port');
  const database = config.get<string>('database.connections.mysql.database');
  const user = config.get<string>('database.connections.mysql.username');
  const password = config.get<string>('database.connections.mysql.password');

  const connection = await mysql.createConnection({
    host,
    port,
    database,
    user,
    password,
  });

  return drizzle(connection);
}

async function createPgSQLClient(config: ConfigService) {
  const { drizzle } = await import('drizzle-orm/postgres-js');

  const connectionString = config.get<string>(
    'database.connections.mysql.url',
    '',
  );

  if (connectionString !== '') {
    const connection = postgres(connectionString);

    return drizzle(connection);
  }

  const host = config.get<string>('database.connections.pgsql.host');
  const port = config.get<number>('database.connections.pgsql.port');
  const database = config.get<string>('database.connections.pgsql.database');
  const user = config.get<string>('database.connections.pgsql.username');
  const password = config.get<string>('database.connections.pgsql.password');

  const connection = postgres(
    'postgres://username:password@host:port/database',
    {
      host,
      port,
      database,
      user,
      password,
    },
  );

  return drizzle(connection);
}
