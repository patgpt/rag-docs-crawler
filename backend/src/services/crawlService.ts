import { eq } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { type ServerWebSocket } from "elysia/dist/ws/bun";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { chromium, type Page } from "playwright";
import { archiveFolder } from "@/services/archivalService";
import { convertToMarkdownAndSave } from "@/services/contentOutputService";
import { logger } from "@/utils/logger";
import { db } from "@/db";
import { pages } from "@/models/crawlModel";

let requestCount = 0;
const maxRequestsPerMinute = 100;
const clients = new Set<ServerWebSocket>();

export async function startCrawlService(config: Config) {
  const crawlId = uuid();

  const crawl = {
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
    if (crawledPages.size >= config.crawlDepth) break;
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
    if (crawledPages.size >= config.crawlDepth) break;
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

async function fetchPageContent(page: Page, url: string) {
  try {
    await page.goto(url);
    const content = await page.content();
    return content;
  } catch (error) {
    logger.error(`Failed to fetch content from ${url}:`, error);
    throw new Error(`Failed to fetch content from ${url}`);
  }
}

async function getPagesToCrawl(crawlId: number) {
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
function isValidLink(link: string, config: any): boolean {
  // Add conditions for validating the links (same domain, etc.)
  return link.startsWith(config.baseUrl);
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
