import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  int,
  text,
  datetime,
  varchar,
  index,
  unique,
  tinyint,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const comment = mysqlTable('Comment', {
  id: int('id').autoincrement().primaryKey().notNull(),
  postId: int('postId').notNull(),
  content: text('content').notNull(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  userName: varchar('userName', { length: 191 }).notNull(),
});

export const post = mysqlTable(
  'Post',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    title: varchar('title', { length: 191 }).notNull(),
    content: text('content').notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    userName: varchar('userName', { length: 191 }).notNull(),
    categories: varchar('categories', { length: 20 }),
  },
  table => {
    return {
      userNameIdIdx: index('Post_userName_id_idx').on(table.userName, table.id),
    };
  },
);

export const token = mysqlTable(
  'Token',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    payload: varchar('payload', { length: 191 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    userId: int('userId').notNull(),
  },
  table => {
    return {
      userIdIdx: index('Token_userId_idx').on(table.userId),
      tokenPayloadKey: unique('Token_payload_key').on(table.payload),
    };
  },
);

export const user = mysqlTable(
  'User',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    name: varchar('name', { length: 191 }).notNull(),
    avatar: varchar('avatar', { length: 191 }),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    vaild: tinyint('vaild').default(0),
  },
  table => {
    return {
      userEmailKey: unique('User_email_key').on(table.email),
      userNameKey: unique('User_name_key').on(table.name),
    };
  },
);
