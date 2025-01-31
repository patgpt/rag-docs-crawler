import { Response, Request } from 'bun';
import { startCrawlService, downloadMarkdownService, getStatusService } from '../services/crawlService';

export async function startCrawl(req: Request, res: Response) {
  const body = await req.json();
  try {
    await startCrawlService(body);
    return res.json({ message: 'Crawl started' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function downloadMarkdown(req: Request, res: Response) {
  try {
    const fileStream = await downloadMarkdownService();
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=crawl-results.zip');
    fileStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getStatus(req: Request, res: Response) {
  try {
    const status = await getStatusService();
    return res.json(status);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}