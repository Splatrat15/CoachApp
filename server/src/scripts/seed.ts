import { connectMongo, disconnectMongo } from '../db/connect';
import { Person } from '../models/Person';

const SEED_NAMES = [
  'Alex Johnson',
  'Sam Rivera',
  'Jordan Lee',
  'Taylor Morgan',
  'Casey Brooks',
  'Riley Chen',
  'Morgan Davis',
  'Jamie Wilson',
];

async function seed() {
  await connectMongo();

  const existing = await Person.countDocuments();
  if (existing > 0) {
    console.log(`Database already has ${existing} people. Skipping seed.`);
    console.log('To re-seed, delete documents in the "people" collection first.');
    await disconnectMongo();
    return;
  }

  await Person.insertMany(SEED_NAMES.map((name) => ({ name, active: true })));
  console.log(`Seeded ${SEED_NAMES.length} people.`);
  await disconnectMongo();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
