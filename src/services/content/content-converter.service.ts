// content - converter.service.ts;
import TurndownService from "turndown";

export class ContentConverterService {
  private turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  convertToMarkdown(html: string): string {
    return this.turndown.turndown(html);
  }
}
