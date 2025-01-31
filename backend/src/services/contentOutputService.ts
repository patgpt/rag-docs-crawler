import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { logger } from "src/utils/logger";
import TurndownService from "turndown";

// interface Frontmatter {
//   title?: string;
//   date?: string;
//   description?: string;
//   [key: string]: unknown;
// }

// function createFrontmatter(data: Frontmatter): string {
//   const yaml = ["---"];

//   Object.entries(data).forEach(([key, value]) => {
//     // Handle string values with special characters by wrapping in quotes
//     const formattedValue =
//       typeof value === "string" && /[:#\-\[\]{}",\n]/.test(value)
//         ? `"${value.replace(/"/g, '\\"')}"`
//         : value;
//     yaml.push(`${key}: ${formattedValue}`);
//   });

//   yaml.push("---\n");
//   return yaml.join("\n");
// }

/**
 * Convert HTML content to Markdown with YAML frontmatter.
 *
 * @param htmlContent - The HTML content to convert.
 * @returns A string containing the frontmatter and the Markdown content.
 */
export function convertHtmlToMarkdown(htmlContent: string): string {
  // Initialize Turndown with any desired options
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
    bulletListMarker: "-",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
  });
  // Convert HTML to Markdown
  const markdownContent = turndownService.turndown(htmlContent); // Prepare frontmatter data
  //   const frontmatterData: Frontmatter = {
  //     title: "Default Title",
  //     date: new Date().toISOString(),
  //   };
  //   return createFrontmatter(frontmatterData) + markdownContent;
  return markdownContent;
}

export async function convertToMarkdownAndSave(url: string, content: string) {
  const markdown = convertHtmlToMarkdown(content);
  const filename = `${url.replace(/^https?:\/\//, "").replace(/\//g, "-")}.md`;
  const filePath = join(__dirname, "..", "output", filename);
  logger.info(`Creating markdown for: ${url}`);
  if (!existsSync(filePath)) {
    mkdirSync(filePath, { recursive: true });
  }
  logger.info(`Saving markdown for: ${url}`);
  writeFileSync(filePath, markdown);
  logger.info(`Saved markdown for: ${url}`);
}
