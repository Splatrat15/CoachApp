import { Router } from 'express';
import mongoose from 'mongoose';
import { Attendance, attendanceStatuses } from '../models/Attendance';

export const attendanceRouter = Router();

function todaySessionDate(): string {
  return new Date().toISOString().slice(0, 10);
}

attendanceRouter.get('/', async (req, res, next) => {
  try {
    const sessionDate =
      typeof req.query.date === 'string' ? req.query.date : todaySessionDate();

    const records = await Attendance.find({ sessionDate })
      .select('personId status')
      .lean();

    const byPersonId: Record<string, string> = {};
    for (const record of records) {
      byPersonId[String(record.personId)] = record.status;
    }

    res.json({ sessionDate, records: byPersonId });
  } catch (error) {
    next(error);
  }
});

attendanceRouter.put('/:personId', async (req, res, next) => {
  try {
    const { personId } = req.params;
    const { status, sessionDate: bodyDate } = req.body as {
      status?: string;
      sessionDate?: string;
    };

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      res.status(400).json({ error: 'Invalid personId' });
      return;
    }

    if (!status || !attendanceStatuses.includes(status as (typeof attendanceStatuses)[number])) {
      res.status(400).json({
        error: 'Invalid status',
        allowed: attendanceStatuses,
      });
      return;
    }

    const sessionDate = bodyDate ?? todaySessionDate();

    const record = await Attendance.findOneAndUpdate(
      { personId, sessionDate },
      { personId, sessionDate, status },
      { upsert: true, new: true, runValidators: true },
    ).lean();

    res.json({
      personId: String(record?.personId),
      sessionDate: record?.sessionDate,
      status: record?.status,
    });
  } catch (error) {
    next(error);
  }
});
