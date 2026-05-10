import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import type { HealthResponse } from '@my-game/shared';
import { prisma } from './db.js';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get('/api/v1/health', async (): Promise<HealthResponse> => {
  return { status: 'ok', timestamp: Date.now() };
});

// List all players, newest first
app.get('/api/v1/players', async () => {
  return prisma.player.findMany({ orderBy: { createdAt: 'desc' } });
});

// Create a new player
const CreatePlayerBody = z.object({
  name: z.string().min(1).max(32),
});

app.post('/api/v1/players', async (request, reply) => {
  const parsed = CreatePlayerBody.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({
      error: 'Invalid input',
      details: parsed.error.flatten(),
    });
  }
  try {
    const player = await prisma.player.create({
      data: { name: parsed.data.name },
    });
    return player;
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === 'P2002'
    ) {
      return reply.code(409).send({ error: 'Name already taken' });
    }
    throw err;
  }
});

const port = Number(process.env.PORT ?? 4000);

try {
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`Backend running on http://localhost:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}