// content - converter.service.ts;
import { logger } from "@/utils/logger";
import TurndownService from "turndown";

export class ContentConverterService {
  private turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  convertToMarkdown(html: string): string {
    const result = this.turndown.turndown(html);
    logger.info("Converted content to markdown", { length: result.length });
    return result;
  }
}
