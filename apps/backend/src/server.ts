
import { serve } from 'bun';
import { router } from './routes/crawlRoutes';

const server = serve({
  fetch(req) {
    return router.fetch(req);
  },
  port: 3000,
});

console.log(`Server is running on http://localhost:${server.port}`);