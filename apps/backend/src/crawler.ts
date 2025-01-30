import generateMarkdown from "@/markdown-generator";
import path from "path";
import { chromium } from "playwright";
import fs from "fs";
import pLimit from 'p-limit';
import { CRAWLER_CONFIG } from './config';

const failedUrls: string[] = [];

async function extractAllLinks(baseURL: string): Promise<string[]> {
  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    console.log(`Navigating to ${baseURL}`);
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
    console.log(`Found ${uniqueLinks.length} routes to crawl:`);
    console.log(uniqueLinks);
    return uniqueLinks;
  } catch (error) {
    console.error('Error extracting links:', error);
    return [];
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed to free resources
      console.log('Browser closed after extracting links.');
    }
  }
}

export async function crawlAllRoutes(baseURL: string): Promise<void> {
  const { maxConcurrentRequests, outputDir } = CRAWLER_CONFIG;

  // Launch a single browser instance for all tasks
  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
    console.log('Browser launched successfully.');

    // Extract all routes first
    const routes = await extractAllLinks(baseURL);
    console.log(`Found ${routes.length} routes to crawl:`);
    console.log(routes);

    // Limit concurrency using p-limit
    const concurrencyLimit = pLimit(maxConcurrentRequests);
    const promises = routes.map((route) =>
      concurrencyLimit(async () => {
        console.log(`Processing route: ${route}`);
        if (failedUrls.includes(route)) {
          console.log(`Skipping previously failed URL: ${route}`);
          return;
        }
        try {
          const page = await browser.newPage();
          await crawlWebsite(page, route, outputDir);
          await page.close(); // Close the page after crawling
        } catch (error) {
          console.error(`Error crawling ${route}:`, (error as any).message);
          failedUrls.push(route); // Add to failed URLs list
        }
      })
    );

    console.log(`Starting to process ${promises.length} routes...`);
    await Promise.all(promises);
    console.log('Finished processing all routes.');
  } catch (error) {
    console.error('Critical error in crawlAllRoutes:', (error as any).message);
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed to free resources
      console.log('Browser closed after crawling.');
    }
    console.log('Crawling completed. Failed URLs:', failedUrls);
  }
}

export default async function crawlWebsite(
  url: string,
  outputPath: string,
  selector: string = 'main' // Default selector is 'main'
): Promise<void> {
  let browser = null;
  try {
    console.log(`Starting crawl for ${url}`);

    // Retry mechanism for browser launch with exponential backoff
    let retries = 3;
    while (retries > 0) {
      try {
        browser = await chromium.launch({ headless: true });
        console.log('Browser launched successfully.');
        break; // Exit the loop if successful
      } catch (error) {
        retries--;
        console.error(`Browser launch attempt failed: ${(error as any).message}`);
        if (retries === 0) throw error;
        const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
        console.log(`Retrying browser launch in ${delay}ms... (${3 - retries}/3 attempts remaining)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    if (!browser) {
      throw new Error('Failed to launch browser.');
    }

    const page = await browser.newPage();
    console.log('New page created.');

    // Set a custom User-Agent to mimic a real browser
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    // Retry mechanism for navigation with exponential backoff
    retries = 3;
    while (retries > 0) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Use 'domcontentloaded' instead of 'networkidle'
        console.log(`Successfully navigated to ${url}`);
        break; // Exit the loop if successful
      } catch (error) {
        retries--;
        console.error(`Navigation to ${url} failed: ${(error as any).message}`);
        if (retries === 0) throw error;
        const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
        console.log(`Retrying ${url} in ${delay}ms... (${3 - retries}/3 attempts remaining)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Simulate scrolling to trigger dynamic content loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000); // Wait for dynamic content to load

    // Wait for the specified selector or fallback to 'main'
    try {
      console.log(`Waiting for content using selector: ${selector}`);
      await page.waitForFunction(
        (sel) => {
          const element = document.querySelector(sel);
          return element && element.innerText.length > 0;
        },
        { timeout: 30000 }, // Reduced timeout
        selector
      );
      console.log(`Content loaded successfully using selector: ${selector}`);
    } catch (error) {
      console.error(`Failed to load content using selector ${selector}:`, (error as any).message);
      throw new Error(`Content not found using selector: ${selector}`);
    }

    // Extract title and content, then convert to Markdown
    const title = await page.title();
    const content = await page.content();

    if (!title || title.trim().length === 0) {
      console.warn(`Skipping ${url} due to missing or invalid title.`);
      return;
    }

    if (!content || content.trim().length === 0) {
      console.warn(`Skipping ${url} due to missing or invalid content.`);
      return;
    }

    console.log(`Extracted title: ${title}`);
    console.log(`Content length: ${content.length}`);

    // Generate Markdown
    const markdown = generateMarkdown(title, content);

    // Save Markdown file
    const filePath = path.join(outputPath, `${title.replace(/[^a-z0-9]/gi, '_')}.md`);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(filePath, markdown);
    console.log(`Markdown saved to ${filePath}`);
  } catch (error) {
    console.error(`Error crawling ${url}:`, (error as any).message);
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed to free resources
      console.log('Browser closed after crawling.');
    }
  }
}