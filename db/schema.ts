import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  attendance: text("attendance").notNull(),
  guests: integer("guests").notNull(),
  message: text("message"),
  createdAt: text("created_at").notNull(),
});
