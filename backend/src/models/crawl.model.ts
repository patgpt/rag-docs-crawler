import type { Table } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-typebox";

// The "crawls" table stores crawl configurations and metrics.
// Note: We use text with { mode: "json" } to store JSON data.
export const crawls = sqliteTable("crawls", {
  id: int().primaryKey({ autoIncrement: true }),
  baseUrl: text("base_url").notNull(),
  config: text("config", { mode: "json" }).$type<Table>().notNull(),
  status: text("status").notNull().default("pending"),
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  error: text("error"),
  // Metrics column stores JSON data about crawl performance.
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
