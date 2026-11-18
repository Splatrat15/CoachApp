import dns from 'dns';
import mongoose from 'mongoose';
import { env } from '../config/env';

// Node on Windows sometimes uses a resolver that blocks SRV lookups (querySrv ECONNREFUSED).
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

let isConnected = false;

export async function connectMongo(): Promise<typeof mongoose> {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('MongoDB connected:', mongoose.connection.name);
    return mongoose;
  } catch (error) {
    isConnected = false;
    console.error('MongoDB connection failed.');
    if (
      error instanceof Error &&
      (error.message.includes('querySrv') || error.message.includes('ECONNREFUSED'))
    ) {
      console.error(
        '\nDNS could not resolve the MongoDB Atlas host (common on some networks).\n' +
          'Try:\n' +
          '  1. Switch Wi‑Fi or disable VPN\n' +
          '  2. Use Google DNS (8.8.8.8) on your PC\n' +
          '  3. In Atlas → Connect → Drivers → copy the "Standard connection string" (mongodb://... not mongodb+srv://)\n' +
          '     and paste that into server/.env as MONGODB_URI\n',
      );
    }
    throw error;
  }
}

export async function disconnectMongo(): Promise<void> {
  if (!isConnected) {
    return;
  }
  await mongoose.disconnect();
  isConnected = false;
  console.log('MongoDB disconnected.');
}

export function getMongoStatus() {
  const state = mongoose.connection.readyState;
  const labels: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return {
    state: labels[state] ?? 'unknown',
    readyState: state,
    database: mongoose.connection.name || null,
    host: mongoose.connection.host || null,
  };
}
