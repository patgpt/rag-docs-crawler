import type { CrawlConfig } from "@/schema/crawl";
import {
  text,
  pgTable,
  jsonb,
  integer,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
// Add crawl relationship and JSONB for config
export const crawls = pgTable("crawls", {
  id: serial("id").primaryKey(),
  baseUrl: text("base_url").notNull(),
  config: jsonb("config").$type<CrawlConfig>().notNull(), // Store as JSONB
  status: text("status").notNull().default("pending"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  error: text("error"),
  // Metrics
  metrics: jsonb("metrics").$type<{
    pagesCrawled: number;
    pagesFailed: number;
    avgLatency: number;
    bandwidthUsage: number;
  }>(),
});

// Enhance pages table
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  crawlId: integer("crawl_id").references(() => crawls.id),
  url: text("url").notNull(),
  content: text("content"),
  selectorContent: text("selector_content"), // Content from CSS selector
  statusCode: integer("status_code"),
  error: text("error"),
  headers: jsonb("headers"),
  latency: integer("latency"), // ms
  retryCount: integer("retry_count").default(0),
  crawledAt: timestamp("crawled_at").defaultNow(),
});
