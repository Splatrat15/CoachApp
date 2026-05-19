import { Router } from 'express';
import { getMongoStatus } from '../db/connect';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const mongo = getMongoStatus();
  const ok = mongo.readyState === 1;

  res.status(ok ? 200 : 503).json({
    ok,
    service: 'coachapp-api',
    mongo,
    timestamp: new Date().toISOString(),
  });
});
