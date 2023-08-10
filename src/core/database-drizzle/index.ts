import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type DB = {
  ["sqlite"]: BetterSQLite3Database;
  ["mysql"]: MySql2Database;
  ["pgsql"]: PostgresJsDatabase;
};

export { DatabaseModule } from "./database.module";
