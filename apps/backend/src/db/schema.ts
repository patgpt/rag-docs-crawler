import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const crawls = pgTable('crawls', {
  id: integer('id').primaryKey(),
  baseUrl: text('base_url').notNull(),
  config: text('config').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pages = pgTable('pages', {
  id: integer('id').primaryKey(),
  crawlId: integer('crawl_id')
    .references(() => crawls.id, { onDelete: 'cascade' })
    .notNull(),
  url: text('url').notNull(),
  content: text('content').notNull(),
  etag: text('etag'),
  lastCrawledAt: timestamp('last_crawled_at').defaultNow().notNull(),
});