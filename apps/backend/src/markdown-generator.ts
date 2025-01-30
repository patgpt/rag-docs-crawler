import * as cheerio from 'cheerio'; // Use * as cheerio for compatibility
import markdownIt from 'markdown-it';

function generateMarkdown(title: string, htmlContent: string): string {
  const $ = cheerio.load(htmlContent);

  // Remove unnecessary elements like scripts, styles, etc.
  $('script, style, noscript, iframe, header, footer, nav').remove();

  // Extract text content
  const bodyText = $('body').text().trim();

  // Convert HTML to Markdown
  const markdownContent = markdownIt().render(bodyText);

  // Return formatted Markdown with title
  return `# ${title}\n\n${markdownContent}`;
}

export default generateMarkdown;