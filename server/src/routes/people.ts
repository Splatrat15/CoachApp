import { Router } from 'express';
import { Person } from '../models/Person';

export const peopleRouter = Router();

peopleRouter.get('/', async (_req, res, next) => {
  try {
    const people = await Person.find({ active: true })
      .sort({ name: 1 })
      .select('_id name')
      .lean();

    res.json(
      people.map((p) => ({
        id: String(p._id),
        name: p.name,
      })),
    );
  } catch (error) {
    next(error);
  }
});
