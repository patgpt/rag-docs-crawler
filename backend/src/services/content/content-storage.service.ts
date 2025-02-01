// services/content/content-storage.service.ts

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { logger } from "../../utils/logger";
import { sanitize } from "sanitize-filename-ts";
export class ContentStorageService {
  private readonly outputDir = join(__dirname, "../../../output");

  saveContent(url: string, content: string) {
    const filename = this.generateFilename(url);
    const filePath = join(this.outputDir, filename);

    this.ensureDirectoryExists();

    writeFileSync(filePath, content);
    logger.info(`Saved content for: ${url}`);
  }

  getOutputDirectory() {
    return this.outputDir;
  }

  private generateFilename(url: string) {
    const clean = sanitize(url.replace(/^https?:\/\//, ""));
    return `${clean}.md`;
  }

  private ensureDirectoryExists() {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }
  }
}
