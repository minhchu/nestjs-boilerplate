import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export type DB = {
  ['sqlite']: BetterSQLite3Database;
};

export { DatabaseModule } from './database.module';
