import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const topicTable = pgTable("topic", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull(),
});

export type Topic = InferSelectModel<typeof topicTable>;

export const messageTable = pgTable("message", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  text: varchar("title", { length: 5000 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull(),
  topicId: integer("topic_id").references(() => topicTable.id),
});

export type Message = InferSelectModel<typeof messageTable>;
