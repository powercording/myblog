import {
  mysqlTable,
  index,
  int,
  varchar,
  text,
  datetime,
  json,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { user } from "../UserSchema/schema";
import { comment } from "../CommentSchema/schema";


export const post = mysqlTable(
  "Post",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    title: varchar("title", { length: 191 }).notNull(),
    content: text("content").notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    userName: varchar("userName", { length: 191 }).notNull(),
    categories: varchar("categories", { length: 20 }),
  },
  (table) => {
    return {
      userNameIdIdx: index("Post_userName_id_idx").on(table.userName, table.id),
    };
  }
);

export const postRelations = relations(post, ({ one, many }) => ({
  createdBy: one(user, {
    fields: [post.userName],
    references: [user.name],
  }),
  comments: many(comment)
}));
