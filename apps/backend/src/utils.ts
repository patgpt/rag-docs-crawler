import { CRAWLER_CONFIG } from './config';

export async function randomDelay(): Promise<void> {
  const { minDelay, maxDelay } = CRAWLER_CONFIG;
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  console.log(`Waiting for ${delay}ms before the next request...`);
  await new Promise((resolve) => setTimeout(resolve, delay));
}