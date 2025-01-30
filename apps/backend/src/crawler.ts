// src/crawler.ts
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import generateMarkdown from './markdown-generator';
import { CRAWLER_CONFIG } from './config';
import { randomDelay } from './utils';
import pLimit from 'p-limit';

async function extractRoutes(baseURL: string): Promise<string[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`Navigating to ${baseURL}`);

    // Navigate to the page and wait for network idle
    await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 60000 });

    // Log all anchor elements for debugging
    const rawAnchors = await page.$$eval('a[href]', (anchors, args) => {
      const baseURL = args[0]; // Unpack baseURL from the array
      return anchors.map((anchor) => ({
        tagName: anchor.tagName,
        href: (anchor as HTMLAnchorElement).href || (anchor as SVGElement & { href: { baseVal: string } })?.href?.baseVal,
      }));
    }, [baseURL]); // Pass baseURL as an array

    console.log('Raw anchors:', rawAnchors);

    // Extract all links under /docs/app/*
    const links = await page.$$eval('a[href]', (anchors, args) => {
      const baseURL = args[0]; // Unpack baseURL from the array
      return anchors
        .filter((anchor): anchor is HTMLAnchorElement => anchor.tagName === 'A') // Ensure only <a> tags
        .map((a) => a.href) // Access the `href` property safely
        .filter((href) => href.startsWith(baseURL) && !href.includes('#')); // Use baseURL here
    }, [baseURL]); // Pass baseURL as an array

    // Remove duplicates
    const uniqueLinks = Array.from(new Set(links));
    console.log(`Found ${uniqueLinks.length} routes to crawl:`);
    console.log(uniqueLinks);
    return uniqueLinks;
  } catch (error) {
    console.error('Error extracting routes:', error);
    return [];
  } finally {
    await browser.close();
  }
}
async function crawlWebsite(url: string, outputPath: string): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`Navigating to ${url}`);

    // Set a custom User-Agent to mimic a real browser
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    let retries = 3; // Maximum number of retries
    while (retries > 0) {
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        break; // Exit the loop if successful
      } catch (error) {
        retries--;
        if (retries === 0) throw error; // Throw the error if no retries left
        console.log(`Retrying ${url}... (${3 - retries}/3 attempts remaining)`);
      }
    }

    // Optionally wait for a specific element to load
    await page.waitForSelector('main'); // Adjust the selector as needed

    const title = await page.title();
    const content = await page.content();
    const markdown = generateMarkdown(title, content);

    const filePath = path.join(outputPath, `${title.replace(/[^a-z0-9]/gi, '_')}.md`);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(filePath, markdown);
    console.log(`Markdown saved to ${filePath}`);
  } catch (error) {
    console.error(`Error crawling ${url}:`, (error as any).message );
  } finally {
    await browser.close();
  }
}
export default async function crawlAllRoutes(baseURL: string): Promise<void> {
  const { maxConcurrentRequests, outputDir } = CRAWLER_CONFIG;

  const routes = await extractRoutes(baseURL);

  console.log(`Found ${routes.length} routes to crawl:`);
  console.log(routes);

  const concurrencyLimit = pLimit(maxConcurrentRequests);

  const promises = routes.map((route) =>
    concurrencyLimit(async () => {
      await randomDelay(); // Randomize delay between requests
      await crawlWebsite(route, outputDir);
    })
  );

  await Promise.all(promises);
}