import { Elysia } from "elysia";
import { crawlPlugin } from "./routes/crawlRoutes";

const app = new Elysia()
  .use(crawlPlugin)

  .ws("/status", {
    open(ws) {
      console.log("WebSocket connected");
    },
    message(ws, message) {
      console.log("Message received:", message);
    },
    close(ws) {
      console.log("WebSocket closed");
    },
  })
  .listen(3000);

if (app.server) {
  console.log(
    `Server is running on http://${app.server.hostname}:${app.server.port}`,
  );
} else {
  console.error("Server failed to start");
}
