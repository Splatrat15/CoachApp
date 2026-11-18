import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

/** Always resolves to the `server/` folder (works with tsx and compiled `dist/`). */
const serverRoot = path.resolve(__dirname, '../..');
const envPath = path.join(serverRoot, '.env');

const loaded = dotenv.config({ path: envPath });

if (loaded.error && !fs.existsSync(envPath)) {
  console.warn(
    `No .env file at ${envPath}\nCopy server/.env.example to server/.env and add your MongoDB URI.`,
  );
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name} in server/.env\n` +
        `Expected file: ${envPath}\n` +
        `Copy server/.env.example to server/.env and set your MongoDB connection string.`,
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
