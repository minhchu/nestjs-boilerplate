import { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const featuresTable = sqliteTable('features', {
  id: integer('id').primaryKey(),
  name: text('name'),
});

export type Feature = InferModel<typeof featuresTable>;
