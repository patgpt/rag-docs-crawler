import { crawls } from "@/models/crawl.model";

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";

// The "pages" table stores information about each crawled page.
export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }), // ✅ Fix `int()` to `integer()`
  crawlId: integer("crawl_id")
    .references(() => crawls.id)
    .notNull(), // ✅ Add `notNull()` for foreign key
  url: text("url").notNull(),
  content: text("content"),
  etag: text("etag"), // ✅ Ensure this matches your earlier code
  selectorContent: text("selector_content"),
  statusCode: integer("status_code"),
  error: text("error"),
  lastCrawledAt: integer("last_crawled_at", { mode: "timestamp" }),
  headers: text("headers", { mode: "json" }),
  latency: integer("latency"),
  retryCount: integer("retry_count").default(0),
  crawledAt: integer("created_at", { mode: "timestamp" }).notNull(), // ✅ Add `notNull()`
});
  
export const pagesSelectSchema = createSelectSchema(pages);
export const pagesInsertSchema = createInsertSchema(pages);
export const pagesUpdateSchema = createUpdateSchema(pages);
