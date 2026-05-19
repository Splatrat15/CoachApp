import dotenv from 'dotenv';
import path from 'path';

// Loads server/.env when you run commands from the server folder (or via npm --prefix server)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy server/.env.example to server/.env and set your MongoDB connection string.`,
    );
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  mongodbUri: requireEnv('MONGODB_URI'),
  corsOrigin: process.env.CORS_ORIGIN,
};
