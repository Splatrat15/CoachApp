import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types/attendance';

type AttendanceContextValue = {
  records: AttendanceRecord;
  setStatus: (personId: string, status: AttendanceStatus) => void;
  getStatus: (personId: string) => AttendanceStatus | undefined;
};

const AttendanceContext = createContext<AttendanceContextValue | null>(null);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AttendanceRecord>({});

  const setStatus = useCallback((personId: string, status: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [personId]: status }));
  }, []);

  const getStatus = useCallback(
    (personId: string) => records[personId],
    [records],
  );

  const value = useMemo(
    () => ({ records, setStatus, getStatus }),
    [records, setStatus, getStatus],
  );

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
}
