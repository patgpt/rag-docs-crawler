import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'crawls' table schema
export const crawls = pgTable('crawls', {
  id: integer('id').primaryKey(), // Auto-incrementing primary key (SERIAL type)
  baseUrl: text('base_url').notNull(), // Base URL of the crawl
  config: text('config').notNull(), // Configuration for the crawl (e.g., depth, timeout)
  status: text('status').notNull(), // Current status of the crawl (e.g., "running", "completed")
  createdAt: timestamp('created_at').defaultNow(), // Timestamp when the crawl was created (optional with default value)
  updatedAt: timestamp('updated_at').defaultNow(), // Timestamp when the crawl was last updated (optional with default value)
});

// Define the 'pages' table schema
export const pages = pgTable('pages', {
  id: integer('id').primaryKey(), // Auto-incrementing primary key (SERIAL type)
  crawlId: integer('crawl_id')
    .references(() => crawls.id, { onDelete: 'cascade' }) // Foreign key referencing the 'crawls' table
    .notNull(),
  url: text('url').notNull(), // URL of the page
  content: text('content').notNull(), // Content of the page (e.g., HTML or Markdown)
  etag: text('etag'), // ETag for caching purposes
  lastCrawledAt: timestamp('last_crawled_at').defaultNow().notNull(), // Timestamp of the last crawl
});