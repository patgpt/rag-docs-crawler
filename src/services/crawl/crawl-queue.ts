// crawl-queue.ts
export class CrawlQueue {
  private items: { url: string; depth: number }[] = [];

  constructor(
    initialUrl: string,
    private readonly maxDepth: number
  ) {
    this.add([initialUrl], 0);
  }

  add(urls: string[], depth: number) {
    if (depth > this.maxDepth) return;

    this.items.push(...urls.map(url => ({
      url: this.normalizeUrl(url),
      depth
    })));
  }

  next() {
    return this.items.shift();
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  private normalizeUrl(url: string) {
    return new URL(url).href;
  }
}