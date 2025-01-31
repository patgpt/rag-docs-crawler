// packages/backend/db/schema.ts
import { sqliteTable, text, integer, timestamp, uuid } from 'drizzle-orm/sqlite-core';

export const crawls = sqliteTable('crawls', {
  id: uuid('id').primaryKey().defaultRandom(),
  baseUrl: text('base_url').notNull(),
  config: text('config').$type<Record<string, any>>().notNull(),
  status: text('status')
    .notNull()
    .$type<'pending' | 'running' | 'completed' | 'failed'>()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const pages = sqliteTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  crawlId: uuid('crawl_id')
    .notNull()
    .references(() => crawls.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  content: text('content').notNull(),
  etag: text('etag').notNull(),
  lastCrawledAt: timestamp('last_crawled_at').defaultNow(),
});