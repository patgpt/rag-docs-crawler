import type { Table } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";

// The "crawls" table stores crawl configurations and metrics.
// Note: We use text with { mode: "json" } to store JSON data.
export const crawls = sqliteTable("crawls", {
  id: integer("id").primaryKey({ autoIncrement: true }), // ✅ Add auto-increment
  config: text("config").notNull(),
  status: text("status").notNull().default("pending"), // Add default value
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  metrics: text("metrics", { mode: "json" }).$type<{
    pagesCrawled: number;
    pagesFailed: number;
    avgLatency: number;
    bandwidthUsage: number;
  }>(),
});
// Generate TypeBox schemas from your Drizzle schemas.
// These models can be used for validating API inputs and outputs.
export const crawlsSelectSchema = createSelectSchema(crawls);
export const crawlsInsertSchema = createInsertSchema(crawls);
export const crawlsUpdateSchema = createUpdateSchema(crawls);
