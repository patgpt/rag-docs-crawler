import { Router } from 'bun';
import { startCrawl, downloadMarkdown, getStatus } from '../controllers/crawlController';

const router = new Router();

router.post('/crawl', startCrawl);
router.get('/download', downloadMarkdown);
router.get('/status', getStatus);

export { router };