import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { env } from './config/env';
import { attendanceRouter } from './routes/attendance';
import { healthRouter } from './routes/health';
import { peopleRouter } from './routes/people';

export function createApp() {
  const app = express();

  const corsOptions: cors.CorsOptions = env.corsOrigin
    ? { origin: env.corsOrigin.split(',').map((o) => o.trim()) }
    : { origin: true };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({
      message: 'CoachApp API',
      endpoints: {
        health: '/api/health',
        people: '/api/people',
        attendance: '/api/attendance',
      },
    });
  });

  app.use('/api/health', healthRouter);
  app.use('/api/people', peopleRouter);
  app.use('/api/attendance', attendanceRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
