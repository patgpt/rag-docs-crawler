import { logger } from "../../utils/logger";

export class CrawlQueue {
  private queue: string[] = []; // Maintains FIFO order
  private urlSet = new Set<string>(); // Fast lookups
  private urlDepths = new Map<string, number>(); // Track depth per URL

  constructor(initialUrl: string, private readonly maxDepth: number) {
    this.add([initialUrl], 0);
  }

  add(urls: string[], depth: number) {
    if (depth > this.maxDepth) {
      logger.debug("Skipping URLs due to max depth", { depth, maxDepth: this.maxDepth });
      return;
    }
    for (const url of urls) {
      try {
        const normalizedUrl = this.normalizeUrl(url);
        // Skip if already in queue
        if (this.urlSet.has(normalizedUrl)) continue;
        this.queue.push(normalizedUrl);
        this.urlSet.add(normalizedUrl);
        this.urlDepths.set(normalizedUrl, depth);
      } catch (error) {
        logger.error("Error adding URL to queue", { url, error });
      }
    }
  }

  has(url: string): boolean {
    try {
      return this.urlSet.has(this.normalizeUrl(url));
    } catch (error) {
      logger.error("Error checking URL in queue", { url, error });
      return false;
    }
  }

  remove(urls: string[]): number {
    if (!urls?.length) return 0;
    let removedCount = 0;
    try {
      for (const url of urls) {
        const normalizedUrl = this.normalizeUrl(url);
        if (this.urlSet.delete(normalizedUrl)) {
          this.urlDepths.delete(normalizedUrl);
          removedCount++;
        }
      }
      this.queue = this.queue.filter(url => this.urlSet.has(url));
      logger.debug(`Removed ${removedCount} URLs from queue`);
      return removedCount;
    } catch (error) {
      logger.error("Error removing URLs from queue", { error });
      return removedCount;
    }
  }

  next(): { url: string; depth: number } | undefined {
    try {
      const url = this.queue.shift();
      if (!url) return undefined;
      const depth = this.urlDepths.get(url) ?? 0;
      // Remove from the set and depth map since we're processing it now.
      this.urlSet.delete(url);
      this.urlDepths.delete(url);
      return { url, depth };
    } catch (error) {
      logger.error("Error getting next URL from queue", { error });
      return undefined;
    }
  }

  size(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  private normalizeUrl(url: string): string {
    try {
      // Preserve the hash fragment.
      const parsedUrl = new URL(url);
      return parsedUrl.href;
    } catch (error) {
      logger.error("Error normalizing URL", { url, error });
      throw error;
    }
  }
}
