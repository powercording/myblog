import {
  mysqlTable,
  index,
  int,
  varchar,
  datetime,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const token = mysqlTable(
  "Token",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    payload: varchar("payload", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    userId: int("userId").notNull(),
  },
  (table) => {
    return {
      payloadKey: uniqueIndex("Token_payload_key").on(table.payload),
      userIdIdx: index("Token_userId_idx").on(table.userId),
    };
  }
);
