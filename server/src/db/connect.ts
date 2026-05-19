import mongoose from 'mongoose';
import { env } from '../config/env';

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
