// src/server.ts
import express, { Request, Response } from 'express';
import crawlAllRoutes from './crawler';
import { CRAWLER_CONFIG } from './config';

const app = express();
app.use(express.json());

// Crawl endpoint
app.post('/crawl', async (req: Request, res: Response): Promise<void> => {
  const { url, retries, concurrency, minDelay, maxDelay } = req.body;

  if (!url) {
    res.status(400).json({ message: 'URL is required.' });
    return; // Early return to exit the function
  }

  try {
    // Override config with user-provided values
    CRAWLER_CONFIG.baseURL = url;
    if (retries) CRAWLER_CONFIG.maxRetries = retries;
    if (concurrency) CRAWLER_CONFIG.maxConcurrentRequests = concurrency;
    if (minDelay) CRAWLER_CONFIG.minDelay = minDelay;
    if (maxDelay) CRAWLER_CONFIG.maxDelay = maxDelay;

    await crawlAllRoutes(url);
    res.status(200).json({ message: 'Crawling completed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Crawling failed.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});