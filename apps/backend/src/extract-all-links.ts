import { chromium } from "playwright";
import { CRAWLER_CONFIG } from './config'


const { baseURL } = CRAWLER_CONFIG;
async function extractAllLinks(baseURL: string): Promise<string[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`Navigating to ${baseURL}`);
    await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 60000 });

    // Extract all links under /docs/app/*
    const links = await page.$$eval('a[href]', (anchors, baseURL) =>
      anchors
        .filter((anchor): anchor is HTMLAnchorElement => anchor.tagName === 'A')
        .map((a) => a.href)
        .filter((href) => href.startsWith(baseURL.toString()) && !href.includes('#'))
    , [baseURL]);

    // Remove duplicates
    const uniqueLinks = Array.from(new Set(links));
    console.log(`Found ${uniqueLinks.length} routes to crawl:`);
    console.log(uniqueLinks);
    return uniqueLinks;
  } catch (error) {
    console.error('Error extracting links:', error);
    return [];
  } finally {
    await browser.close();
  }
}