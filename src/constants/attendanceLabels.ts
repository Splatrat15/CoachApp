import { AttendanceStatus } from '../types/attendance';
import type { SemanticColors } from '../theme/colors';

export const STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: 'Here',
  absent: 'Absent',
  late: 'Late',
};

export const STATUS_SHORT: Record<AttendanceStatus, string> = {
  present: 'H',
  absent: 'A',
  late: 'L',
};

export function getStatusColors(colors: SemanticColors) {
  return colors.attendance;
}
