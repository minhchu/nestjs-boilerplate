import { sql } from "drizzle-orm";
import { mysqlTable, int, text, bigint } from "drizzle-orm/mysql-core";

export const usersMysql = mysqlTable("users", {
  id: int("id"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
});
