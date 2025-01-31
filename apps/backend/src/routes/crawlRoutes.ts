import { Elysia } from 'elysia';
import { startCrawl, downloadMarkdown, getStatus } from '../controllers/crawlController';

const crawlRouter = new Elysia({ prefix: '/api' })
  .post('/crawl', startCrawl)
  .get('/download', downloadMarkdown)
  .get('/status', getStatus);

export { crawlRouter }; 