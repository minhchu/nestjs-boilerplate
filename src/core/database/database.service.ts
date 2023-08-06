import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SQLiteDatabase from 'better-sqlite3';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';

const databases = {
  mysql: null,
  pgsql: null,
  sqlite: null,
};

enum Connection {
  mysql,
  pgsql,
  sqlite,
}

@Injectable()
export class DatabaseService {
  private _connection = Connection.mysql;

  constructor(private readonly config: ConfigService) {
    this._connection = config.get<Connection>('database.default');

    if (this._connection === Connection.mysql) {
    }

    if (this._connection === Connection.sqlite) {
      const sqlite = new SQLiteDatabase('sqlite.db');

      databases.sqlite = drizzleSQLite(sqlite);
    }
  }

  connection(type: Connection | undefined) {
    if (type) {
      this._connection = type;

      return this;
    }

    return this._connection;
  }
}
