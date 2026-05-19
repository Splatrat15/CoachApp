import { Schema, model, type InferSchemaType } from 'mongoose';

const attendanceStatuses = ['present', 'absent', 'late'] as const;

const attendanceSchema = new Schema(
  {
    personId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    sessionDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    status: {
      type: String,
      required: true,
      enum: attendanceStatuses,
    },
  },
  { timestamps: true },
);

attendanceSchema.index({ personId: 1, sessionDate: 1 }, { unique: true });

export type AttendanceDocument = InferSchemaType<typeof attendanceSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Attendance = model('Attendance', attendanceSchema);
export { attendanceStatuses };
