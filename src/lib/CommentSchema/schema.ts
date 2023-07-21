import { relations, sql } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { user } from "../UserSchema/schema";
import { post } from "../PostSchema/schema";

export const comment = mysqlTable("Comment", {
  id: int("id").autoincrement().primaryKey().notNull(),
  postId: int("postId").notNull(),
  content: text("content").notNull(),
  createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
    .default(sql`(CURRENT_TIMESTAMP(3))`)
    .notNull(),
  userName: varchar("userName", { length: 191 }).notNull(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  commentBy: one(user, {
    fields: [comment.userName],
    references: [user.name],
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));
