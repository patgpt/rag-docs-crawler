import type { CrawlConfig } from "@/schema/crawl";
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
  config: text("config", { mode: "json" }).$type<CrawlConfig>().notNull(),
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

// The "pages" table stores information about each crawled page.
export const pages = sqliteTable("pages", {
  id: int().primaryKey({ autoIncrement: true }),
  // Use the SQLite integer builder for foreign keys.
  etag: text("etag"),
  crawlId: integer("crawl_id").references(() => crawls.id),
  url: text("url").notNull(),
  content: text("content"),
  selectorContent: text("selector_content"), // Content extracted via CSS selectors
  statusCode: integer("status_code"),
  error: text("error"),
  // Store headers as JSON data.
  lastCrawledAt: integer("last_crawled_at", { mode: "timestamp" }),
  headers: text("headers", { mode: "json" }),
  latency: integer("latency"), // Latency in milliseconds
  retryCount: integer("retry_count").default(0),
  crawledAt: integer("created_at", { mode: "timestamp" }),
});

// Define the "crawls" table.
// We store JSON data (for config and metrics) using text columns in JSON mode.

// Generate TypeBox schemas from your Drizzle schemas.
// These models can be used for validating API inputs and outputs.
export const crawlsSelectSchema = createSelectSchema(crawls);
export const crawlsInsertSchema = createInsertSchema(crawls);
export const crawlsUpdateSchema = createUpdateSchema(crawls);

export const pagesSelectSchema = createSelectSchema(pages);
export const pagesInsertSchema = createInsertSchema(pages);
export const pagesUpdateSchema = createUpdateSchema(pages);
