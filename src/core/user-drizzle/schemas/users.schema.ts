import { InferModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
});

export type User = InferModel<typeof users>;
