import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ordersRoute } from './routes/orders.js'
import { connectDatabase } from './database.js';
import { startConsumer } from './kafka/consumer.js';

const app = new Hono()

app.route("/orders", ordersRoute);

async function startServer() {
  await connectDatabase();
  await startConsumer();

  const port = 3000;

  serve({
    fetch: app.fetch,
    port
  });

  console.log(`Server is running on http://localhost:${port}`);
}

startServer();