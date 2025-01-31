import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { crawls, pages } from '../models/crawlModel';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import type { ServerWebSocket } from 'elysia/dist/ws/bun';



let requestCount = 0;
const maxRequestsPerMinute = 100;
const clients = new Set<ServerWebSocket>();

export async function startCrawlService(config: any) {
    const crawl = {
    id: 1,
    baseUrl: config.baseUrl,
    config: JSON.stringify(config),
    status: 'running',
    createdAt: new Date(),
        updatedAt: new Date(),
    };

  // Insert a new crawl record
    await db.insert(crawls).values(
      crawl
  ).execute();


  // Simulate crawling logic
  const pagesToCrawl = await getPagesToCrawl(1); // Replace `1` with the actual crawl ID
  for (const page of pagesToCrawl) {
    await throttleRequests();
    const content = await fetchPageContent(page.url);
    if (content.etag !== page.etag) {
      await updatePageContent(page.id, content.content, content.etag);
    }
    broadcastStatus({ status: 'running', urlsCrawled: 10, urlsRemaining: 5, errors: [] });
  }
}

async function getPagesToCrawl(crawlId: number) {
  return await db.select().from(pages).where(eq(pages.crawlId, crawlId)).execute();
}

async function fetchPageContent(url: string) {
  // Simulate fetching page content
  return { content: 'Page content', etag: 'etag-value' };
}

async function updatePageContent(pageId: number, content: string, etag: string) {
  await db
    .update(pages)
    .set({ content, etag, lastCrawledAt: new Date() })
    .where(eq(pages.id, pageId))
    .execute();
}

async function throttleRequests() {
  requestCount++;
  if (requestCount >= maxRequestsPerMinute) {
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
    requestCount = 0;
  }
}

export function downloadMarkdownService() {
  const filePath = join(__dirname, '..', '..', 'output', 'crawl-results.zip');
  return createReadStream(filePath);
}

export async function getStatusService() {
  return { status: 'running', urlsCrawled: 10, urlsRemaining: 5, errors: [] };
}

export function broadcastStatus(status: any) {
  for (const client of clients) {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(JSON.stringify(status));
    }
  }
}

export function addClient(client: ServerWebSocket) {
  clients.add(client);
}

export function removeClient(client: ServerWebSocket) {
  clients.delete(client);
}