import Fastify from 'fastify';
import cors from '@fastify/cors';
import type { HealthResponse } from '@my-game/shared';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get('/api/v1/health', async (): Promise<HealthResponse> => {
  return { status: 'ok', timestamp: Date.now() };
});

const port = Number(process.env.PORT ?? 4000);

try {
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`Backend running on http://localhost:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}