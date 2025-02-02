// services/content/content-storage.service.ts

import { logger } from "@/utils/logger";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import fs from "fs";
import { sanitize } from "sanitize-filename-ts";
export class ContentStorageService {
  private readonly outputDir = join(__dirname, "../../../output");

  saveContent(url: string, content: string) {
    const filename = this.generateFilename(url);
    logger.info(`Saving content to ${filename}`);
    const filePath = join(this.outputDir, filename);
    logger.info(`File path: ${filePath}`);

    this.ensureDirectoryExists();

    writeFileSync(filePath, content);
    logger.info(`Content saved to ${filePath}`);
  }

    generateFilename(titleOrUrl: string) {
    const sanitized = sanitize(titleOrUrl)
      .replace(/[\W_]+/g, '-')
      .toLowerCase();
    return `${sanitized}.md`;
  }

  async cleanupOutputDirectory() {
    if (existsSync(this.outputDir)) {
      await fs.promises.rm(this.outputDir, { recursive: true });
    }
  }
  getOutputDirectory() {
    logger.info(`Output directory: ${this.outputDir}`);
    return this.outputDir;
  }



  private ensureDirectoryExists() {
    if (!existsSync(this.outputDir)) {
      logger.info(`No directory: ${this.outputDir}`);
      const dir = mkdirSync(this.outputDir, { recursive: true });
      if (dir) {
        logger.error(`Created output directory: ${this.outputDir}`);
      }
    }
  }
}
