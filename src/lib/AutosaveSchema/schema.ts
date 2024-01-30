import { relations } from 'drizzle-orm';
import { mysqlTable, int, text, index, varchar } from 'drizzle-orm/mysql-core';
import { user } from '../UserSchema/schema';

export const autoSave = mysqlTable(
  'AutoSave',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    content: text('content'),
    userName: varchar('userId', { length: 60 }).notNull(),
  },
  table => {
    return {
      contentIdx: index('AutoSave_content_id_idx').on(table.userName, table.id),
    };
  },
);

export const autoSaveRelations = relations(autoSave, ({ one }) => ({
  user: one(user, {
    fields: [autoSave.userName],
    references: [user.id],
  }),
}));
