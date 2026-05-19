import { createApp } from './app';
import { env } from './config/env';
import { connectMongo, disconnectMongo } from './db/connect';

async function main() {
  await connectMongo();

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`CoachApp API running at http://localhost:${env.port}`);
    console.log(`Health check: http://localhost:${env.port}/api/health`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close();
    await disconnectMongo();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
