import { crawls } from "@/models/crawl.model";

import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";

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

export const pagesSelectSchema = createSelectSchema(pages);
export const pagesInsertSchema = createInsertSchema(pages);
export const pagesUpdateSchema = createUpdateSchema(pages);
