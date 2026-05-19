export type AttendanceStatus = 'present' | 'absent' | 'late';

export type AttendanceRecord = Record<string, AttendanceStatus>;

export type Person = {
  id: string;
  name: string;
};
