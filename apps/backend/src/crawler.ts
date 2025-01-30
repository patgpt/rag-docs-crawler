import generateMarkdown from "@/markdown-generator";
import path from "path";
import { chromium, Browser, Page } from "playwright";
import fs from "fs";
import pLimit from 'p-limit';
import { CRAWLER_CONFIG } from './config';
import logger from './logger';

const failedUrls: string[] = [];
let browserInstance: Browser | null = null;

// Function to launch the browser
async function launchBrowser(): Promise<Browser> {
  let retries = 3;
  while (retries > 0) {
    try {
      browserInstance = await chromium.launch({ headless: true });
      logger.info('Browser launched successfully.');
      return browserInstance;
    } catch (error) {
      retries--;
      logger.error(`Browser launch attempt failed: ${(error as any).message}`);
      if (retries === 0) throw error;
      const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
      logger.info(`Retrying browser launch in ${delay}ms... (${3 - retries}/3 attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Failed to launch browser.');
}

// Graceful shutdown function
async function shutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (browserInstance) {
    await browserInstance.close();
    logger.info('Browser closed during shutdown.');
  }
  process.exit(0);
}

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Function to extract all links from a base URL
async function extractAllLinks(baseURL: string): Promise<string[]> {
  let browser: Browser | null = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    logger.info(`Navigating to ${baseURL}`);
    await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 60000 });

    // Extract all links under /docs/app/*
    const links = await page.$$eval('a[href]', (anchors, args) => {
      const baseURL = args[0]; // Unpack baseURL from the array
      return anchors
        .filter((anchor): anchor is HTMLAnchorElement => anchor.tagName === 'A')
        .map((a) => a.href)
        .filter((href) => href.startsWith(baseURL.toString()) && !href.includes('#'));
    }, [baseURL]);

    // Remove duplicates and validate links
    const uniqueLinks = Array.from(new Set(links)).filter((link) =>
      link.startsWith(baseURL) && !link.includes('#')
    );
    logger.info(`Found ${uniqueLinks.length} routes to crawl:`);
    logger.info(uniqueLinks);
    return uniqueLinks;
  } catch (error) {
    logger.error('Error extracting links:', error);
    return [];
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed to free resources
      logger.info('Browser closed after extracting links.');
    }
  }
}

// Function to crawl a single website
async function crawlWebsite(page: Page, url: string, outputPath: string, selector: string): Promise<void> {
  try {
    logger.info(`Starting crawl for ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Simulate scrolling to trigger dynamic content loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000); // Wait for dynamic content to load

    // Validate selector
    if (!selector) {
      throw new Error('Selector is undefined or empty.');
    }

    // Wait for the specified selector or fallback to 'main'
    try {
      logger.info(`Waiting for content using selector: ${selector}`);
      await page.waitForFunction(
      // @ts-ignore
        (sel: string) => {
          const element = document.querySelector(sel);
          // @ts-ignore
          return !!element && element.textContent?.trim().length > 0;
        },
        {}, // Empty options object
        selector // Pass the selector as the third argument
      );
      logger.info(`Content loaded successfully using selector: ${selector}`);
    } catch (error) {
      logger.error(`Failed to load content using selector ${selector}:`, (error as any).message);
      throw new Error(`Content not found using selector: ${selector}`);
    }

    // Extract title and content, then convert to Markdown
    const title = await page.title();
    const content = await page.content();
    if (!title || title.trim().length === 0) {
      logger.warn(`Skipping ${url} due to missing or invalid title.`);
      return;
    }
    if (!content || content.trim().length === 0) {
      logger.warn(`Skipping ${url} due to missing or invalid content.`);
      return;
    }
    logger.info(`Extracted title: ${title}`);
    logger.info(`Content length: ${content.length}`);

    // Generate Markdown
    const markdown = generateMarkdown(title, content);

    // Save Markdown file
    const filePath = path.join(outputPath, `${title.replace(/[^a-z0-9]/gi, '_')}.md`);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(filePath, markdown);
    logger.info(`Markdown saved to ${filePath}`);
  } catch (error) {
    logger.error(`Error crawling ${url}:`, (error as any).message);
  }
}
// Function to crawl all routes
export async function crawlAllRoutes(baseURL: string, selector: string): Promise<void> {
  const { maxConcurrentRequests, outputDir, defaultSelector } = CRAWLER_CONFIG;
  let browser: Browser | null = null;
  try {

    browser = await launchBrowser();
    logger.info('Browser launched successfully.');

    // Extract all routes first
    const routes = await extractAllLinks(baseURL);
    logger.info(`Found ${routes.length} routes to crawl:`);
    logger.info(routes);

    // Limit concurrency using p-limit
    const concurrencyLimit = pLimit(maxConcurrentRequests);
    const promises = routes.map((route) =>
      concurrencyLimit(async () => {
        logger.info(`Processing route: ${route}`);
        if (failedUrls.includes(route)) {
          logger.info(`Skipping previously failed URL: ${route}`);
          return;
        }
        try {
          if (!browser) throw new Error('Browser instance is not available');
          const page = await browser.newPage();

          // Ensure selector is valid
          const finalSelector = selector || defaultSelector;
          if (!finalSelector) {
            throw new Error('Selector is undefined or empty.');
          }

          await crawlWebsite(page, route, outputDir, finalSelector);
          await page.close(); // Close the page after crawling
        } catch (error) {
          logger.error(`Error crawling ${route}: ${(error as any).message}`);
          failedUrls.push(route); // Add to failed URLs list
        }
      })
    );

    logger.info(`Starting to process ${promises.length} routes...`);
    await Promise.all(promises);
    logger.info('Finished processing all routes.');
  } catch (error) {
    logger.error('Critical error in crawlAllRoutes:', (error as any).message);
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed to free resources
      logger.info('Browser closed after crawling.');
    }
    logger.info('Crawling completed. Failed URLs:', failedUrls);
  }
}