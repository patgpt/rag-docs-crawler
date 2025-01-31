import { Context } from 'elysia';
import { startCrawlService, downloadMarkdownService, getStatusService } from '../services/crawlService';

export async function startCrawl(ctx: Context) {
  const body = await ctx.request.json();
  try {
    await startCrawlService(body);
    return ctx.send({ message: 'Crawl started' }, 201);
  } catch (error) {
    return ctx.send({ error: error.message }, 500);
  }
}

export async function downloadMarkdown(ctx: Context) {
  try {
    const fileStream = await downloadMarkdownService();
    ctx.setHeaders({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=crawl-results.zip',
    });
    return new Response(fileStream);
  } catch (error) {
    return ctx.send({ error: error.message }, 500);
  }
}

export async function getStatus(ctx: Context) {
  try {
    const status = await getStatusService();
    return ctx.send(status);
  } catch (error) {
    return ctx.send({ error: error.message }, 500);
  }
}