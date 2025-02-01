import { eq } from "drizzle-orm";
import { uuid, type PgUUIDBuilderInitial } from "drizzle-orm/pg-core";
import { type ServerWebSocket } from "elysia/ws/bun";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { chromium, type Page } from "playwright";
import { db } from "@/db";
import { pages } from "@/models/pages.model";
import type { crawlConfigSchema } from "@/schema/crawl";
import { archiveFolder } from "@/services/archive/archival.service";
import type { Static } from "elysia";
import { convertToMarkdownAndSave } from "@/services/contentOutputService";
import { logger } from "@/utils/logger";

let requestCount = 0;
const maxRequestsPerMinute = 100;
const clients = new Set<ServerWebSocket>();

type Crawl = {
  id: PgUUIDBuilderInitial<"">;
  baseUrl: string;
  config: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

async function startCrawl(config: Static<typeof crawlConfigSchema>) {
  // ✅
  const crawlId = uuid();

  const crawl: Crawl = {
    id: crawlId, // Use the generated unique id
    baseUrl: config.baseUrl,
    config: JSON.stringify(config),
    status: "running",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  // Initialize Playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(config.baseUrl);

  let pagesToCrawl = [config.baseUrl]; // Start with the base URL
  const crawledPages = new Set();
  while (pagesToCrawl.length > 0) {
    const url = pagesToCrawl.pop();
    if (url == undefined) throw new Error("URL is undefined");
    if (crawledPages.has(url) && url != undefined) continue;

    crawledPages.add(url);
    await throttleRequests();
    const links = new Array<string>();
    const content = await fetchPageContent(page, url);
    await convertToMarkdownAndSave(url, content);

    // Extract all links on the page
    while (pagesToCrawl.length > 0) {
      const url = pagesToCrawl.pop();
      if (url == undefined) throw new Error("URL is undefined");
      if (crawledPages.has(url) && url != undefined) continue;

      crawledPages.add(url);
      await throttleRequests();

      const links = await page.$$eval("a", (anchors) =>
        anchors
          .map((anchor) => {
            if (anchor instanceof HTMLElement) {
              return anchor.href;
            }
            return null;
          })
          .filter((href) => href !== null),
      );

      pagesToCrawl.push(...links);
    }

    // Filter links and add new ones to the list to crawl
    const validLinks = links.filter((link) => isValidLink(link, config));
    pagesToCrawl.push(...validLinks);

    // Check for crawl depth limit
    if (crawledPages.size >= config.maxDepth) break;
  }

  while (pagesToCrawl.length > 0) {
    const url = pagesToCrawl.pop();
    if (url == undefined) {
      logger.error("URL is undefined");
    }
    if (crawledPages.has(url)) continue;

    crawledPages.add(url);
    await throttleRequests();
    if (url !== undefined) {
      const content = await fetchPageContent(page, url);
      await convertToMarkdownAndSave(url, content);
    }
    // Extract all links on the page
    const links = await page.$$eval("a[href]", (anchors) =>
      anchors
        .filter((a) => !a.closest("svg")) // Filter out anchors inside SVG elements
        .filter((a): a is HTMLAnchorElement => a instanceof HTMLAnchorElement)
        .map((a) => a.href),
    );

    // Filter links and add new ones to the list to crawl
    const validLinks = links.filter((link) => isValidLink(link, config));
    pagesToCrawl.push(...validLinks);

    // Check for crawl depth limit
    if (crawledPages.size >= config.maxDepth) break;
  }

  await browser.close();

  // After crawling, archive the folder and send the file to frontend
  const folderPath = join(__dirname, "output");
  await archiveFolder(folderPath);

  logger.info("Crawl finished, archive created.");

  // Send status updates via WebSocket
  broadcastStatus({
    status: "completed",
    urlsCrawled: crawledPages.size,
    urlsRemaining: pagesToCrawl.length,
    errors: [],
  });
}

async function getPagesToCrawl(crawlId: number, pages: any) {
  return await db
    .select()
    .from(pages)
    .where(eq(pages.crawlId, crawlId))
    .execute();
}

async function updatePageContent(
  pageId: number,
  content: string,
  etag: string,
) {
  await db
    .update(pages)
    .set({ content, etag, lastCrawledAt: new Date() })
    .where(eq(pages.id, pageId))
    .execute();
}

async function throttleRequests() {
  requestCount++;
  if (requestCount >= maxRequestsPerMinute) {
    await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute
    requestCount = 0;
  }
}
function isValidLink(link: string, config: Static<typeof crawlConfigSchema>) {
  return link.startsWith(config.baseUrl); // ✅ `baseUrl` is now a string
}
export function downloadMarkdownService() {
  const filePath = join(__dirname, "..", "..", "output", "crawl-results.zip");
  return createReadStream(filePath);
}

export async function getStatusService() {
  return { status: "running", urlsCrawled: 10, urlsRemaining: 5, errors: [] };
}
export function broadcastStatus(status: any) {
  for (const client of clients) {
    if (client.readyState === 1) {
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
export async function fetchPageContent(page: Page, url: string) {
  // ✅
  try {
    await page.goto(url);
    return await page.content();
  } catch (error) {
    logger.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}
