import { connectMongo, disconnectMongo, getMongoStatus } from '../db/connect';

async function test() {
  console.log('Testing MongoDB connection...');
  await connectMongo();
  console.log('Status:', getMongoStatus());
  await disconnectMongo();
  console.log('Connection test passed.');
}

test().catch((error) => {
  console.error('Connection test failed:', error);
  process.exit(1);
});
