import Elysia from 'elysia';
import { crawlRouter } from './routes/crawlRoutes';
import { addClient, removeClient } from './services/crawlService';

const app = new Elysia()
  .use(crawlRouter)
  .ws('/status', {
    open(ws) {
      console.log('WebSocket connected');
      addClient(ws);
    },
    message(ws, message) {
      console.log('Message received:', message);
    },
    close(ws) {
      console.log('WebSocket closed');
      removeClient(ws);
    },
  })
  .listen(3000);

console.log(`Server is running on http://${app.server?.hostname}:${app.server?.port}`);