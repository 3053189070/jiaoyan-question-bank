import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  answer: text("answer").notNull().default(""),
  analysis: text("analysis").notNull().default(""),
  subject: text("subject").notNull().default("数学"),
  grade: text("grade").notNull().default("九年级"),
  type: text("type").notNull().default("解答题"),
  difficulty: text("difficulty").notNull().default("中等"),
  source: text("source").notNull().default("手动录入"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
