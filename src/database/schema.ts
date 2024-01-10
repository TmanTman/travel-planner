import { pgTable, serial, varchar, date, integer } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const topicTable = pgTable("topic", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdDate: date("date").notNull(),
});

export type Topic = InferSelectModel<typeof topicTable>;

export const messageTable = pgTable("message", {
  id: serial("id").primaryKey(),
  text: varchar("title", { length: 255 }).notNull(),
  createdDate: date("date").notNull(),
  topicId: integer("topic_id").references(() => topicTable.id),
});

export type Message = InferSelectModel<typeof messageTable>;
