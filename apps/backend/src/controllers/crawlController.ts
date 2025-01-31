import { startCrawlService, getStatusService } from '../services/crawlService';

export const crawlController = (app: any) => {
  // Route to start a new crawl
  app.post('/start', async ({ body }: { body: any }) => {
    try {
      await startCrawlService(body);
      return { message: 'Crawl started successfully' }; // Return response directly
    } catch (error) {
      console.error('Error starting crawl:', error);
      return { error: 'Failed to start crawl' };
    }
  });

  // Route to get the status of the crawl
  app.get('/status', async () => {
    try {
      const status = await getStatusService();
      return status; // Return response directly
    } catch (error) {
      console.error('Error fetching crawl status:', error);
      return { error: 'Failed to fetch crawl status' };
    }
  });
};